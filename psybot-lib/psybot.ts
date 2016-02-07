/// <reference path="../typings/main.d.ts"/>
import j5 = require("johnny-five");
import psybotMotors = require("./components/motors");

export class Psybot {
  board : j5.Board;
  motors : psybotMotors.Motors;

  constructor() {
      // connected over serial
      var boardOptions = new BoardOptions("/dev/ttyAMA0")
      this.board = new j5.Board();

      var leftPins = new psybotMotors.MotorPins(9, 2, 3);
      var rightPins = new psybotMotors.MotorPins(10, 4, 5);
      this.motors = new psybotMotors.Motors(leftPins, rightPins);
  }
}

class BoardOptions implements j5.BoardOptions {
  constructor (public port : string) { }
}
