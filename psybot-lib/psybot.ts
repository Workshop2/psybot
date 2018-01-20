import psybotMotors = require("./components/motors");
import psybotFrontarm = require("./components/frontarm");
import psybotSpeedReader = require("./components/speed-reader");
import { Board } from "johnny-five";

export class Psybot {
  board : Board;

  constructor(usbConnection : boolean) {
      if(usbConnection) {
        this.board = new Board();
      }
      else { 
        // connect over serial
        this.board = new Board({ port: "/dev/serial0" });
      }
  }

  private _motors : psybotMotors.Motors;
  get motors() : psybotMotors.Motors {
    if(!this._motors) {
      this._motors = new psybotMotors.Motors();
    }

    return this._motors;
  }

  private _frontArm : psybotFrontarm.FrontArm;
  get frontArm() : psybotFrontarm.FrontArm {
    if(!this._frontArm) {
      this._frontArm = new psybotFrontarm.FrontArm(9, 10);
    }

    return this._frontArm;
  }

  private _someSensor : psybotSpeedReader.SpeedReader
  get someSensor() : psybotSpeedReader.SpeedReader {
    if(!this._someSensor) {
      console.log("Generating sensor...")
      var pin = new psybotSpeedReader.SensorOptions("A5", 5);
      this._someSensor = new psybotSpeedReader.SpeedReader(pin);
    }

    return this._someSensor;
  }
}