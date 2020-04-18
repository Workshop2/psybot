import j5 = require("johnny-five");

var board = new j5.Board();

board.on("ready", function() {  
  var analog = new j5.Pin("A5");
  console.log("pin", analog);

  setInterval(() => {
    console.log("querying...");
    analog.query((state) => {
      console.log(state.value);
    });
  }, 500);}
);