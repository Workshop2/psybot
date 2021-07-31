import { BNO055 } from '@workshop2/bno055-imu-node';
import { Compass, CompassPoint } from './compass';

export class MovementSensors {
    private _bno055: BNO055;

    constructor(bno055: BNO055) {
        this._bno055 = bno055;

        setTimeout(async () => console.log("Heading", (await this.GetHeading()).Heading), 2000);
    }

    public async GetHeading() : Promise<CompassPoint> {
        const data = await this._bno055.getEuler();
        console.log("headingData", data);

        const points = Compass.Points;
        return points.filter(point => data.h >= point.Low && data.h <= point.High)[0] || null;
    }

    public collectLogs() {
    }

    public setStoppedCallback(onStopped: () => void): void {
    }

    public resetSensors() {
    }
}