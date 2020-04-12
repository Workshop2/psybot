"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const j5 = require("johnny-five");
var board = new j5.Board();
board.on("ready", function () {
    var proximity = new j5.Proximity({
        controller: "GP2Y0A21YK",
        pin: "A0"
    });
    proximity.on("data", function () {
        console.log("inches: ", this.inches);
        console.log("cm: ", this.cm);
    });
});
//# sourceMappingURL=sensor-test.js.map