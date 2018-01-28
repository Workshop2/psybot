"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = require('fsm-as-promised');
var q_1 = require("q");
StateMachine.Promise = q_1.Promise;
var fsm = new StateMachine({
    initial: 'solid',
    events: [
        { name: 'melt', from: 'solid', to: 'liquid' },
        { name: 'freeze', from: 'liquid', to: 'solid' },
        { name: 'vaporize', from: 'liquid', to: 'gas' },
        { name: 'condense', from: 'gas', to: 'liquid' }
    ],
    callbacks: {
        onmelt: function () { return console.log('I melted'); },
        onfreeze: function () { return console.log('I froze'); },
        onvaporize: function () { return console.log('I vaporized'); },
        oncondense: function () { return console.log('I condensed'); }
    }
});
console.log(fsm.current);
fsm.melt()
    .then(function () { return console.log(fsm.current); })
    .then(function () { return fsm.vaporize(); })
    .then(function () { return console.log(fsm.current); })
    .then(function () { return fsm.condense(); })
    .then(function () { return console.log(fsm.current); })
    .then(function () { return fsm.freeze(); })
    .then(function () { return console.log(fsm.current); })
    .done();
//# sourceMappingURL=state-machine.js.map