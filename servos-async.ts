import j5 = require("johnny-five");
import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');

Psybot.Create(config.settings.usbConnection)
  .then((psybot) => {
    psybot.frontArm.centerAsync()
    .then(() => psybot.frontArm.faceUpAsync())
      .then(() => psybot.frontArm.centerAsync())
      .then(() => psybot.frontArm.faceDownAsync())
      .then(() => psybot.frontArm.centerAsync())
      .then(() => psybot.frontArm.faceLeftAsync())
      .then(() => psybot.frontArm.centerAsync())
      .then(() => psybot.frontArm.faceRightAsync())
      .then(() => psybot.frontArm.centerAsync())
      .then(() => psybot.frontArm.sweepLeftAsync())
      .then(() => psybot.frontArm.sweepUpDownAsync())      
      .done();
  })
  .done();
