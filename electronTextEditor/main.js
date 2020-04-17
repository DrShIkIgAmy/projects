const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
let MainWindow;

const CreateWindow = ()=>
{
    MainWindow = new BrowserWindow
    (
        {
            minWidth: 600,
            minHeight: 400,
            maxWidth: 600,
            maxHeight: 400,
            webPreferences:
            {
                nodeIntegration: true
            }
        }
    );
    MainWindow.removeMenu();
    MainWindow.loadURL(url.format({pathname: './main.html',protocol:'file',slashes:true}));
}

app.on('ready',CreateWindow);
app.on('window-all-closed',()=>{app.quit()});