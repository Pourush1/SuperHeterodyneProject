var canvas1 = document.querySelector('#canvas1');
var canvas2 = document.querySelector('#canvas2');
var canvas3 = document.querySelector('#canvas3');

var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');

// This is the source of frequency and intensity from the Source Table
var dataA = document.querySelector('.frequencyA');
var intensityA = document.querySelector('.intensityA');
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

var resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', reset);

function reset(){
    ctx1.clearRect(0, 0 , canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0 , canvas2.width, canvas2.height);
    ctx3.clearRect(0, 0 , canvas3.width, canvas3.height);

    init();
}

dataA.onchange = function(){
    if(this.value != "" || this.value.length > 0){
        this.disabled = true;
        this.classList.remove("frequencyA");
    }

}

intensityA.onchange = function(){
    if(this.value != "" || this.value.length > 0){
        this.disabled = true;
        this.classList.remove("intensityA");
    }
}

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
    dataA.focus();
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
     ctx3.strokeText(secondPointValue, secondPoint - shiftForZigZagLine,  heightCoordinate - heightToSubstract );
   
}


function getFrequencyIntensityValue(){
    var frequencyValue = dataA.value;
    console.log(frequencyValue);
    var intensityValue = intensityA.value;
    console.log(intensityValue);

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
    var oscillatorPoint =  (Oscillator1frequencyValue - startingWidthCoordinateWave1) / 2;
    console.log(oscillatorPoint);
    
   
    ctx3.moveTo(oscillatorPoint , heightCoordinate);
    ctx3.lineTo(oscillatorPoint, 100);
    ctx3.stroke();

    drawWave2();

    // var Oscillator1point = frequencyValue -  Oscillator1frequencyValue; 
    // console.log(Oscillator1point);

}

function drawOscillator2Frequency(){
    var Oscillator2frequencyValue = oscillator2.value;
    var oscillatorPoint =  (Oscillator2frequencyValue - 0) / 1.4;
    
   
    ctx2.moveTo(oscillatorPoint , heightCoordinate);
    ctx2.lineTo(oscillatorPoint, heightCoordinate - heightToSubstract);
    ctx2.stroke();

    drawWave3();

    // var Oscillator1point = frequencyValue -  Oscillator1frequencyValue; 
    // console.log(Oscillator1point);

}
var shiftedPoint; //This global variable is used to pass the 

function drawWave2(){
    var point = Math.abs(fixedFirstFrequencyPointWave1 - oscillator1.value);
    var secondPoint = Math.abs(fixedSecondFrequencyPointWave1 - oscillator1.value);

    var pointA = (point - 0) / 1.4;
    var pointB = (secondPoint - 0) / 1.4;

    ctx2.beginPath();

     ctx2.moveTo(pointA, heightCoordinate);
     ctx2.lineTo(pointA + shiftForZigZagLine , heightCoordinate -heightToSubstract);
     ctx2.lineTo(pointB - shiftForZigZagLine , heightCoordinate - heightToSubstract);
     ctx2.lineTo(pointB, heightCoordinate);

     ctx2.stroke();

     ctx2.font = '15px serif';
     ctx2.strokeText(point, pointA + shiftForZigZagLine , heightCoordinate - heightToSubstract );
     ctx2.strokeText(secondPoint, pointB - shiftForZigZagLine , heightCoordinate - heightToSubstract );

       //logic to shift the source frequency point
       shiftedPoint = Math.abs(dataA.value - oscillator1.value);
       var exactShiftedPointToScale = shiftedPoint / 1.4;
       ctx2.moveTo(exactShiftedPointToScale, heightCoordinate);
       var shiftedIntensityValue = intensityA.value * heightPixel;
       ctx2.lineTo(exactShiftedPointToScale, shiftedIntensityValue);
       ctx2.stroke();
  
       //logic to print the text
       ctx2.font = '15px serif';
       ctx2.strokeText(shiftedPoint, exactShiftedPointToScale, shiftedIntensityValue );

     drawFixedLowPassFilter();
    }

     function drawFixedLowPassFilter(){
     var filterPoint = 110/1.4 ; // fixed low pass filter point 110

     //logic to draw the fix low pass filter, always in the same position
     ctx2.moveTo(0,heightCoordinate);
     ctx2.lineTo(shiftForZigZagLine,  heightToSubstract);
     ctx2.lineTo(filterPoint - shiftForZigZagLine , heightToSubstract);
     ctx2.lineTo(filterPoint , heightCoordinate);
     ctx2.stroke();

     // logic to print the text
     ctx2.font = '10px serif';
     ctx2.strokeText(0 , 0, heightCoordinate );
     ctx2.strokeText(110,filterPoint , heightCoordinate);
     ctx2.strokeText("IF FILTER 1", filterPoint - 60, 250 );
     }

   

function drawWave3(){
    // fixed values 110 and 0 for the low pass flter
    var point = Math.abs(110 - oscillator2.value);
    var secondPoint = Math.abs(0 - oscillator2.value);
    

    var pointA = (point - 0) * 2;
    var pointB = (secondPoint - 0) *  2;

    ctx1.beginPath();

     ctx1.moveTo(pointA, heightCoordinate);
     ctx1.lineTo(pointA + shiftForZigZagLine , heightCoordinate - heightToSubstract);
     ctx1.lineTo(pointB - shiftForZigZagLine , heightCoordinate - heightToSubstract);
     ctx1.lineTo(pointB, heightCoordinate);

     ctx1.stroke();

     //logic to shift the source frequency point
     var finalShiftedPoint = Math.abs(shiftedPoint - oscillator2.value);
     console.log(finalShiftedPoint);
     var exactShiftedPointToScale = finalShiftedPoint * 2;
     ctx1.moveTo(exactShiftedPointToScale, heightCoordinate);
     var shiftedIntensityValue = intensityA.value * heightPixel;
     ctx1.lineTo(exactShiftedPointToScale, shiftedIntensityValue);
     ctx1.stroke();

     //logic to print the text
     ctx1.font = '15px serif';
     ctx1.strokeText(finalShiftedPoint, exactShiftedPointToScale, shiftedIntensityValue );

     drawFixedFilter2();
}

function drawFixedFilter2(){
    //fixd filter points 10.695 and 10.705
    var filterPoint = 10.695 * 2 ;
    var filterPoint2 = 10.705 * 2 ;

    ctx1.moveTo(filterPoint, heightCoordinate);
    ctx1.lineTo(filterPoint , heightToSubstract);
    ctx1.lineTo(filterPoint2 + 5, heightToSubstract);
    ctx1.lineTo(filterPoint2 + 5, heightCoordinate);
    ctx1.stroke();
}



