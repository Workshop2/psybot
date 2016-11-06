/// <reference path="../../../typings/index.d.ts"/>
/// <reference path="../../../psybot-lib/components/motors" />

import components = require("../../../psybot-lib/components/motors");
import j5 = require("johnny-five");

var leftPins = new components.MotorPins(1,1,1);
var rightPins = new components.MotorPins(1,1,1);
var motors = new components.Motors(leftPins, rightPins);

 /*
describe('Dog', function () {


    describe('#getName()', function () {
        it("should return the name it's constructed with", function () {

        });
    });
});
*/
