"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var j5 = require("johnny-five");
var SpeedReader = /** @class */ (function () {
    function SpeedReader(sensorOptions) {
        this.sensorOptions = sensorOptions;
        this.sensor = new j5.Sensor(sensorOptions);
        this.sensor.on("data", function (data) {
            console.log("Data: " + data);
        });
    }
    return SpeedReader;
}());
exports.SpeedReader = SpeedReader;
var SensorOptions = /** @class */ (function () {
    function SensorOptions(pin, threshold) {
        this.pin = pin;
        this.threshold = threshold;
    }
    return SensorOptions;
}());
exports.SensorOptions = SensorOptions;
//# sourceMappingURL=speed-reader.js.map