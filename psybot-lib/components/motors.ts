/// <reference path="../../typings/main.d.ts"/>

export module components { 
  interface IMotors {
      forward(speed:number) : void;
      reverse(speed:number) : void;
      brake(speed:number) : void;
      left(speed:number) : void;
      right(speed:number) : void;
  }

  export class Motors implements IMotors {
      constructor (private pins: MotorPins) { }

      forward(speed:number) : void {
        //TODO
      }

      reverse(speed:number) : void {
        //TODO
      }

      brake(speed:number) : void {
        //TODO
      }

      left(speed:number) : void {
        //TODO
      }

      right(speed:number) : void {
        //TODO
      }
  }

  export class MotorPins {
      constructor (public pwm : number, public dir : number, public cdir : number) { }
  }
}
