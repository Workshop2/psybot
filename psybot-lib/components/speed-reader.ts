/// <reference path="../../typings/index.d.ts"/>
import j5 = require("johnny-five");

export class SpeedReader {
  private sensor : j5.Sensor;

  constructor(private sensorOptions : SensorOptions) {
    this.sensor = new j5.Sensor(sensorOptions);
    this.sensor.on("data", (data : any) => {
      console.log("Data: " + data);
    });
  }
}

export class SensorOptions implements j5.SensorOption {
  constructor(public pin: string, public threshold?: number) { }
}
