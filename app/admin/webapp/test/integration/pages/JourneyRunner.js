sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"admin/test/integration/pages/CustomerList",
	"admin/test/integration/pages/CustomerObjectPage",
	"admin/test/integration/pages/OrderObjectPage"
], function (JourneyRunner, CustomerList, CustomerObjectPage, OrderObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('admin') + '/test/flp.html#app-preview',
        pages: {
			onTheCustomerList: CustomerList,
			onTheCustomerObjectPage: CustomerObjectPage,
			onTheOrderObjectPage: OrderObjectPage
        },
        async: true
    });

    return runner;
});

