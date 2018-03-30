"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sonar_1 = require("./components/sonar");
var motors_1 = require("./components/motors");
var frontarm_1 = require("./components/frontarm");
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
            psybot.board.repl.inject({ psybot: psybot });
            psybot.frontArm.center();
            deferred.resolve(psybot);
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
                this._motors = new motors_1.Motors();
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
                this._frontArm = new frontarm_1.FrontArm(9, 10);
            }
            return this._frontArm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Psybot.prototype, "sonar", {
        get: function () {
            if (!this._sonar) {
                this._sonar = new sonar_1.Sonar({
                    controller: "GP2Y0A21YK",
                    pin: "A0"
                });
            }
            return this._sonar;
        },
        enumerable: true,
        configurable: true
    });
    return Psybot;
}());
exports.Psybot = Psybot;
//# sourceMappingURL=psybot.js.map