"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require("async");
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    setInterval(function () { return psybot.motors.speed -= 10; }, 1000);
    async.waterfall([
        function (callback) {
            psybot.motors.forward();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.reverse();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.forward();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.reverse();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.brake();
            setTimeout(callback, 200);
        }
    ]);
});
//# sourceMappingURL=slowing-down.js.map