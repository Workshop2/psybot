/// <reference path="../../typings/main.d.ts"/>
import j5 = require("johnny-five");

export class FrontArm {
  private bottomServo : j5.Servo;
  private topServo : j5.Servo;
  private movementSpeed : number = 1000;
  private bottomServoCallback : () => void;
  private topServoCallback : () => void;

  constructor(bottomServoPin : number, topServoPin : number) {
    this.bottomServo = this.createServo(bottomServoPin, this.bottomServoMovementCompleted);
    this.topServo = this.createServo(topServoPin, this.topServoMovementCompleted);
  }

  private createServo(pin : number, callback : () => void) : j5.Servo {
    var servo = new j5.Servo({
      pin: pin,
      range: [45, 135], //TODO: Work out these values
      center: true
    });
    servo.on("move:complete", callback);

    return servo;
  }

  private bottomServoMovementCompleted() : void {
    if(this.bottomServoCallback) {
      this.bottomServoCallback();
      this.bottomServoCallback = null;
    }
  }

  private topServoMovementCompleted() : void {
    if(this.topServoCallback) {
      this.topServoCallback();
      this.topServoCallback = null;
    }
  }

  public sweepUpDown(sweepOptions? : ServoSweepOptions) : void {
    this.stopTop();
    this.topServo.sweep(sweepOptions);
  }

  public sweepLeftRight(sweepOptions? : ServoSweepOptions) : void {
    this.stopBottom();
    this.bottomServo.sweep(sweepOptions);
  }

  public stop() : void {
    this.stopBottom();
    this.stopTop();
  }

  public stopBottom() : void {
    this.bottomServoCallback = null;
    this.bottomServo.stop();
  }

  public stopTop() : void {
    this.topServoCallback = null;
    this.topServo.stop();
  }

  //TODO: Compound event (fire when both have been centered)
  public center() : void {
    this.stop();
    this.bottomServo.center();
    this.topServo.center();
  }

  public faceUp(callback? : () => void) : void {
    this.stopTop();
    this.topServoCallback = callback;
    this.topServo.to(180, this.movementSpeed);
  }

  public faceDown(callback? : () => void) : void {
    this.stopTop();
    this.topServoCallback = callback;
    this.topServo.to(0, this.movementSpeed);
  }

  public faceRight(callback? : () => void) : void {
    this.stopBottom();
    this.bottomServoCallback = callback;
    this.bottomServo.to(180, this.movementSpeed);
  }

  public faceLeft(callback? : () => void) : void {
    this.stopBottom();
    this.bottomServoCallback = callback;
    this.bottomServo.to(0, this.movementSpeed);
  }
}

export class ServoSweepOptions implements j5.ServoSweepOpts {
  constructor(public range: Array<number>, interval? : number) { }
}
