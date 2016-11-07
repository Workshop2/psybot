/// <reference path="../../typings/index.d.ts"/>
import j5 = require("johnny-five");

export class Motors {
    private leftMotor : j5.Motor;
    private rightMotor : j5.Motor;
    private lastOperation : () => void;
    private minSpeed : number = 140;
    private maxSpeed : number = 255;
    private operationCooldown : number = 50;

    constructor (leftPins: MotorPins, rightPins: MotorPins) {
      console.log("Initialising motors...");
      this.leftMotor = new j5.Motor(new MotorOptions(leftPins));
      this.rightMotor = new j5.Motor(new MotorOptions(rightPins));
      console.log("Done!");

      this.speed = this.maxSpeed;
    }

    forward(callback?: () => void) : void {
      var hasAlreadyCalledBack : boolean = false;

      this.runOperation(() => {
        console.log("Moving forward");
        this.leftMotor.forward(this.speed);
        this.rightMotor.forward(this.speed);

        if(callback && !hasAlreadyCalledBack) {
          console.log("Forward callback()...")
          hasAlreadyCalledBack = true;
          callback();
        }
      });
    }

    reverse(callback?: () => void) : void {
      var hasAlreadyCalledBack : boolean = false;

      this.runOperation(() => {
        console.log("Moving backwards");
        this.leftMotor.reverse(this.speed);
        this.rightMotor.reverse(this.speed);

        if(callback && !hasAlreadyCalledBack) {
          console.log("Reverse callback()...")
          hasAlreadyCalledBack = true;
          callback();
        }
      });
    }

    brake(callback?: () => void) : void {
      console.log("Braking");

      this.leftMotor.brake();
      this.rightMotor.brake();
      this.lastOperation = null;

      if(callback) {
        setTimeout(callback, this.operationCooldown);
      }
    }

    left(callback?: () => void) : void {
      var hasAlreadyCalledBack : boolean = false;

      this.runOperation(() => {
        console.log("Turning left");
        this.leftMotor.reverse(this.maxSpeed);
        this.rightMotor.forward(this.maxSpeed);

        if(callback && !hasAlreadyCalledBack) {
          console.log("Left callback()...")
          hasAlreadyCalledBack = true;
          callback();
        }
      });
    }

    right(callback?: () => void) : void {
      var hasAlreadyCalledBack : boolean = false;

      this.runOperation(() => {
        console.log("Turning right");
        this.leftMotor.forward(this.maxSpeed);
        this.rightMotor.reverse(this.maxSpeed);

        if(callback && !hasAlreadyCalledBack) {
          console.log("Right callback()...")
          hasAlreadyCalledBack = true;
          callback();
        }
      });
    }

    private _speed : number;
    get speed(): number {
      return this._speed;
    }
    set speed(newSpeed : number) {
      if(newSpeed) {
        if(newSpeed < this.minSpeed) {
          newSpeed = this.minSpeed;
        }
        if(newSpeed > this.maxSpeed) {
          newSpeed = this.maxSpeed;
        }

        if(newSpeed != this._speed) {
          console.log("Speed changed to " + newSpeed);
          this._speed = newSpeed;

          if(this.lastOperation) {
            this.lastOperation();
          }
        }
      }
    }

    private runOperation(operation : () => void) {
      this.brake(() => {
        operation();
        this.lastOperation = operation;
      });
    }
}

export class MotorPins {
  constructor (public pwm : number, public dir : number, public cdir : number) { }
}

export class MotorOptions implements j5.MotorOption {
  constructor (public pins : MotorPins) {}
}
