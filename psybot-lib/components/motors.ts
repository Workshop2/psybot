import { Motor } from "johnny-five";
import { Shields } from "../../j5-types/shields";
import delay from "../delay"

export class Motors {
  public readonly MinSpeed: number = 50;
  public readonly MaxSpeed: number = 255;
  private readonly _operationCooldown: number = 50;

  private _rightMotor: Motor;
  private _leftMotor: Motor;

  constructor() {
    console.log("Initialising motors...");
    this._leftMotor = new Motor(Shields.M1);
    this._rightMotor = new Motor(Shields.M2);
    console.log("Done!");

    this._speed = this.MaxSpeed;
  }

  private _motorsOn : Boolean = false;
  public get motorsOn() : Boolean {
    return this._motorsOn;
  }  

  public async forwardAsync(): Promise<void> {
    this._leftMotor.forward(this.leftSpeed);
    this._rightMotor.forward(this.rightSpeed);
    this._motorsOn = true;

    await delay(this._operationCooldown);
  }

  public async reverseAsync(): Promise<void> {
    this._leftMotor.reverse(this.leftSpeed);
    this._rightMotor.reverse(this.rightSpeed);
    this._motorsOn = true;

    await delay(this._operationCooldown);
  }

  public async brakeAsync(): Promise<void> {
    this._leftMotor.brake();
    this._rightMotor.brake();
    this._motorsOn = false;
    
    await delay(this._operationCooldown);
  }

  public async leftAsync(): Promise<void> {
    this._leftMotor.reverse(this.leftSpeed);
    this._rightMotor.forward(this.rightSpeed);
    this._motorsOn = false;

    await delay(this._operationCooldown);
  }

  public async rightAsync(): Promise<void> {
    this._leftMotor.forward(this.leftSpeed);
    this._rightMotor.reverse(this.rightSpeed);
    this._motorsOn = false;

    await delay(this._operationCooldown);
  }

  private _speed: number;
  get speed(): number {
    return this._speed;
  }

  public async setSpeedAsync(newSpeed: number): Promise<void> {
    if (newSpeed) {
      if (newSpeed < this.MinSpeed) {
        newSpeed = this.MinSpeed;
      }

      if (newSpeed > this.MaxSpeed) {
        newSpeed = this.MaxSpeed;
      }

      if (newSpeed != this.speed) {
        this._speed = newSpeed;

        if (this._leftMotor.isOn) {
          this._leftMotor.start(this.leftSpeed);
        }

        if (this._rightMotor.isOn) {
          this._rightMotor.start(this.rightSpeed);
        }
      }

      await delay(this._operationCooldown);
    }
  }

  private get leftSpeed(): number {
    return this.speed;
  }

  private get rightSpeed(): number {
    return this.speed;
  }

  public async dispose(): Promise<void> {
      await this.brakeAsync();
  }
}