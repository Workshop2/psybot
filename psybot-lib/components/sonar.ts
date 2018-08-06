import j5 = require("johnny-five");
import { ProximityData } from "johnny-five";

export class Sonar {
  private minimumDistance : number = 9;
  private sonar : j5.Proximity;
  private _obstacleDetected? : () => void;

  constructor(sonarOptions : j5.ProximityOption) {
    this.sonar = new j5.Proximity(sonarOptions);
    this.sonar.on("data", (proximityData : ProximityData) => {
      console.log("data");
      if(this._obstacleDetected != null) {
        if(proximityData.cm < this.minimumDistance) {
          this._obstacleDetected();
        }
      }
    });
  }

  public setObstacleDetectedCallback(obstacleDetected : () => void) : void {
    console.log("settings");
    this._obstacleDetected = obstacleDetected;
  }
}
