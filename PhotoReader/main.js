const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain} = require('electron');

function createWindow()
{
    win = new BrowserWindow
    (
        {
            webPreferences: 
            {
                nodeIntegration: true
            },
            maxWidth: 720,
            maxHeight: 400,
            minWidth: 720,
            minHeight: 400,
            backgroundColor: '#00808080',
        }
        )
    win.loadURL(url.format({pathname: './index.html',protocol: 'file:',slashes:true}));
    win.set
}

app.on('ready',createWindow);
app.on('window-all-closed',()=>{app.quit();});