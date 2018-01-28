var StateMachine = require('fsm-as-promised');
import { Promise } from "q";

StateMachine.Promise = Promise;

var fsm = new StateMachine({
    initial: 'solid',
    events: [
        { name: 'melt',     from: 'solid',  to: 'liquid' },
        { name: 'freeze',   from: 'liquid', to: 'solid'  },
        { name: 'vaporize', from: 'liquid', to: 'gas'    },
        { name: 'condense', from: 'gas',    to: 'liquid' }
    ],
    callbacks: {
        onmelt:     () =>  console.log('I melted'),
        onfreeze:   () =>  console.log('I froze'),
        onvaporize: () =>  console.log('I vaporized'),
        oncondense: () =>  console.log('I condensed')
    }
});

console.log(fsm.current);
fsm.melt()
    .then(() => console.log(fsm.current))
    .then(() => fsm.vaporize())
    .then(() => console.log(fsm.current))
    .then(() => fsm.condense())
    .then(() => console.log(fsm.current))
    .then(() => fsm.freeze())
    .then(() => console.log(fsm.current))
    .done();