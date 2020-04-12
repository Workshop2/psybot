"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const psybot_1 = require("./psybot-lib/psybot");
var config = require('./config/config');
psybot_1.Psybot.Create(config.settings.usbConnection)
    .then((psybot) => {
    psybot.frontArm.centerAsync()
        .then(() => psybot.frontArm.faceUpAsync())
        .then(() => psybot.frontArm.centerAsync())
        .then(() => psybot.frontArm.faceDownAsync())
        .then(() => psybot.frontArm.centerAsync())
        .then(() => psybot.frontArm.faceLeftAsync())
        .then(() => psybot.frontArm.centerAsync())
        .then(() => psybot.frontArm.faceRightAsync())
        .then(() => psybot.frontArm.centerAsync())
        .then(() => psybot.frontArm.sweepLeftAsync())
        .then(() => psybot.frontArm.sweepUpDownAsync())
        .done();
})
    .done();
//# sourceMappingURL=servos-async.js.map