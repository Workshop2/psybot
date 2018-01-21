import { Motor } from "johnny-five";
import { Shields } from "../../j5-types/shields";
import { Promise } from "q";
import * as Q from "q";

export class MotorsAsync {
    private readonly minSpeed : number = 50;
    private readonly maxSpeed : number = 255;
    private readonly operationCooldown : number = 50;
    
    private rightMotor: Motor;
    private leftMotor: Motor;

    constructor () {
        console.log("Initialising motors...");
        this.leftMotor = new Motor(Shields.M1);
        this.rightMotor = new Motor(Shields.M2);
        console.log("Done!");
  
        this._speed = this.maxSpeed;
    }

    public forward() : Promise<any> {
        return Q.fcall<any>(() => {
            console.log("Moving forward...");
            this.leftMotor.forward(this.speed);
            this.rightMotor.forward(this.speed);
          })
          .delay(this.operationCooldown);
    }

    public reverse() : Promise<any> {
        return Q.fcall<any>(() => {
            console.log("Moving forward...");
            this.leftMotor.reverse(this.speed);
            this.rightMotor.reverse(this.speed);
          })
          .delay(this.operationCooldown);
    }

    public brake() : Promise<any> {
        return Q.fcall<any>(() => {
          console.log("Breaking...");
          this.leftMotor.brake();
          this.rightMotor.brake();
        })
        .delay(this.operationCooldown)
    }

    public left() : Promise<any> {
        return Q.fcall<any>(() => {
            console.log("Turning left");
            this.leftMotor.reverse(this.speed);
            this.rightMotor.forward(this.speed);
          })
          .delay(this.operationCooldown);
    }

    public right() : Promise<any> {
        return Q.fcall<any>(() => {
            console.log("Turning right");
            this.leftMotor.forward(this.speed);
            this.rightMotor.reverse(this.speed);
          })
          .delay(this.operationCooldown);
    }
      
    private _speed : number;
    get speed(): number {
      return this._speed;
    }

    public setSpeed(newSpeed : number) : Promise<any> {
      if(newSpeed) {
        if(newSpeed < this.minSpeed) {
          newSpeed = this.minSpeed;
        }

        if(newSpeed > this.maxSpeed) {
          newSpeed = this.maxSpeed;
        }

        let promise = Q.fcall(() => {});
        if(newSpeed != this.speed) {
            console.log("Changing speed to " + newSpeed);
            this._speed = newSpeed;
            
            promise.then(() => {
              if(this.leftMotor.isOn) {
                this.leftMotor.start(newSpeed);
              }

              if(this.rightMotor.isOn) {
                this.rightMotor.start(newSpeed);
              }
            })
            .delay(this.operationCooldown);
        }

        return promise;
      }
    }

    get leftSpeed(): number {
      return this.speed;
    }

    get rightSpeed(): number {
      return this.speed * 0.985;
    }
}