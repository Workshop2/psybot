import { Psybot } from "../psybot-lib/psybot";
var config = require('../config/config');
const { Board, IMU } = require("johnny-five");


const run = async () => {
  const board = config.settings.usbConnection
    ? new Board()
    : new Board({ port: "/dev/serial0" });

  board.on("ready", () => {
    console.log("creating imu...")
    const imu = new IMU({
      controller: "BNO055",
      enableExternalCrystal: false
    });
    console.log("Done")
    console.log("imu", imu)

    // imu.on("change", function() {
    //   console.log("change", this);
    // });

    imu.on("calibrated", function () {
      console.log("calibrated :)");
    });

    imu.on("data", function (err, data) {
      //console.log("data", this);
      // console.log("Accelerometer: %d, %d, %d", this.accelerometer.x, this.accelerometer.z, this.accelerometer.z);
      // console.log("Gyro: %d, %d, %d", this.gyro.x, this.gyro.z, this.gyro.z);
      // console.log("Temperature: %d", this.temperature.celsius);

      // console.log("Orientation:", this.orientation);
      // console.log("orientation");
      // console.log("  w            : ", imu.orientation?.quarternion?.w);
      // console.log("  x            : ", imu.orientation?.quarternion?.x);
      // console.log("  y            : ", imu.orientation?.quarternion?.y);
      // console.log("  z            : ", imu.orientation?.quarternion?.z);

      // console.log("  heading      : ", imu.orientation?.euler?.heading);
      // console.log("  roll         : ", imu.orientation?.euler?.roll);
      // console.log("  pitch        : ", imu.orientation?.euler?.pitch);

      console.log("magnetometer");
      console.log("  heading : ", Math.floor(imu?.magnetometer?.heading));
      console.log("  bearing : ", imu?.magnetometer?.bearing?.name);
      console.log("--------------------------------------");
    });


    // imu.orientation.on("change", () => {

    //   console.log("orientation");
    //   console.log("  w            : ", imu.quarternion.w);
    //   console.log("  x            : ", imu.quarternion.x);
    //   console.log("  y            : ", imu.quarternion.y); 
    //   console.log("  z            : ", imu.quarternion.z);

    //   console.log("  heading      : ", imu.euler.heading);
    //   console.log("  roll         : ", imu.euler.roll);
    //   console.log("  pitch        : ", imu.euler.pitch);

    //   console.log("--------------------------------------");

    // });
  });

}

run();