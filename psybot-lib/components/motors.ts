import { Motor } from "johnny-five";
import { Shields } from "../../j5-types/shields";
import delay from "../delay"

export class Motors {
  private readonly minSpeed: number = 50;
  private readonly maxSpeed: number = 255;
  private readonly operationCooldown: number = 50;

  private rightMotor: Motor;
  private leftMotor: Motor;

  constructor() {
    console.log("Initialising motors...");
    this.leftMotor = new Motor(Shields.M1);
    this.rightMotor = new Motor(Shields.M2);
    console.log("Done!");

    this._speed = this.maxSpeed;
  }

  public async forwardAsync(): Promise<void> {
    console.log("Moving forward...");
    this.leftMotor.forward(this.leftSpeed);
    this.rightMotor.forward(this.rightSpeed);

    await delay(this.operationCooldown);
  }

  public async reverseAsync(): Promise<void> {
    console.log("Moving forward...");
    this.leftMotor.reverse(this.leftSpeed);
    this.rightMotor.reverse(this.rightSpeed);

    await delay(this.operationCooldown);
  }

  public async brakeAsync(): Promise<void> {
    console.log("Breaking...");
    this.leftMotor.brake();
    this.rightMotor.brake();

    await delay(this.operationCooldown)
  }

  public async leftAsync(): Promise<void> {
    console.log("Turning left");
    this.leftMotor.reverse(this.leftSpeed);
    this.rightMotor.forward(this.rightSpeed);

    await delay(this.operationCooldown);
  }

  public async rightAsync(): Promise<void> {
    console.log("Turning right");
    this.leftMotor.forward(this.leftSpeed);
    this.rightMotor.reverse(this.rightSpeed);

    await delay(this.operationCooldown);
  }

  private _speed: number;
  get speed(): number {
    return this._speed;
  }

  public async setSpeedAsync(newSpeed: number): Promise<void> {
    if (newSpeed) {
      if (newSpeed < this.minSpeed) {
        newSpeed = this.minSpeed;
      }

      if (newSpeed > this.maxSpeed) {
        newSpeed = this.maxSpeed;
      }

      if (newSpeed != this.speed) {
        console.log("Changing speed to " + newSpeed);
        this._speed = newSpeed;

        if (this.leftMotor.isOn) {
          this.leftMotor.start(this.leftSpeed);
        }

        if (this.rightMotor.isOn) {
          this.rightMotor.start(this.rightSpeed);
        }
      }

      await delay(this.operationCooldown);
    }
  }

  get leftSpeed(): number {
    return this.speed;
  }

  get rightSpeed(): number {
    return this.speed * 0.985;
  }
}