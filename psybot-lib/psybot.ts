import psybotMotors = require("./components/motors");
import psybotFrontarm = require("./components/frontarm");
import psybotSpeedReader = require("./components/speed-reader");
import { Board } from "johnny-five";
import { MotorsAsync } from "./components/motors-async";
import { Promise } from "q";
import * as Q from "q";

export class Psybot {
  board : Board;

  public static Create(usbConnection : boolean) : Promise<Psybot> {
    var deferred = Q.defer<Psybot>();
    var psybot = new Psybot(usbConnection);
    
    psybot.board.on("ready", () => deferred.resolve(psybot));
    psybot.board.on("fail", () => deferred.reject());

    return deferred.promise;
  }

  constructor(usbConnection : boolean) {
      if(usbConnection) {
        this.board = new Board();
      }
      else { 
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

  private _motorsAsync : MotorsAsync;
  get motorsAsync() : MotorsAsync {
    if(!this._motorsAsync) {
      this._motorsAsync = new MotorsAsync();
    }

    return this._motorsAsync;
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