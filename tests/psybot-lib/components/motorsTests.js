"use strict";
var components = require("../../../psybot-lib/components/motors");
var leftPins = new components.MotorPins(1, 1, 1);
var rightPins = new components.MotorPins(1, 1, 1);
var motors = new components.Motors(leftPins, rightPins);
