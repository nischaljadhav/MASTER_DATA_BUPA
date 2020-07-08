sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, Fragment, MessageBox) {
	"use strict";

	return Controller.extend("com.incture.ZINKTHON_SAMPLE2.controller.View1", {
		onInit: function () {
			var oCreatebpModel = new JSONModel("model/createBP.json");
			this.getView().setModel(oCreatebpModel, "oCreatebpModel");
			console.log(oCreatebpModel);
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

		},

		onSubmit: function (oEvent) {
			var requiredInputs = this.returnIdListOfRequiredFields();
			var passedValidation = this.validateForm(requiredInputs);
			if (passedValidation === false) {
				//show an error message, rest of code will not execute.
				MessageToast.show("Validation Failed");
			} else {
				MessageToast.show("Validation Successful");
			}
		},
		returnIdListOfRequiredFields: function () {
			var requiredInputs = ["firstName", "lastName", "searchTerm1", "searchTerm2", "languageKey", "bpRole"];
			return requiredInputs;
		},
		validateForm: function (requiredInputs) {
			var _self = this;
			var valid = true;
			requiredInputs.forEach(function (input) {
				var sInput = _self.getView().byId(input);
				if (sInput.getValue() == "" || sInput.getValue() == undefined) {
					valid = false;
					sInput.setValueState("Error");
				} else {
					sInput.setValueState("None");
				}
			});
			return valid;
		}
	});
});