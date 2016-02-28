"use strict";
var j5 = require("johnny-five");
var SpeedReader = (function () {
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
var SensorOptions = (function () {
    function SensorOptions(pin, threshold) {
        this.pin = pin;
        this.threshold = threshold;
    }
    return SensorOptions;
}());
exports.SensorOptions = SensorOptions;
