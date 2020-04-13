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

  public async stopAsync(): Promise<void> {
    console.log("stop");
    this.topServo.stop();
    this.bottomServo.stop();

    await delay(this.operationTimeout);
  }

  public async stopBottomAsync(): Promise<void> {
    console.log("stopBottom");
    this.bottomServo.stop();
    await delay(this.operationTimeout);
  }

  public async stopTopAsync(): Promise<void> {
    console.log("stopTop");
    this.topServo.stop();
    await delay(this.operationTimeout);
  }

  public async centerAsync(): Promise<void> {
    console.log("center");
    this.bottomServo.center();
    this.topServo.center();

    await delay(this.operationTimeout);
  }

  public async faceUpAsync(): Promise<void> {
    console.log("faceUp");
    this.topServo.min();

    await delay(this.operationTimeout);
  }

  public async faceDownAsync(): Promise<void> {
    console.log("faceDown");
    this.topServo.max();

    await delay(this.operationTimeout);
  }

  public async faceRightAsync(): Promise<void> {
    console.log("faceRight");
    this.bottomServo.min();

    await delay(this.operationTimeout);
  }

  public async faceLeftAsync(): Promise<void> {
    console.log("faceLeft");
    this.bottomServo.max();

    await delay(this.operationTimeout);
  }

  public async sweepUpDownAsync(sweepOptions?: ServoSweepOpts): Promise<void> {
    await this.stopTopAsync();
    this.topServo.sweep(sweepOptions);
  }

  public async sweepLeftAsync(sweepOptions?: ServoSweepOpts): Promise<void> {
    await this.stopBottomAsync();
    this.bottomServo.sweep(sweepOptions);
  }
}
