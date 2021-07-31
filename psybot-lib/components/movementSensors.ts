import { Accelerometer } from "johnny-five";
import { WriteStream, createWriteStream } from "fs";
import { BNO055 } from '@workshop2/bno055-imu-node';

export class MovementSensors {
    private _accelerometer: Accelerometer;
    private _accelerometerData: any;
    private _previousAccelerometerData: any;
    private _isStoppedCount: number = 0;
    private _isMovingCount: number = 0;
    private _onStopped?: () => void;
    private _log: Array<any> = null;
    private _logStream: WriteStream = null;

    constructor(bno055: BNO055) {
        // this._accelerometer = new Accelerometer({
        //     controller: accelerometerController
        // });

        // this._accelerometer.on("change", () => {
        //     this._previousAccelerometerData = this._accelerometerData;
        //     this._accelerometerData = {
        //         timestamp: new Date(),
        //         x: this._accelerometer.x,
        //         y: this._accelerometer.y,
        //         z: this._accelerometer.z,
        //         pitch: this._accelerometer.pitch,
        //         roll: this._accelerometer.roll,
        //         orientation: this._accelerometer.orientation,
        //         acceleration: this._accelerometer.acceleration,
        //         inclination: this._accelerometer.inclination,
        //     };

        //     if (this._log) {
        //         this._log.push(this._accelerometerData);
        //     }
        // });

        // setInterval(() => {
        //     if (!this._accelerometerData?.acceleration) {
        //         return;
        //     }

        //     const difference = this._previousAccelerometerData.y - this._accelerometerData.y;
        //     if (difference <= 0.009 && difference >= -0.009) {
        //         this._isStoppedCount++;
        //     }
        //     else {
        //         this._isMovingCount++;
        //     }

        //     //console.log("logCount", this._log.length)
        // }, 100);

        // setInterval(() => {
        //     if (this._isStoppedCount >= 9) {
        //         if (this._onStopped) {
        //             this._onStopped();
        //         }
        //     }

        //     console.log("accelData", {
        //         isStoppedCount: this._isStoppedCount,
        //         isMovingCount: this._isMovingCount
        //     });

        //     this._isStoppedCount = 0;
        //     this._isMovingCount = 0;
        // }, 1000);

        // setInterval(() => {
        //     if(!this._log) {
        //         return;
        //     }

        //     this._log.forEach(element => {
        //         this._logStream.write(JSON.stringify(element) + ", ");
        //     });

        //     this._log = [];
        // }, 500);
    }

    public collectLogs() {
        this._logStream = createWriteStream("movementData.json");
        this._log = [];
    }

    public setStoppedCallback(onStopped: () => void): void {
        this._onStopped = onStopped;
    }

    public resetSensors() {
        this._isMovingCount = 0;
        this._isStoppedCount = 0;
    }
}