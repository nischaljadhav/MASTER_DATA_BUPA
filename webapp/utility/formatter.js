jQuery.sap.declare("com.incture.ZINKTHON_SAMPLE2.utility.formatter");
com.incture.ZINKTHON_SAMPLE2.utility.formatter = {
	generateQuality: function (sValue) {
		if (sValue <= 3) {
			sValue = "Good";
		} else {
			sValue = "Bad";
		}
		return sValue;
	},
	changeColor: function (sValue) {
		this.removeStyleClass("textGreen textRed");
		if (sValue <= 3) {
			this.addStyleClass("textGreen");
		} else {
			this.addStyleClass("textRed");
		}
		return sValue;
	}
};