"use strict";
var async = require("async");
var psybotLib = require("./psybot-lib/psybot");
var psybot = new psybotLib.Psybot();
psybot.board.on("ready", function () {
    async.waterfall([
        function (callback) {
            psybot.motors.forward(255);
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.brake();
            setTimeout(callback, 200);
        },
        function (callback) {
            psybot.motors.left(255);
            setTimeout(callback, 5000);
        }]);
});
