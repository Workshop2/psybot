import { Psybot } from "./psybot-lib/psybot";
import { PsybotActor } from "./psybot-actor";
var config = require("./config/config");

const run = async () => {
    const psybot = await Psybot.Create(config.settings.usbConnection);

    const psybotActor = new PsybotActor(psybot);
    psybotActor.start();
}

run();