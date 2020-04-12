"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sonar_1 = require("./components/sonar");
const motors_1 = require("./components/motors");
const frontarm_1 = require("./components/frontarm");
const johnny_five_1 = require("johnny-five");
const motors_async_1 = require("./components/motors-async");
const Q = require("q");
class Psybot {
    constructor(input) {
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
    static Create(usbConnection) {
        var deferred = Q.defer();
        console.log("Connecting to board...");
        let board = usbConnection
            ? new johnny_five_1.Board()
            : new johnny_five_1.Board({ port: "/dev/serial0" });
        board.on("ready", () => {
            console.log("Connected :)");
            var psybot = new Psybot(board);
            psybot.board.repl.inject({ psybot: psybot });
            psybot.frontArm.center();
            deferred.resolve(psybot);
        });
        board.on("fail", () => {
            console.log("Failed to connect :(");
            deferred.reject();
        });
        return deferred.promise;
    }
    get motors() {
        if (!this._motors) {
            this._motors = new motors_1.Motors();
        }
        return this._motors;
    }
    get motorsAsync() {
        if (!this._motorsAsync) {
            this._motorsAsync = new motors_async_1.MotorsAsync();
        }
        return this._motorsAsync;
    }
    get frontArm() {
        if (!this._frontArm) {
            this._frontArm = new frontarm_1.FrontArm(9, 10);
        }
        return this._frontArm;
    }
    get sonar() {
        if (!this._sonar) {
            this._sonar = new sonar_1.Sonar({
                controller: "GP2Y0A21YK",
                pin: "A0"
            });
        }
        return this._sonar;
    }
}
exports.Psybot = Psybot;
//# sourceMappingURL=psybot.js.map