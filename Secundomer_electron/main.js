const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain} = require('electron');

var win;
var isFrameless = false;
var winSize = {
    width: 300,
    height: 200
}

const goFrameless = ()=>
{
    var tmpWindow = win;
    console.log('runFrameless')
    win = new BrowserWindow
    (
        {
            webPreferences: 
            {
                nodeIntegration: true
            },
            width: winSize.width,
            height: winSize.height,
            backgroundColor: '#50808080',
            transparent: true,
            frame: false
        }
    )
    tmpWindow.close();
    win.loadURL(url.format({pathname: './index.html',protocol: 'file:',slashes:true}));
    
}

const goFramefull = ()=>
{
    var tmpWindow = win;
    console.log('runFrameFull')
    win = new BrowserWindow
    (
        {
            webPreferences: 
            {
                nodeIntegration: true
            },
            width: winSize.width,
            height: winSize.height,
            backgroundColor: '#00808080',
            frame: true
        }
    )
    tmpWindow.close();
    win.loadURL(url.format({pathname: './index.html',protocol: 'file:',slashes:true}));
}

function createWindow()
{
    win = new BrowserWindow
    (
        {
            webPreferences: 
            {
                nodeIntegration: true
            },
            width: winSize.width,
            height: winSize.height,
            backgroundColor: '#00808080',
        }
        )
    win.loadURL(url.format({pathname: './index.html',protocol: 'file:',slashes:true}));
    win.set
}

ipcMain.on('goFrameless', (event, arg) => 
{
    if(isFrameless)
    {
        isFrameless = !isFrameless;
        goFramefull();
    }
    else
    {
        isFrameless=!isFrameless;
        goFrameless();
    }
});

app.on('ready',createWindow);
app.on('window-all-closed',()=>{app.quit();});