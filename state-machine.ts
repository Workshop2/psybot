//import { Promise } from "q";
import { Psybot } from "./psybot-lib/psybot";
var StateMachine = require('javascript-state-machine');
var config = require('./config/config');

//StateMachine.Promise = Promise;

Psybot.Create(config.settings.usbConnection)
  .then((psybot) => {

    var fsm = new StateMachine({
        events: [
            { name: 'goForward',            from: 'none',    to: 'moving' },
            { name: 'obstacleDetected',     from: 'moving',  to: 'searching' },
            { name: 'turnLeft',             from: 'search',  to: 'moving' },
            { name: 'turnRight',            from: 'search',  to: 'moving' },
        ],
        callbacks: {
            onenter: (options) => {
                console.log("onEnter: " + options.name);
            },
            onentered: (options) => {
                console.log("onEntered: " + options.name);
            },
            onleave: (options) => {
                console.log("onleave: " + options.name);
            },
            
            ongoForward: (options) => {
                return psybot.motorsAsync.forward();
            },

            onentermoving: (options) => {
                
            },

            onobstacleDetected: () => {
                console.log("2) onobstacleDetected - this", this);
                return psybot.motorsAsync.brake();
            },

            onentersearching: (options) => {
                console.log("3) onentersearching - this", this);
                options.next = "left";
                
                // console.log(options)
                return options;
            },
            onenteredsearching: (options) => {
                console.log("4) onenteredsearching - this", this);
                return options;
            },
            onleavesearching: (options) => {
                console.log("5) onenteredsearching - this", this);
                console.log("next:" + options.next);
                return options;
            },
            onturnLeft: async () => {
                await psybot.motorsAsync.left();
            },
            onturnRight: async () => {          
                await psybot.motorsAsync.right();
            },
        },
        error: (msg, options) => {
            console.error("Errrroror found: " + msg);
            console.log(options);
            // console.log(this);
        }
    });

    psybot.sonar.setObstacleDetectedCallback(() => {
        if(fsm.can("obstacleDetected")) {
            console.log("1) raising obstacleDetected")
            fsm.obstacleDetected();
        }
    });

    setInterval(() => console.log("Current state: " + fsm.current), 2000);

    return fsm;
  })
  .then((stateMachine) => {
    return stateMachine.goForward();
  })
  .done();