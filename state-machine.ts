import { Psybot } from "./psybot-lib/psybot";
var StateMachine = require('javascript-state-machine');
var config = require('./config/config');
var visualize = require('javascript-state-machine/lib/visualize');
import delay from "./psybot-lib/delay";

const run = async () => {
    var psybot = await Psybot.Create(config.settings.usbConnection);

    var searchForRoute = async () => {
        console.log("Before delay...");
        await delay(2000);
        console.log("After delay...");
        await psybot.frontArm.faceLeftAsync();
        await psybot.frontArm.faceRightAsync();
        await psybot.frontArm.centerAsync();
        
        console.log("Attempting turnLeft...");
        fsm.turnLeft();
    }

    var fsm = new StateMachine({
        init: 'stopped',
        transitions: [
            { name: 'goForward', from: 'stopped', to: 'moving' },
            { name: 'obstacleDetected', from: 'moving', to: 'searching' },
            { name: 'turnLeft', from: 'searching', to: 'moving' },
            { name: 'turnRight', from: 'searching', to: 'moving' },
        ],
        methods: {
            onGoForward: async (options) => {
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
                await delay(1000);
                await psybot.motors.forwardAsync();
            }
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