"use strict";
var async = require("async");
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    async.waterfall([
        function (callback) {
            psybot.motors.speed = 200;
            psybot.motors.forward(callback);
        },
        function (callback) {
            setTimeout(callback, 30000);
        },
        function (callback) {
            psybot.motors.brake(callback);
        }
    ]);
});
