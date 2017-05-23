/**
 * Created by Housseini  Maiga on 3/15/2017.
 */
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config();
require('electron-reload')(__dirname);

let win = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 600});

  // Specify entry point
     win.loadURL(url.format({
       pathname: path.join(__dirname, 'dist/index.html'),
       protocol: 'file:',
       slashes: true
     }));
  //Just for testing
  //win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();

  // Remove window once app is closed
  win.on('closed', function () {

    win = null;

  });

});
