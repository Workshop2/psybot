/// <reference path="./typings/index.d.ts"/>
import j5 = require("johnny-five");

var board = new j5.Board({port: "/dev/ttyAMA0"});

board.on("ready", function() {  
    var proximity = new j5.IR.Proximity({
      controller: "GP2Y0A21YK",
      pin: "A4"
    });

    proximity.on("data", function() {
      console.log("inches: ", this.inches);
      console.log("cm: ", this.cm);
    });
    
});
