import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');

Psybot.Create(config.settings.usbConnection)
  .then(async (psybot) => {
    await psybot.motors.brakeAsync();
    await psybot.frontArm.centerAsync();
  });