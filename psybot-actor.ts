import { Psybot } from "./psybot-lib/psybot";
import { PsybotStateMachine, StateEvents } from "./psybot-state-machine";
import delay from "./psybot-lib/delay";
import { SensorState } from "./psybot-lib/components/sonar";
import { Heading } from "./psybot-lib/components/compass";

export class PsybotActor {
    private _psybot: Psybot;
    private _stateMachine: any;

    constructor(psybot: Psybot) {
        this._psybot = psybot;
        this._psybot.frontArm.centerAsync();

        this._stateMachine = PsybotStateMachine.create(new StateEvents({
            onMoveForward: async () => await this.onMovingForwardAsync(),
            onObstacleDetected: async () => await this.onObstacleDetectedAsync(),
            onSearching: () => this.onSearching(),
            onStuck: async () => await this.onStuckAsync(),
            onRouteFound: () => this.onRouteFound(),
            onCrashed: async () => await this.onCrashedAsync(),
            onStop: async () => await this.onStop(),
            onReverse: async () => await this.onReverse(),
            onFindingNorth: async () => await this.onFindingNorth()
        }));

        this.wireUpExternalEvents();
    }

    private wireUpExternalEvents() {
        this._psybot.sonar.setObstacleDetectedCallback(() => {
            if (this._stateMachine.can("obstacleDetected")) {
                this._stateMachine.obstacleDetected();
            }
        });

        this._psybot.movementSensors.setLostCallback(() => {
            if (this._stateMachine.can("lost")) {
                this._stateMachine.lost();
            }
        });
    }

    public start() {
        if (this._stateMachine.is("stopped")) {
            this._stateMachine.lost();
        }
    }

    private async onStop() {
        console.log("onStop");
        await this._psybot.frontArm.centerAsync();
        await this._psybot.motors.brakeAsync();
    }

    private async onMovingForwardAsync() {
        console.log("onMovingForward");
        await this._psybot.motors.forwardAsync();
    }

    private async onObstacleDetectedAsync() {
        console.log("onObstacleDetected");
        await this._psybot.motors.brakeAsync();
    }

    private async onStuckAsync() {
        console.log("I AM STUCK");
        await this._psybot.frontArm.centerAsync();
        await this._psybot.motors.brakeAsync();
    }

    private async onCrashedAsync() {
        console.log("<<CRASHED>>");
        await this._psybot.frontArm.centerAsync();
        await this._psybot.motors.brakeAsync();
    }

    private onSearching() {
        // this needs to be run out of process in order to allow the
        // state machine to finish the transition
        this.searchForRoute();
    }

    private onRouteFound() {
        console.log("onRouteFound");
    }

    private async onReverse() {
        console.log("onReverse");
    }

    private onFindingNorth() {
        // this needs to be run out of process in order to allow the
        // state machine to finish the transition
        this.findingNorth();
    }

    // Yay, bot will now not go south. How mean.
    private async findingNorth() {
        console.log("onFindingNorth");

        await this._psybot.motors.brakeAsync();
        await this._psybot.motors.setSpeedAsync(this._psybot.motors.MinSpeed);

        let isRotating = false;
        while(true) {
            const heading = await this._psybot.movementSensors.getHeading();
            console.log("heading", heading);

            if(this._psybot.movementSensors.facingCorrectDirection(heading)) {
                break;
            }

            if(isRotating) {
                continue;
            }

            const left = Math.abs(0 - heading.Bearing);
            const right = Math.abs(360 - heading.Bearing);

            if(left < right) {
                await this._psybot.motors.leftAsync();
            }
            else {
                await this._psybot.motors.rightAsync();
            }
            
            isRotating = true;
        }

        await this._psybot.motors.brakeAsync();
        await this._psybot.motors.setSpeedAsync(this._psybot.motors.MaxSpeed);
        this._stateMachine.moveForward();
    }

    private async searchForRoute() {
        await this._psybot.frontArm.faceLeftAsync();
        if (await this._psybot.sonar.waitForSensorData() == SensorState.NothingDetected) {
            this._psybot.frontArm.centerAsync();

            console.log("Turning left...");
            await this._psybot.motors.leftAsync();
            await delay(500);
            await this._psybot.motors.brakeAsync();
            return this._stateMachine.routeFound();
        }

        await this._psybot.frontArm.faceRightAsync();
        if (await this._psybot.sonar.waitForSensorData() == SensorState.NothingDetected) {
            this._psybot.frontArm.centerAsync();

            console.log("Turning right...");
            await this._psybot.motors.rightAsync();
            await delay(500);
            await this._psybot.motors.brakeAsync();
            return this._stateMachine.routeFound();
        }

        this._psybot.frontArm.centerAsync();

        if(!this._stateMachine.can("reverse")) {
            console.log("Unable to reverse");
            return this._stateMachine.stuck();
        }
        
        console.log("Reversing...");
        await this._stateMachine.reverse();
        await this._psybot.motors.reverseAsync();
        await delay(1500);
        await this._psybot.motors.brakeAsync();

        if(!this._stateMachine.can("turnAround")) {
            console.log("Unable to turnAround");
            return this._stateMachine.stuck();
        }

        console.log("Turning around...");
        this._stateMachine.turnAround();
        await this._psybot.motors.rightAsync();
        await delay(1000);
        await this._psybot.motors.brakeAsync();

        if (await this._psybot.sonar.waitForSensorData() == SensorState.NothingDetected) {
            return this._stateMachine.routeFound();
        }

        this._stateMachine.stuck();
    }
}