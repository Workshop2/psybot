import { Accelerometer } from "johnny-five";

export class MovementSensors {
    private _accelerometer: Accelerometer;
    private _accelerometerData: any;
    private _isStoppedCount: number;
    private _isMovingCount: number;
    private _onStopped?: () => void;

    constructor(accelerometerController: string) {
        this._accelerometer = new Accelerometer({
            controller: accelerometerController
        });

        this._accelerometer.on("data", () => {
            this._accelerometerData = {
                x: this._accelerometer.x,
                y: this._accelerometer.y,
                z: this._accelerometer.z,
                pitch: this._accelerometer.pitch,
                roll: this._accelerometer.roll,
                orientation: this._accelerometer.orientation,
                acceleration: this._accelerometer.acceleration,
                inclination: this._accelerometer.inclination,
                zeroV: this._accelerometer.zeroV,
            };
        });

        setInterval(() => {
            if (!this._accelerometerData?.acceleration) {
                return;
            }

            if (this._accelerometerData.acceleration >= 1.99) {
                //console.log("accelerometerData", this._accelerometerData);
                this._isStoppedCount++;
                //console.log("maybe stopped...");
            }
            else {
                this._isMovingCount++;
            }
        }, 100);

        setInterval(() => {
            if(this._isMovingCount + this._isStoppedCount < 5) {
                return;
            }

            if (this._isStoppedCount > this._isMovingCount) {
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

    public setStoppedCallback(onStopped: () => void): void {
        this._onStopped = onStopped;
    }
}