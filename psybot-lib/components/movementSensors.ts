import { Accelerometer } from "johnny-five";

export class MovementSensors {
    private _accelerometer: Accelerometer;
    private _accelerometerData: any;
    private _isStoppedCount: number;

    constructor(accelerometerController: string) {
        this._accelerometer = new Accelerometer({
            controller: accelerometerController
        });

        this._accelerometer.on("change", () => {
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
            if(this._accelerometerData.acceleration >= 1.99) {
                //console.log("accelerometerData", this._accelerometerData);
                this._isStoppedCount++;                
            }
            else {
                this._isStoppedCount = 0;
            }

            if(this._isStoppedCount > 5) {
                console.log("I THINK I AM STOPPED?!");
            }
        }, 300);
    }
}