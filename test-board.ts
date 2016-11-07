/// <reference path="./typings/index.d.ts"/>
import async = require("async");
import j5 = require("johnny-five");
import psybotMotors = require("./psybot-lib/components/motors");

var board = new j5.Board({port: "/dev/ttyAMA0"});

board.on("ready", function() {
  var panServo = new j5.Servo({
      pin: 14,
      range: [15, 180], //TODO: Work out these values
      center: true
    });

  var tiltServo = new j5.Servo({
      pin: 15,
      range: [20, 150], //TODO: Work out these values
      center: true
    });

  var leftPins = new psybotMotors.MotorPins(6, 2, 3);
  var leftMotor = new j5.Motor(new psybotMotors.MotorOptions(leftPins));

  var rightPins = new psybotMotors.MotorPins(11, 4, 5);
  var rightMotor = new j5.Motor(new psybotMotors.MotorOptions(rightPins));

  async.forever((foreverCallback : () => void) => {
    async.waterfall([
      function(callback) {
        panServo.min();
        leftMotor.forward(200);
        setTimeout(callback, 1000);
      },
      function(callback) {
        tiltServo.min();
        rightMotor.forward(200);
        setTimeout(callback, 1000);
      },
      function(callback) {
        panServo.max();
        leftMotor.stop();
        rightMotor.stop();
        setTimeout(callback, 1000);
      },
      function(callback) {
        tiltServo.max();
        leftMotor.reverse(200);
        rightMotor.reverse(200);
        setTimeout(callback, 1000);
      },
      function(callback) {
        tiltServo.center();
        panServo.center();
        leftMotor.stop();
        rightMotor.stop();
        setTimeout(callback, 1000);
      }
    ], () => foreverCallback());
  }, () => {});

});