"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Promise } from "q";
const psybot_1 = require("./psybot-lib/psybot");
var StateMachine = require('fsm-as-promised');
var config = require('./config/config');
//StateMachine.Promise = Promise;
psybot_1.Psybot.Create(config.settings.usbConnection)
    .then((psybot) => {
    var fsm = new StateMachine({
        events: [
            { name: 'forward', from: 'none', to: 'moving' },
            { name: 'obstacleDetected', from: 'moving', to: 'search' },
        ],
        callbacks: {
            onforward: () => {
                console.log("onforward");
                return psybot.motorsAsync.forward();
            },
            onobstacleDetected: () => __awaiter(void 0, void 0, void 0, function* () {
                console.log("onobstacleDetected");
                yield psybot.motorsAsync.brake();
                console.log("HAI");
            }),
            onsearch: () => {
                console.log("search");
                return psybot.motorsAsync.brake();
            },
        },
        error: (msg, options) => {
            console.error("Errrroror found: " + msg);
            console.log(options);
            // console.log(this);
        }
    });
    psybot.sonar.setObstacleDetectedCallback(() => {
        if (fsm.current == "moving") {
            fsm.obstacleDetected()
                .done();
        }
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
//# sourceMappingURL=state-machine.js.map