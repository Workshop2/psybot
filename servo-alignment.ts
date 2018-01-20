import j5 = require("johnny-five");
import psybotLib = require("./psybot-lib/psybot");
import { Servo } from "johnny-five";

var config = require('./config/config');
const argv = require('yargs').argv;

var psybot = new psybotLib.Psybot(config.settings.usbConnection);

psybot.board.on("ready", function() {
  this.repl.inject({psybot: psybot});

  const min = argv.min | 0;
  const max = argv.max | 180;
  
  new Servo({
    pin: 9,
    range: [min, max],
    center: true
  });
});
