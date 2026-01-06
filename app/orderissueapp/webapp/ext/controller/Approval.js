sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/Button"
], function (MessageToast, MessageBox, Button) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        Onapproval: function (oContext, aSelectedContexts) {
            //  MessageToast.show("Custom handler invoked.");
            debugger;
            MessageBox.confirm(
                "Are you sure you want to approve?", {
                title: "Confirm Approval",
                onClose: async function (sAction) {
                    debugger;
                    if (sAction === MessageBox.Action.YES) {
                        const oModel = sap.ui.core.Element.getElementById("orderissueapp::OrderObjectPage--fe::StandardAction::Edit").getModel()
                        const iId = sap.ui.core.Element.getElementById("orderissueapp::OrderObjectPage--fe::table::orderToissue::LineItem::Issues-innerTable").getItems()[0].getBindingContext().getObject().iID
                        const oId = sap.ui.core.Element.getElementById("orderissueapp::OrderObjectPage--fe::table::orderToissue::LineItem::Issues-innerTable").getItems()[0].getBindingContext().getObject().oID
                        const oFunction = oModel.bindContext("/apiTrigger(...)");
                        oFunction.setParameter("oID", oId);
                        oFunction.setParameter("iID", iId);
                        await oFunction.execute();
                        const oContext = sap.ui.core.Element.getElementById("__table1").getBindingContext();

                        oContext.requestSideEffects([{
                            $NavigationPropertyPath: "orderToapprovalHistory"
                        }]);

                    } else if (sAction === MessageBox.Action.CANCEL) {

                        sap.m.MessageToast.show("Approval cancelled.");
                    }
                }.bind(this),
                actions: [MessageBox.Action.YES, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.YES
            }
            );
        }
    };
});
