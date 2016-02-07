/// <reference path="../../typings/main.d.ts"/>
import j5 = require("johnny-five");

export class Motors {
    private leftMotor : j5.Motor;
    private rightMotor : j5.Motor;
    private lastOperation : () => void;
    private minSpeed : number = 80;
    private maxSpeed : number = 255;


    constructor (leftPins: MotorPins, rightPins: MotorPins) {
      console.log("Initialising motors...");
      this.leftMotor = new j5.Motor(new MotorOptions(leftPins));
      this.rightMotor = new j5.Motor(new MotorOptions(rightPins));
      console.log("Done!");

      this.speed = 255;
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

    forward(speed?:number) : void {
      this.speed = speed;
      this.lastOperation = () => {
        console.log("Moving forward");
        this.leftMotor.forward(this._speed);
        this.rightMotor.forward(this._speed);
      };

      this.lastOperation();
    }

    reverse(speed?:number) : void {
      this.speed = speed;
      this.lastOperation = () => {
        console.log("Moving backwards");
        this.leftMotor.reverse(this._speed);
        this.rightMotor.reverse(this._speed);
      };

      this.lastOperation();
    }

    brake() : void {
      this.lastOperation = () => {
        console.log("Braking");
        this.leftMotor.brake();
        this.rightMotor.brake();
      };

      this.lastOperation();
    }

    left() : void {
      this.lastOperation = () => {
        console.log("Turning left");
        this.leftMotor.reverse(this.maxSpeed);
        this.rightMotor.forward(this.maxSpeed);
      };

      this.lastOperation();
    }

    right() : void {
      this.lastOperation = () => {
        console.log("Turning right");
        this.leftMotor.forward(this.maxSpeed);
        this.rightMotor.reverse(this.maxSpeed);
      };

      this.lastOperation();
    }
}

export class MotorPins {
  constructor (public pwm : number, public dir : number, public cdir : number) { }
}

class MotorOptions implements j5.MotorOption {
  constructor (public pins : MotorPins) {}
}
