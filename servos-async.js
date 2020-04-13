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
psybot_1.Psybot.Create(config.settings.usbConnection)
    .then((psybot) => __awaiter(void 0, void 0, void 0, function* () {
    yield psybot.frontArm.centerAsync();
    yield psybot.frontArm.faceUpAsync();
    yield psybot.frontArm.centerAsync();
    yield psybot.frontArm.faceDownAsync();
    yield psybot.frontArm.centerAsync();
    yield psybot.frontArm.faceLeftAsync();
    yield psybot.frontArm.centerAsync();
    yield psybot.frontArm.faceRightAsync();
    yield psybot.frontArm.centerAsync();
    yield psybot.frontArm.sweepLeftAsync();
    yield psybot.frontArm.sweepUpDownAsync();
}))
    .done();
//# sourceMappingURL=servos-async.js.map