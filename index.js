"use strict";
var async = require("async");
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject(psybot);
    async.waterfall([
        function (callback) {
            psybot.motors.forward();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.speed = 50;
            setTimeout(callback, 3000);
        },
        function (callback) {
            psybot.motors.brake();
            setTimeout(callback, 200);
        },
        function (callback) {
            psybot.motors.reverse();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.brake();
            setTimeout(callback, 200);
        },
        function (callback) {
            psybot.motors.left();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.speed = 255;
            setTimeout(callback, 3000);
        },
        function (callback) {
            psybot.motors.brake();
            setTimeout(callback, 200);
        },
        function (callback) {
            psybot.motors.right();
            setTimeout(callback, 5000);
        },
        function (callback) {
            psybot.motors.brake();
            callback();
        }
    ]);
});
