import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');
const { Accelerometer } = require("johnny-five");
import delay from "../psybot-lib/delay";
require('console-stamp')(console, 'HH:MM:ss.l');

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);

  console.log("Stopped")
  await delay(2000);

  console.log("Moving forward")
  await psybot.motors.forwardAsync();
  await delay(2000);

  console.log("Stopped")
  await delay(2000);

  console.log("Moving forward")
  await psybot.motors.forwardAsync();
  await delay(2000);

  console.log("Stopped")
  await delay(2000);

  console.log("Moving forward")
  await psybot.motors.forwardAsync();
  await delay(2000);

  console.log("Stopped")
  await delay(2000);

  console.log("Moving forward")
  await psybot.motors.forwardAsync();
  await delay(2000);

  console.log("Stopped")
  await delay(2000);

  console.log("Moving forward")
  await psybot.motors.forwardAsync();
  await delay(2000);

  console.log("Stopped")
  await delay(2000);

  console.log("Moving forward")
  await psybot.motors.forwardAsync();
  await delay(2000);
}

run();