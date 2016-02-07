/// <reference path="../../typings/main.d.ts"/>
import j5 = require("johnny-five");

export class FrontArm {
  private bottomServo : j5.Servo;
  private topServo : j5.Servo;

  constructor(bottomServoPin : number, topServoPin : number) {
    this.bottomServo = new j5.Servo({
      pin: bottomServoPin,
      range: [45, 135],
      center: true
    });

    this.topServo = new j5.Servo({
      pin: topServoPin,
      range: [45, 135],
      center: true
    });
  }

  public sweepUpDown() : void {
    this.topServo.sweep();
  }

  public sweepLeftRight() : void {
    this.bottomServo.sweep();
  }
}
