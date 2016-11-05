from subprocess import STDOUT, check_call
import os, sys

if not 'SUDO_UID' in os.environ.keys():
  print "this program requires super user priv."
  sys.exit(1)

# install node
check_call(['sudo', 'apt-get', 'install', 'node', '-y'], stderr=STDOUT) 

# ensure UART is enabled
print("enabling UART")
filedata = None
with open('/boot/config.txt', 'r') as file:
  filedata = file.read()
  
print(filedata)

# Replace the target string
filedata = filedata.replace('enable_uart=0', 'enable_uart=1')

if "enable_uart=1" not in filedata:
	print("enable uart wasnt found, adding")
	filedata += "\nenable_uart=1"

# Write the file out again
with open('/boot/config.txt', 'w') as file:
  file.write(filedata)
