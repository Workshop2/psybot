"use strict";
var async = require("async");
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    async.forever(function (foreverCallback) {
        async.waterfall([
            function (callback) {
                psybot.frontArm.faceUp(function () { setTimeout(callback, 3000); });
            },
            function (callback) {
                psybot.frontArm.faceDown(function () { setTimeout(callback, 3000); });
            }
        ], function () { return foreverCallback(); });
    }, function () { });
});
