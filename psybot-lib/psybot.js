"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sonar_1 = require("./components/sonar");
const frontarm_1 = require("./components/frontarm");
const johnny_five_1 = require("johnny-five");
const motors_async_1 = require("./components/motors-async");
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
        return new Promise((resolve, reject) => {
            console.log("Connecting to board...");
            let board = usbConnection
                ? new johnny_five_1.Board()
                : new johnny_five_1.Board({ port: "/dev/serial0" });
            board.on("ready", () => __awaiter(this, void 0, void 0, function* () {
                console.log("Connected :)");
                var psybot = new Psybot(board);
                psybot.board.repl.inject({ psybot: psybot });
                yield psybot.frontArm.centerAsync();
                resolve(psybot);
            }));
            board.on("fail", () => {
                console.log("Failed to connect :(");
                reject();
            });
        });
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