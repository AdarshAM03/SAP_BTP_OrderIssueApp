sap.ui.define([
    "sap/m/Dialog",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/m/Button",
    "sap/m/MessageToast"
], function (Dialog, List, StandardListItem, Button, MessageToast) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oEvent the event object provided by the event provider.
         */
        onPress: function (oEvent) {
            MessageToast.show("Custom handler invoked.");
        },
        onPost: function (oEvent) {
            debugger
            var sValue = oEvent.getParameter("value");
            MessageToast.show("Posted new feed entry: " + sValue);
            //  const oModel = sap.ui.core.Element.getElementById("orderissueapp::IssueObjectPage--fe::CustomSubSection::Comment--_IDGenFeedInput-button").getModel();

            // 2️⃣ Get FeedInput & model
            const oSource = oEvent.getSource();
            const oModel = oSource.getModel();
            // 1️⃣ Get Issue Object Page draft context
            const oIssueContext = oSource.getBindingContext();
            if (!oIssueContext) {
                sap.m.MessageToast.show("No draft context available");
                return;
            }

            // 2️⃣ Bind list RELATIVE to draft context (IMPORTANT)
            const oCommentBinding = oModel.bindList(
                "IssueToComments",   // navigation property (from CDS)
                oIssueContext        // draft context
            );

            // 3️⃣ Create comment → goes to DRAFT table
            const oContext = oCommentBinding.create({
                Description: sValue
            });

            // 4️⃣ Handle result
            oContext.created().then(() => {
                sap.m.MessageToast.show("Comment added (draft)");
                oSource.setValue("");
            }).catch((oError) => {
                sap.m.MessageToast.show("Failed to add comment");
                console.error(oError);
            });
        },
        onOpenComments: function (oEvent) {
            debugger;
            const oSource = oEvent.getSource();
            const oIssueContext = oSource.getBindingContext();

            if (!oIssueContext) {
                MessageToast.show("No Issue context");
                return;
            }

            // 1️⃣ Get Issue keys
            const oIssueData = oIssueContext.getObject();
            const sIID = oIssueData.iID;
            const sOID = oIssueData.oID;

            if (!sIID || !sOID) {
                MessageToast.show("Issue ID missing");
                return;
            }

            // 2️⃣ Create dialog once (reuse later)
            if (!this._oCommentsDialog) {
                this._oCommentsList = new List({
                    growing: true,
                    growingScrollToLoad: true
                });

                this._oCommentsDialog = new Dialog({
                    title: "Previous Comments",
                    contentWidth: "600px",
                    contentHeight: "300px",
                    resizable: true,
                    draggable: true,
                    content: [this._oCommentsList],
                    endButton: new Button({
                        text: "Close",
                        press: function () {
                            this._oCommentsDialog.close();
                        }.bind(this)
                    })
                });
            }

            // 3️⃣ Clear old items
            this._oCommentsList.removeAllItems();

            // 4️⃣ AJAX GET comments
            const sUrl =
                "/odata/v4/order-issue/Issue(iID='" +
                sIID +
                "',oID='" +
                sOID +
                "')/issueTocomments";

            $.ajax({
                url: sUrl,
                method: "GET",
                success: function (oData) {

                    if (!oData?.value?.length) {
                        this._oCommentsList.addItem(
                            new StandardListItem({
                                title: "No previous comments found"
                            })
                        );
                    } else {
                        oData.value.forEach(function (oComment) {
                            this._oCommentsList.addItem(
                                new sap.m.FeedListItem({
                                    sender: oComment.commentedBy,
                                    timestamp: new Date(oComment.createdAt).toLocaleString(),
                                    text: oComment.description,
                                    icon: "sap-icon://person-placeholder"
                                })
                            );
                        }.bind(this));
                    }

                    // 5️⃣ Open dialog
                    this._oCommentsDialog.open();

                }.bind(this),
                error: function (oError) {
                    console.error(oError);
                    MessageToast.show("Failed to load comments");
                }
            });
        }
    };
});
