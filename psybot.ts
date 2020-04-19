import { Psybot } from "./psybot-lib/psybot";
var StateMachine = require("javascript-state-machine");
var config = require("./config/config");
var visualize = require("javascript-state-machine/lib/visualize");
import delay from "./psybot-lib/delay";

const run = async () => {
    var psybot = await Psybot.Create(config.settings.usbConnection);
    await psybot.frontArm.centerAsync();

    var searchForRoute = async () => {
        await psybot.frontArm.faceLeftAsync();
        if (!await psybot.sonar.waitForSensorData()) {
            psybot.frontArm.centerAsync();

            console.log("Turning left...");
            await psybot.motors.leftAsync();
            await delay(500);
            await psybot.motors.brakeAsync();
            return fsm.routeFound();
        }

        await psybot.frontArm.faceRightAsync();
        if (!await psybot.sonar.waitForSensorData()) {
            psybot.frontArm.centerAsync();

            console.log("Turning right...");
            await psybot.motors.rightAsync();
            await delay(500);
            await psybot.motors.brakeAsync();
            return fsm.routeFound();
        }

        fsm.stuck();
    }

    var fsm = new StateMachine({
        init: "stopped",
        transitions: [
            { name: "goForward", from: "stopped", to: "movingForward" },
            { name: "obstacleDetected", from: "movingForward", to: "searching" },
            { name: "routeFound", from: "searching", to: "movingForward" },
            { name: "stuck", from: "searching", to: "stopped" }
        ],
        methods: {
            onMovingForward: async (options) => {
                console.log("onMovingForward");
                await psybot.motors.forwardAsync();
            },

            onStuck: async () => {
                console.log("I AM STUCK");
                await psybot.frontArm.centerAsync();
                await psybot.motors.brakeAsync();
            },

            onObstacleDetected: async (lifecycle) => {
                await psybot.motors.brakeAsync();
            },

            onSearching: (lifecycle) => {
                console.log("Searching for new route...");
                searchForRoute();
            },

            onRouteFound: () => {
                console.log("onRouteFound")
            },

            // onBeforeTransition: (lifecycle) => {
            //     console.log("BEFORE: " + lifecycle.transition, true);
            // },

            // onLeaveState: (lifecycle) => {
            //     console.log("LEAVE: " + lifecycle.from);
            // },

            // onEnterState: (lifecycle) => {
            //     console.log("ENTER: " + lifecycle.to);
            // },

            // onAfterTransition: (lifecycle) => {
            //     console.log("AFTER: " + lifecycle.transition);
            // },

            // onTransition: (lifecycle) => {
            //     console.log("DURING: " + lifecycle.transition + " (from " + lifecycle.from + " to " + lifecycle.to + ")");
            // },
        }
    });

    console.log(visualize(fsm))

    psybot.sonar.setObstacleDetectedCallback(() => {
        if (fsm.can("obstacleDetected")) {
            fsm.obstacleDetected();
        }
    });

    setInterval(() => console.log("Current state: " + fsm.state), 1000);

    console.log("fsm", fsm)
    fsm.goForward();
}

run();