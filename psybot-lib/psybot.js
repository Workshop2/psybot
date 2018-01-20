"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var psybotMotors = require("./components/motors");
var psybotFrontarm = require("./components/frontarm");
var psybotSpeedReader = require("./components/speed-reader");
var johnny_five_1 = require("johnny-five");
var Psybot = /** @class */ (function () {
    function Psybot(usbConnection) {
        if (usbConnection) {
            this.board = new johnny_five_1.Board();
        }
        else {
            // connect over serial
            this.board = new johnny_five_1.Board({ port: "/dev/serial0" });
        }
    }
    Object.defineProperty(Psybot.prototype, "motors", {
        get: function () {
            if (!this._motors) {
                this._motors = new psybotMotors.Motors();
            }
            return this._motors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Psybot.prototype, "frontArm", {
        get: function () {
            if (!this._frontArm) {
                this._frontArm = new psybotFrontarm.FrontArm(9, 10);
            }
            return this._frontArm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Psybot.prototype, "someSensor", {
        get: function () {
            if (!this._someSensor) {
                console.log("Generating sensor...");
                var pin = new psybotSpeedReader.SensorOptions("A5", 5);
                this._someSensor = new psybotSpeedReader.SpeedReader(pin);
            }
            return this._someSensor;
        },
        enumerable: true,
        configurable: true
    });
    return Psybot;
}());
exports.Psybot = Psybot;
//# sourceMappingURL=psybot.js.map