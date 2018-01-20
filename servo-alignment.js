"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var psybotLib = require("./psybot-lib/psybot");
var johnny_five_1 = require("johnny-five");
var config = require('./config/config');
var argv = require('yargs').argv;
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    var min = argv.min || 0;
    var max = argv.max || 180;
    console.log("Min = " + min);
    console.log("Max = " + max);
    var servo = new johnny_five_1.Servo({
        pin: 9,
        range: [min, max],
        center: true
    });
    servo.min();
});
//# sourceMappingURL=servo-alignment.js.map