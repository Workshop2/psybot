import { Motor } from "johnny-five";
import { Shields } from "../../j5-types/shields";
// import { Promise } from "q";
// import * as Q from "q";

export class MotorsAsync {
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

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async forward(): Promise<void> {
    console.log("Moving forward...");
    this.leftMotor.forward(this.leftSpeed);
    this.rightMotor.forward(this.rightSpeed);

    await this.delay(this.operationCooldown);
  }

  public async reverse(): Promise<void> {
    console.log("Moving forward...");
    this.leftMotor.reverse(this.leftSpeed);
    this.rightMotor.reverse(this.rightSpeed);

    await this.delay(this.operationCooldown);
  }

  public async brake(): Promise<void> {
    console.log("Breaking...");
    this.leftMotor.brake();
    this.rightMotor.brake();

    await this.delay(this.operationCooldown)
  }

  public async left(): Promise<void> {
    console.log("Turning left");
    this.leftMotor.reverse(this.leftSpeed);
    this.rightMotor.forward(this.rightSpeed);

    await this.delay(this.operationCooldown);
  }

  public async right(): Promise<void> {
    console.log("Turning right");
    this.leftMotor.forward(this.leftSpeed);
    this.rightMotor.reverse(this.rightSpeed);

    await this.delay(this.operationCooldown);
  }

  private _speed: number;
  get speed(): number {
    return this._speed;
  }

  public async setSpeed(newSpeed: number): Promise<void> {
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

      await this.delay(this.operationCooldown);
    }
  }

  get leftSpeed(): number {
    return this.speed;
  }

  get rightSpeed(): number {
    return this.speed * 0.985;
  }
}