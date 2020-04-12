"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shields {
}
exports.Shields = Shields;
Shields.M1 = {
    pins: {
        pwm: 8,
        dir: 9,
        cdir: 10
    },
    address: 0x60,
    controller: "PCA9685"
};
Shields.M2 = {
    pins: {
        pwm: 13,
        dir: 12,
        cdir: 11
    },
    address: 0x60,
    controller: "PCA9685"
};
Shields.M3 = {
    pins: {
        pwm: 2,
        dir: 3,
        cdir: 4
    },
    address: 0x60,
    controller: "PCA9685"
};
Shields.M4 = {
    pins: {
        pwm: 7,
        dir: 6,
        cdir: 5
    },
    address: 0x60,
    controller: "PCA9685"
};
//# sourceMappingURL=shields.js.map