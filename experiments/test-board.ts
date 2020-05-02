import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');

const run = async () => {

    if(config.settings.usbConnection) {
      console.log("Connecting via USB...")
    }
    else {
      console.log("Connecting via serialport...")
    }

    var psybot = await Psybot.Create(config.settings.usbConnection);
    console.log("Connected :)");

    await psybot.frontArm.centerAsync();
};

run();