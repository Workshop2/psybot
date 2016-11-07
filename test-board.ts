/// <reference path="./typings/index.d.ts"/>
import async = require("async");
import j5 = require("johnny-five");
var board;

board = new j5.Board({port: "/dev/ttyAMA0"});

board.on("ready", function() {
  var arm1 = new j5.Servo({
      pin: 14,
      range: [15, 180], //TODO: Work out these values
      center: true
    });

  var arm2 = new j5.Servo({
      pin: 15,
      range: [20, 150], //TODO: Work out these values
      center: true
    });

  async.forever((foreverCallback : () => void) => {
    async.waterfall([
      function(callback) {
        arm1.min();
        setTimeout(callback, 1000);
      },
      function(callback) {
        arm2.min();
        setTimeout(callback, 1000);
      },
      function(callback) {
        arm1.max();
        setTimeout(callback, 1000);
      },
      function(callback) {
        arm2.max();
        setTimeout(callback, 1000);
      },
      function(callback) {
        arm2.center();
        arm1.center();
        setTimeout(callback, 1000);
      }
    ], () => foreverCallback());
  }, () => {});

});