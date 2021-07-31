import { BNO055 } from '@workshop2/bno055-imu-node';
import { Compass, CompassPoint, Heading } from './compass';

export class MovementSensors {
    private _bno055: BNO055;
    private _onLost: Function;

    constructor(bno055: BNO055) {
        this._bno055 = bno055;

        setInterval(this.checkOrientation, 2000);
    }

    private async checkOrientation() {
        const heading = await this.GetHeading();
        console.log("Heading", heading.Heading);

        if(!this._onLost) {
            return;
        }

        switch(heading.Heading) {
            case Heading.South:
            case Heading.SouthEast:
            case Heading.SouthWest:
                this._onLost();
            default:
                return;
        }
    }

    public async GetHeading() : Promise<CompassPoint> {
        const data = await this._bno055.getEuler();
        return Compass
            .Points
            .filter(point => data.h >= point.Low && data.h <= point.High)[0] || null;
    }

    public collectLogs() {
    }

    public setLostCallback(onLost: Function): void {
        this._onLost = onLost;
    }

    public setStoppedCallback(onStopped: () => void): void {
    }

    public resetSensors() {
    }
}