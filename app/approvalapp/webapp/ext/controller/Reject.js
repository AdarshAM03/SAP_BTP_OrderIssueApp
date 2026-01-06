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
        rejectmethod: async function (oContext, aSelectedContexts) {
            const oModel = sap.ui.core.Element.getElementById("approvalapp::IssueObjectPage--fe::ObjectPageDynamicHeaderTitle-_actionsToolbar").getModel()
            const sMessage = sap.ui.core.Element.getElementById(
                "approvalapp::IssueObjectPage--fe::CustomSubSection::ApprovalComment--commentsFragment-CommentTextArea"
            ).getValue();
            const oIssueContext = oContext || this.getView().getBindingContext();
            const iId = sap.ui.core.Element.getElementById("approvalapp::IssueObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::iID::Field-display").getText()
            const oId = sap.ui.core.Element.getElementById("approvalapp::IssueObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::oID::Field-display").getText()
            const oFunction = oModel.bindContext("/rejectTrigger(...)");
            oFunction.setParameter("oID", oId);
            oFunction.setParameter("iID", iId);
            await oFunction.execute();

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
            sap.m.MessageBox.alert("Issue Rejected");
        }
    };
});
