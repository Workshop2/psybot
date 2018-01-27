"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var psybot_1 = require("./psybot-lib/psybot");
var config = require('./config/config');
psybot_1.Psybot.Create(config.settings.usbConnection)
    .then(function (psybot) {
    psybot.motorsAsync.setSpeed(200)
        .then(function () { return psybot.motorsAsync.forward(); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.setSpeed(100); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.setSpeed(50); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.reverse(); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.setSpeed(520); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.brake(); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.setSpeed(250); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.right(); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.setSpeed(70); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.left(); })
        .delay(1000)
        .then(function () { return psybot.motorsAsync.brake(); })
        .done();
})
    .done();
//# sourceMappingURL=motor-test-async.js.map