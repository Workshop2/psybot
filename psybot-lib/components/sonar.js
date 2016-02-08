"use strict";
var j5 = require("johnny-five");
var Sonar = (function () {
    function Sonar(sonarOptions) {
        this.sonarOptions = sonarOptions;
        this.sonar = new j5.Sonar(sonarOptions);
    }
    return Sonar;
}());
exports.Sonar = Sonar;
var SonarOptions = (function () {
    function SonarOptions(pin, device) {
        this.pin = pin;
        this.device = device;
    }
    return SonarOptions;
}());
exports.SonarOptions = SonarOptions;
