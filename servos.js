"use strict";
var async = require("async");
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    async.forever(function (foreverCallback) {
        async.waterfall([
            function (callback) {
                psybot.frontArm.faceUp(callback);
            },
            function (callback) {
                psybot.frontArm.faceDown(callback);
            },
            function (callback) {
                psybot.frontArm.faceLeft(callback);
            },
            function (callback) {
                psybot.frontArm.faceRight(callback);
            },
            function (callback) {
                psybot.frontArm.center(callback);
            }
        ], function () { return foreverCallback(); });
    }, function () { });
});
