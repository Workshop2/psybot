# psybot
An Arduino/RPi robot built on NodeJs &amp; Typescript with Johnny5

## setup
```bash
sudo raspi-config
# expand SD card (under advance)
# disable serial (under interfaces)
# increase resolution (under advance)
# reboot

sudo apt-get remove nodered -y
sudo apt-get remove nodejs nodejs-legacy -y
sudo apt-get remove npm  -y

# Install Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# Rerun Profile script to start NVM
source ~/.bashrc 

nvm install 8 
nvm use 8 

sudo nano /boot/config.txt
# set: enable_uart=1

sudo python setup.py
npm install
```

### Windows
You will probably need to run this to ensure python 2.7 and VS Build tools are installed and working
`npm install --global --production windows-build-tools`