sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('orderissueapp.ext.controller.IssueObj', {
		override: {
			onInit: function () {
				
				const oView = this.base.getView();
				const oExtApi = this.base.getExtensionAPI(); // ✅ FIX

				oView.addEventDelegate({
					onAfterRendering: function () {

						const oApplyButton = sap.ui.core.Element.getElementById(
							"orderissueapp::IssueObjectPage--fe::FooterBar::StandardAction::Apply"
						);

						if (!oApplyButton || oApplyButton.__handlerAttached) {
							return;
						}
						oApplyButton.__handlerAttached = true;

						oApplyButton.attachPress(async function () {
							debugger
							// ✅ use captured extension API
							const oIssueContext = oExtApi.getBindingContext();

							if (!oIssueContext) {
								sap.m.MessageToast.show("No Issue context");
								return;
							}

							// ✅ Only for NEW Issue (Draft)
							// if (!oIssueContext.isTransient()) {
							// 	sap.m.MessageToast.show(
							// 		"Comment can be added only while creating Issue"
							// 	);
							// 	return;
							// }

							const oCommentField = sap.ui.core.Element.getElementById(
								"orderissueapp::IssueObjectPage--fe::CustomSubSection::Comment--_IDGenTextArea"
							);

							const sComment = oCommentField?.getValue()?.trim();
							if (!sComment) {
								sap.m.MessageToast.show("Please enter comment");
								return;
							}

							// ✅ Model from context (OData V4)
							const oModel = oIssueContext.getModel();

							const oCommentsBinding = oModel.bindList(
								oIssueContext.getPath() + "/issueTocomments" // ⚠ CDS name
							);

							await oCommentsBinding.create({
								description: sComment,
								commentedBy:"User"
							});

							sap.m.MessageToast.show("Comment added to Issue draft");
						});
					}
				});
			}
		}
	});
});
