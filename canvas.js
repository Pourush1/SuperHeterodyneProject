var canvas1 = document.querySelector('#canvas1');
var canvas2 = document.querySelector('#canvas2');
var canvas3 = document.querySelector('#canvas3');

var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');



// This is the source of frequency and intensity from the Source Table
var dataA = document.querySelector('#frequencyA');
var intensityA = document.querySelector('#intensityA');
var button = document.querySelector('#submit');
button.addEventListener('click', getFrequencyIntensityValue);

//This is the source of the first Oscillator value
var oscillator1 = document.querySelector('#oscillator1');
var oscillatorSubmit = document.querySelector('#oscillatorSubmit');
oscillatorSubmit.addEventListener('click', drawOscillatorFrequency);

//This is the source of the second Oscillator value
var oscillator2 = document.querySelector('#oscillator2');
var oscillatorSubmit2 = document.querySelector('#oscillatorSubmit2');
oscillatorSubmit2.addEventListener('click', drawOscillator2Frequency);

//constant points in the window
const heightPixel = 50; // 1 pixel equivalent to 50 intensity
const fixedFirstFrequencyPointWave1 = 1370;
const fixedSecondFrequencyPointWave1 = 1700;
const shiftForZigZagLine = 10;
const heightToSubstract = 200;
const startingWidthCoordinateWave1 = 1000;
const heightCoordinate = canvas1.height;

window.onload = init();
function init(){
    drawAxes();
    drawWave( heightCoordinate , fixedFirstFrequencyPointWave1 , fixedSecondFrequencyPointWave1);
    // getFrequencyIntensityValue();
 }


//var widthPixel = 2;
// function to draw the axes in the canvas
function drawAxes(){
    ctx1.beginPath();
    ctx1.lineTo(0, 300);
    // c.moveTo(1490, 290);
    ctx1.lineTo(500,300);
    ctx1.stroke();
}
//function to draw the first wave in the right most canvas
 function drawWave( heightCoordinate, point , secondPointValue){
    
    var firstPoint =  (point - startingWidthCoordinateWave1) / 2;
    var secondPoint =  (secondPointValue - startingWidthCoordinateWave1) / 2;

     ctx3.beginPath();

     ctx3.moveTo(firstPoint, heightCoordinate);
     ctx3.lineTo(firstPoint + shiftForZigZagLine , heightCoordinate - heightToSubstract);
     ctx3.lineTo(secondPoint - shiftForZigZagLine , heightCoordinate - heightToSubstract);
     ctx3.lineTo(secondPoint, heightCoordinate);

     ctx3.stroke();

     ctx3.font = '15px serif';
     ctx3.strokeText(point, firstPoint - shiftForZigZagLine , heightCoordinate - heightToSubstract );
     ctx3.strokeText(secondPointValue, secondPoint - shiftForZigZagLine,  heightCoordinate - heightToSubstract  );
   
}


function getFrequencyIntensityValue(){
    var frequencyValue = dataA.value;
    var intensityValue = intensityA.value;

    var signalPoint = (frequencyValue - startingWidthCoordinateWave1) / 2 ;
    var intensityAmplitude = intensityValue * heightPixel;
   

    ctx3.moveTo(signalPoint, heightCoordinate);
    ctx3.lineTo(signalPoint, intensityAmplitude);
    ctx3.stroke();

    ctx3.font = '15px serif';
    ctx3.strokeText(frequencyValue, signalPoint, intensityAmplitude);
}

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
var shiftedPoint;

function drawWave2(){
    var point = Math.abs(fixedFrstFrequencyPointWave1 - oscillator1.value);
    var secondPoint = Math.abs(fixedFrstFrequencyPointWave2 - oscillator1.value);

    var pointA = (point - 0) / 1.4;
    var pointB = (secondPoint - 0) / 1.4;

    ctx2.beginPath();

     ctx2.moveTo(pointA, 300);
     ctx2.lineTo(pointA + 10 , 300 - 200);
     ctx2.lineTo(pointB - 10 , 300 - 200);
     ctx2.lineTo(pointB, 300);

     ctx2.stroke();

     ctx2.font = '15px serif';
     ctx2.strokeText(point, pointA + 10 , 300 - 200 );
     ctx2.strokeText(secondPoint, pointB - 10 , 300 - 200 );

     var filterPoint = 110/1.4 ; // fixed low pass filter point 110

     //logic to draw the fix low pass filter, always in the same position
     ctx2.moveTo(0,300);
     ctx2.lineTo(10,200);
     ctx2.lineTo(filterPoint - 10 , 200);
     ctx2.lineTo(filterPoint , 300);
     ctx2.stroke();

     // logic to print the text
     ctx2.font = '10px serif';
     ctx2.strokeText(0 , 0, 300 );
     ctx2.strokeText(110,filterPoint , 300);
     ctx2.strokeText("IF FILTER 1", filterPoint - 60, 250 );

     //logic to shift the source frequency point
     shiftedPoint = Math.abs(dataA.value - oscillator1.value);
     var exactShiftedPointToScale = shiftedPoint / 1.4;
     ctx2.moveTo(exactShiftedPointToScale, 300);
     var shiftedIntensityValue = intensityA.value * heightPixel;
     ctx2.lineTo(exactShiftedPointToScale, shiftedIntensityValue);
     ctx2.stroke();

     //logic to print the text
     ctx2.font = '15px serif';
     ctx2.strokeText(shiftedPoint, exactShiftedPointToScale, shiftedIntensityValue );

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
     ctx1.lineTo(filterPoint2 + 5, 200);
     ctx1.lineTo(filterPoint2 + 5, 300);
     ctx1.stroke();

     //logic to shift the source frequency point
     var finalShiftedPoint = Math.abs(shiftedPoint - oscillator2.value);
     console.log(finalShiftedPoint);
     var exactShiftedPointToScale = finalShiftedPoint * 2;
     ctx1.moveTo(exactShiftedPointToScale, 300);
     var shiftedIntensityValue = intensityA.value * heightPixel;
     ctx1.lineTo(exactShiftedPointToScale, shiftedIntensityValue);
     ctx1.stroke();

     //logic to print the text
     ctx1.font = '15px serif';
     ctx2.strokeText(shiftedPoint, exactShiftedPointToScale, shiftedIntensityValue );


}



