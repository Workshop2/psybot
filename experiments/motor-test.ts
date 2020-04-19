import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');
import delay from "../psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);
  psybot.motors.setSpeedAsync(200);
  
  await psybot.motors.forwardAsync();
  await delay(1000);
  await psybot.motors.setSpeedAsync(100);
  await delay(1000);
  await psybot.motors.setSpeedAsync(50);
  await delay(1000);
  await psybot.motors.reverseAsync();
  await delay(1000);
  await psybot.motors.setSpeedAsync(520);
  await delay(1000);
  await psybot.motors.brakeAsync();
  await delay(1000);
  await psybot.motors.setSpeedAsync(250);
  await delay(1000);
  await psybot.motors.rightAsync();
  await delay(1000);
  await psybot.motors.setSpeedAsync(70);
  await delay(1000);
  await psybot.motors.leftAsync();
  await delay(1000);
  await psybot.motors.brakeAsync();
}

run();