sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"approverlevel/test/integration/pages/ApproverList",
	"approverlevel/test/integration/pages/ApproverObjectPage"
], function (JourneyRunner, ApproverList, ApproverObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('approverlevel') + '/test/flp.html#app-preview',
        pages: {
			onTheApproverList: ApproverList,
			onTheApproverObjectPage: ApproverObjectPage
        },
        async: true
    });

    return runner;
});

