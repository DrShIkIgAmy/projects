const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain} = require('electron');



let MainWindow;

let winSize = {
    width: 300,
    height: 600
}

var isInGhost = false;


const goGhostIn = ()=>
{
    var tmpWindow = MainWindow;
    console.log('runFrameless')
    MainWindow = new BrowserWindow
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
            alwaysOnTop:true,
            frame:false
        }
    )
    tmpWindow.close();
    MainWindow.loadURL(url.format({pathname: './index.html',protocol: 'file:',slashes:true}));
    
}

const goGhostOut = ()=>
{
    var tmpWindow = MainWindow;
    console.log('runFrameFull')
    MainWindow = new BrowserWindow
    (
        {
            webPreferences: 
            {
                nodeIntegration: true
            },
            width: winSize.width,
            height: winSize.height,
            backgroundColor: '#00808080',
            alwaysOnTop:false,
            frame:true

        }
    )
    tmpWindow.close();
    MainWindow.loadURL(url.format({pathname: './index.html',protocol: 'file:',slashes:true}));
}



const CreateWindow = ()=>
{
    MainWindow = new BrowserWindow
    (
        {
            width: winSize.width,
            height: winSize.height,
            minWidth: winSize.width,
            minHeight: winSize.height,
            maxWidth: winSize.width,
            maxHeight: winSize.height,
            webPreferences:
            {
                nodeIntegration: true
            }
        }
    );
    MainWindow.loadURL(url.format({pathname: './index.html',protocol:'file',slashes:true}));
}

app.on('ready',CreateWindow);
app.on('window-all-closed',()=>{app.quit()});


ipcMain.on('goGhost', (event, arg) => 
{
    if(isInGhost)
    {
        isInGhost = !isInGhost;
        goGhostOut();
    }
    else
    {
        isInGhost=!isInGhost;
        goGhostIn();
    }
});