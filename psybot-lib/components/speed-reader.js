"use strict";
var j5 = require("johnny-five");
var SpeedReader = (function () {
    function SpeedReader(sensorOptions) {
        this.sensorOptions = sensorOptions;
        this.sensor = new j5.Sensor(sensorOptions);
        this.sensor.on("change", function () {
            console.log("test: " + this.value);
        });
    }
    return SpeedReader;
}());
exports.SpeedReader = SpeedReader;
var SensorOptions = (function () {
    function SensorOptions(pin, type, threshold) {
        this.pin = pin;
        this.type = type;
        this.threshold = threshold;
    }
    return SensorOptions;
}());
exports.SensorOptions = SensorOptions;
