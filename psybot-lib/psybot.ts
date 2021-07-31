import { Sonar } from "./components/sonar";
import { Motors } from "./components/motors";
import { FrontArm } from "./components/frontarm";
import { Board } from "johnny-five";
import { MovementSensors } from "./components/movementSensors";
import { BNO055, OpMode, DeviceAddress } from '@workshop2/bno055-imu-node';
import fs from 'fs';
import delay from "./delay";

export class Psybot {
  private static armPins = {
    bottomServoPin: 9,
    topServoPin: 10
  };

  private static sensorBusNumber: number = 3;

  private board: Board;

  public static Create(usbConnection: boolean): Promise<Psybot> {
    return new Promise<Psybot>((resolve, reject) => {
      console.log("Connecting to board...");
      const board = usbConnection
        ? new Board()
        : new Board({ port: "/dev/serial0" });

      board.on("ready", async () => {
        console.log("Connected :)");
        const movementSensors = await this.getAndCalibrateSensor(this.sensorBusNumber);

        var psybot = new Psybot(board, movementSensors);
        psybot.board.repl.inject({ psybot: psybot });

        resolve(psybot);
      });

      board.on("fail", () => {
        console.log("Failed to connect :(");
        reject();
      });
    });
  }

  private static async getAndCalibrateSensor(busNumber: number) : Promise<MovementSensors> {
    console.log("Getting access to the movement sensor...");
    const imu = await BNO055.begin(DeviceAddress.A, OpMode.FullFusion, busNumber);
    await imu.resetSystem();
    
    const offsetsPath = "./offsets.json";
    
    if(fs.existsSync(offsetsPath)) {
      console.log("Reading offsets from disk,", offsetsPath);
      const data = fs.readFileSync(offsetsPath, {encoding: 'utf8', flag: 'r'});

      const data2 = JSON.parse(data.toString());
      console.log(data2);
      
      console.log("Running setSensorOffsets....");
      await imu.setSensorOffsets(data2);
      console.log("Done?!");
    }

    let calibrated = false;
    while(!calibrated) {
        await delay(3333);
        console.log('calibration: ', await imu.getCalibrationStatuses());

        calibrated = await imu.isFullyCalibrated();
        console.log('is calibrated: ', calibrated);

        const offsets = await imu.getSensorOffsets();
        console.log('offsets: ', offsets);

        if(calibrated) {
          console.log("Storing offsets to disk", offsetsPath, offsets);
          const data = JSON.stringify(offsets);
          fs.writeFileSync(offsetsPath, data);
        }
    }

    return new MovementSensors(imu);
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
      await this.motors.brakeAsync();
      await this.frontArm.centerAsync();
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