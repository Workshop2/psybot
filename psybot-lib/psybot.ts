import psybotMotors = require("./components/motors");
import psybotFrontarm = require("./components/frontarm");
import { Sonar } from "./components/sonar";
import { Motors } from "./components/motors";
import { FrontArm } from "./components/frontarm";
import { Board } from "johnny-five";
import { MotorsAsync } from "./components/motors-async";
import { Promise } from "q";
import * as Q from "q";

export class Psybot {
  //TODO: Make private
  board : Board;

  public static Create(usbConnection : boolean) : Promise<Psybot> 
  {
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

  private _motors : Motors;
  get motors() : Motors {
    if(!this._motors) {
      this._motors = new Motors();
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

  private _frontArm : FrontArm;
  get frontArm() : FrontArm {
    if(!this._frontArm) {
      this._frontArm = new FrontArm(9, 10);
    }

    return this._frontArm;
  }

  private _sonar : Sonar;
  get sonar() : Sonar {
    if(!this._sonar) {
      this._sonar = new Sonar({
        controller: "GP2Y0A21YK",
        pin: "A0"})
    }

    return this._sonar;
  }
}