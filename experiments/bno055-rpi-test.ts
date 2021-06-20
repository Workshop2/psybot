import {
    BNO055,
    // Enums:
    OpMode,
    DeviceAddress,
    PowerLevel,
  } from 'bno055-imu-node';
  
  // All BNO055 instance methods are async and return a promise
  (async () => {
    // Start the sensor
    // The begin method performs basic connection verification and resets the device
    const imu = await BNO055.begin(
      DeviceAddress.A,    // Address enum: A = 0x28, B = 0x29
      OpMode.FullFusion,   // Operation mode enum
      3 // /dev/i2c-3
    );
  
    // Verify that the device is connected (will throw an error if not)
    await imu.verifyConnection();

    // // Get the sensors' calibration status
    // const calibration = await imu.getCalibrationStatuses();
  
    // // Check to see if the device is fully calibrated
    // const isCalibrated = await imu.isFullyCalibrated();
  
    // // Get information about the device's operational systems
    // const systemStatus = await imu.getSystemStatus();
    // const systemError = await imu.getSystemError();
    // const selfTestResults = await imu.getSelfTestResults();
    // const versions = await imu.getVersions();
  
    // // Get the device's orientation as a quaternion object { x, y, z, w }
    // const quat = await imu.getQuat();
  
    // // Force the device to reset
    // await imu.resetSystem();
  
    // // Set the device power level (Normal, Low, or Suspend)
    // await imu.setPowerLevel(PowerLevel.Normal);
  
    // // Force the device to use an external clock source
    // await imu.useExternalClock();
  
  })();