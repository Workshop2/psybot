"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var j5 = require("johnny-five");
var Sonar = /** @class */ (function () {
    function Sonar(sonarOptions) {
        var _this = this;
        this.minimumDistance = 9;
        this.sonar = new j5.Proximity(sonarOptions);
        this.sonar.on("data", function (proximityData) {
            console.log("data");
            if (_this._obstacleDetected != null) {
                if (proximityData.cm < _this.minimumDistance) {
                    _this._obstacleDetected();
                }
            }
        });
    }
    Sonar.prototype.setObstacleDetectedCallback = function (obstacleDetected) {
        console.log("settings");
        this._obstacleDetected = obstacleDetected;
    };
    return Sonar;
}());
exports.Sonar = Sonar;
//# sourceMappingURL=sonar.js.map