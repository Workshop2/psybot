import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');

Psybot.Create(config.settings.usbConnection)
  .then(async (psybot) => {
    await psybot.motors.brake();
    await psybot.frontArm.centerAsync();
  });