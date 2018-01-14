# psybot
An Arduino/RPi robot built on NodeJs &amp; Typescript with Johnny5

## setup
```bash
sudo apt-get remove nodered -y
sudo apt-get remove nodejs nodejs-legacy -y
sudo apt-get remove npm  -y

# Install Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# Rerun Profile script to start NVM
source ~/.bashrc 

nvm install 8 
nvm use 8 

sudo python setup.py
npm install
```
