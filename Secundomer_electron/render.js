const { ipcRenderer } = require('electron')

const pbStartID = 'pbStart';
const pbPauseID = 'pbPause';
const pbResetID = 'pbReset';
const outPutFieldID = 'outPutField'
const pbGoNoFrameID = 'pbGoNoFrame'


const pbStart = document.getElementById(pbStartID);
const pbPause = document.getElementById(pbPauseID);
const pbReset = document.getElementById(pbResetID);
const outPutField = document.getElementById(outPutFieldID);
const pbGoNoFrame = document.getElementById(pbGoNoFrameID);

var curTime = 0;
var isFrameLess =false;

var Interval;
var Cycle;
var isTimerOnRun = false;
var isCycled = false;
var span = 100;


const showTime = (timeCount)=>
{
    var hours = Math.floor(timeCount/(3600));
    var minutes = Math.floor((timeCount%(3600))/(60));
    var seconds = timeCount%(60);
    outPutField.textContent = ''+hours+':'+minutes+':'+seconds;
}

const timeOutFunc = (timeCount)=>
{
    if(timeCount%span==0)
    {
        showTime(timeCount/span);
    }
}

const initInterval = (interval)=>
{
    return interval = setInterval(() => 
    {
        curTime+=span;
        timeOutFunc(curTime);
    }, span);
}

pbStart.addEventListener
(
    'click',
    ()=>
    {
        if(!isTimerOnRun)
        {
            isTimerOnRun = true;
            Interval = initInterval(Interval);
        }
    }
)

pbPause.addEventListener
(
    'click',
    ()=>
    {
        if(isTimerOnRun)
        {
            isTimerOnRun = false;
            clearInterval(Interval);
        }
    }
)

pbReset.addEventListener
(
    'click',
    ()=>
    {
        if(isTimerOnRun)
        {
            isTimerOnRun = false;
            clearInterval(Interval);
        }
        curTime = 0;
        showTime(curTime);
    }
)

pbGoNoFrame.addEventListener
(
    'click',
    ()=>
    {
        isFrameLess = true;
        ipcRenderer.send('goFrameless','go');
    }
)
