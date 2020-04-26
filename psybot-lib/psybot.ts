import { Sonar } from "./components/sonar";
import { Motors } from "./components/motors";
import { FrontArm } from "./components/frontarm";
import { Board } from "johnny-five";

export class Psybot {
  private armPins = {
    bottomServoPin: 9,
    topServoPin: 10
  }

  private board: Board;

  public static Create(usbConnection: boolean): Promise<Psybot> {
    return new Promise<Psybot>((resolve, reject) => {
      console.log("Connecting to board...");
      const board = usbConnection
        ? new Board()
        : new Board({ port: "/dev/serial0" });

      board.on("ready", async () => {
        console.log("Connected :)");

        var psybot = new Psybot(board);
        psybot.board.repl.inject({ psybot: psybot });

        resolve(psybot);
      });

      board.on("fail", () => {
        console.log("Failed to connect :(");
        reject();
      });
    });
  }

  private constructor(input: boolean | Board) {
    if (input instanceof Board) {
      this.board = input;
    }
    else {
      throw "Expected board to be supplied"
    }
  }

  private _motors: Motors;
  get motors(): Motors {
    if (!this._motors) {
      this._motors = new Motors();
    }

    return this._motors;
  }

  private _frontArm: FrontArm;
  get frontArm(): FrontArm {
    if (!this._frontArm) {
      this._frontArm = new FrontArm(
        this.armPins.bottomServoPin,
        this.armPins.topServoPin);
    }

    return this._frontArm;
  }

  private _sonar: Sonar;
  get sonar(): Sonar {
    if (!this._sonar) {
      this._sonar = new Sonar({
        controller: "GP2Y0A21YK",
        pin: "A0"
      },
      [])
    }

    return this._sonar;
  }
}