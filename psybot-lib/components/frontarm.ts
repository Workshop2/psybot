import { ServoSweepOpts, Servo } from "johnny-five";
import { Promise } from "q";
import * as Q from "q";

export class FrontArm {
  private bottomServo : Servo;
  private topServo : Servo;
  private movementSpeed : number = 800;
  private stopTimeout: number = 100;
  private operationTimeout: number = 400;

  constructor(bottomServoPin : number, topServoPin : number) {
    this.bottomServo = new Servo({
      pin: bottomServoPin,
      range: [30, 180],
      center: true
    });

    this.topServo = new Servo({
      pin: topServoPin,
      range: [40, 140],
      center: true
    });
  }

  public stop(callback? : () => void) : void {
    this.stopBottom();
    this.stopTop();

    if(callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }
  
  public stopAsync() : Promise<any> {
    return Q.fcall<any>(() => {
      console.log("stop");
      this.topServo.stop();
      this.bottomServo.stop();
    })
  }

  public stopBottom(callback? : () => void) : void {
    console.log("stopBottom");
    this.bottomServo.stop();

    if(callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }
  
  public stopBottomAsync() : Promise<any> {
    return Q.fcall<any>(() => {
      console.log("stopBottom");
      this.bottomServo.stop();
    })
  }

  public stopTop(callback? : () => void) : void {
    console.log("stopTop");
    this.topServo.stop();

    if(callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }
  public stopTopAsync() : Promise<any> {
    return Q.fcall<any>(() => {
      console.log("stopTop");
      this.topServo.stop();
    })
  }

  // based on trust that the callbacks work...
  public center(callback? : () => void) : void {
    this.stop();

    this.bottomServo.center();
    this.topServo.center();
    setTimeout(() => { 
      this.stop(); 
      if(callback) {
        callback(); 
      }
    }, this.movementSpeed);
  }

  public centerAsync() : Promise<any> {
    return Q.fcall<any>(() => {
      console.log("center");
      this.bottomServo.center();
      this.topServo.center();
    })
    .delay(500);
  }

  public faceUp(callback? : () => void) : void {
    this.stopTop(() => {
      console.log("faceUp");
      this.topServo.min();
      setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
    });
  }

  public faceUpAsync() : Promise<any> {
    return Q.fcall<any>(() => {
      console.log("faceUp");
      this.topServo.min();
    })
    .delay(this.operationTimeout);
  }

  public faceDown(callback? : () => void) : void {
    this.stopTop(() => {
      console.log("faceDown");
      this.topServo.max();
      setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
    });
  }

  public faceDownAsync() : Promise<any> {
    return Q.fcall<any>(() => {
      console.log("faceDown");
      this.topServo.max();
    })
    .delay(this.operationTimeout);
  }

  public faceRight(callback? : () => void) : void {
    this.stopBottom(() => {
      console.log("faceRight");
      this.bottomServo.min();
      setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
    });
  }

  public faceRightAsync() : Promise<any> {
    return Q.fcall<any>(() => {
      console.log("faceRight");
      this.bottomServo.min();
    })
    .delay(this.operationTimeout);
  }

  public faceLeft(callback? : () => void) : void {
    this.stopBottom(() => {
      console.log("faceLeft");
      this.bottomServo.max();
      setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
    });
  }

  public faceLeftAsync() : Promise<any> {
    return Q.fcall<any>(() => {
      console.log("faceLeft");
      this.bottomServo.max();
    })
    .delay(this.operationTimeout);
  }

  public sweepUpDown(sweepOptions? : ServoSweepOpts) : void {
    this.stopTop();
    this.topServo.sweep(sweepOptions);
  }

  public sweepUpDownAsync(sweepOptions? : ServoSweepOpts) : Promise<any> {
    return this.stopTopAsync()
      .then(() => {
        this.topServo.sweep(sweepOptions);
      });
  }

  public sweepLeftRight(sweepOptions? : ServoSweepOpts) : void {
    this.stopBottom();
    this.bottomServo.sweep(sweepOptions);
  }

  public sweepLeftAsync(sweepOptions? : ServoSweepOpts) : Promise<any> {
    return this.stopBottomAsync()
      .then(() => {
        this.bottomServo.sweep(sweepOptions);
      });
  }
}
