var psybot;
(function (psybot) {
    var components;
    (function (components) {
        var Motors = (function () {
            function Motors(pins) {
                this.pins = pins;
            }
            Motors.prototype.forward = function (speed) {
            };
            Motors.prototype.reverse = function (speed) {
            };
            Motors.prototype.brake = function (speed) {
            };
            Motors.prototype.left = function (speed) {
            };
            Motors.prototype.right = function (speed) {
            };
            return Motors;
        }());
        components.Motors = Motors;
        var MotorPins = (function () {
            function MotorPins(pwm, dir, cdir) {
                this.pwm = pwm;
                this.dir = dir;
                this.cdir = cdir;
            }
            return MotorPins;
        }());
        components.MotorPins = MotorPins;
    })(components = psybot.components || (psybot.components = {}));
})(psybot || (psybot = {}));
