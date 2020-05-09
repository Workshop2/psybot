import { Accelerometer } from "johnny-five";
const fs = require('fs');

export class MovementSensors {
    private _accelerometer: Accelerometer;
    private _accelerometerData: any;
    private _isStoppedCount: number = 0;
    private _isMovingCount: number = 0;
    private _onStopped?: () => void;
    private _log: Array<any>;

    constructor(accelerometerController: string) {
        this._accelerometer = new Accelerometer({
            controller: accelerometerController
        });

        this._log = [];

        this._accelerometer.on("change", () => {
            this._accelerometerData = {
                timestamp: new Date(),
                x: this._accelerometer.x,
                y: this._accelerometer.y,
                z: this._accelerometer.z,
                pitch: this._accelerometer.pitch,
                roll: this._accelerometer.roll,
                orientation: this._accelerometer.orientation,
                acceleration: this._accelerometer.acceleration,
                inclination: this._accelerometer.inclination,
            };

            this._log.push(this._accelerometerData);
        });

        setInterval(() => {
            if (!this._accelerometerData?.acceleration) {
                return;
            }

            if (!this._onStopped) {
                console.log(this._accelerometerData);
            }

            if (this._accelerometerData.y <= -0.55 && this._accelerometerData.y >= 0.59) {
                this._isStoppedCount++;
            }
            else {
                this._isMovingCount++;
            }
        }, 100);

        setInterval(() => {
            if (this._isStoppedCount >= 10) {
                console.log("I THINK I AM STOPPED?!");

                if (this._onStopped) {
                    this._onStopped();
                }
            }

            console.log("accelData", {
                isStoppedCount: this._isStoppedCount,
                isMovingCount: this._isMovingCount
            });

            this._isStoppedCount = 0;
            this._isMovingCount = 0;
        }, 1000);
    }

    public writeLogsToDisk() {
        const data = JSON.stringify(this._log);
        fs.writeFileSync("movementData.json", data);
    }

    public setStoppedCallback(onStopped: () => void): void {
        this._onStopped = onStopped;
    }
}