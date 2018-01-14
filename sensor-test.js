"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var j5 = require("johnny-five");
var board = new j5.Board({ port: "/dev/ttyAMA0" });
board.on("ready", function () {
    var proximity = new j5.IR.Proximity({
        controller: "GP2Y0A21YK",
        pin: "A0"
    });
    proximity.on("data", function () {
        console.log("inches: ", this.inches);
        console.log("cm: ", this.cm);
    });
});
//# sourceMappingURL=sensor-test.js.map