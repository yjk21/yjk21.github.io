function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var r = 4

var dataCanvas = document.getElementById("testc");// document.createElement("canvas");
//dataCanvas.width = 28;
//dataCanvas.height = 28;
var dataCtx = dataCanvas.getContext('2d');

var clearButton = document.getElementById('bclear');
dataCtx.fillStyle = "white";
//dataCtx.fillRect(0,0, dataCanvas.width, dataCanvas.height);

clearButton.addEventListener('click', function(evt){
    context.clearRect(0,0, canvas.width, canvas.height);
    dataCtx.clearRect(0,0, dataCanvas.width, dataCanvas.height);
});

var procButton = document.getElementById('bproc');

procButton.addEventListener('click', function(evt){
    //    var tmp = context.getImageData(0,0,canvas.width, canvas.height);
    dataCtx.drawImage(canvas, 0,0, canvas.width, canvas.height, 0,0,dataCanvas.width,dataCanvas.height);
    var data = dataCanvas.toDataURL('image/png');
    console.log(data) ;

    $.getJSON('http://hjkl-yjk21.rhcloud.com/_add_numbers', {
    //$.getJSON('http://localhost:7111/_add_numbers', {
        img: data
    }, function(data) {
        $("#result").text(data.result);
        console.log(data.result);
        console.log(data.bla);
    });

});

var md = false;

canvas.addEventListener('mousedown', function(evt){
    context.beginPath();
    md = true;
    var mousePos = getMousePos(canvas, evt);
    context.moveTo(mousePos.x, mousePos.y);
});

canvas.addEventListener('mouseup', function(evt){
    md = false;
    context.closePath();
});

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if(md){
        context.lineTo(mousePos.x, mousePos.y);
        context.lineJoin = context.lineCap = 'round';
        context.shadowBlur = 0;
        context.shadowColor = 'rgb(0, 0, 0)';
        context.fillStyle = 'black';
        context.lineWidth = 13;
        context.stroke();
    }
}, false);

