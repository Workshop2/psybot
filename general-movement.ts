/// <reference path="./typings/main.d.ts"/>
import j5 = require("johnny-five");
import async = require("async");
import psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');

var psybot = new psybotLib.Psybot(config.settings);

psybot.board.on("ready", function() {
  this.repl.inject({psybot: psybot});
  psybot.frontArm.sweepUpDown();
  psybot.frontArm.sweepLeftRight();

  async.waterfall([
    function(callback) {
        psybot.motors.forward(callback);
    },
    function(callback) {
      setTimeout(callback, 5000);
    },
    function(callback) {
      psybot.motors.speed = 50;
      setTimeout(callback, 3000);
    },
    function(callback) {
        psybot.motors.reverse(callback);
    },
    function(callback) {
      setTimeout(callback, 5000);
    },
    function(callback) {
        psybot.motors.speed = 200;
        psybot.motors.reverse(callback);
    },
    function(callback) {
      setTimeout(callback, 5000);
    },
    function(callback) {
      psybot.motors.right(callback);
    },
    function(callback) {
      setTimeout(callback, 5000);
    },
    function(callback) {
      psybot.motors.speed = 255;
      setTimeout(callback, 1000);
    },
    function(callback) {
      psybot.motors.left(callback);
    },
    function(callback) {
      setTimeout(callback, 5000);
    },
    function(callback) {
      psybot.motors.brake(callback);
    }
  ]);
});
