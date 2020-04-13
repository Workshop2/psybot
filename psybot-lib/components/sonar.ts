import j5 = require("johnny-five");
import { ProximityData } from "johnny-five";

export class Sonar {
  private minimumDistance: number = 20;
  private sonar: j5.Proximity;
  private _onObstacleDetected?: () => void;

  constructor(sonarOptions: j5.ProximityOption) {
    this.sonar = new j5.Proximity(sonarOptions);

    this.sonar
      .on("data", (proximityData: ProximityData) => {
        this._obstacleDetected = proximityData.cm < this.minimumDistance;

        if (this._obstacleDetected) {
          if (this._onObstacleDetected != null) {
            this._onObstacleDetected();
          }
        }
      });
  }

  public setObstacleDetectedCallback(obstacleDetected: () => void): void {
    this._onObstacleDetected = obstacleDetected;
  }

  private _obstacleDetected: boolean;
  public get obstacleDetected(): boolean {
    return this._obstacleDetected;
  }
}
