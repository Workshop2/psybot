import { Accelerometer } from "johnny-five";

export class MovementSensors {
    private _accelerometer: Accelerometer;
    private _accelerometerData: any;

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
                console.log("accelerometerData", this._accelerometerData);
            }
        }, 500);
    }
}