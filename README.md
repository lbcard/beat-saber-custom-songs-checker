# Beat Saber Custom Songs Checker

## About This Tool

This is a NodeJS script that checks your custom song files and extracts info like required mods into a report file.

It was predominently created to fix an issue I had when Beat Saber updates and specific mod dependencies are required to be installed again. The specific issue caused my Beat Saber custom songs list to be perpetually loading and therefore never actually accessible. If you have the same issue then this might help. 

It might also help if you have odd songs that don't work as you can tell which dependenciecs you might be missing. The script also extracts info on the difficulties in your custom songs directory so that you caneasily see how many easy/normal/hard/expert/expertPlus maps you have.

Its essentially a loop over all of the info.dat files in the directory and so is intended to be extended to extract more info if required later.

## How To Run

This is just a raw NodeJS script so you'll need NodeJS installed.

- update the variable in the `index.js` file to your custom songs directory (normally like: `C:/SteamLibrary/steamapps/common/Beat Saber/Beat Saber_Data/CustomLevels` - note no / on the end!)

- then just run `node index.js` in this repo project folder.

The script should output a json file called `customSongsReport.json` which has all the info in.

## Fixing Beat Saber: Perpetual Song Loading/Custom Songs Not Loading 

Just in case it helps and you landed here looking for a fix for the same issue I had and can't/not how to run a NodeJS script, the 2 main mod dependencies I found I needed wer `"Noodle Extensions" and "Mapping Extensions"` so maybe make sure you have them as a potential quick fix.