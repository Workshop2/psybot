"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var q_1 = require("q");
var psybot_1 = require("./psybot-lib/psybot");
var StateMachine = require('fsm-as-promised');
var config = require('./config/config');
StateMachine.Promise = q_1.Promise;
psybot_1.Psybot.Create(config.settings.usbConnection)
    .then(function (psybot) {
    var fsm = new StateMachine({
        events: [
            { name: 'forward', from: 'none', to: 'moving' },
            { name: 'obstacleDetected', from: 'moving', to: 'stopped' },
        ],
        callbacks: {
            onforward: function () {
                console.log("onforward");
                return psybot.motorsAsync.forward();
            },
            onobstacleDetected: function () {
                console.log("onobstacleDetected");
                return psybot.motorsAsync.brake();
            },
        },
        error: function (msg, options) {
            console.error("Errrroror found: " + msg);
            console.log(options);
            console.log(_this);
        }
    });
    psybot.sonar.setObstacleDetectedCallback(function () {
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
    .then(function (stateMachine) {
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
//# sourceMappingURL=state-machine.js.map