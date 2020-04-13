import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');
import delay from "./psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);
  psybot.motors.setSpeed(200);
  
  await psybot.motors.forward();
  await delay(1000);
  await psybot.motors.setSpeed(100);
  await delay(1000);
  await psybot.motors.setSpeed(50);
  await delay(1000);
  await psybot.motors.reverse();
  await delay(1000);
  await psybot.motors.setSpeed(520);
  await delay(1000);
  await psybot.motors.brake();
  await delay(1000);
  await psybot.motors.setSpeed(250);
  await delay(1000);
  await psybot.motors.right();
  await delay(1000);
  await psybot.motors.setSpeed(70);
  await delay(1000);
  await psybot.motors.left();
  await delay(1000);
  await psybot.motors.brake();
}

run();