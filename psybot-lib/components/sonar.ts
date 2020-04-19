import j5 = require("johnny-five");
import { ProximityData } from "johnny-five";
import delay from "../delay"

export class Sonar {
  private readonly _minimumDistance: number = 20;
  private readonly _sonar: j5.Proximity;
  private readonly _bumpers: Array<j5.Pin>;
  private _onObstacleDetected?: () => void;

  constructor(sonarOptions: j5.ProximityOption, bumperPins: Array<string>) {
    this._sonar = new j5.Proximity(sonarOptions);

    this._sonar
      .on("data", (proximityData: ProximityData) => {
        this._obstacleDetected = proximityData.cm < this._minimumDistance;

        if (this._obstacleDetected && this._onObstacleDetected) {
          this._onObstacleDetected();
        }
      });
    
    this._bumpers = [];
    for (let i = 0; i < bumperPins.length; i++) {
      const pin = new j5.Pin(bumperPins[i]);
      this._bumpers.push(pin);
      
      pin.on("data", (data) => {
        if(data > 100) {
          return;
        }

        console.log("bumper colision detected!");
        if (this._onObstacleDetected) {
          this._onObstacleDetected();
        }
      });
    }
  }

  public setObstacleDetectedCallback(obstacleDetected: () => void): void {
    this._onObstacleDetected = obstacleDetected;
  }

  private _obstacleDetected: boolean = undefined;
  public async waitForSensorData(): Promise<SensorState> {
    await delay(200);
    this._obstacleDetected = undefined;

    while (this._obstacleDetected === undefined) {
      console.log("waiting for sensor data...");
      await delay(5);
    }

    return this._obstacleDetected
      ? SensorState.ObstacleDetected
      : SensorState.NothingDetected;
  }
}

export enum SensorState {
  NothingDetected,
  ObstacleDetected
}
