import { Promise } from "q";
import { Psybot } from "./psybot-lib/psybot";
var StateMachine = require('fsm-as-promised');
var config = require('./config/config');

StateMachine.Promise = Promise;

Psybot.Create(config.settings.usbConnection)
  .then((psybot) => {

    var fsm = new StateMachine({
        events: [
            { name: 'forward',              from: 'none',    to: 'moving' },
            { name: 'obstacleDetected',     from: 'moving',  to: 'stopped' },
            // { name: 'freeze',   from: 'liquid', to: 'solid'  },
            // { name: 'vaporize', from: 'liquid', to: 'gas'    },
            // { name: 'condense', from: 'gas',    to: 'liquid' }
        ],
        callbacks: {
            onforward: () =>  {
                console.log("onforward");
                return psybot.motorsAsync.forward();
            },
            onobstacleDetected: () => {
                console.log("onobstacleDetected");
                return psybot.motorsAsync.brake();
            },
            // onmelt:     () =>  console.log('I melted'),
            // onfreeze:   () =>  console.log('I froze'),
            // onvaporize: () =>  console.log('I vaporized'),
            // oncondense: () =>  console.log('I condensed')
        },
        error: (msg, options) => {
            console.error("Errrroror found: " + msg);
            console.log(options);
            console.log(this);
        }
    });

    psybot.sonar.setObstacleDetectedCallback(() => {
        //console.log("I AM CALLING")
        fsm.obstacleDetected()
            .done(); //<<<<<< "THIS ISN'T CALLING - WHYEEE?"22
        //console.log(test);
        //console.log("after")
    });
    
    // fsm.forward()
    //     .then(() => {
    //         fsm.obstacleDetected();
    //     });
    return fsm;
  })
  .then((stateMachine) => {
    return stateMachine.forward();
  })
  .done();

// console.log(fsm.current);
// fsm.melt()
//     .then(() => console.log(fsm.current))
//     .then(() => fsm.vaporize())
//     .then(() => console.log(fsm.current))
//     .then(() => fsm.condense())
//     .then(() => console.log(fsm.current))
//     .then(() => fsm.freeze())
//     .then(() => console.log(fsm.current))
//     .done();