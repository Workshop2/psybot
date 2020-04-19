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

        this._stateMachine = PsybotStateMachine.create(new StateEvents({
            onMoveForward: async () => await this.onMovingForwardAsync(),
            onObstacleDetected: async () => await this.onObstacleDetectedAsync(),
            onSearching: () => this.onSearching(),
            onStuck: async () => await this.onStuckAsync(),
            onRouteFound: () => this.onRouteFound(),
        }));

        this.wireUpExternalEvents();
    }

    private wireUpExternalEvents() {
        setInterval(() =>
            console.log("Current state: " + this._stateMachine.state
        ), 1000);

        this._psybot.sonar.setObstacleDetectedCallback(() => {
            if (this._stateMachine.can("obstacleDetected")) {
                this._stateMachine.obstacleDetected();
            }
        });
    }

    public start() {
        if (this._stateMachine.is("stopped")) {
            this._stateMachine.goForward();
        }
    }

    private async onMovingForwardAsync() {
        console.log("onMovingForward");
        if(this._psybot.motors.motorsOn) {
            await this._psybot.motors.forwardAsync();
        }

        await this._psybot.motors.setSpeedAsync(this._psybot.motors.MinSpeed);
        await this._psybot.motors.forwardAsync();

        while(this._psybot.motors.speed < (this._psybot.motors.MaxSpeed - 10)){
            const delta = (this._psybot.motors.MaxSpeed - this._psybot.motors.speed) / 3;
            const newSpeed = this._psybot.motors.speed + delta;
            await this._psybot.motors.setSpeedAsync(newSpeed);
            await delay(10);
        }

        await this._psybot.motors.setSpeedAsync(this._psybot.motors.MaxSpeed);
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

    private onSearching() {
        // this needs to be run out of process in order to allow the
        // state machine to finish the transition
        this.searchForRoute();
    }

    private onRouteFound() {
        console.log("onRouteFound");
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

        console.log("Reversing...");
        await this._psybot.motors.reverseAsync();
        await delay(1500);
        await this._psybot.motors.brakeAsync();

        console.log("Turning around...");
        await this._psybot.motors.rightAsync();
        await delay(1000);
        
        if (await this._psybot.sonar.waitForSensorData() == SensorState.NothingDetected) {
            return this._stateMachine.routeFound();
        }

        this._stateMachine.stuck();
    }
}