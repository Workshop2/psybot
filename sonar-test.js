"use strict";
var j5 = require("johnny-five");
var psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');
var psybot = new psybotLib.Psybot(config.settings.usbConnection);
psybot.board.on("ready", function () {
    this.repl.inject({ psybot: psybot });
    var proximity = new j5.Proximity({
        controller: "HCSR04",
        pin: 12
    });
    proximity.on("data", function () {
        console.log("inches: ", this.inches);
        console.log("cm: ", this.cm);
    });
});
