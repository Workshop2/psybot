/// <reference path="./typings/index.d.ts"/>
import j5 = require("johnny-five");
import async = require("async");
import psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');

var psybot = new psybotLib.Psybot(config.settings.usbConnection);

psybot.board.on("ready", function() {
  this.repl.inject({psybot: psybot});

  async.forever((foreverCallback : () => void) => {
    async.waterfall([
      function(callback) {
        psybot.frontArm.faceUp(callback);
      },
      function(callback) {
        psybot.frontArm.faceDown(callback);
      },
      function(callback) {
        psybot.frontArm.faceLeft(callback);
      },
      function(callback) {
        psybot.frontArm.faceRight(callback);
      },
      function(callback) {
        psybot.frontArm.center(callback);
      }
    ], () => foreverCallback());
  }, () => {});
});
