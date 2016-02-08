/// <reference path="../typings/main.d.ts"/>
import j5 = require("johnny-five");
import psybotMotors = require("./components/motors");
import psybotFrontarm = require("./components/frontarm");

export class Psybot {
  board : j5.Board;

  constructor(usbConnection : boolean) {
      if(usbConnection) {
        this.board = new j5.Board();
      }
      else {
        var boardOptions = new BoardOptions("/dev/ttyAMA0"); // connect over serial
        this.board = new j5.Board(boardOptions);
      }
  }

  private _motors : psybotMotors.Motors;
  get motors() : psybotMotors.Motors {
    if(!this._motors) {
      // can't use pins 9 & 10 when using servos for PMW
      // https://github.com/rwaldron/johnny-five/issues/309
      var leftPins = new psybotMotors.MotorPins(6, 2, 3);
      var rightPins = new psybotMotors.MotorPins(11, 4, 5);
      this._motors = new psybotMotors.Motors(leftPins, rightPins);
    }

    return this._motors;
  }

  private _frontArm : psybotFrontarm.FrontArm;
  get frontArm() : psybotFrontarm.FrontArm {
    if(!this._frontArm) {
      this._frontArm = new psybotFrontarm.FrontArm(14, 15);
    }

    return this._frontArm;
  }
}

class BoardOptions implements j5.BoardOptions {
  constructor (public port : string) { }
}
