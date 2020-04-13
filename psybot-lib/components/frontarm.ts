import { ServoSweepOpts, Servo } from "johnny-five";
import delay from "../delay"

export class FrontArm {
  private bottomServo: Servo;
  private topServo: Servo;
  private movementSpeed: number = 800;
  private stopTimeout: number = 100;
  private operationTimeout: number = 400;

  constructor(bottomServoPin: number, topServoPin: number) {
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

  public stop(callback?: () => void): void {
    this.stopBottom();
    this.stopTop();

    if (callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }

  public async stopAsync(): Promise<void> {
    console.log("stop");
    this.topServo.stop();
    this.bottomServo.stop();

    await delay(this.operationTimeout);
  }

  public stopBottom(callback?: () => void): void {
    console.log("stopBottom");
    this.bottomServo.stop();

    if (callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }

  public async stopBottomAsync(): Promise<void> {
    console.log("stopBottom");
    this.bottomServo.stop();
    await delay(this.operationTimeout);
  }

  public stopTop(callback?: () => void): void {
    console.log("stopTop");
    this.topServo.stop();

    if (callback) {
      setTimeout(callback, this.stopTimeout);
    }
  }
  public async stopTopAsync(): Promise<void> {
    console.log("stopTop");
    this.topServo.stop();
    await delay(this.operationTimeout);
  }

  // based on trust that the callbacks work...
  public center(callback?: () => void): void {
    this.stop();

    this.bottomServo.center();
    this.topServo.center();
    setTimeout(() => {
      this.stop();
      if (callback) {
        callback();
      }
    }, this.movementSpeed);
  }

  public async centerAsync(): Promise<void> {
    console.log("center");
    this.bottomServo.center();
    this.topServo.center();

    await delay(this.operationTimeout);
  }

  public faceUp(callback?: () => void): void {
    this.stopTop(() => {
      console.log("faceUp");
      this.topServo.min();
      setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
    });
  }

  public async faceUpAsync(): Promise<void> {
    console.log("faceUp");
    this.topServo.min();

    await delay(this.operationTimeout);
  }

  public faceDown(callback?: () => void): void {
    this.stopTop(() => {
      console.log("faceDown");
      this.topServo.max();
      setTimeout(() => { this.stopTop(callback); }, this.movementSpeed);
    });
  }

  public async faceDownAsync(): Promise<void> {
    console.log("faceDown");
    this.topServo.max();

    await delay(this.operationTimeout);
  }

  public faceRight(callback?: () => void): void {
    this.stopBottom(() => {
      console.log("faceRight");
      this.bottomServo.min();
      setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
    });
  }

  public async faceRightAsync(): Promise<void> {
    console.log("faceRight");
    this.bottomServo.min();

    await delay(this.operationTimeout);
  }

  public faceLeft(callback?: () => void): void {
    this.stopBottom(() => {
      console.log("faceLeft");
      this.bottomServo.max();
      setTimeout(() => { this.stopBottom(callback); }, this.movementSpeed);
    });
  }

  public async faceLeftAsync(): Promise<void> {
    console.log("faceLeft");
    this.bottomServo.max();

    await delay(this.operationTimeout);
  }

  public sweepUpDown(sweepOptions?: ServoSweepOpts): void {
    this.stopTop();
    this.topServo.sweep(sweepOptions);
  }

  public async sweepUpDownAsync(sweepOptions?: ServoSweepOpts): Promise<void> {
    await this.stopTopAsync();
    this.topServo.sweep(sweepOptions);
  }

  public sweepLeftRight(sweepOptions?: ServoSweepOpts): void {
    this.stopBottom();
    this.bottomServo.sweep(sweepOptions);
  }

  public async sweepLeftAsync(sweepOptions?: ServoSweepOpts): Promise<void> {
    await this.stopBottomAsync();
    this.bottomServo.sweep(sweepOptions);
  }
}
