import { Sonar } from "./components/sonar";
import { Motors } from "./components/motors";
import { FrontArm } from "./components/frontarm";
import { Board } from "johnny-five";
import { MovementSensors } from "./components/movementSensors";

export class Psybot {
  private static armPins = {
    bottomServoPin: 9,
    topServoPin: 10
  };

  private static sensorBusNumber: number = 3;

  private board: Board;

  public static Create(usbConnection: boolean): Promise<Psybot> {
    return new Promise<Psybot>((resolve, reject) => {
      try {
        const movementSensorsTask = MovementSensors.Create(this.sensorBusNumber);
        
        console.log("Connecting to board...");
        const board = usbConnection
          ? new Board()
          : new Board({ port: "/dev/serial0" });

        board.on("ready", async () => {
          console.log("Connected :)");
          const movementSensors = await movementSensorsTask;

          var psybot = new Psybot(board, movementSensors);
          psybot.board.repl.inject({ psybot: psybot });

          resolve(psybot);
        });

        board.on("fail", () => {
          console.log("Failed to connect :(");
          reject();
        });

      } catch (error) {
          console.log("Failed to connect :(");
          reject();
      }
    });
  }

  private constructor(board: Board, movementSensors: MovementSensors) {
    if (board instanceof Board) {
      this.board = board;
    }
    else {
      throw "Expected board to be supplied"
    }

    this._movementSensors = movementSensors;

    this.board.on("exit", async () => {
      await this.motors.dispose();
      await this.frontArm.dispose();
      await this._movementSensors.dispose();
    });
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
        Psybot.armPins.bottomServoPin);
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

  private _movementSensors: MovementSensors;
  get movementSensors(): MovementSensors {
    return this._movementSensors;
  }
}