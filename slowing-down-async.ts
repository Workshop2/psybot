import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');
import delay from "./psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);

  setInterval(() => psybot.motors.setSpeed(psybot.motors.speed - 10), 1000);

  await psybot.motors.forward();
  await delay(5000);

  await psybot.motors.reverse();
  await delay(5000);

  await psybot.motors.forward();
  await delay(5000);

  await psybot.motors.reverse();
  await delay(5000);

  await psybot.motors.brake();
  await delay(5000);
};

run();
