/// <reference path="../typings/main.d.ts"/>
import j5 = require("johnny-five");
import psybotMotors = require("./components/motors");

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
      var leftPins = new psybotMotors.MotorPins(9, 2, 3);
      var rightPins = new psybotMotors.MotorPins(10, 4, 5);
      this._motors = new psybotMotors.Motors(leftPins, rightPins);
    }

    return this._motors;
  }
}

class BoardOptions implements j5.BoardOptions {
  constructor (public port : string) { }
}
