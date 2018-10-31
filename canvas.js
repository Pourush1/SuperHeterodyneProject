var canvas1 = document.querySelector('#canvas1');
var canvas2 = document.querySelector('#canvas2');
var canvas3 = document.querySelector('#canvas3');

var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');

// This is the source of frequency and intensity from the Source Table
var dataA = document.querySelectorAll('.frequency');
var intensityA = document.querySelectorAll('.intensity');
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


var frequencyValues = {};
function getFrequency(){

    var frequencyValue = this.value;
    if(this.value != "" || this.value.length > 0){
        this.disabled = true;
  }
  frequencyValues.frequency = frequencyValue;
  
} 
  
var intensityValues = {};
function getIntensity(){

    var intensityValue = this.value;
    if(this.value != "" || this.value.length > 0){
        this.disabled = true;
  }
  intensityValues.intensity = intensityValue;

  getFrequencyIntensityValue();
//   pointDrawStart();
  
} 

  dataA.forEach(function(e){
  e.addEventListener('change', getFrequency);
  })

  intensityA.forEach(function(e){
      e.addEventListener('change',getIntensity);
  })


//constant points in the window
const heightPixel = 50; // 1 pixel equivalent to 50 intensity
const fixedFirstFrequencyPointWave1 = 1370;
const fixedSecondFrequencyPointWave1 = 1700;
const shiftForZigZagLine = 10;
const heightToSubstract = 200;
const startingWidthCoordinateWave1 = 1000;
const heightCoordinate = canvas1.height;
const firstWaveScale = 2;
const secondWaveScale = 1.4;
const thirdWaveScale = 2.1; //need to change this value

window.onload = init();
function init(){
    drawAxes();
    drawWave(firstWaveScale);
    // setupUnitButtons();
    // getFrequencyIntensityValue();
    // dataA.focus();
 }
//  var unitButtons = document.querySelectorAll(".mode");
//  console.log(unitButtons.length);

//  function setupUnitButtons(){
// 	for(var i = 0; i < unitButtons.length; i++){
// 		unitButtons[i].addEventListener("click", function(){
// 			unitButtons[0].classList.remove("selected");
// 			unitButtons[1].classList.remove("selected");
// 			this.classList.add("selected");
// 		//	this.textContent === "MHz" ? numSquares = 3: numSquares = 6;
// 		//	reset();
// 		});
// 	}
// }


//var widthPixel = 2;
// function to draw the axes in the canvas
function drawAxes(){
    ctx1.beginPath();
    ctx1.lineTo(0, 300);
    ctx1.lineTo(500,300);
    ctx1.stroke();

    ctx2.moveTo(0,300);
    ctx2.lineTo(500, 300);
    ctx2.stroke();

    ctx3.moveTo(0,300);
    ctx3.lineTo(500, 300);
    ctx3.stroke();    
}
//function to draw the first wave in the right most canvas
 function drawWave(scale){
    
    if(scale === 2){

        var firstPoint =  (fixedFirstFrequencyPointWave1 - startingWidthCoordinateWave1) / scale;
        var secondPoint =  (fixedSecondFrequencyPointWave1 - startingWidthCoordinateWave1) / scale;

        ctx3.beginPath();

        ctx3.moveTo(firstPoint, heightCoordinate);
        ctx3.lineTo(firstPoint + shiftForZigZagLine , heightCoordinate - heightToSubstract);
        ctx3.lineTo(secondPoint - shiftForZigZagLine , heightCoordinate - heightToSubstract);
        ctx3.lineTo(secondPoint, heightCoordinate);
        ctx3.stroke();

        ctx3.font = '15px serif';
        ctx3.strokeText(fixedFirstFrequencyPointWave1, firstPoint - shiftForZigZagLine , heightCoordinate - heightToSubstract );
        ctx3.strokeText(fixedSecondFrequencyPointWave1, secondPoint - shiftForZigZagLine,  heightCoordinate - heightToSubstract );
    }

    else if (scale === 1.4) {
        var point = Math.abs(fixedFirstFrequencyPointWave1 - oscillator1.value);
        var secondPoint = Math.abs(fixedSecondFrequencyPointWave1 - oscillator1.value);

        var pointA = (point - 0) / scale;
        var pointB = (secondPoint - 0) / scale;

        ctx2.beginPath();

        ctx2.moveTo(pointA, heightCoordinate);
        ctx2.lineTo(pointA + shiftForZigZagLine , heightCoordinate -heightToSubstract);
        ctx2.lineTo(pointB - shiftForZigZagLine , heightCoordinate - heightToSubstract);
        ctx2.lineTo(pointB, heightCoordinate);

        ctx2.stroke();

        ctx2.font = '15px serif';
        ctx2.strokeText(point, pointA + shiftForZigZagLine , heightCoordinate - heightToSubstract );
        ctx2.strokeText(secondPoint, pointB - shiftForZigZagLine , heightCoordinate - heightToSubstract );
    }

    else if (scale === 2.1){
         // fixed values 110 and 0 for the low pass flter
        var point = Math.abs((110 * 10 - oscillator2.value * 10) / 10 );
        var secondPoint = Math.abs(0 - oscillator2.value);
      
        var pointA = (point - 0) * scale;
        var pointB = (secondPoint - 0) *  scale;

        ctx1.beginPath();

        ctx1.moveTo(pointA, heightCoordinate);
        ctx1.lineTo(pointA + shiftForZigZagLine , heightCoordinate - heightToSubstract);
        ctx1.lineTo(pointB - shiftForZigZagLine , heightCoordinate - heightToSubstract);
        ctx1.lineTo(pointB, heightCoordinate);

        ctx1.stroke();

        ctx1.font = '15px serif';
        ctx1.strokeText(point, pointA + shiftForZigZagLine , heightCoordinate - heightToSubstract );
        ctx1.strokeText(secondPoint, pointB - shiftForZigZagLine , heightCoordinate - heightToSubstract );
    }
   
}


function getFrequencyIntensityValue(){

   var frequencyValue =  frequencyValues['frequency'];
   var intensityValue =  intensityValues['intensity'];

    var signalPoint = (frequencyValue - startingWidthCoordinateWave1) / 2 ;
    var intensityAmplitude = intensityValue * heightPixel;
   

    ctx3.moveTo(signalPoint, heightCoordinate);
    ctx3.lineTo(signalPoint, intensityAmplitude);
    ctx3.stroke();

    ctx3.font = '15px serif';
    ctx3.strokeText(frequencyValue, signalPoint, intensityAmplitude);
}

function drawOscillatorFrequency(){ 
    reset();
    getFrequencyIntensityValue();
    drawWave(secondWaveScale);
    shiftSourceFrequency();
    drawFixedLowPassFilter();

    var Oscillator1frequencyValue = oscillator1.value;
    console.log(Oscillator1frequencyValue);
    var oscillatorPoint =  (Oscillator1frequencyValue - startingWidthCoordinateWave1) / 2;
    console.log(oscillatorPoint);
    
   
    ctx3.moveTo(oscillatorPoint , heightCoordinate);
    ctx3.lineTo(oscillatorPoint, 100);
    ctx3.stroke();

}

function drawOscillator2Frequency(){
    drawOscillatorFrequency();
    drawWave(thirdWaveScale);
    shiftSourceFrequencyAccordingToOscillator2();
    drawFixedFilter2();

    var Oscillator2frequencyValue = oscillator2.value;
    var oscillatorPoint =  (Oscillator2frequencyValue - 0) / secondWaveScale;
    
   
    ctx2.moveTo(oscillatorPoint , heightCoordinate);
    ctx2.lineTo(oscillatorPoint, heightCoordinate - heightToSubstract);
    ctx2.stroke();
}

var shiftedPoint; //This global variable is used to pass the 

function shiftSourceFrequency(){
   

       //logic to shift the source frequency point
    //    shiftedPoint = Math.abs(dataA.value - oscillator1.value);
       shiftedPoint = Math.abs(frequencyValues['frequency'] - oscillator1.value);
       var exactShiftedPointToScale = shiftedPoint / secondWaveScale;
       ctx2.moveTo(exactShiftedPointToScale, heightCoordinate);
      // var shiftedIntensityValue = intensityA.value * heightPixel;
       var shiftedIntensityValue = intensityValues['intensity'] * heightPixel;
       ctx2.lineTo(exactShiftedPointToScale, shiftedIntensityValue);
       ctx2.stroke();
  
       //logic to print the text
       ctx2.font = '15px serif';
       ctx2.strokeText(shiftedPoint, exactShiftedPointToScale, shiftedIntensityValue );

    
    }

     function drawFixedLowPassFilter(){
     var filterPoint = 110/secondWaveScale ; // fixed low pass filter point 110

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

   

function shiftSourceFrequencyAccordingToOscillator2(){
    
    //logic to shift the source frequency point
     var finalShiftedPoint = Math.abs((shiftedPoint * 10 - oscillator2.value * 10) / 10 );

     if(finalShiftedPoint > 10.695 && finalShiftedPoint < 10.705){
         pointDrawStart();
     }
     var exactShiftedPointToScale = finalShiftedPoint * thirdWaveScale;
     ctx1.moveTo(exactShiftedPointToScale, heightCoordinate);
   //  var shiftedIntensityValue = intensityA.value * heightPixel;
     var shiftedIntensityValue = intensityValues['intensity'] * heightPixel;
     ctx1.lineTo(exactShiftedPointToScale, shiftedIntensityValue);
     ctx1.stroke();

     //logic to print the text
     ctx1.font = '15px serif';
     ctx1.strokeText(finalShiftedPoint, exactShiftedPointToScale, shiftedIntensityValue );
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

var arrowUPButton = document.querySelector("#arrowUpButton");
var arrowDownButton = document.querySelector("#arrowDownButton");
var stepValue = document.querySelector("#stepValue");

arrowUPButton.addEventListener('click', increaseFrequencyByStep);
arrowDownButton.addEventListener('click' , decreaseFrequencyByStep);

function increaseFrequencyByStep(){
    oscillator1.value = Number(stepValue.value) + Number(oscillator1.value) ;
}

function decreaseFrequencyByStep(){
    oscillator1.value =  Number(oscillator1.value) - Number(stepValue.value) ;
}





    var canvas4 = document.querySelector('#canvas4'),
    ctx4 = canvas4.getContext("2d"),
    x1 = 145,
    y1 = 200,
    r = 143,
    headlen = 10,
    theta, //angle set according to intensity range from 0 - 10 i.e min 0 = 226 and max 10 = 316
    cosA,
    sinA,
    pointName = 'A,B,C,D';

function pointDrawStart() {
    ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
    ctx4.beginPath();
    ctx4.arc(150, 200, 150, 1.25 * Math.PI, 1.75 * Math.PI);

    //draw point indicator
    drawPointIndicator(44, 95, headlen, 226)
    drawPointIndicator(147.5, 50, headlen, 271)
    drawPointIndicator(255.5, 95, headlen, 316)
    ctx4.stroke();
    //line draw with arrow
    ctx4.moveTo(x1, y1);

    var drawLineAtpoint = function (point) {
        var angleA = 226,
            singlePointAngleIncrease = (316 - 226) / 10;
        return angleA + point * singlePointAngleIncrease;
    }

    // for (i = 0; i <= 3; i++) {
    //     var point = pointName.split(','),
    //          pointValue = document.querySelector('#intensity' + point[i]).value;
         pointValue = intensityValues['intensity'];
            
        if (pointValue != "") {
            theta = drawLineAtpoint(pointValue);
            cosA = Math.cos(Math.PI * theta / 180.0);
            sinA = Math.sin(Math.PI * theta / 180.0);

            //draw line with arrow
            lineArrow(x1, y1, x1 + r * cosA, y1 + r * sinA, headlen, "B");
            ctx4.stroke();
        }
    // }

    //add point value at the co-ordinate defined
    ctx4.font = '15px serif';
    ctx4.strokeText(0, 38, 109);
    ctx4.strokeText(5, 138, 45);
    ctx4.strokeText(10, 252, 109);

    function lineArrow(fromx, fromy, tox, toy, headlen, pointName) { // draw line along with pointer
        var dx = tox - fromx,
            dy = toy - fromy,
            angle = Math.atan2(dy, dx);

        ctx4.moveTo(fromx, fromy);
        ctx4.lineTo(tox, toy);
        ctx4.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx4.moveTo(tox, toy);
        ctx4.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        ctx4.font = '15px serif';
        ctx4.strokeText(pointName, tox - headlen * Math.cos(angle - Math.PI / 6), toy + 8 - headlen * Math.sin(angle - Math.PI / 6));
    }

    function drawPointIndicator(x1, y1, r, angle) { // draw point indicator at 0 - 5 - 10
        ctx4.moveTo(x1, y1);
        ctx4.lineTo(x1 + r * Math.cos(Math.PI * angle / 180.0), y1 + r * Math.sin(Math.PI * angle / 180.0))
    }
}
