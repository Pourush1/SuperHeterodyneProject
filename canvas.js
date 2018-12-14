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
const startingWidthCoordinateWave1 = 1200;
const heightCoordinate = canvas1.height;
const firstWaveScale = 1.1;
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
console.log(datas);
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

var input, input1;

function init() {
    // drawAxes();
    drawWave(firstWaveScale);
    drawGauge();
    setupUnitButtons();
    setupUnitButtons1();
    // let duplicates = remove_duplicates_es6([[1,2,3],[1,2,3],[4,5,6]]);
    // console.log(duplicates);

}
var i;
var array = [];
//var collection = new Set();

function reset() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    // drawWave(firstWaveScale);

    init();
    let newArray = multiDimensionalUnique(array);
    if(newArray.length >= 3 && newArray.length < 6){
    drawRed();
    }
    if(newArray.length >= 6 && newArray.length < 9){
    drawRedAndGreen();
    }
    if(newArray.length >= 9 && newArray.length < 12){
    drawRedGreenAndBlue();
    }
    function drawRed() {
        // if (newArray.length >= 3 && newArray.length < 6) {
            for (var i = 0; i < 3; i++) {
                drawNewLine(newArray[i], 'red');
            }
        // }
    }

    function drawRedAndGreen() {
        // if (newArray.length >= 6 && newArray.length < 9) {
            drawRed();
            for (var i = 3; i < 6; i++) {
                drawNewLine(newArray[i], 'green');
            }
        // }
    }

    function drawRedGreenAndBlue() {
        // if (newArray.length >= 9 && newArray.length < 12) {
            drawRedAndGreen();
            
            for (var i = 6; i < 9; i++) {
                drawNewLine(newArray[i], 'blue');
            }
     //   }
    }
}

function drawNewLine(arr, colorValue) {
    var ctx = arr[0];
    var point = arr[1];
    var color = colorValue;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(point, 300);
    ctx.lineTo(point, 200);
    ctx.stroke();
    ctx.closePath();

}

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

function remove_duplicates_es6(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
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

    if (scale === 1.1) {
        var firstPoint = (fixedFirstFrequencyPointWave1 - startingWidthCoordinateWave1) / scale;
        var secondPoint = (fixedSecondFrequencyPointWave1 - startingWidthCoordinateWave1) / scale;

        ctx3.beginPath();
        ctx3.strokeStyle = 'black';
        ctx3.moveTo(firstPoint, heightCoordinate);
        ctx3.lineTo(firstPoint + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx3.lineTo(secondPoint - shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx3.lineTo(secondPoint, heightCoordinate);
        ctx3.stroke();

        drawTextBox(canvas3, fixedFirstFrequencyPointWave1, firstPoint, heightCoordinate - heightToSubstract);
        drawTextBox(canvas3, fixedSecondFrequencyPointWave1, secondPoint, heightCoordinate - heightToSubstract);

    } else if (scale === 1.4) {
        var point = Math.abs((fixedFirstFrequencyPointWave1 * 10 - oscillatorFrequency * 10) / 10);
        var secondPoint = Math.abs((fixedSecondFrequencyPointWave1 * 10 - oscillatorFrequency * 10) / 10);

        var pointA = (point - 0) / scale;
        var pointB = (secondPoint - 0) / scale;

        ctx2.beginPath();
        ctx2.save();
        ctx2.strokeStyle = 'black';
        ctx2.translate(100,0);
        ctx2.moveTo(pointA, heightCoordinate);
        ctx2.lineTo(pointA + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx2.lineTo(pointB - shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx2.lineTo(pointB, heightCoordinate);
        ctx2.stroke();
        ctx2.restore();

        drawTextBox(canvas2, point, pointA + shiftForZigZagLine + 100, heightCoordinate - heightToSubstract );
        drawTextBox(canvas2, secondPoint, pointB - shiftForZigZagLine + 100, heightCoordinate - heightToSubstract);

    } else if (scale === 1) {
        // fixed values 110 and 0 for the low pass flter
        var point = Math.abs((110 * 10 - oscillatorFrequency * 10) / 10);
        var secondPoint = Math.abs(0 - oscillatorFrequency);

        var pointA = (point - 0) + 100;
        var pointB = (secondPoint - 0) + 100;

        ctx1.beginPath();
        ctx1.save();
        ctx1.transform(1.5, 0, 0, 1, 0, 0);
        ctx1.strokeStyle = 'black';
        ctx1.moveTo(pointA, heightCoordinate);
        ctx1.lineTo(pointA + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx1.lineTo(pointB - shiftForZigZagLine, heightCoordinate - heightToSubstract);
        ctx1.lineTo(pointB, heightCoordinate);

        
        ctx1.stroke();
       
       
        ctx1.restore();

        drawTextBox(canvas1, point, pointA + shiftForZigZagLine, heightCoordinate - heightToSubstract);
        drawTextBox(canvas1, secondPoint , pointB - shiftForZigZagLine, heightCoordinate - heightToSubstract);
    }

}
console.log(Math.sin(Math.PI/6));

datas.forEach(function (e) {
    e.addEventListener('change', getFrequency);
})

intensities.forEach(function (e) {
    e.addEventListener('change', getIntensity);
})


function getFrequency() {

    var frequencyValue = this.value;
    // if (this.value != "" || this.value.length > 0) {
    //     this.disabled = true;
    // }
    frequencyValues.frequency = frequencyValue;
    frequencyPoint.point = this.getAttribute('key');

}
function getIntensity() {

    var intensityValue = this.value;
    // if (this.value != "" || this.value.length > 0) {
    //     this.disabled = true;
    // }
    intensityValues.intensity = intensityValue;
    frequencyPoint.point = this.getAttribute('key');

    // let newArray = multiDimensionalUnique(array);
    // if (newArray.length === 3 || newArray.length === 6 || newArray.length === 9) {
    //     drawLinesAgain(newArray);
    // }

    getFrequencyIntensityValue();
}

function setupUnitButtons() {
    for (var i = 0; i < unitButtons.length; i++) {
        unitButtons[i].addEventListener("click", function () {
            unitButtons[0].classList.remove("selected");
            unitButtons[1].classList.remove("selected");
            this.classList.add("selected");
   //         this.textContent === "MHz" ? toggleUnit.textContent = "MHz" : toggleUnit.textContent = "KHz";
        });
    }
}

function setupUnitButtons1() {
    for (var i = 0; i < unitButtons1.length; i++) {
        unitButtons1[i].addEventListener("click", function () {
            unitButtons1[0].classList.remove("selected");
            unitButtons1[1].classList.remove("selected");
            this.classList.add("selected");
   //         this.textContent === "MHz" ? toggleUnit1.textContent = "MHz" : toggleUnit1.textContent = "KHz";
        });
    }
}

function getFrequencyIntensityValue() {
    reset();
    var frequencyValue = frequencyValues['frequency'];
    var intensityValue = intensityValues['intensity'];

    var signalPoint = (frequencyValue - startingWidthCoordinateWave1) / 1.1;
    var intensityAmplitude = intensityValue * heightPixel;

    var a1 = [ctx3, signalPoint];
    //  array.push(a1);

    drawSignalLine(ctx3, signalPoint, intensityAmplitude);
    writeText(ctx3, frequencyValue, signalPoint, intensityAmplitude);

    return a1;
}

function writeText(ctx, text, x, y) {
    ctx.font = '15px serif';
    ctx.strokeText(text, x, y);
}

function drawTextBox(ctx, text, x, y) {
    var input = new CanvasInput({
        // canvas: document.getElementById('canvas3'),
        canvas: ctx,
        x: x - 25,
        y: y - 25,
        value: text,
        fontSize: 10,
        fontFamily: 'Arial',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 32,
        padding: 4,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        boxShadow: '1px 1px 0px #fff',
        innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)'
    });
}

function drawSignalLine(ctx, signalPoint, intensityAmplitude) {
    var color = "";
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
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(signalPoint, heightCoordinate);
    ctx.lineTo(signalPoint, intensityAmplitude);
    ctx.stroke();
    ctx.closePath();
}

function drawOscillatorFrequency() {
    reset(); //clears the canvas and draws the initial configuration
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
    var oscillatorPoint = (oscillator1frequencyValue - startingWidthCoordinateWave1) / 1.1;

    // input.value(fixedFirstFrequencyPointWave1);
    // input1.value(fixedSecondFrequencyPointWave1);
    var a1 = getFrequencyIntensityValue(); // draws the signal line in the 3rd canvas
    array.push(a1);
    drawOscillatorLine(ctx3, oscillatorPoint); //draws osicallator line in 3rd canvas
    drawWave(secondWaveScale, oscillator1frequencyValue); //draws wave in 2nd canvas
    drawFixedLowPassFilter();
    shiftSourceFrequency(oscillator1frequencyValue); //shifts the source frequency according to oscillator 1

}

function drawOscillatorLine(ctx, oscillatorPoint) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(oscillatorPoint, heightCoordinate);
    ctx.lineTo(oscillatorPoint, heightCoordinate - heightToSubstract);
    ctx.moveTo(oscillatorPoint - 10, heightCoordinate - heightToSubstract);
    ctx.lineTo(oscillatorPoint + 10, heightCoordinate - heightToSubstract);
    ctx.lineTo(oscillatorPoint, heightCoordinate - heightToSubstract - 10);
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
    drawFixedFilter2();
    shiftSourceFrequencyAccordingToOscillator2(oscillator2frequencyValue);

}

var shiftedPoint; //This global variable is used to pass the 

function shiftSourceFrequency(oscillatorFrequency) {


    //logic to shift the source frequency point
    shiftedPoint = Math.abs((frequencyValues['frequency'] * 10 - oscillatorFrequency * 10)/10);
    var exactShiftedPointToScale = shiftedPoint / secondWaveScale;
    ctx2.moveTo(exactShiftedPointToScale, heightCoordinate);
    var shiftedIntensityValue = intensityValues['intensity'] * heightPixel;

    var a2 = [ctx2, exactShiftedPointToScale];
    array.push(a2);
    drawSignalLine(ctx2, exactShiftedPointToScale, shiftedIntensityValue);

    //logic to print the text
    writeText(ctx2, shiftedPoint, exactShiftedPointToScale, shiftedIntensityValue);
}

function drawFixedLowPassFilter() {
    var filterPoint = 110 / secondWaveScale; // fixed low pass filter point 110

    //logic to draw the fix low pass filter, always in the same position
    ctx2.save();
    ctx2.strokeStyle = 'black';
    ctx2.translate(100,0);
    ctx2.moveTo(0, heightCoordinate);
    ctx2.lineTo(shiftForZigZagLine, heightToSubstract);
    ctx2.lineTo(filterPoint - shiftForZigZagLine, heightToSubstract);
    ctx2.lineTo(filterPoint, heightCoordinate);
    ctx2.stroke();
    ctx2.restore();

    // logic to print the text
    ctx2.font = '10px serif';
    drawTextBox(canvas2,"0", 0 + 85, heightCoordinate + 5);
    drawTextBox(canvas2,"110", filterPoint + 125, heightCoordinate + 5);
    // ctx2.strokeText(0, 0, heightCoordinate)
    // ctx2.strokeText(110, filterPoint, heightCoordinate);
    ctx2.strokeText("IF FILTER 1", filterPoint - 60, 250);
}

function shiftSourceFrequencyAccordingToOscillator2(oscillatorFrequency) {
    //logic to shift the source frequency point
    var finalShiftedPoint = Math.abs((shiftedPoint * 10 - oscillatorFrequency * 10) / 10);

    if (finalShiftedPoint > (10.695) && finalShiftedPoint < (10.705)) {
        pointDrawStart();
    }
    else {
        ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
        drawGauge();
    }
    // var exactShiftedPointToScale = finalShiftedPoint * thirdWaveScale;
    var exactShiftedPointToScale = finalShiftedPoint + 100;
    ctx1.moveTo(exactShiftedPointToScale, heightCoordinate);

    var shiftedIntensityValue = intensityValues['intensity'] * heightPixel;

    var a3 = [ctx1, exactShiftedPointToScale];
    array.push(a3);
    //   collection.set(ctx3,exactShiftedPointToScale);
    drawSignalLine(ctx1, exactShiftedPointToScale, shiftedIntensityValue);
    //logic to print the text
    writeText(ctx1, finalShiftedPoint, exactShiftedPointToScale, shiftedIntensityValue);
}

function drawFixedFilter2() {
    //fixd filter points 10.695 and 10.705

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
    for(var i= 0; i <unitButtons1.length; i++){
        
        if(unitButtons1[i].className === "mode1 selected"){
            if(unitButtons1[i].textContent === "MHz")
            oscillator1.value = (Number(stepValue1.value) * 10 + Number(oscillator1.value) * 10) / 10;
            if(unitButtons1[i].textContent === "KHz" ){
                oscillator1.value = ((Number((stepValue1.value)/1000) * 10 + Number(oscillator1.value) * 10) / 10).toFixed(4);
            
            }
        }
    }
   
}

function decreaseFrequencyOfOscillator1ByStep() {
    oscillator1.value = (Number(oscillator1.value) * 10 - Number(stepValue1.value) * 10) / 10;
}

function increaseFrequencyOfOscillator2ByStep() {
    oscillator2.value = (Number(stepValue2.value) * 10 + Number(oscillator2.value) * 10) / 10;
}

function decreaseFrequencyOfOscillator2ByStep() {
    oscillator2.value = (Number(oscillator2.value) * 10 - Number(stepValue2.value) * 10) / 10;
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