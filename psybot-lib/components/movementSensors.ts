import delay from '../delay';
import { Compass, CompassPoint, Heading } from './compass';
import { BNO055, OpMode, DeviceAddress } from '@workshop2/bno055-imu-node';
const fs = require('fs');

export class MovementSensors {
    private _bno055: BNO055;
    private _onLost: Function;
    private _timer: NodeJS.Timer;
    
    private get targetRange() {
        const range = 25;
        return {
            min: 360 - range,
            max: range
        };
    }

    constructor(bno055: BNO055) {
        this._bno055 = bno055;

        this._timer = setInterval(() => this.checkOrientation(), 2000);
    }

    private async checkOrientation() {
        if(!this._onLost) {
            return;
        }

        const heading = await this.getHeading();
        if(!heading) {
            console.info("Heading could not be found");
            return;
        }

        console.log("Heading", `${heading.Bearing} (${heading.Heading} | min:${this.targetRange.min} | max:${this.targetRange.max})`);

        if(!this.facingCorrectDirection(heading)) {
            this._onLost();
        }
    }

    public facingCorrectDirection(heading: CurrentDirection) : boolean {
        if(!heading) {
            return false;
        }

        const range = this.targetRange;
        
        return heading.Bearing <= range.max || heading.Bearing >= range.min;
    }

    public async waitForData(): Promise<void> {
        console.log("waiting for data from movement sensor...");

        while(true) {
            const data = await this.getHeading();
            if(data) {
                return;
            }

            await delay(100);
        }
    }

    public async getHeading() : Promise<CurrentDirection> {
        const data = await this._bno055.getEuler();
        if(!data) {
            console.error("Unable to find current heading")
            return null;
        }

        const compassPoint = Compass
            .Points
            .filter(point => data.h >= point.Low && data.h <= point.High)[0] || null;

        if(!compassPoint) {
            console.error(`Unable to find compass point for ${data.h}`)
            return null;
        }

        return {
            Bearing: data.h,
            Name: compassPoint.Name,
            Abbr: compassPoint.Abbr,
            Heading: compassPoint.Heading
        };
    }

    public setLostCallback(onLost: Function): void {
        this._onLost = onLost;
    }

    public async dispose(): Promise<void> {
        clearTimeout(this._timer);
        this._timer = null;
    }
    
    public static async Create(busNumber: number): Promise<MovementSensors> {
        console.log("Getting access to the movement sensor...");
        const imu = await BNO055.begin(DeviceAddress.A, OpMode.FullFusion, busNumber);
        await imu.resetSystem();
        
        const offsetsPath = "./offsets.json";
        
        if(fs.existsSync(offsetsPath)) {
            console.log("Reading offsets from disk,", offsetsPath);
            const data = fs.readFileSync(offsetsPath, {encoding: 'utf8', flag: 'r'});

            const data2 = JSON.parse(data.toString());
            console.log(data2);
            
            console.log("Running setSensorOffsets....");
            await imu.setSensorOffsets(data2);
            console.log("Done?!");
        }

        let calibrated = false;
        while(!calibrated) {
            await delay(3333);
            console.log('calibration: ', await imu.getCalibrationStatuses());

            calibrated = await imu.isFullyCalibrated();
            console.log('is calibrated: ', calibrated);

            if(calibrated) {
                const offsets = await imu.getSensorOffsets();
                console.log('offsets: ', offsets);

                console.log("Storing offsets to disk", offsetsPath, offsets);
                const data = JSON.stringify(offsets);
                fs.writeFileSync(offsetsPath, data);
            }
        }

        const sensor = new MovementSensors(imu);
        await sensor.waitForData();
        return sensor;
    }
}

export interface CurrentDirection {
    Bearing: number;
    Name: string;
    Abbr: string;
    Heading: Heading;
}