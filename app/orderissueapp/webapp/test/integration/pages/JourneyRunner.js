sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"orderissueapp/test/integration/pages/OrderList",
	"orderissueapp/test/integration/pages/OrderObjectPage",
	"orderissueapp/test/integration/pages/IssueObjectPage"
], function (JourneyRunner, OrderList, OrderObjectPage, IssueObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('orderissueapp') + '/test/flp.html#app-preview',
        pages: {
			onTheOrderList: OrderList,
			onTheOrderObjectPage: OrderObjectPage,
			onTheIssueObjectPage: IssueObjectPage
        },
        async: true
    });

    return runner;
});

