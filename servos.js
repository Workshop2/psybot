"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    psybot.frontArm.center();
    // async.forever((foreverCallback : () => void) => {
    //   async.waterfall([
    //     function(callback) {
    //       psybot.frontArm.faceUp(callback);
    //     },
    //     function(callback) {
    //       psybot.frontArm.faceDown(callback);
    //     },
    //     function(callback) {
    //       psybot.frontArm.faceLeft(callback);
    //     },
    //     function(callback) {
    //       psybot.frontArm.faceRight(callback);
    //     },
    //     function(callback) {
    //       psybot.frontArm.center(callback);
    //     }
    //   ], () => foreverCallback());
    // }, () => {});
});
//# sourceMappingURL=servos.js.map