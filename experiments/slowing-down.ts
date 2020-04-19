import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');
import delay from "../psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);

  setInterval(() => psybot.motors.setSpeedAsync(psybot.motors.speed - 10), 1000);

  await psybot.motors.forwardAsync();
  await delay(5000);

  await psybot.motors.reverseAsync();
  await delay(5000);

  await psybot.motors.forwardAsync();
  await delay(5000);

  await psybot.motors.reverseAsync();
  await delay(5000);

  await psybot.motors.brakeAsync();
  await delay(5000);
};

run();
