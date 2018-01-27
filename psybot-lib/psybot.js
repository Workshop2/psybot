"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var psybotMotors = require("./components/motors");
var psybotFrontarm = require("./components/frontarm");
var psybotSpeedReader = require("./components/speed-reader");
var johnny_five_1 = require("johnny-five");
var motors_async_1 = require("./components/motors-async");
var Q = require("q");
var Psybot = /** @class */ (function () {
    function Psybot(input) {
        if (input instanceof johnny_five_1.Board) {
            this.board = input;
        }
        else {
            // TODO: Remove
            if (input) {
                this.board = new johnny_five_1.Board();
            }
            else {
                this.board = new johnny_five_1.Board({ port: "/dev/serial0" });
            }
        }
    }
    Psybot.Create = function (usbConnection) {
        var deferred = Q.defer();
        console.log("Connecting to board...");
        var board = usbConnection
            ? new johnny_five_1.Board()
            : new johnny_five_1.Board({ port: "/dev/serial0" });
        board.on("ready", function () {
            console.log("Connected :)");
            var psybot = new Psybot(board);
            deferred.resolve(psybot);
            psybot.board.repl.inject({ psybot: psybot });
            psybot.frontArm.center();
        });
        board.on("fail", function () {
            console.log("Failed to connect :(");
            deferred.reject();
        });
        return deferred.promise;
    };
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
    Object.defineProperty(Psybot.prototype, "motorsAsync", {
        get: function () {
            if (!this._motorsAsync) {
                this._motorsAsync = new motors_async_1.MotorsAsync();
            }
            return this._motorsAsync;
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