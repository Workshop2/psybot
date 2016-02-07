"use strict";
var j5 = require("johnny-five");
var psybotMotors = require("./components/motors");
var Psybot = (function () {
    function Psybot() {
        var boardOptions = new BoardOptions("/dev/ttyAMA0");
        this.board = new j5.Board();
        var leftPins = new psybotMotors.MotorPins(9, 2, 3);
        var rightPins = new psybotMotors.MotorPins(10, 4, 5);
        this.motors = new psybotMotors.Motors(leftPins, rightPins);
    }
    return Psybot;
}());
exports.Psybot = Psybot;
var BoardOptions = (function () {
    function BoardOptions(port) {
        this.port = port;
    }
    return BoardOptions;
}());
