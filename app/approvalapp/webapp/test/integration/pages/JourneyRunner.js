sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"approvalapp/test/integration/pages/IssueList",
	"approvalapp/test/integration/pages/IssueObjectPage",
	"approvalapp/test/integration/pages/CommentObjectPage"
], function (JourneyRunner, IssueList, IssueObjectPage, CommentObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('approvalapp') + '/test/flp.html#app-preview',
        pages: {
			onTheIssueList: IssueList,
			onTheIssueObjectPage: IssueObjectPage,
			onTheCommentObjectPage: CommentObjectPage
        },
        async: true
    });

    return runner;
});

