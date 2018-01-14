import { Board } from "johnny-five";

var config = require('./config/config');
let port = (config.settings.usbConnection as boolean)
            ? null
            : {port: "/dev/ttyAMA0"};

if(port === null) {
  console.log("Connecting via USB")
}
else {
  console.log("Connecting to serial: " + port.port)
}

var board = new Board(port);

board.on("ready", function() {
  this.repl.inject({board: board});
  console.log("Connected :)");
});