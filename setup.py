from subprocess import STDOUT, check_call
import os, sys, re

if not 'SUDO_UID' in os.environ.keys():
  print "this program requires super user priv."
  sys.exit(1)

# ensure UART is enabled
print("disabling bluetooth")
filedata = None
with open('/boot/config.txt', 'r') as file:
  filedata = file.read()
  
# https://di-marco.net/blog/it/2020-04-18-tips-disabling_bluetooth_on_raspberry_pi/
# disable bluetooth, and switch to use alt i2c for compass
filedata += "\ndtoverlay=disable-bt,i2c-gpio,bus=3,i2c_gpio_sda=02,i2c_gpio_scl=03"
filedata += "\nhdmi_force_hotplug=1"
filedata += "\nhdmi_ignore_edid=0xa5000080" 	 
filedata += "\nhdmi_group=2"
filedata += "\nhdmi_mode=35"
print(filedata)

# Write the file out again
with open('/boot/config.txt', 'w') as file:
  file.write(filedata)

# Remove Serial code stuff from boot
filedata = None
with open('/boot/cmdline.txt', 'r') as file:
  filedata = file.read()

regex = r"console=.*? "
filedata = re.sub(regex, '', filedata)

with open('/boot/cmdline.txt', 'w') as file:
  file.write(filedata)

# DISABLE MOAR BLUETOOTH
check_call(['sudo', 'systemctl', 'disable', 'hciuart'], stderr=STDOUT) 
