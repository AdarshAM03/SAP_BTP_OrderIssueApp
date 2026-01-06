const cds = require('@sap/cds');
const axios = require('axios');

exports['MyService'] = cds.service.impl(function () {

    const { Order, Customer } = this.entities;
    //setting customer id automatically without user input
    this.before("CREATE", Customer.drafts, (req) => {
        const random = Math.floor(1000 + Math.random() * 9000);
        req.data.cID = `C${random}`;
    });
    //setting Order id automatically without user input
    this.before("CREATE", Order.drafts, (req) => {
        debugger
        const random = Math.floor(1000 + Math.random() * 9000);
        req.data.oID = `O${random}`
    })
});

exports['orderIssueService'] = cds.service.impl(function () {

    const { Issue, Approver, ApprovalHistory } = this.entities;
    //setting Issue id automatically without user input
    this.before("CREATE", Issue.drafts, (req) => {
        debugger
        const random = Math.floor(1000 + Math.random() * 9000);
        req.data.iID = `I${random}`
        req.data.status = 'Pending'
    });
    // send for approval bpa api trigger 
    this.on('apiTrigger', async (req) => {
        debugger
        var issueId = req.data.iID
        var orderId = req.data.oID
        try {
            console.log("process trigger");
            var client = 'sb-e1b36d5a-2b64-4abd-86d8-550d3d948e45!b556471|xsuaa!b49390';
            var secret = '847cd962-cf9b-4275-a224-650090a3713c$RsR_SKlotP_qx_WN3sQk6uQuUIA6kJk7hiXVV2BEgXk=';
            // highest level value to set the levels of the approval process
            const totalLevels = await SELECT.one.from(Approver).columns('max(Level) as HighestLevel');
            console.log(totalLevels.HighestLevel)
            // list of all the approvers name to be sent to bpa api 
            const approverNames = (
                await SELECT.from(Approver).columns('ApproverName')
            ).map(a => a.ApproverName);

            console.log(approverNames)

            // list of all the aprovers name in level 1
            const lvl1Approvers = await SELECT.from(Approver)
                .columns('ApproverName', 'Email', 'Level');

            const approvalEntries = lvl1Approvers.map(a => ({
                iID: issueId,
                oID: orderId,
                level: a.Level,
                approverName: a.ApproverName,
                email: a.Email,
                status: 'Pending',
                started: new Date(),   // CAP handles DateTime
                completed: null,
                DaysTaken:null
            }));

            await INSERT.into(ApprovalHistory).entries(approvalEntries);

            var auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
            var response1 = await axios.request('https://105934aatrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + auth1
                    }
                });
            console.log(response1);
            var bodyy = JSON.parse(JSON.stringify({
                "definitionId": "us10.105934aatrial.approvalpro.issueApprovalPro",
                "context": {
                    "issueid": issueId,
                    "level": totalLevels.HighestLevel,
                    "initiallvl": 1,
                    "approvers": approverNames
                },
            }));
            console.log(bodyy);
            var response11 = await axios.post(`https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances`, bodyy,
                {
                    headers: {
                        'Authorization': 'Bearer ' + response1.data.access_token,
                    }
                });
            const workflowInstanceId = response11.data.id;
            console.log("Workflow Instance ID:", workflowInstanceId);

            // ✅  UPDATE instanceID value in ISSUE TABLE
            await cds.run(
                UPDATE('Issue')
                    .set({ instanceID: workflowInstanceId })
                    .where({ iID: issueId }));

            console.log("Issue updated with workflow instance ID");
        } catch (error) {
            console.log(error)
        }
        console.log(response11.data.id);
        return "success";
    });

});

exports['approvalService'] = cds.service.impl(function () {
    const { Approver, ApprovalHistory } = this.entities;
    this.on('approvalTrigger', async (req) => {
        debugger
        const issueId = req.data.iID;
        var orderId = req.data.oID

        console.log("Issue ID:", issueId);

        // 1️⃣ SELECT workflow instance id from Issue table
        const result = await cds.run(
            SELECT.one
                .from('Issue')
                .columns('instanceID')
                .where({ iID: issueId })
        );

        if (!result || !result.instanceID) {
            throw new Error("Workflow instance ID not found for issue " + issueId);
        }

        const executionId = result.instanceID;
        console.log("Execution ID:", executionId);

        try {
            const url =
                `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${executionId}/context`;

            console.log("process trigger");
            var client = 'sb-e1b36d5a-2b64-4abd-86d8-550d3d948e45!b556471|xsuaa!b49390';
            var secret = '847cd962-cf9b-4275-a224-650090a3713c$RsR_SKlotP_qx_WN3sQk6uQuUIA6kJk7hiXVV2BEgXk=';
            var auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
            // Generating Access Tokens
            var response1 = await axios.request('https://105934aatrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Basic ' + auth1
                    }
                });
            console.log(response1);
            debugger
            // Getting the Context of the running Instance 
            const response = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + response1.data.access_token,
                    "Content-Type": "application/json"
                    // Add authorization if required

                }
            });
            console.log("Response Body:", response.data.custom.curlvl);

            const [{ started }] = await SELECT
                .from(ApprovalHistory)
                .columns('started')
                .where({
                    level: response.data.custom.curlvl,
                    iID: issueId,
                    oID: orderId
                });
                debugger
            const startDate = new Date(started);
            const endDate = new Date();

            // Normalize to midnight (ignore time)
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
debugger
            const diffMs = endDate - startDate;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            console.log(diffDays+1)
debugger
            // Updating the current level history status to approved
            await UPDATE(ApprovalHistory)
                .set({
                    status: 'Approved',
                    completed: new Date(),
                    DaysTaken: diffDays+1+" day"
                })
                .where({
                    level: response.data.custom.curlvl,
                    iID: issueId, oID: orderId
                });

debugger
            // inserting the next level approvers name into the approval history table and set status as pending
            // const nxtlvlApprovers = 
            //     await SELECT.from(Approver)
            //     .columns('ApproverName', 'Email'
            //     )
            //     .where({ Level: response.data.custom.curlvl + 1 })


            // const approvalEntries = nxtlvlApprovers.map(a => ({
            //     iID: issueId,
            //     oID: orderId,
            //     level: response.data.custom.curlvl + 1,
            //     approverName: a.ApproverName,
            //     email: a.Email,
            //     status: 'Pending',
            //     started: new Date(),   // CAP handles DateTime
            //     completed: null
            // }));

            // await INSERT.into(ApprovalHistory).entries(approvalEntries);

            // getting the approvers name and email from approvers table to send to wait for api call
            const approver = await cds.run(
                SELECT.one
                    .from('Approver')
                    .columns('ApproverName', 'Email')
                    .where({ Level: response.data.custom.curlvl })
            );
            console.log(approver);
            // setting the values for wait for api body
            var bodyy = JSON.parse(JSON.stringify({
                "executionId": executionId,
                "inputs": {
                    "issueid": issueId,
                    "status": "Accepted",
                    "clvl": response.data.custom.curlvl,
                    "approvername": approver.ApproverName,
                    "approveremail": approver.Email
                }
            }));
            console.log(bodyy);
            // post request for wait for api setting api_key in the header
            var response11 = await axios.post(`https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/unified/v1/triggers/api/us10.105934aatrial.approvalpro.lvl2ApiWait`, bodyy,
                {
                    headers: {
                        'Authorization': 'Bearer ' + response1.data.access_token,
                        'irpa-api-key': 'ZUAkMhm3R5N9TRpagIg2j73Bkke-CDYj'
                    }
                });

            const { Issue } = this.entities;
            // updating the status field to approved on click on approve button
            await UPDATE(Issue)
                .set({
                    status: "Approved"
                })
                .where({ iID: issueId });
        } catch (error) {
            console.log(error)
        }
        return "success";
    }),
        this.on('rejectTrigger', async (req) => {
            debugger
            const issueId = req.data.iID;
            var orderId = req.data.oID
            console.log("Issue ID:", issueId);

            // 1️⃣ SELECT workflow instance id from Issue table
            const result = await cds.run(
                SELECT.one
                    .from('Issue')
                    .columns('instanceID')
                    .where({ iID: issueId })
            );

            if (!result || !result.instanceID) {
                throw new Error("Workflow instance ID not found for issue " + issueId);
            }

            const executionId = result.instanceID;
            console.log("Execution ID:", executionId);
            try {
                const url =
                    `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${executionId}/context`;

                console.log("process trigger");
                var client = 'sb-e1b36d5a-2b64-4abd-86d8-550d3d948e45!b556471|xsuaa!b49390';
                var secret = '847cd962-cf9b-4275-a224-650090a3713c$RsR_SKlotP_qx_WN3sQk6uQuUIA6kJk7hiXVV2BEgXk=';
                var auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
                var response1 = await axios.request('https://105934aatrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials',
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + auth1
                        }
                    });
                console.log(response1);
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + response1.data.access_token,
                        "Content-Type": "application/json"
                        // Add authorization if required

                    }
                });
                console.log("Response Body:", response.data.custom.curlvl);

                const [{ started }] = await SELECT
                .from(ApprovalHistory)
                .columns('started')
                .where({
                    level: response.data.custom.curlvl,
                    iID: issueId,
                    oID: orderId
                });
                debugger
            const startDate = new Date(started);
            const endDate = new Date();

            // Normalize to midnight (ignore time)
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
debugger
            const diffMs = endDate - startDate;
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            console.log(diffDays+1)

                await UPDATE(ApprovalHistory)
                    .set({
                        status: 'Rejected',
                        completed: new Date(),
                        DaysTaken: diffDays+1+" day"
                    })
                    .where({
                        level: { '>=': response.data.custom.curlvl },
                        iID: issueId, oID: orderId
                    });

                // getting the approvers name and email from approvers table to send to wait for api call
                const approver = await cds.run(
                    SELECT.one
                        .from('Approver')
                        .columns('ApproverName', 'Email')
                        .where({ Level: response.data.custom.curlvl })
                );
                console.log(approver);
                var bodyy = JSON.parse(JSON.stringify({
                    "executionId": executionId,
                    "inputs": {
                        "issueid": issueId,
                        "status": "Rejected",
                        "clvl": response.data.custom.curlvl,
                        "approvername": approver.ApproverName,
                        "approveremail": approver.Email
                    }
                }));
                console.log(bodyy);
                var response11 = await axios.post(`https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/unified/v1/triggers/api/us10.105934aatrial.approvalpro.lvl2ApiWait`, bodyy,
                    {
                        headers: {
                            'Authorization': 'Bearer ' + response1.data.access_token,
                            'irpa-api-key': 'ZUAkMhm3R5N9TRpagIg2j73Bkke-CDYj'
                        }
                    });
                debugger
                const { Issue } = this.entities;

                await UPDATE(Issue)
                    .set({
                        status: "Rejected"   // 🔴 ONLY CHANGE
                    })
                    .where({ iID: issueId });
            } catch (error) {
                console.log(error)
            }
            return "rejected";
        })
})

