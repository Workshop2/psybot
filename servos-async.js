"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var psybot_1 = require("./psybot-lib/psybot");
var config = require('./config/config');
psybot_1.Psybot.Create(config.settings.usbConnection)
    .then(function (psybot) {
    psybot.frontArm.centerAsync()
        .then(function () { return psybot.frontArm.faceUpAsync(); })
        .then(function () { return psybot.frontArm.centerAsync(); })
        .then(function () { return psybot.frontArm.faceDownAsync(); })
        .then(function () { return psybot.frontArm.centerAsync(); })
        .then(function () { return psybot.frontArm.faceLeftAsync(); })
        .then(function () { return psybot.frontArm.centerAsync(); })
        .then(function () { return psybot.frontArm.faceRightAsync(); })
        .then(function () { return psybot.frontArm.centerAsync(); })
        .then(function () { return psybot.frontArm.sweepLeftAsync(); })
        .then(function () { return psybot.frontArm.sweepUpDownAsync(); })
        .done();
})
    .done();
//# sourceMappingURL=servos-async.js.map