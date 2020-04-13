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
psybot_1.Psybot.Create(config.settings.usbConnection)
    .then((psybot) => __awaiter(void 0, void 0, void 0, function* () {
    psybot.motorsAsync.setSpeed(200);
    yield psybot.motorsAsync.forward();
    yield delay_1.default(1000);
    yield psybot.motorsAsync.setSpeed(100);
    yield delay_1.default(1000);
    yield psybot.motorsAsync.setSpeed(50);
    yield delay_1.default(1000);
    yield psybot.motorsAsync.reverse();
    yield delay_1.default(1000);
    yield psybot.motorsAsync.setSpeed(520);
    yield delay_1.default(1000);
    yield psybot.motorsAsync.brake();
    yield delay_1.default(1000);
    yield psybot.motorsAsync.setSpeed(250);
    yield delay_1.default(1000);
    yield psybot.motorsAsync.right();
    yield delay_1.default(1000);
    yield psybot.motorsAsync.setSpeed(70);
    yield delay_1.default(1000);
    yield psybot.motorsAsync.left();
    yield delay_1.default(1000);
    yield psybot.motorsAsync.brake();
}))
    .done();
//# sourceMappingURL=motor-test-async.js.map