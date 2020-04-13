import j5 = require("johnny-five");
import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);
  await psybot.frontArm.centerAsync();
  await psybot.frontArm.faceUpAsync();
  await psybot.frontArm.centerAsync();
  await psybot.frontArm.faceDownAsync();
  await psybot.frontArm.centerAsync();
  await psybot.frontArm.faceLeftAsync();
  await psybot.frontArm.centerAsync();
  await psybot.frontArm.faceRightAsync();
  await psybot.frontArm.centerAsync();
  await psybot.frontArm.sweepLeftAsync();
  await psybot.frontArm.sweepUpDownAsync();
}

run();