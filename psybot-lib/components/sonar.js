"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const j5 = require("johnny-five");
class Sonar {
    constructor(sonarOptions) {
        this.minimumDistance = 20;
        this.sonar = new j5.Proximity(sonarOptions);
        this.sonar.on("data", (proximityData) => {
            //console.log("data");
            if (this._obstacleDetected != null) {
                if (proximityData.cm < this.minimumDistance) {
                    this._obstacleDetected();
                }
            }
        });
    }
    setObstacleDetectedCallback(obstacleDetected) {
        console.log("settings");
        this._obstacleDetected = obstacleDetected;
    }
}
exports.Sonar = Sonar;
//# sourceMappingURL=sonar.js.map