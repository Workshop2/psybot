import j5 = require("johnny-five");
import async = require("async");
import psybotLib = require("./psybot-lib/psybot");
var config = require('./config/config');

var psybot = new psybotLib.Psybot(config.settings.usbConnection);

psybot.board.on("ready", function() {
  this.repl.inject({psybot: psybot});
  psybot.motorsAsync.setSpeed(200)
    .then(() => psybot.motorsAsync.forward())
    .delay(1000)
    .then(() => psybot.motorsAsync.setSpeed(100))
    .delay(1000)
    .then(() => psybot.motorsAsync.setSpeed(50))
    .delay(1000)
    .then(() => psybot.motorsAsync.reverse())
    .delay(1000)
    .then(() => psybot.motorsAsync.setSpeed(520))
    .delay(1000)
    .then(() => psybot.motorsAsync.brake())
    .delay(1000)
    .then(() => psybot.motorsAsync.setSpeed(250))
    .delay(1000)
    .then(() => psybot.motorsAsync.right())
    .delay(1000)
    .then(() => psybot.motorsAsync.setSpeed(70))
    .delay(1000)
    .then(() => psybot.motorsAsync.left())
    .delay(1000)
    .then(() => psybot.motorsAsync.brake())
    .done();
});
