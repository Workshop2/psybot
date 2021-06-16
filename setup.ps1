choco install nodejs -y
choco install nvm -y
choco install python -y
choco install arduino -y
choco install vscode -y
choco install visualstudio2017buildtools -y
choco install visualstudio2017-workload-vctools -y

refreshenv

npm config set msvs_version 2017
npm install -g node-gyp -y
npm install -g typescript -y
npm install -g --production windows-build-tools@4.0.0

code --install-extension thankcreate.power-fsm-viewer