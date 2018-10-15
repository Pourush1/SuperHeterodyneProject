var canvas1 = document.querySelector('#canvas1');
var canvas2 = document.querySelector('#canvas2');
var canvas3 = document.querySelector('#canvas3');

var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');




var widthPixel = 0.85; //1 pixel equivalent to 0.8 frequency
var heightPixel = 70; // 1 pixel equivalent to 70 intensity
var point = 1370 * widthPixel;
var secondPoint = 1700 * widthPixel;

// This is the source of frequency and intensity from the Source Table

var dataA = document.querySelector('#frequencyA');
var intensityA = document.querySelector('#intensityA');
var button = document.querySelector('#submit');
button.addEventListener('click', getFrequencyIntensityValue);

//This is the source of the first Oscillator value
var oscillator1 = document.querySelector('#oscillator1');
var oscillatorSubmit = document.querySelector('#oscillatorSubmit');
oscillatorSubmit.addEventListener('click', drawOscillatorFrequency);

var oscillator2 = document.querySelector('#oscillator2');
var oscillatorSubmit2 = document.querySelector('#oscillatorSubmit2');
oscillatorSubmit2.addEventListener('click', drawOscillator2Frequency);

function drawOscillatorFrequency(){
    var Oscillator1frequencyValue = oscillator1.value;
    console.log(Oscillator1frequencyValue);
    var oscillatorPoint =  (Oscillator1frequencyValue - 1000) / 2;
    console.log(oscillatorPoint);
    
   
    ctx3.moveTo(oscillatorPoint , 300);
    ctx3.lineTo(oscillatorPoint, 100);
    ctx3.stroke();

    drawWave2();

    // var Oscillator1point = frequencyValue -  Oscillator1frequencyValue; 
    // console.log(Oscillator1point);

}

function drawOscillator2Frequency(){
    var Oscillator2frequencyValue = oscillator2.value;
    console.log(Oscillator2frequencyValue);
    var oscillatorPoint =  (Oscillator2frequencyValue - 0) / 1.4;
    console.log(oscillatorPoint);
    
   
    ctx2.moveTo(oscillatorPoint , 300);
    ctx2.lineTo(oscillatorPoint, 100);
    ctx2.stroke();

    drawWave3();

    // var Oscillator1point = frequencyValue -  Oscillator1frequencyValue; 
    // console.log(Oscillator1point);

}

function drawWave2(){
    var point = 1370 - oscillator1.value;
    var secondPoint = 1700 - oscillator1.value;

    var pointA = (point - 0) / 1.4;
    var pointB = (secondPoint - 0) / 1.4;

    ctx2.beginPath();

     ctx2.moveTo(pointA, 300);
     ctx2.lineTo(pointA + 10 , 300 - 200);
     ctx2.lineTo(pointB - 10 , 300 - 200);
     ctx2.lineTo(pointB, 300);

     ctx2.stroke();

     var filterPoint = 110/1.4 ;

     ctx2.moveTo(0,300);
     ctx2.lineTo(10,200);
     ctx2.lineTo(filterPoint - 10 , 200);
     ctx2.lineTo(filterPoint , 300);
     ctx2.stroke();
}

function drawWave3(){
    var point = Math.abs(110 - oscillator2.value);
    var secondPoint = Math.abs(0 - oscillator2.value);
    

    var pointA = (point - 0) * 2;
    var pointB = (secondPoint - 0) *  2;

    ctx1.beginPath();

     ctx1.moveTo(pointA, 300);
     ctx1.lineTo(pointA + 10 , 300 - 200);
     ctx1.lineTo(pointB - 10 , 300 - 200);
     ctx1.lineTo(pointB, 300);

     ctx1.stroke();

     var filterPoint = 10.695 * 2 ;
     var filterPoint2 = 10.705 * 2 ;

     ctx1.moveTo(filterPoint,300);
     ctx1.lineTo(filterPoint ,200);
     ctx1.lineTo(filterPoint2 + 10, 200);
     ctx1.lineTo(filterPoint2 + 10 , 300);
     ctx1.stroke();
}

window.onload = init();
function init(){
    drawAxes();
    drawWave(1000, 1500 , 300 ,  1370, 1700);
    // getFrequencyIntensityValue();
 }


//var widthPixel = 2;

function drawAxes(){
    ctx1.beginPath();
    ctx1.lineTo(0, 300);
    // c.moveTo(1490, 290);
    ctx1.lineTo(500,300);
    ctx1.stroke();
}

 function drawWave(startingWidthCoordinate, endingWidthCoordinate , heightCoordinate, point , secondPoint){

    var firstPoint =  (point - startingWidthCoordinate) / 2;
    console.log(firstPoint);
    var secondPoint =  (secondPoint - startingWidthCoordinate) / 2;
    console.log(secondPoint);

     ctx3.beginPath();

     ctx3.moveTo(firstPoint, heightCoordinate);
     ctx3.lineTo(firstPoint + 10 , heightCoordinate - 200);
     ctx3.lineTo(secondPoint - 10 , heightCoordinate - 200);
     ctx3.lineTo(secondPoint, heightCoordinate);

     ctx3.stroke();
   
}


function getFrequencyIntensityValue(){
    var frequencyValue = dataA.value;
    var intensityValue = intensityA.value;

    var signalPoint = (frequencyValue - 1000) / 2 ;
    var intensityAmplitude = intensityValue * heightPixel;
   

    ctx3.moveTo(signalPoint, 300);
    ctx3.lineTo(signalPoint, intensityAmplitude);
    ctx3.stroke();

    ctx3.font = '15px serif';
    ctx3.strokeText(frequencyValue, signalPoint, intensityAmplitude);
}


