"use strict";
var j5 = require("johnny-five");
var board = new j5.Board({ port: "/dev/ttyAMA0" });
board.on("ready", function () {
    this.repl.inject({ board: board });
    console.log("Connected :)");
});
