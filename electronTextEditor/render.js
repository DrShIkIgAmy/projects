const electron = require('electron');
const fs = require('fs')
const dialog = require('electron').remote.dialog
var defFName = '';

var pbSave = document.getElementById('pbSave');
var pbOpen = document.getElementById('pbOpen');
var textBox = document.getElementById('textBox');

document.getElementById('_body').style.width = ''+(window.innerWidth)+'px';
document.getElementById('_body').style.height = ''+(window.innerHeight*0.9)+'px';
document.getElementById('mainDiv').style.width = ''+(window.innerWidth)+'px';
document.getElementById('mainDiv').style.height = ''+(window.innerHeight*0.9)+'px';
textBox.style.width = '100%';
textBox.style.height = '80%';

textBox.value = '';

pbSave.addEventListener
(
    'click',
    ()=>
    {
        var path = dialog.showSaveDialog({filters:[{name:'Text',extensions:['txt']}]}).then(
            (pathObj)=>
            {
                console.log(pathObj);
                fs.writeFileSync(pathObj.filePath, textBox.value);
            }
        );
    }
)

pbOpen.addEventListener
(
    'click',
    ()=>
    {

        dialog.showOpenDialog({filters:[{name:'Text',extensions:['txt']}]}).then((fPathObj)=>
        {
            console.log(fPathObj);
            fs.readFile(fPathObj.filePaths[0],
                (err,data)=>
                {
                    defFName = fPathObj.filePaths[0];
                    textBox.value=data;
                });
        });
    }
)