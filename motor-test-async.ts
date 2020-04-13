import { Psybot } from "./psybot-lib/psybot";
var config = require('./config/config');

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

Psybot.Create(config.settings.usbConnection)
  .then(async (psybot) => {
    psybot.motorsAsync.setSpeed(200);
    
    await psybot.motorsAsync.forward();
    await delay(1000);
    await psybot.motorsAsync.setSpeed(100);
    await delay(1000);
    await psybot.motorsAsync.setSpeed(50);
    await delay(1000);
    await psybot.motorsAsync.reverse();
    await delay(1000);
    await psybot.motorsAsync.setSpeed(520);
    await delay(1000);
    await psybot.motorsAsync.brake();
    await delay(1000);
    await psybot.motorsAsync.setSpeed(250);
    await delay(1000);
    await psybot.motorsAsync.right();
    await delay(1000);
    await psybot.motorsAsync.setSpeed(70);
    await delay(1000);
    await psybot.motorsAsync.left();
    await delay(1000);
    await psybot.motorsAsync.brake();
  })
  .done();
