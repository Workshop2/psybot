import { Psybot } from "./psybot-lib/psybot";
import { PsybotStateMachine, StateEvents } from "./psybot-state-machine";
import delay from "./psybot-lib/delay";
import { SensorState } from "./psybot-lib/components/sonar";

export class PsybotActor {
    private _psybot: Psybot;
    private _stateMachine: any;

    constructor(psybot: Psybot) {
        this._psybot = psybot;
        this._psybot.frontArm.centerAsync();
        this._psybot.movementSensors.collectLogs();

        this._stateMachine = PsybotStateMachine.create(new StateEvents({
            onMoveForward: async () => await this.onMovingForwardAsync(),
            onObstacleDetected: async () => await this.onObstacleDetectedAsync(),
            onSearching: () => this.onSearching(),
            onStuck: async () => await this.onStuckAsync(),
            onRouteFound: () => this.onRouteFound(),
            onCrashed: async () => await this.onCrashedAsync(),
            onStop: async () => await this.onStop(),
            onReverse: async () => await this.onReverse(),
            onFindingNorth: async () => await this onFindingNorth()
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
            this._stateMachine.moveForward();
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
        this._psybot.movementSensors.resetSensors();
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

    private async onFindingNorth() {
        console.log("onFindingNorth");
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
        this._psybot.movementSensors.resetSensors();
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