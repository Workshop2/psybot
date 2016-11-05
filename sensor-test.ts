/// <reference path="./typings/main.d.ts"/>
import j5 = require("johnny-five");
import async = require("async");
import psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');

var psybot = new psybotLib.Psybot(config.settings.usbConnection);

psybot.board.on("ready", function() {
  this.repl.inject({psybot: psybot});
  //var dummy = psybot.someSensor;

  this.pinMode(12, j5.Pin.INPUT);
  this.digitalRead(12, function(value) {
    console.log("SC: " + value);
  });

  async.waterfall([
    function(callback) {
      setTimeout(callback, 2000);
    },
      function(callback) {
        psybot.motors.forward();
        setTimeout(callback, 2000);
      },
    function(callback) {
      psybot.motors.brake(callback);
    }
  ]);
});
