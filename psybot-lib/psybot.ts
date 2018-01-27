import psybotMotors = require("./components/motors");
import psybotFrontarm = require("./components/frontarm");
import psybotSpeedReader = require("./components/speed-reader");
import { Board } from "johnny-five";
import { MotorsAsync } from "./components/motors-async";
import { Promise } from "q";
import * as Q from "q";

export class Psybot {
  //TODO: Make private
  board : Board;

  public static Create(usbConnection : boolean) : Promise<Psybot> {
    var deferred = Q.defer<Psybot>();

    console.log("Connecting to board...");
    let board = usbConnection 
      ? new Board() 
      : new Board({ port: "/dev/serial0" });
      
    board.on("ready", () => {
      console.log("Connected :)");

      var psybot = new Psybot(board);   
      psybot.board.repl.inject({psybot: psybot});
      psybot.frontArm.center();

      deferred.resolve(psybot);
    });

    board.on("fail", () => { 
      console.log("Failed to connect :(");
      deferred.reject();
    });

    return deferred.promise;
  }

  constructor(input : boolean | Board) {
    if(input instanceof Board) {
      this.board = input;
    }
    else {
      // TODO: Remove
      if(input) {
        this.board = new Board();
      }
      else { 
        this.board = new Board({ port: "/dev/serial0" });
      }
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