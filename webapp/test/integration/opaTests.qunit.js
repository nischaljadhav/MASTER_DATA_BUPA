/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/incture/ZINKTHON_SAMPLE2/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});