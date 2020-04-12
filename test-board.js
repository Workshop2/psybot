"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const johnny_five_1 = require("johnny-five");
var config = require('./config/config');
let port = config.settings.usbConnection
    ? null
    : { port: "/dev/serial0" };
if (port === null) {
    console.log("Connecting via USB");
}
else {
    console.log("Connecting to serial: " + port.port);
}
var board = new johnny_five_1.Board(port);
board.on("ready", function () {
    this.repl.inject({ board: board });
    console.log("Connected :)");
});
//# sourceMappingURL=test-board.js.map