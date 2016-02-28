"use strict";
var async = require("async");
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    var dummy = psybot.someSensor;
    async.waterfall([
        function (callback) {
            psybot.motors.forward();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.brake(callback);
        }
    ]);
});
