# psybot
An Arduino/RPi robot built on NodeJs &amp; Typescript with Johnny5

## setup
```bash
sudo raspi-config
# expand SD card (under advance)
# disable serial console
# enable serial port (under interfaces, https://serialport.io/docs/guide-installation#raspberry-pi-linux)
# disable i2c (under interfaces, https://gps-pie.com/pi_i2c_config.htm)
# increase resolution (under advance)
# reboot

sudo apt-get remove nodered -y
sudo apt-get remove nodejs nodejs-legacy -y
sudo apt-get remove npm  -y

# Install Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# Rerun Profile script to start NVM
source ~/.bashrc 

## Try increasing the version number
## Note: If node starts downloading source rather than install, cancel and decrease the version number
nvm install 11
nvm use 11

# Upgrade npm
npm install -g npm -y

# Install node-gyp
npm install -g node-gyp -y

sudo nano /boot/config.txt
# set: enable_uart=1

sudo python setup.py
npm install
```

### Windows
#### Alt
```powershell
choco install python2 visualcpp-build-tools -y
npm config set msvs_version 2017
```

#### Probably broken:
You will probably need to run this to ensure python 2.7 and VS Build tools are installed and working
`npm install --global --production windows-build-tools`
_(if that fails, use `npm install --global --production windows-build-tools@4.0.0` )_

## build typescript (manual)
`npm run build`

## build (watch)
`tsc -w`

# State machine
To view in vs-code:
```powershell
code --install-extension thankcreate.power-fsm-viewer
```

Then when open, press `CTRL` + `SHIFT` + `P` and search for `FSM View: Open` and it will visualise the state machine file you have open :smile:

# Compass sensor
This is connected to the RPI via a bit banged I2C connection. To confirm it is detected you can run the following in bash/shell
`sudo i2cdetect -y -r 3`

You should see it detect as 28
https://gps-pie.com/pi_i2c_config.htm

## Remote development (Windows -> Raspberry Pi)
1. https://electrobotify.wordpress.com/2019/08/14/passwordless-ssh-into-raspberry-pi-with-openssh/
1. `ssh pi@192.168.3.13`