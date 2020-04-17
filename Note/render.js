const electron = require('electron');
const fs = require('fs')
const dialog = require('electron').remote.dialog
const { ipcRenderer } = require('electron')


var notesStr = '';
var notes;

var pbAdd = document.getElementById('addNote');
var pbChange = document.getElementById('changeStyle');
var pbApply = document.getElementById('apply');
var mainDiv = document.getElementById('mainDiv');
var inpNotes = [];

document.getElementById('_body').style.width = ''+(window.innerWidth*0.9)+'px';
document.getElementById('_body').style.height = ''+(window.innerHeight*0.9)+'px';
document.getElementById('mainDiv').style.width = ''+(window.innerWidth*0.9)+'px';
document.getElementById('mainDiv').style.height = ''+(window.innerHeight*0.9)+'px';

const readJson = ()=>
{
    fs.exists(__dirname+'/note.json', (isExists)=>
    {
        if(!isExists)
        {
            console.log('Not exists')
            return;
        }
        fs.readFile(__dirname+'/note.json',
        (err,data)=>
        {
            notesStr=data;
            notes = JSON.parse(notesStr);
            showItems();
        });
    });
}

const showItems = ()=>
{
    notes.forEach
    (
        (item)=>
        {
            var newTextBox = document.createElement('input');
            newTextBox.type = 'text'
            newTextBox.style.width = '100%';
            newTextBox.value = item;
            mainDiv.appendChild(newTextBox);
            inpNotes.push(newTextBox);
        }
    )
}

readJson();
pbAdd.addEventListener
(
    'click',
    ()=>
    {
        var newTextBox = document.createElement('input');
        newTextBox.type = 'text'
        newTextBox.style.width = '100%';
        mainDiv.appendChild(newTextBox);
        inpNotes.push(newTextBox);
    }
)

pbApply.addEventListener
(
    'click',
    ()=>
    {
        var saveObj = [];
        inpNotes.forEach((item)=>{saveObj.push(item.value)})
        var jstring = JSON.stringify(saveObj);
        fs.writeFileSync(__dirname+'/note.json', jstring);
    }
)

pbChange.addEventListener
(
    'click',
    ()=>
    {
        ipcRenderer.send('goGhost','go');
    }
)