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
const psybot_1 = require("./psybot-lib/psybot");
var config = require('./config/config');
const delay_1 = require("./psybot-lib/delay");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    var psybot = yield psybot_1.Psybot.Create(config.settings.usbConnection);
    psybot.motors.setSpeed(200);
    yield psybot.motors.forward();
    yield delay_1.default(1000);
    yield psybot.motors.setSpeed(100);
    yield delay_1.default(1000);
    yield psybot.motors.setSpeed(50);
    yield delay_1.default(1000);
    yield psybot.motors.reverse();
    yield delay_1.default(1000);
    yield psybot.motors.setSpeed(520);
    yield delay_1.default(1000);
    yield psybot.motors.brake();
    yield delay_1.default(1000);
    yield psybot.motors.setSpeed(250);
    yield delay_1.default(1000);
    yield psybot.motors.right();
    yield delay_1.default(1000);
    yield psybot.motors.setSpeed(70);
    yield delay_1.default(1000);
    yield psybot.motors.left();
    yield delay_1.default(1000);
    yield psybot.motors.brake();
});
run();
//# sourceMappingURL=motor-test-async.js.map