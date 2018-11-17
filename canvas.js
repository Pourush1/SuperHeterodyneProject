var canvas1 = document.querySelector('#canvas1');
var canvas2 = document.querySelector('#canvas2');
var canvas3 = document.querySelector('#canvas3');
var canvas4 = document.querySelector('#canvas4');

var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');
var ctx4 = canvas4.getContext("2d");

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
const thirdWaveScale = 1; //need to change this value

//objects to store the individual frequency and intensity values and the key of those
var frequencyValues = {},
    intensityValues = {},
    frequencyPoint = {};

const x1 = 145,
      y1 = 200,
       r = 143,
      headlen = 10;

var theta, //angle set according to intensity range from 0 - 10 i.e min 0 = 226 and max 10 = 316
    cosA,
    sinA,
    colorLine = [{
        'A': 'red'
    }, {
        'B': 'green'
    }, {
        'C': 'blue'
    }, {
        'D': 'yellow'
    }];

// This is the source of frequency and intensity from the Source Table
var datas = document.querySelectorAll('.frequency');
var intensities = document.querySelectorAll('.intensity');

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

var unitButtons = document.querySelectorAll(".mode");
var toggleUnit = document.querySelector("#MHz");

var unitButtons1 = document.querySelectorAll(".mode1");
var toggleUnit1 = document.querySelector("#MHz1");

window.onload = init();

function init() {
    drawAxes();
    drawWave(firstWaveScale);
    drawGauge();
    setupUnitButtons();
    setupUnitButtons1();
}

function reset() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    init();
}
// function to draw the axes in the canvas
function drawAxes() {
    ctx1.beginPath();
    ctx1.lineTo(0, 300);
    ctx1.lineTo(500, 300);
    ctx1.stroke();
}

function drawGauge() {
    ctx4.beginPath();
    ctx4.strokeStyle = 'black';
    ctx4.arc(150, 200, 150, 1.25 * Math.PI, 1.75 * Math.PI);

    //draw point indicator
    drawPointIndicator(44, 95, headlen, 226)
    drawPointIndicator(147.5, 50, headlen, 271)
    drawPointIndicator(255.5, 95, headlen, 316)
    ctx4.stroke();
    //line draw with arrow
    ctx4.moveTo(x1, y1);

    //add point value at the co-ordinate defined
    ctx4.font = '15px serif';
    ctx4.strokeText(0, 38, 109);
    ctx4.strokeText(5, 138, 45);
    ctx4.strokeText(10, 252, 109);

    function drawPointIndicator(x1, y1, r, angle) { // draw point indicator at 0 - 5 - 10
        ctx4.moveTo(x1, y1);
        ctx4.lineTo(x1 + r * Math.cos(Math.PI * angle / 180.0), y1 + r * Math.sin(Math.PI * angle / 180.0))
    }

}

//function to draw the first wave in the right most canvas
function drawWave(scale, oscillatorFrequency) {

    if (scale === 2) {

        var firstPoint = (fixedFirstFrequencyPointWave1 - startingWidthCoordinateWave1) / scale;
        var secondPoint = (fixedSecondFrequencyPointWave1 - startingWidthCoordinateWave1) / scale;

        ctx3.beginPath();

        ctx3.moveTo(firstPoint, heightCoordinate);
        ctx3.lineTo(firstPoint + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx3.lineTo(secondPoint - shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx3.lineTo(secondPoint, heightCoordinate);
        ctx3.stroke();
        
        writeText(ctx3,fixedFirstFrequencyPointWave1, firstPoint - shiftForZigZagLine, heightCoordinate - heightToSubstract);
        writeText(ctx3,fixedSecondFrequencyPointWave1, secondPoint - shiftForZigZagLine, heightCoordinate - heightToSubstract);

    } else if (scale === 1.4) {
        var point = Math.abs(fixedFirstFrequencyPointWave1 - oscillatorFrequency);
        var secondPoint = Math.abs(fixedSecondFrequencyPointWave1 - oscillatorFrequency);

        var pointA = (point - 0) / scale;
        var pointB = (secondPoint - 0) / scale;

        ctx2.beginPath();

        ctx2.moveTo(pointA, heightCoordinate);
        ctx2.lineTo(pointA + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx2.lineTo(pointB - shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx2.lineTo(pointB, heightCoordinate);
        ctx2.stroke();

        writeText(ctx2,point, pointA + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        writeText(ctx2,secondPoint, pointB - shiftForZigZagLine, heightCoordinate - heightToSubstract);

    } else if (scale === 1) {
        // fixed values 110 and 0 for the low pass flter
        var point = Math.abs((110 * 10 - oscillatorFrequency * 10) / 10);
        var secondPoint = Math.abs(0 - oscillatorFrequency);

        var pointA = (point - 0) + 100;
        var pointB = (secondPoint - 0) + 100;

        ctx1.beginPath();

        ctx1.moveTo(pointA, heightCoordinate);
        ctx1.lineTo(pointA + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx1.lineTo(pointB - shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx1.lineTo(pointB, heightCoordinate);

        ctx1.stroke();

        writeText(ctx1,point, pointA + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        writeText(ctx1,secondPoint, pointB - shiftForZigZagLine, heightCoordinate - heightToSubstract);
    }

}

datas.forEach(function (e) {
    e.addEventListener('change', getFrequency);
})

intensities.forEach(function (e) {
    e.addEventListener('change', getIntensity);
})

var color;
function getFrequency() {

    var frequencyValue = this.value;
    if (this.value != "" || this.value.length > 0) {
        this.disabled = true;
    }
    frequencyValues.frequency = frequencyValue;
    frequencyPoint.point = this.getAttribute('key');

}

function getIntensity() {

    var intensityValue = this.value;
    if (this.value != "" || this.value.length > 0) {
        this.disabled = true;
    }
    intensityValues.intensity = intensityValue;
    frequencyPoint.point = this.getAttribute('key');

    if (frequencyPoint.point === 'A') {
        color = 'red';
    }
    else if (frequencyPoint.point === 'B') {
        color = 'green';
    }
    else if (frequencyPoint.point === 'C') {
        color = 'blue';
    }
    else if (frequencyPoint.point === 'D') {
        color = 'yellow';
    }

    getFrequencyIntensityValue(color);


}

function setupUnitButtons() {
    for (var i = 0; i < unitButtons.length; i++) {
        unitButtons[i].addEventListener("click", function () {
            unitButtons[0].classList.remove("selected");
            unitButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "MHz" ? toggleUnit.textContent = "MHz" : toggleUnit.textContent = "KHz";
        });
    }
}

function setupUnitButtons1() {
    for (var i = 0; i < unitButtons1.length; i++) {
        unitButtons1[i].addEventListener("click", function () {
            unitButtons1[0].classList.remove("selected");
            unitButtons1[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "MHz" ? toggleUnit1.textContent = "MHz" : toggleUnit1.textContent = "KHz";
        });
    }
}


function getFrequencyIntensityValue(color) {

    var frequencyValue = frequencyValues['frequency'];
    var intensityValue = intensityValues['intensity'];

    var signalPoint = (frequencyValue - startingWidthCoordinateWave1) / 2;
    var intensityAmplitude = intensityValue * heightPixel; 

    drawSignalLine(ctx3, signalPoint, intensityAmplitude, color);
    writeText(ctx3, frequencyValue, signalPoint, intensityAmplitude);
    // ctx3.font = '15px serif';
    // ctx3.strokeText(frequencyValue, signalPoint, intensityAmplitude);
}

function writeText(ctx, text, x, y){
    ctx.font = '15px serif';
    ctx.strokeText(text,x,y);
}

function drawSignalLine(ctx, signalPoint, intensityAmplitude, color) {
    ctx.beginPath();
    ctx.moveTo(signalPoint, heightCoordinate);
    ctx.lineTo(signalPoint, intensityAmplitude);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

function drawOscillatorFrequency() {
    reset();
    var oscillator1frequencyValue;

    if (toggleUnit1.textContent === 'MHz') {
        oscillator1frequencyValue = oscillator1.value;

        // if (oscillator1frequencyValue == "")
        //     alert("Empty value");
        // if (isNaN(oscillator1frequencyValue))
        //     alert("Is not a number");
        // if (oscillator1frequencyValue < 1000)
        //     alert("Too low a number");
        // if (oscillator1frequencyValue > 2000)
        //     alert("Too high a number");
    }

    else if (toggleUnit1.textContent === 'KHz') {
        oscillator1frequencyValue = oscillator1.value / 1000;

        // if (oscillator1frequencyValue == "")
        //     alert("Empty value");
        // if (isNaN(oscillator1frequencyValue))
        //     alert("Is not a number");
        // if (oscillator1frequencyValue < 1000000)
        //     alert("Too low a number");
        // if (oscillator1frequencyValue > 2000000)
        //     alert("Too high a number");
    }
    var oscillatorPoint = (oscillator1frequencyValue - startingWidthCoordinateWave1) / 2;
    
    getFrequencyIntensityValue();
    drawOscillatorLine(ctx3, oscillatorPoint);
    drawWave(secondWaveScale, oscillator1frequencyValue);
    shiftSourceFrequency(oscillator1frequencyValue, color);
    drawFixedLowPassFilter();
}

function drawOscillatorLine(ctx, oscillatorPoint) {
    ctx.beginPath();
    ctx.moveTo(oscillatorPoint, heightCoordinate);
    ctx.lineTo(oscillatorPoint, heightCoordinate - heightToSubstract);
    ctx.moveTo(oscillatorPoint - 10, heightCoordinate - heightToSubstract);
    ctx.lineTo(oscillatorPoint + 10 , heightCoordinate - heightToSubstract);
    ctx.lineTo(oscillatorPoint , heightCoordinate - heightToSubstract - 10);
    ctx.lineTo(oscillatorPoint - 10, heightCoordinate - heightToSubstract);
    ctx.stroke();
}

function drawOscillator2Frequency() {
    var oscillator2frequencyValue;
    if (toggleUnit.textContent === 'MHz') {
        oscillator2frequencyValue = oscillator2.value;
    }
    else if (toggleUnit.textContent === 'KHz') {
        oscillator2frequencyValue = oscillator2.value / 1000;
    }

    var oscillatorPoint = (oscillator2frequencyValue - 0) / secondWaveScale;
   

    drawOscillatorFrequency();
    drawOscillatorLine(ctx2, oscillatorPoint);
    drawWave(thirdWaveScale, oscillator2frequencyValue);
    shiftSourceFrequencyAccordingToOscillator2(oscillator2frequencyValue, color);
    drawFixedFilter2();
}

var shiftedPoint; //This global variable is used to pass the 

function shiftSourceFrequency(oscillatorFrequency, color) {
   
    //logic to shift the source frequency point
    shiftedPoint = Math.abs(frequencyValues['frequency'] - oscillatorFrequency);
    var exactShiftedPointToScale = shiftedPoint / secondWaveScale;
    ctx2.moveTo(exactShiftedPointToScale, heightCoordinate);
    var shiftedIntensityValue = intensityValues['intensity'] * heightPixel;
    drawSignalLine(ctx2, exactShiftedPointToScale, shiftedIntensityValue, color);

    //logic to print the text
    writeText(ctx2,shiftedPoint, exactShiftedPointToScale, shiftedIntensityValue );
}

function drawFixedLowPassFilter() {
    var filterPoint = 110 / secondWaveScale; // fixed low pass filter point 110

    //logic to draw the fix low pass filter, always in the same position
    ctx2.moveTo(0, heightCoordinate);
    ctx2.lineTo(shiftForZigZagLine, heightToSubstract);
    ctx2.lineTo(filterPoint - shiftForZigZagLine, heightToSubstract);
    ctx2.lineTo(filterPoint, heightCoordinate);
    ctx2.stroke();

    // logic to print the text
    ctx2.font = '10px serif';
    ctx2.strokeText(0, 0, heightCoordinate);
    ctx2.strokeText(110, filterPoint, heightCoordinate);
    ctx2.strokeText("IF FILTER 1", filterPoint - 60, 250);
}

function shiftSourceFrequencyAccordingToOscillator2(oscillatorFrequency, color) {
    //logic to shift the source frequency point
    var finalShiftedPoint = Math.abs((shiftedPoint * 10 - oscillatorFrequency * 10) / 10);

    if (finalShiftedPoint > (10.695) && finalShiftedPoint < (10.705)) {
        pointDrawStart();
    }
    // var exactShiftedPointToScale = finalShiftedPoint * thirdWaveScale;
    var exactShiftedPointToScale = finalShiftedPoint + 100;
    ctx1.moveTo(exactShiftedPointToScale, heightCoordinate);

    var shiftedIntensityValue = intensityValues['intensity'] * heightPixel;
    drawSignalLine(ctx1, exactShiftedPointToScale, shiftedIntensityValue, color);
    //logic to print the text
    writeText(ctx1,finalShiftedPoint, exactShiftedPointToScale, shiftedIntensityValue );
}

function drawFixedFilter2() {
    //fixd filter points 10.695 and 10.705
    // var filterPoint = 10.695 * 2;
    // var filterPoint2 = 10.705 * 2;

    var filterPoint = 10.695 + 100;
    var filterPoint2 = 10.705 + 100;

    ctx1.moveTo(filterPoint, heightCoordinate);
    ctx1.lineTo(filterPoint, heightToSubstract);
    ctx1.lineTo(filterPoint2 + 5, heightToSubstract);
    ctx1.lineTo(filterPoint2 + 5, heightCoordinate);
    ctx1.stroke();
}

var arrowUpButton1 = document.querySelector("#arrowUpButtonOscillator1");
var arrowDownButton1 = document.querySelector("#arrowDownButtonOscillator1");
var stepValue1 = document.querySelector("#stepValue1");

var arrowUpButton2 = document.querySelector("#arrowUpButtonOscillator2");
var arrowDownButton2 = document.querySelector("#arrowDownButtonOscillator2");
var stepValue2 = document.querySelector("#stepValue2");

arrowUpButton1.addEventListener('click', increaseFrequencyOfOscillator1ByStep);
arrowDownButton1.addEventListener('click', decreaseFrequencyOfOscillator1ByStep);

arrowUpButton2.addEventListener('click', increaseFrequencyOfOscillator2ByStep);
arrowDownButton2.addEventListener('click', decreaseFrequencyOfOscillator2ByStep);

function increaseFrequencyOfOscillator1ByStep() {
    oscillator1.value = Number(stepValue1.value) + Number(oscillator1.value);
}

function decreaseFrequencyOfOscillator1ByStep() {
    oscillator1.value = Number(oscillator1.value) - Number(stepValue1.value);
}

function increaseFrequencyOfOscillator2ByStep() {
    oscillator2.value = Number(stepValue2.value) + Number(oscillator2.value);
}

function decreaseFrequencyOfOscillator2ByStep() {
    oscillator2.value = Number(oscillator2.value) - Number(stepValue2.value);
}


function pointDrawStart() {

    var drawLineAtpoint = function (point) {
        var angleA = 226,
            singlePointAngleIncrease = (316 - 226) / 10;
        return angleA + point * singlePointAngleIncrease;
    }

    pointValue = intensityValues['intensity'];

    if (pointValue != "") {
        theta = drawLineAtpoint(pointValue);
        cosA = Math.cos(Math.PI * theta / 180.0);
        sinA = Math.sin(Math.PI * theta / 180.0);

        //draw line with arrow
        lineArrow(x1, y1, x1 + r * cosA, y1 + r * sinA, headlen, frequencyPoint["point"], getField(colorLine, frequencyPoint["point"]));
        ctx4.stroke();
    }


    function lineArrow(fromx, fromy, tox, toy, headlen, pointName, color) { // draw line along with pointer
        var dx = tox - fromx,
            dy = toy - fromy,
            angle = Math.atan2(dy, dx);

        ctx4.beginPath();
        ctx4.strokeStyle = color;
        ctx4.moveTo(fromx, fromy);
        ctx4.lineTo(tox, toy);
        ctx4.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx4.moveTo(tox, toy);
        ctx4.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        ctx4.font = '15px serif';
        ctx4.strokeText(pointName, tox - headlen * Math.cos(angle - Math.PI / 6), toy + 8 - headlen * Math.sin(angle - Math.PI / 6));
    }

    function getField(input, field) {
        var output;
        for (var i = 0; i < input.length; ++i) {
            if (input[i][field] != undefined)
                output = input[i][field];
        }
        return output;
    }
}