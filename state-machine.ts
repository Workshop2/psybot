import { Psybot } from "./psybot-lib/psybot";
var StateMachine = require('javascript-state-machine');
var config = require('./config/config');
var visualize = require('javascript-state-machine/lib/visualize');
import delay from "./psybot-lib/delay";

const run = async () => {
    var psybot = await Psybot.Create(config.settings.usbConnection);

    var searchForRoute = async () => {
        await psybot.frontArm.faceLeftAsync();
        await delay(2000);

        if (!psybot.sonar.obstacleDetected) {
            await psybot.frontArm.centerAsync();
            return fsm.turnLeft();
        }

        await psybot.frontArm.faceRightAsync();
        await delay(2000);
        psybot.frontArm.centerAsync();

        if (!psybot.sonar.obstacleDetected) {
            psybot.frontArm.centerAsync();
            return fsm.turnRight();
        }
    }

    var fsm = new StateMachine({
        init: 'stopped',
        transitions: [
            { name: 'goForward', from: 'stopped', to: 'movingForward' },
            { name: 'obstacleDetected', from: 'movingForward', to: 'searching' },
            { name: 'turnLeft', from: 'searching', to: 'movingForward' },
            { name: 'turnRight', from: 'searching', to: 'movingForward' },
        ],
        methods: {
            onMovingForward: async (options) => {
                await psybot.motors.forwardAsync();
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

            onObstacleDetected: async (lifecycle) => {
                await psybot.motors.brakeAsync();
            },

            onSearching: (lifecycle) => {
                console.log("Searching for new route...");
                searchForRoute();
            },

            onTurnLeft: async () => {
                await psybot.motors.leftAsync();
                await delay(500);          
                await psybot.motors.brakeAsync();
                await delay(1000);     
            },

            onTurnRight: async () => {
                await psybot.motors.rightAsync();
                await delay(500);                
                await psybot.motors.brakeAsync();
                await delay(1000);                
            },
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