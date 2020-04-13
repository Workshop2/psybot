import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');
import delay from "./psybot-lib/delay";

const run = async () => {
  var psybot = await Psybot.Create(config.settings.usbConnection);

  setInterval(() => psybot.motorsAsync.setSpeed(psybot.motorsAsync.speed - 10), 1000);

  await psybot.motorsAsync.forward();
  await delay(5000);

  await psybot.motorsAsync.reverse();
  await delay(5000);

  await psybot.motorsAsync.forward();
  await delay(5000);

  await psybot.motorsAsync.reverse();
  await delay(5000);

  await psybot.motorsAsync.brake();
  await delay(5000);
};

run();
