sap.ui.define(
	['sap/ui/core/mvc/ControllerExtension'],
	function (ControllerExtension) {
		'use strict';

		return ControllerExtension.extend(
			'approvalapp.ext.controller.IssueobjPage',
			{
				// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
				override: {
					/**
					 * Called when a controller is instantiated and its View controls (if available) are already created.
					 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
					 * @memberOf approvalapp.ext.controller.IssueobjPage
					 */
					onInit: function () {
						// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
						var oModel = this.base.getExtensionAPI().getModel();
						const oView = this.base.getView();
						const oExtApi = this.base.getExtensionAPI();

						oView.addEventDelegate({
							onAfterRendering: function () {
								const oApplyButton =
									sap.ui.core.Element.getElementById(
										"orderissueapp::IssueObjectPage--fe::FooterBar::StandardAction::Apply"
									);

								if (!oApplyButton || oApplyButton.__handlerAttached) {
									return;
								}

								oApplyButton.__handlerAttached = true;

								oApplyButton.attachPress(async function () {
									debugger;
								});
							}
						});
					}
				}
			}
		);
	}
);
