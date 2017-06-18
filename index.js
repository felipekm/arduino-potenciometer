const five = require("johnny-five");
const board = new five.Board();

let potentiometer;

board.on("ready", function() {

  // Creates a new `led` instance configured in pin 9
  var led = new five.Led(9);

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer
  });

  // "data" get the current reading from the potentiometer
  potentiometer.on("change", function(value) {

    // map the potentiometer scale (0-1023) with the led scale (0-255)
    var brightValue = five.Fn.constrain(five.Fn.map(value, 0, 1023, 0, 255), 0, 255);
    var percentValue = five.Fn.constrain(five.Fn.map(brightValue, 0, 255, 0, 100), 0, 100);

    console.log(`> Led Brightness: ${percentValue}%`);

    // 0 - 255
    led.brightness(brightValue);
  });
});
