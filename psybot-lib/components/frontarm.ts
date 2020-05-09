import { ServoSweepOpts, Servo } from "johnny-five";
import delay from "../delay"

export class FrontArm {
  private bottomServo: Servo;
  private operationTimeout: number = 600;

  constructor(bottomServoPin: number) {
    this.bottomServo = new Servo({
      pin: bottomServoPin,
      range: [40, 180],
      center: true
    });

    this.centerAsync();
  }

  public async stopAsync(): Promise<void> {
    this.bottomServo.stop();

    await delay(this.operationTimeout);
  }

  private async stopBottomAsync(): Promise<void> {
    this.bottomServo.stop();
    await delay(this.operationTimeout);
  }

  public async centerAsync(): Promise<void> {
    this.bottomServo.center();

    await delay(this.operationTimeout);
  }

  public async faceRightAsync(): Promise<void> {
    this.bottomServo.max();
    await delay(this.operationTimeout);
  }

  public async faceLeftAsync(): Promise<void> {
    this.bottomServo.min();
    await delay(this.operationTimeout);
  }

  public async sweepLeftAsync(sweepOptions?: ServoSweepOpts): Promise<void> {
    await this.stopBottomAsync();
    this.bottomServo.sweep(sweepOptions);
  }
}
