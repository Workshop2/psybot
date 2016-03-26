/// <reference path="./typings/main.d.ts"/>
import j5 = require("johnny-five");
import async = require("async");
import psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');

var psybot = new psybotLib.Psybot(config.settings);

psybot.board.on("ready", function() {
  this.repl.inject({psybot: psybot});

  async.forever((foreverCallback : () => void) => {
    async.waterfall([
      function(callback) {
        psybot.frontArm.faceUp(() => {setTimeout(callback, 3000);});
      },
      function(callback) {
        psybot.frontArm.faceDown(() => {setTimeout(callback, 3000);});
      }/*,
      function(callback) {
        psybot.frontArm.faceLeft(callback);
      },
      function(callback) {
        psybot.frontArm.faceRight(callback);
      },
      function(callback) {
        psybot.frontArm.center(callback);
      }*/
    ], () => foreverCallback());
  }, () => {});
});
