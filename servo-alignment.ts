import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');
import { Servo } from "johnny-five";
import delay from "./psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);

  const armPins = {
    bottomServoPin: 9,
    topServoPin: 10
  }

  const pin = armPins.bottomServoPin;

  var servo = new Servo({
    pin: pin,
    range: [30, 180],
    center: true
  });

  servo.min();
  await delay(5000);
  servo.max();
  await delay(5000);
  servo.center();
};

run();
