import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');
const { Compass } = require("johnny-five");
import delay from "../psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);

  const compass = new Compass({
    controller: "HMC5883L"
  });

  compass.on("change", () => {
    const {bearing, heading} = compass;
    console.log("Compass:");
    console.log("  bearing     : ", bearing);
    console.log("  heading     : ", heading);
    console.log("--------------------------------------");
  });
}

run();