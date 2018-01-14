"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require("async");
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    psybot.motors.speed = 200;
    async.waterfall([
        function (callback) {
            psybot.motors.forward(callback);
        },
        function (callback) {
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.reverse(callback);
        },
        function (callback) {
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.forward(callback);
        },
        function (callback) {
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.reverse(callback);
        },
        function (callback) {
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.brake(callback);
        }
    ]);
});
//# sourceMappingURL=motor-test.js.map