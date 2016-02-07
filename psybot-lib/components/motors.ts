/// <reference path="../../typings/main.d.ts"/>
import j5 = require("johnny-five");

export class Motors {
    private leftMotor : j5.Motor;
    private rightMotor : j5.Motor;
    private lastOperation : () => void;
    private minSpeed : number = 100;
    private maxSpeed : number = 255;
    private operationCooldown : number = 50;

    constructor (leftPins: MotorPins, rightPins: MotorPins) {
      console.log("Initialising motors...");
      this.leftMotor = new j5.Motor(new MotorOptions(leftPins));
      this.rightMotor = new j5.Motor(new MotorOptions(rightPins));
      console.log("Done!");

      this.speed = this.maxSpeed;
    }

    forward(speed?:number) : void {
      this.speed = speed;
      this.runOperation(() => {
        console.log("Moving forward");
        this.leftMotor.forward(this.speed);
        this.rightMotor.forward(this.speed);
      });
    }

    reverse(speed?:number) : void {
      this.speed = speed;
      this.runOperation(() => {
        console.log("Moving backwards");
        this.leftMotor.reverse(this.speed);
        this.rightMotor.reverse(this.speed);
      });
    }

    brake() : void {
      console.log("Braking");
      this.leftMotor.brake();
      this.rightMotor.brake();
      this.lastOperation = null;
    }

    left() : void {
      this.runOperation(() => {
        console.log("Turning left");
        this.leftMotor.reverse(this.maxSpeed);
        this.rightMotor.forward(this.maxSpeed);
      });
    }

    right() : void {
      this.runOperation(() => {
        console.log("Turning right");
        this.leftMotor.forward(this.maxSpeed);
        this.rightMotor.reverse(this.maxSpeed);
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
      this.brake();
      setTimeout(() => {
        operation();
        this.lastOperation = operation;
      }, this.operationCooldown);
    }
}

export class MotorPins {
  constructor (public pwm : number, public dir : number, public cdir : number) { }
}

class MotorOptions implements j5.MotorOption {
  constructor (public pins : MotorPins) {}
}
