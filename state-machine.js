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
var StateMachine = require('javascript-state-machine');
var config = require('./config/config');
//StateMachine.Promise = Promise;
psybot_1.Psybot.Create(config.settings.usbConnection)
    .then((psybot) => {
    var fsm = new StateMachine({
        events: [
            { name: 'goForward', from: 'none', to: 'moving' },
            { name: 'obstacleDetected', from: 'moving', to: 'searching' },
            { name: 'turnLeft', from: 'search', to: 'moving' },
            { name: 'turnRight', from: 'search', to: 'moving' },
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
            onturnLeft: () => __awaiter(void 0, void 0, void 0, function* () {
                yield psybot.motorsAsync.left();
            }),
            onturnRight: () => __awaiter(void 0, void 0, void 0, function* () {
                yield psybot.motorsAsync.right();
            }),
        },
        error: (msg, options) => {
            console.error("Errrroror found: " + msg);
            console.log(options);
            // console.log(this);
        }
    });
    psybot.sonar.setObstacleDetectedCallback(() => {
        if (fsm.can("obstacleDetected")) {
            console.log("1) raising obstacleDetected");
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
//# sourceMappingURL=state-machine.js.map