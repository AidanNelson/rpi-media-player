Simple Server and client for synchronized playback of videos with ffplay on raspberry pi.



Setup Raspberry Pi
Once booted into the Raspberry Pi using the SD card setup during the previous steps, ensure that we are using a minimal interface.

Right click on Desktop, then click on Desktop Preferences
Set Layout to No image
Set Colour to black
Uncheck Wastebasket and External Disks to ensure they are not shown on Desktop
Click Ok
Right click on Taskbar, then click on Task Bar (Window List) Settings…
Uncheck Flash when there is a window requiring attention
Right click on Taskbar, then click on Panel Settings…
Under Notifications tab, uncheck Show notifications
Under Advanced tab > Automatic hiding group 
Check Minimize panel when not in use
Set Size when minimised to 0 pixels

At this point, you should see a black desktop with your mouse over it.  Never fear!  We will remove the mouse soon!


### Install Prerequisites

```
sudo apt install nodejs npm unclutter
```

### Install RPI Media Player
```
git clone https://github.com/AidanNelson/rpi-media-player.git 
cd rpi-media-player/client
npm install
```


```
[Desktop Entry]
Name=SyncVideoClient
Exec=/usr/bin/npm run --prefix /home/pi/rpi-media-player/client start   
```

whic user is running forever???