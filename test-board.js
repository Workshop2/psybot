var five = require('johnny-five');
var board, led;
console.log("Get a new board");
board = new five.Board({ port: "/dev/ttyAMA0" });
board.on("ready", function () {
    console.log("J5 Firing LEDs");
    var val = 0;
    this.pinMode(13, 1);
    this.loop(1000, function () {
        this.digitalWrite(13, (val = val ? 0 : 1));
    });
});
