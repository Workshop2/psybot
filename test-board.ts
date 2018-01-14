import async = require("async");
import j5 = require("johnny-five");
import psybotMotors = require("./psybot-lib/components/motors");

var board = new j5.Board({port: "/dev/ttyAMA0"});

board.on("ready", function() {
  this.repl.inject({board: board});
  console.log("Connected :)");
});