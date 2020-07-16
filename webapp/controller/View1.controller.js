sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox",
	"../utility/formatter",
], function (Controller, JSONModel, MessageToast, Fragment, MessageBox, formatter) {
	"use strict";

	return Controller.extend("com.incture.ZINKTHON_SAMPLE2.controller.View1", {
		formatter: formatter,
		onInit: function () {
			var oCreatebpModel = new JSONModel("model/createBP.json");
			this.getView().setModel(oCreatebpModel, "oCreatebpModel");

			var oValidationModel = new JSONModel();
			this.getView().setModel(oValidationModel, "oValidationModel");
			oValidationModel.setProperty("/aErrorModels", []);
		},
		// buttonTextFormatter: function () {
		// 	var oValidationModel = this.getView().getModel("oValidationModel");
		// 	var arr = oValidationModel.getProperty("/aErrorModels");
		// 	return arr.length;
		// },
		// buttonVisibleFormatter: function () {
		// 	var oValidationModel = this.getView().getModel("oValidationModel");
		// 	var arr = oValidationModel.getProperty("/aErrorModels");
		// 	if (arr.length > 0) {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// },
		onFirstNameChange: function () {
			var regex = /^[a-zA-Z ]{2,20}$/;
			var _self = this;
			var oValidationModel = this.getView().getModel("oValidationModel");
			var arr = oValidationModel.getProperty("/aErrorModels");
			var iItemIndex = arr.map(function (item) {
				return item.Label;
			}).indexOf("First Name");
			var sInput = _self.getView().byId("firstName");
			if (sInput.getValue().match(regex) && sInput.getValue() !== "") {
				if (iItemIndex != -1) {
					arr.splice(iItemIndex, 1);
				}
				sInput.setValueState("None");
				this.fNameValid = true;
			} else {
				var obj = {
					type: "Error",
					Label: "First Name",
					tab: "Basic Data",
					Description: _self.getView().byId("firstName").getValueStateText()
				};
				if (iItemIndex == -1) {
					arr.push(obj);
				}
				sInput.setValueState("Error");
				this.fNameValid = false;
			}
		},
		onErrorCheckButtonPress: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("idErrorList", "com.incture.ZINKTHON_SAMPLE2.fragment.ErrorList", this);
			}
			this.getView().addDependent(this._oDialog);
			this._oDialog.open();
		},
		onCancel: function () {
			this._oDialog.close();
			this._oDialog.destroy();
			this._oDialog = null;

		},
		onLastNameChange: function () {
			var regex = /^[a-zA-Z ]{2,20}$/;
			var _self = this;
			var sInput = _self.getView().byId("lastName");
			if (sInput.getValue().match(regex) && sInput.getValue() !== "") {
				sInput.setValueState("None");
				this.lNameValid = true;
			} else {
				sInput.setValueState("Error");
				this.lNameValid = false;
			}
		},
		onSearchTerm1Change: function () {
			var _self = this;
			var sInput = _self.getView().byId("searchTerm1");
			if (sInput.getValue() !== "") {
				sInput.setValueState("None");
				this.st1Valid = true;
			} else {
				sInput.setValueState("Error");
				this.st1Valid = false;
			}
		},
		onSearchTerm2Change: function () {
			var _self = this;
			var sInput = _self.getView().byId("searchTerm2");
			if (sInput.getValue() !== "") {
				sInput.setValueState("None");
				this.st2Valid = true;
			} else {
				sInput.setValueState("Error");
				this.st2Valid = false;
			}
		},
		onLanguageKeyChange: function () {
			var _self = this;
			var sInput = _self.getView().byId("languageKey");
			if (sInput.getValue() !== "") {
				sInput.setValueState("None");
				this.languageKeyValid = true;
			} else {
				sInput.setValueState("Error");
				this.languageKeyValid = false;
			}
		},
		onBPRoleChange: function () {
			var _self = this;
			var sInput = _self.getView().byId("bpRole");
			if (sInput.getValue() == "Customer" || sInput.getValue() == "Vendor") {
				sInput.setValueState("None");
				this.bpRoleValid = true;
			} else {
				sInput.setValueState("Error");
				this.bpRoleValid = false;
			}
		},
		onSubmit: function () {
			this.onFirstNameChange();
			this.onLastNameChange();
			this.onSearchTerm1Change();
			this.onSearchTerm2Change();
			this.onLanguageKeyChange();
			this.onBPRoleChange();
			if (this.fNameValid && this.lNameValid && this.st1Valid && this.st2Valid && this.languageKeyValid && this.bpRoleValid) {
				MessageToast.show("Validation Successful");
			} else {
				MessageToast.show("Validation Failed!!");
			}
		},
		onAddRow: function () {
			var aObject = {
				Street: "",
				Street2: "",
				Street4: "",
				PostalCode: "",
				City: "",
				Country: "",
				Email: "",
				Telephone: ""
			};
			var oCreatebpModel = this.getView().getModel("oCreatebpModel");
			var arr = oCreatebpModel.getProperty("/aAddressList");
			arr.push(aObject);
			oCreatebpModel.setProperty("/aAddressList", arr);

		},
		onDeleteRow: function (oEvent) {
			var oCreatebpModel = this.getView().getModel("oCreatebpModel");
			var sPath = oEvent.getSource().getParent().getParent().getBindingContextPath();
			var index = sPath.split('/')[2];
			sap.m.MessageToast.show("Item Index = " + index);
			var arr = oCreatebpModel.getProperty("/aAddressList");
			arr.splice(index, 1);
			oCreatebpModel.setProperty("/aAddressList", arr);
		},

		onAddRowTransactionTable: function (e) {
			var aObject = {
				ID: "",
				City: "",
				BankKey: "",
				BankAccount: "",
				ControlKey: "",
				IBAN: ""
			};
			var oCreatebpModel = this.getView().getModel("oCreatebpModel");
			var arr1 = oCreatebpModel.getProperty("/aPaymentTransactions");
			arr1.push(aObject);
			oCreatebpModel.setProperty("/aPaymentTransactions", arr1);
		},

		onDeleteRowTransactionTable: function (oEvent) {
			var oCreatebpModel = this.getView().getModel("oCreatebpModel");
			var arr1 = oCreatebpModel.getProperty("/aPaymentTransactions");
			var oObj = oEvent.getSource().getBindingContext("oCreatebpModel").getObject();
			var index = Object.keys(arr1)[Object.values(arr1).indexOf(oObj)];
			sap.m.MessageToast.show("Item Index = " + index);
			arr1.splice(index, 1);
			oCreatebpModel.setProperty("/aPaymentTransactions", arr1);
		},

		onReset: function () {
			var that = this;
			MessageBox.confirm("Are you sure you want to reset ?", {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: "Reset",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					that.fnCallbackConfirm(oAction);
				}
			});
		},

		fnCallbackConfirm: function (oAction) {
			if (oAction === "YES") {
				var index = 0;
				var oCreatebpModel = this.getView().getModel("oCreatebpModel");
				var oBasicData = oCreatebpModel.getProperty("/oBasicData");
				var oCommunicationDetails = oCreatebpModel.getProperty("/oCommunicationDetails");
				var oIdentification = oCreatebpModel.getProperty("/oIdentification");
				var aAddressList = oCreatebpModel.getProperty("/aAddressList");
				var aPaymentTransactions = oCreatebpModel.getProperty("/aPaymentTransactions");
				for (index in oBasicData) {
					oBasicData[index] = "";

				}
				for (index in oCommunicationDetails) {
					oCommunicationDetails[index] = "";

				}
				for (index in oIdentification) {
					oIdentification[index] = "";

				}
				aAddressList = [];
				aPaymentTransactions = [];
				oCreatebpModel.setProperty("/oBasicData", oBasicData);
				oCreatebpModel.setProperty("/oCommunicationDetails", oCommunicationDetails);
				oCreatebpModel.setProperty("/oIdentification", oIdentification);
				oCreatebpModel.setProperty("/aAddressList", aAddressList);
				oCreatebpModel.setProperty("/aPaymentTransactions", aPaymentTransactions);
				console.log(oCreatebpModel);

			} else {
				return false;
			}
		}

	});
});