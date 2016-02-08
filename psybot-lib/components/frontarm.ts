/// <reference path="../../typings/main.d.ts"/>
import j5 = require("johnny-five");

export class FrontArm {
  private bottomServo : j5.Servo;
  private topServo : j5.Servo;

  constructor(bottomServoPin : number, topServoPin : number) {
    this.bottomServo = this.createServo(bottomServoPin);
    this.topServo = this.createServo(topServoPin);
  }

  private createServo(pin : number) : j5.Servo {
    return new j5.Servo({
      pin: pin,
      range: [45, 135], //TODO: Work out these values
      center: true
    });
  }

  public sweepUpDown(sweepOptions? : ServoSweepOptions) : void {
    this.topServo.sweep(sweepOptions);
  }

  public sweepLeftRight(sweepOptions? : ServoSweepOptions) : void {
    this.bottomServo.sweep(sweepOptions);
  }

  public stop() : void {
    this.bottomServo.stop();
    this.topServo.stop();
  }

  public center() : void {
    this.bottomServo.center();
    this.topServo.center();
  }

  public faceUp() : void {

  }

  public faceDown() : void {

  }

  public faceRight() : void {

  }

  public faceLeft() : void {

  }
}

export class ServoSweepOptions implements j5.ServoSweepOpts {
  constructor(public range: Array<number>, interval? : number) { }
}
