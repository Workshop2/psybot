import { Motor, MotorOption } from "johnny-five";

export class Shields {
    public static M1 : MotorOption = {
        pins: {
          pwm: 8,
          dir: 9,
          cdir: 10
        },
        address: 0x60,
        controller: "PCA9685"
      };

      public static M2 : MotorOption = {
        pins: {
          pwm: 13,
          dir: 12,
          cdir: 11
        },
        address: 0x60,
        controller: "PCA9685"
      };

      public static M3 : MotorOption = {
        pins: {
          pwm: 2,
          dir: 3,
          cdir: 4
        },
        address: 0x60,
        controller: "PCA9685"
      };

      public static M4 : MotorOption = {
        pins: {
          pwm: 7,
          dir: 6,
          cdir: 5
        },
        address: 0x60,
        controller: "PCA9685"
      };
}