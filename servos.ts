/// <reference path="./typings/main.d.ts"/>
import j5 = require("johnny-five");
import async = require("async");
import psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');

var psybot = new psybotLib.Psybot(config.settings.usbConnection);

psybot.board.on("ready", function() {
  this.repl.inject({psybot: psybot});

  psybot.frontArm.center();

  psybot.frontArm.sweepUpDown();
  psybot.frontArm.sweepLeftRight();

  /*async.waterfall([
    function(callback) {
        setTimeout(callback, 5000);
    }
  ]);*/
});
