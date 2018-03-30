"use strict";
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
            { name: 'forward', from: 'none', to: 'obstacleDetected' },
            { name: 'obstacleDetected', from: 'forward' },
        ],
        callbacks: {
            onforward: function () {
                console.log("Moving forward...");
                psybot.motorsAsync.forward();
            },
            obstacleDetected: function () {
                console.log("Stopping...");
                psybot.motorsAsync.brake();
            },
        }
    });
    psybot.sonar.setObstacleDetectedCallback(function () {
        fsm.obstacleDetected();
    });
    fsm.forward();
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