import {
    BNO055,
    // Enums:
    OpMode,
    DeviceAddress,
    PowerLevel,
  } from 'bno055-imu-node';
  import delay from "../psybot-lib/delay";
  
  // All BNO055 instance methods are async and return a promise
  (async () => {
    try {
        // Start the sensor
        // The begin method performs basic connection verification and resets the device
        const imu = await BNO055.begin(
            DeviceAddress.A,    // Address enum: A = 0x28, B = 0x29
            OpMode.FullFusion,   // Operation mode enum
            3 // Use this seral device: /dev/i2c-3
        );

        await imu.resetSystem();

        const printEverything = async () => {

            console.log('current mode: ', await imu.getMode());
            console.log('current page: ', await imu.getPage());
            console.log('system status: ', await imu.getSystemStatus());
            console.log('system error: ', await imu.getSystemError());
            console.log('temp: ', await imu.getTemperature());
            console.log('self-test results: ', await imu.getSelfTestResults());

            console.log('axis mapping: ', await imu.getAxisMapping());
            console.log('versions: ', await imu.getVersions());
            console.log('units: ', await imu.getUnits());
            console.log('euler: ', await imu.getEuler());
            console.log('quat: ', await imu.getQuat());
            console.log('calibration: ', await imu.getCalibrationStatuses());
            console.log('is calibrated: ', await imu.isFullyCalibrated());
            console.log('offsets: ', await imu.getSensorOffsets());
            
            setTimeout(printEverything, 3333);
        };

        await printEverything();
    }
    catch (error) {
        console.error('error: ', error);
    }
  })();