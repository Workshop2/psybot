from subprocess import STDOUT, check_call
import os, sys

if not 'SUDO_UID' in os.environ.keys():
  print "this program requires super user priv."
  sys.exit(1)

# ensure UART is enabled
print("disabling bluetooth")
filedata = None
with open('/boot/config.txt', 'r') as file:
  filedata = file.read()
  
filedata += "\ndtoverlay=pi3-disable-bt"
print(filedata)

# Write the file out again
with open('/boot/config.txt', 'w') as file:
  file.write(filedata)

# DISABLE MOAR BLUETOOTH
check_call(['sudo', 'systemctl', 'disable', 'hciuart'], stderr=STDOUT) 