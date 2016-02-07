/// <reference path="../../typings/main.d.ts"/>
import j5 = require("johnny-five");

export class Motors {
    private leftMotor : j5.Motor;
    private rightMotor : j5.Motor;

    constructor (private leftPins: MotorPins, private rightPins: MotorPins) {
      console.log("Initialising motors...");
      console.log("Left");
      console.log(new MotorOptions(leftPins));
      this.leftMotor = new j5.Motor(new MotorOptions(leftPins));
      console.log("right");
      this.rightMotor = new j5.Motor(new MotorOptions(rightPins));
      console.log("Done!");
    }

    forward(speed:number) : void {
      console.log("Moving forward");
      this.leftMotor.forward(255);
      this.rightMotor.forward(255);
    }

    reverse(speed:number) : void {
      console.log("Moving backwards");
      this.leftMotor.reverse(255);
      this.rightMotor.reverse(255);
    }

    brake() : void {
      console.log("Braking");
      this.leftMotor.brake();
      this.rightMotor.brake();
    }

    left(speed:number) : void {
      console.log("Moving left");
      this.leftMotor.reverse(255);
      this.rightMotor.forward(255);
    }

    right(speed:number) : void {
      console.log("Moving right");
      this.leftMotor.forward(255);
      this.rightMotor.reverse(255);
    }
}

export class MotorPins {
  constructor (public pwm : number, public dir : number, public cdir : number) { }
}

class MotorOptions implements j5.MotorOption {
  constructor (public pins : MotorPins) {}
}
