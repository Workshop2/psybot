var Pins = (function () {
    function Pins(pwm, dir, cdir) {
        this.pwm = pwm;
        this.dir = dir;
        this.cdir = cdir;
    }
    return Pins;
}());
