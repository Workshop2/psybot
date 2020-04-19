var StateMachine = require("javascript-state-machine");

export class PsybotStateMachine {
    public static create(stateEvents: StateEvents): StateMachine.StateMachine {

        return new StateMachine({
            init: "stopped",
            transitions: [
                { name: "goForward", from: "stopped", to: "movingForward" },
                { name: "obstacleDetected", from: "movingForward", to: "searching" },
                { name: "routeFound", from: "searching", to: "movingForward" },
                { name: "stuck", from: "searching", to: "stopped" }
            ],
            methods: {
                onMovingForward: stateEvents.onMoveForward,
                onStuck: stateEvents.onStuck,
                onObstacleDetected: stateEvents.onObstacleDetected,
                onSearching: stateEvents.onSearching,
                onRouteFound: stateEvents.onRouteFound,

                onTransition: (lifecycle) => {
                    console.log("Transitioning: " + lifecycle.transition + " (from " + lifecycle.from + " to " + lifecycle.to + ")");
                },

                onEnterState: (lifecycle) => {
                    console.log("Entered state: " + lifecycle.to);
                },
            }
        });
    }
}

export class StateEvents {
    
    public constructor(init?:Partial<StateEvents>) {
        Object.assign(this, init);
    }

    private _onMoveForward: Function;
    public get onMoveForward(): Function {
        return this._onMoveForward;
    }
    public set onMoveForward(v: Function) {
        this._onMoveForward = v;
    }

    private _onStuck: Function;
    public get onStuck(): Function {
        return this._onStuck;
    }
    public set onStuck(v: Function) {
        this._onStuck = v;
    }

    private _onObstacleDetected: Function;
    public get onObstacleDetected(): Function {
        return this._onObstacleDetected;
    }
    public set onObstacleDetected(v: Function) {
        this._onObstacleDetected = v;
    }

    private _onSearching: Function;
    public get onSearching(): Function {
        return this._onSearching;
    }
    public set onSearching(v: Function) {
        this._onSearching = v;
    }

    private _onRouteFound: Function;
    public get onRouteFound(): Function {
        return this._onRouteFound;
    }
    public set onRouteFound(v: Function) {
        this._onRouteFound = v;
    }
}