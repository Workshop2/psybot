import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');
const { Accelerometer } = require("johnny-five");
import delay from "../psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);

  const accelerometer = new Accelerometer({
    controller: "ADXL345"
  });

  accelerometer.on("change", (data) => {
    console.log("X: %d", data.x);
    console.log("Y: %d", data.y);
  });
}

run();