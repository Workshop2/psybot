"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var j5 = require("johnny-five");
var Sonar = /** @class */ (function () {
    function Sonar(sonarOptions) {
        this.sonarOptions = sonarOptions;
        this.sonar = new j5.Sonar(sonarOptions);
    }
    return Sonar;
}());
exports.Sonar = Sonar;
var SonarOptions = /** @class */ (function () {
    function SonarOptions(pin, device) {
        this.pin = pin;
        this.device = device;
    }
    return SonarOptions;
}());
exports.SonarOptions = SonarOptions;
//# sourceMappingURL=sonar.js.map