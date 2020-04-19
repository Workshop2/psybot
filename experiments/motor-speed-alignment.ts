import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');
import delay from "../psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);
  await psybot.motors.brakeAsync();
  
  //await psybot.motors.setSpeedAsync(130);
  console.log("speed", psybot.motors.speed);

  console.log("3")
  await delay(1000);
  console.log("2")
  await delay(1000);
  console.log("1")
  await delay(1000);

  await psybot.motors.forwardAsync();
  await delay(12000);

  await psybot.motors.brakeAsync();
}

run();