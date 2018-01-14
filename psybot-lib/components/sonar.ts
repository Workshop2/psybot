import j5 = require("johnny-five");

export class Sonar {
  private sonar : j5.Sonar;

  constructor(private sonarOptions : SonarOptions) {
    this.sonar = new j5.Sonar(sonarOptions);
  }
}

export class SonarOptions implements j5.SonarOption {
  constructor(public pin: number, public device: string) { }
}
