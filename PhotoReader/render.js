const electron = require('electron');
const {dialog} = electron.remote.require('electron');
const fs = require('fs');
const path = require('path')
const ipcRender = electron.remote.require('electron');


var img = document.getElementById('img');

var folder;
var imgSrc = [];
var incr = 0;
var isSlideShowOn = false;
var Interval;


var pbOpenFolder = document.getElementById('pbOpenFolder');
var pbPrev = document.getElementById('pbPrev');
var pbNext = document.getElementById('pbNext');
var pbSlideShow = document.getElementById('pbSlideShow');

document.getElementById('_body').style.width = ''+(window.innerWidth*0.8)+'px';
document.getElementById('_body').style.height = ''+(window.innerHeight*0.8)+'px';
document.getElementById('mainDiv').style.width ='100%';
document.getElementById('mainDiv').style.height ='100%';
img.style.width = '100%';
img.style.height = '100%';

pbOpenFolder.addEventListener
(
    'click',
    ()=>
    {
        dialog.showOpenDialog({properties: ['openDirectory']}).then(
            (p)=>{
                folder = fs.readdirSync(p.filePaths[0]).forEach((item)=>
                {
                    if(path.extname(item)=='.img'||path.extname(item)=='.png')
                    {
                    imgSrc.push(item);
                    }
                }
                )
                folder = p;
                img.scr = folder.filePaths[0]+'\\'+imgSrc[0];
            }
        );
    }
)

pbPrev.addEventListener
(
    'click',
    ()=>
    {
        if(incr>0&&imgSrc.length>0)
        {
            img.src = folder.filePaths[0]+'\\'+imgSrc[--incr];
        }
    }
)

pbNext.addEventListener
(
    'click',
    ()=>
    {
        if(incr<(imgSrc.length-1)&&imgSrc.length>0)
        {
            img.src = folder.filePaths[0]+'\\'+imgSrc[++incr];
        }
    }
)

pbSlideShow.addEventListener
(
    'click',
    ()=>
    {
        if(imgSrc.length==0)
        {
            return;
        }
        if(isSlideShowOn)
        {
            clearInterval(Interval);
            isSlideShowOn = false;
        }
        else
        {
            isSlideShowOn = true;
            Interval = setInterval
            (
                ()=>
                {
                    if(incr<(imgSrc.length-1)&&imgSrc.length>0)
                    {
                        img.src = folder.filePaths[0]+'\\'+imgSrc[++incr];
                    }
                    else
                    {
                        alert('Slides run out');
                        clearInterval(Interval);
                        isSlideShowOn = false;
                    }
                },
                2000
            )
        }
    }
)

