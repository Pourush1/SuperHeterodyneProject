var canvas = document.querySelector('#canvas');
//  console.log(window.innerWidth);  //1536
// console.log(window.innerHeight); //482
// canvas.width = window.innerWidth - 16 ;
// canvas.height = window.innerHeight - 162;
//  console.log(canvas.height); // 320
//  console.log(canvas.width); //1500

var widthPixel = 0.85; //1 pixel equivalent to 0.8 frequency
var heightPixel = 70; // 1 pixel equivalent to 70 intensity
var point = 1370 * widthPixel;
var secondPoint = 1700 * widthPixel;


var dataA = document.querySelector('#frequencyA');
var intensityA = document.querySelector('#intensityA');
var button = document.querySelector('#submit');

var oscillator1 = document.querySelector('#oscillator1');
var oscillatorSubmit = document.querySelector('#oscillatorSubmit');

var c = canvas.getContext('2d');

oscillatorSubmit.addEventListener('click', drawOscillatorFrequency);

function drawOscillatorFrequency(){
    var Oscillator1frequency = oscillator1.value;
    var Oscillator1point = Oscillator1frequency * widthPixel;
    console.log(Oscillator1point);
    
    c.beginPath();
    c.moveTo(Oscillator1point, 290);
    c.lineTo(Oscillator1point, 290-190);

    drawWave(point -Oscillator1point , secondPoint- Oscillator1point);
    drawWave(0.7 , 110.7)
    
    c.stroke();


}

window.onload = drawAxes();
function drawAxes(){
c.beginPath();
c.moveTo(10,10);
c.lineTo(10, 290);
c.moveTo(1490, 290);
c.lineTo(10,290);
c.stroke();

dataA.focus();
drawWave(point, secondPoint);
}

button.addEventListener('click', getFrequencyIntensityValue);

function drawWave(point , secondPoint){
    
    var nextPoint = point + 10;
    c.moveTo(point, 290);
    c.lineTo(nextPoint, 290-190);
    
    
    var secondNextPoint = secondPoint - 10;
    c.moveTo(secondPoint, 290);
    c.lineTo(secondNextPoint, 290 -190);
   
    c.lineTo(nextPoint, 290-190);
    
    c.stroke();
}

function getFrequencyIntensityValue(){
    var value = dataA.value;
    var signalPoint = value * widthPixel;
    console.log(signalPoint);

    var intensity = intensityA.value;
    var intensityAmplitude = intensity * heightPixel;
   console.log(intensityAmplitude);

    c.moveTo(signalPoint, 290);
    c.lineTo(signalPoint, intensityAmplitude);
    c.stroke();
}


