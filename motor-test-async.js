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
    psybot.motors.setSpeedAsync(200);
    yield psybot.motors.forwardAsync();
    yield delay_1.default(1000);
    yield psybot.motors.setSpeedAsync(100);
    yield delay_1.default(1000);
    yield psybot.motors.setSpeedAsync(50);
    yield delay_1.default(1000);
    yield psybot.motors.reverseAsync();
    yield delay_1.default(1000);
    yield psybot.motors.setSpeedAsync(520);
    yield delay_1.default(1000);
    yield psybot.motors.brakeAsync();
    yield delay_1.default(1000);
    yield psybot.motors.setSpeedAsync(250);
    yield delay_1.default(1000);
    yield psybot.motors.rightAsync();
    yield delay_1.default(1000);
    yield psybot.motors.setSpeedAsync(70);
    yield delay_1.default(1000);
    yield psybot.motors.leftAsync();
    yield delay_1.default(1000);
    yield psybot.motors.brakeAsync();
});
run();
//# sourceMappingURL=motor-test-async.js.map