sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        acceptmethod: async function (oContext, aSelectedContexts) {
            debugger;
            const oModel = sap.ui.core.Element.getElementById("approvalapp::IssueObjectPage--fe::ObjectPageDynamicHeaderTitle-_actionsToolbar").getModel()
            const iId = sap.ui.core.Element.getElementById("approvalapp::IssueObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::iID::Field-display").getText()
            const oId = sap.ui.core.Element.getElementById("approvalapp::IssueObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::oID::Field-display").getText()
            const sMessage = sap.ui.core.Element.getElementById(
                "approvalapp::IssueObjectPage--fe::CustomSubSection::ApprovalComment--commentsFragment-CommentTextArea"
            ).getValue();

            if (!sMessage || !sMessage.trim()) {
                sap.m.MessageBox.error("Please enter a comment before approving.");
                return; // ⛔ stop execution
            }

            // Get Issue Context (Object Page context)
            const oIssueContext = oContext || this.getView().getBindingContext();
            debugger
            const oFunction = oModel.bindContext("/approvalTrigger(...)");
            oFunction.setParameter("oID", oId);
            oFunction.setParameter("iID", iId);
            await oFunction.execute();
            debugger
            const oCommentsBinding = oModel.bindList(
                oIssueContext.getPath() + "/issueTocomments" // ⚠ CDS name
            );
           
            await oCommentsBinding.create({
                description: sMessage,
                commentedBy: "Approver"
            });
            debugger
            sap.ui.core.Element.getElementById(
                "approvalapp::IssueObjectPage--fe::CustomSubSection::ApprovalComment--commentsFragment-CommentTextArea"
            ).setValue("")

            
            // Set value into schema field
            // oIssueContext.setProperty("ApproveCmtBox", sMessage);

            // // Save change (PATCH)
            // await oModel.submitBatch();
            

            const oContext1 = sap.ui.core.Element.getElementById("__table0").getBindingContext();
            oContext1.requestSideEffects([{
                $NavigationPropertyPath: "issueToApprovalHistory"
            }]);
            sap.m.MessageBox.success("Issue Approved");

            
        }
    };
});
