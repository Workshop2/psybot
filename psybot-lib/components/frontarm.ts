/// <reference path="../../typings/index.d.ts"/>
import j5 = require("johnny-five");

export class FrontArm {
  private bottomServo : j5.Servo;
  private topServo : j5.Servo;
  private movementSpeed : number = 800;
  private stopTimeout: number = 100;

  constructor(bottomServoPin : number, topServoPin : number) {
    this.bottomServo = new j5.Servo({
      pin: bottomServoPin,
      range: [15, 180], //TODO: Work out these values
      center: true
    });

    this.topServo = new j5.Servo({
      pin: topServoPin,
      range: [20, 150], //TODO: Work out these values
      center: true
    });
  }

  public sweepUpDown(sweepOptions? : ServoSweepOptions) : void {
    this.stopTop();
    this.topServo.sweep(sweepOptions);
  }

  public sweepLeftRight(sweepOptions? : ServoSweepOptions) : void {
    this.stopBottom();
    this.bottomServo.sweep(sweepOptions);
  }

  public stop(callback? : () => void) : void {
    this.stopBottom();
    this.stopTop();

    if(callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }

  public stopBottom(callback? : () => void) : void {
    console.log("stopBottom");
    this.bottomServo.stop();

    if(callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }

  public stopTop(callback? : () => void) : void {
    console.log("stopTop");
    this.topServo.stop();

    if(callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }

  // based on trust that the callbacks work...
  public center(callback? : () => void) : void {
    this.stop();

    this.bottomServo.center();
    this.topServo.center();
    setTimeout(() => { this.stop(); callback(); }, this.movementSpeed);
  }

  public faceUp(callback? : () => void) : void {
    this.stopTop(() => {
      console.log("faceUp");
      this.topServo.min();
      setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
    });
  }

  public faceDown(callback? : () => void) : void {
    this.stopTop(() => {
      console.log("faceDown");
      this.topServo.max();
      setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
    });
  }

  public faceRight(callback? : () => void) : void {
    this.stopBottom(() => {
      console.log("faceRight");
      this.bottomServo.min();
      setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
    });
  }

  public faceLeft(callback? : () => void) : void {
    this.stopBottom(() => {
      console.log("faceLeft");
      this.bottomServo.max();
      setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
    });
  }
}

export class ServoSweepOptions implements j5.ServoSweepOpts {
  constructor(public range: Array<number>, interval? : number) { }
}
