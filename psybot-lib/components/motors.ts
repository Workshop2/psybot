/// <reference path="../../typings/index.d.ts"/>
import j5 = require("johnny-five");

export class Motors {
    public static leftMotorPin : any = j5.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M1;
    public static rightMotorPin : any = j5.Motor.SHIELD_CONFIGS.ADAFRUIT_V2.M2;
    
    private leftMotor : j5.Motor;
    private rightMotor : j5.Motor;
    private lastOperation : () => void;
    private minSpeed : number = 50;
    private maxSpeed : number = 255;
    private operationCooldown : number = 50;

    constructor () {
      console.log("Initialising motors...");
      this.leftMotor = new j5.Motor(Motors.leftMotorPin);
      this.rightMotor = new j5.Motor(Motors.rightMotorPin);
      console.log("Done!");

      this.speed = this.maxSpeed;
    }

    forward(callback?: () => void) : void {
      var hasAlreadyCalledBack : boolean = false;

      this.runOperation(() => {
        console.log("Moving forward");
        this.leftMotor.forward(this.leftSpeed);
        this.rightMotor.forward(this.rightSpeed);

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
        this.leftMotor.reverse(this.leftSpeed);
        this.rightMotor.reverse(this.rightSpeed);

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

    get leftSpeed(): number {
      return this.speed;
    }

    get rightSpeed(): number {
      return this.speed * 0.978;
    }

    private runOperation(operation : () => void) {
      this.brake(() => {
        operation();
        this.lastOperation = operation;
      });
    }
}