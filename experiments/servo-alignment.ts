import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');
import { Servo } from "johnny-five";
import delay from "../psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);

  const armPins = {
    bottomServoPin: 9,
    topServoPin: 10
  }

  const pin = armPins.bottomServoPin;

  var servo = new Servo({
    pin: pin,
    range: [20, 180],
    center: true
  });

  console.log("range", servo.range);

  console.log("center");
  servo.center();
  await delay(5000);

  console.log("min");
  servo.min();
  await delay(5000);

  console.log("max");
  servo.max();
  await delay(5000);

  console.log("center");
  servo.center();
};

run();
