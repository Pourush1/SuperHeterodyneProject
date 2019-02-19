$(document).ready(function() {
  var globalLowPassFilterValues = {
    x1: 0,
    x2: 110
  };
  var preX2 = 110;
  var globalSources = [];
  var numberToColor = {
    "0": "red",
    "1": "green",
    "2": "blue",
    "3": "pink"
  };

  var colorToAlphabet = {
    red: "A",
    green: "B",
    blue: "C",
    pink: "D"
  };

  $(".clsSources").on("change", function() {
    globalSources = [];
    try {
      var srcA = {
        frequency: $("#frequencyA").val(),
        intensity: $("#intensityA").val()
      };
      var srcB = {
        frequency: $("#frequencyB").val(),
        intensity: $("#intensityB").val()
      };
      var srcC = {
        frequency: $("#frequencyC").val(),
        intensity: $("#intensityC").val()
      };
      var srcD = {
        frequency: $("#frequencyD").val(),
        intensity: $("#intensityD").val()
      };
      globalSources.push(srcA);
      globalSources.push(srcB);
      globalSources.push(srcC);
      globalSources.push(srcD);
      //   console.log(globalSources);
      drawSorceSignalsForCtx3();
      drawSignalsOnContext2();
      drawSignalsOnContext1();
    } catch (err) {
      console.log(err);
    }
  }); //eoe

  function drawSorceSignalsForCtx3() {
    try {
      resetCanvas3();
      drawWave(firstWaveScale);
      for (var i = 0; i < globalSources.length; i++) {
        var tempSource = globalSources[i];
        if (
          tempSource.frequency.trim() != "" &&
          tempSource.intensity.trim() != ""
        ) {
          var signalPoint =
            (tempSource.frequency - startingWidthCoordinateWave1) / 1.1;
          var intensityAmplitude = tempSource.intensity * heightPixel;
          var obj = {
            lineData: [signalPoint, intensityAmplitude],
            color: numberToColor["" + i]
          };
          drawSingleSignal(obj, ctx3);
        }
      }
    } catch (err) {
      console.log(err);
    }
  } //eof

  function drawSingleSignal(src, ctxNumber) {
    var ctx = ctxNumber;
    var signalPoint = src.lineData[0];
    var intensityAmplitude = src.lineData[1];
    var color = src.color;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(signalPoint, heightCoordinate);
    ctx.lineTo(signalPoint, heightCoordinate - intensityAmplitude);
    ctx.stroke();
    writeText(
      ctx,
      colorToAlphabet[color],
      signalPoint,
      heightCoordinate - intensityAmplitude
    );
  } //eof

  function drawSignalsOnContext2() {
    try {
      var oscillatorFrequency = oscillator1.value;
      resetCanvas3();
      resetCanvas2();
      //         resetCanvas1();
      drawSorceSignalsForCtx3();
      drawWave(secondWaveScale, oscillatorFrequency); //draws wave in 2nd canvas
      drawFixedLowPassFilter(globalLowPassFilterValues);
      var oscillatorPoint =
        (oscillatorFrequency - startingWidthCoordinateWave1) / 1.1;
      drawOscillatorLine(ctx3, oscillatorPoint);

      ctx2.save();
      for (var i = 0; i < globalSources.length; i++) {
        var tempSource = globalSources[i];
        if (
          tempSource.frequency.trim() != "" &&
          tempSource.intensity.trim() != ""
        ) {
          shiftedPoint = Math.abs(
            (tempSource.frequency * 10 - oscillatorFrequency * 10) / 10
          ).toFixed(3);
          var exactShiftedPointToScale = shiftedPoint / secondWaveScale;
          ctx2.moveTo(exactShiftedPointToScale, heightCoordinate);
          var shiftedIntensityValue = tempSource.intensity * heightPixel;

          var obj = {
            lineData: [exactShiftedPointToScale + 200, shiftedIntensityValue],
            color: numberToColor["" + i]
          };
          drawSingleSignal(obj, ctx2);
          //writeText(ctx2, shiftedPoint, exactShiftedPointToScale, shiftedIntensityValue);
        }
      }
      ctx2.restore();
    } catch (err) {
      console.log(err);
    }
    //logic to print the text
  } //eof

  function drawSignalsOnContext1() {
    try {
      ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
      drawGauge();
      resetCanvas1();
      drawSignalsOnContext2();

      var oscillatorFrequency = oscillator2.value;

      drawWave(thirdWaveScale, oscillatorFrequency); //draws wave in 2nd canvas
      var oscillatorPoint = (oscillatorFrequency - 0) / secondWaveScale;
      drawOscillatorLine(ctx2, oscillatorPoint);
      drawFixedFilter2();
      ctx1.save();
      for (var i = 0; i < globalSources.length; i++) {
        var tempSource = globalSources[i];
        if (
          tempSource.frequency.trim() != "" &&
          tempSource.intensity.trim() != ""
        ) {
          var newShiftedPoint = 0;
          newShiftedPoint =
            Number(tempSource.frequency) - Number(oscillator1.value);
          newShiftedPoint = newShiftedPoint - Number(oscillator2.value);
          newShiftedPoint = Math.abs(newShiftedPoint);
          console.log(newShiftedPoint);

          var shiftedIntensityValue = tempSource.intensity * heightPixel;
          var obj = {
            lineData: [newShiftedPoint + 100, shiftedIntensityValue],
            color: numberToColor["" + i]
          };

          drawSingleSignal(obj, ctx1);
          //writeText(ctx2, shiftedPoint, exactShiftedPointToScale, shiftedIntensityValue);
          if (newShiftedPoint > 10.695 && newShiftedPoint < 10.705) {
            pointDrawStart(
              tempSource.intensity,
              colorToAlphabet[obj.color],
              numberToColor["" + i]
            );
          }
        }
      }
      ctx1.restore();
    } catch (err) {
      console.log(err);
    }
    //logic to print the text
  } //eof

  var canvas1 = document.querySelector("#canvas1");
  var canvas2 = document.querySelector("#canvas2");
  var canvas3 = document.querySelector("#canvas3");
  var canvas4 = document.querySelector("#canvas4");

  var ctx1 = canvas1.getContext("2d");
  var ctx2 = canvas2.getContext("2d");
  var ctx3 = canvas3.getContext("2d");
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
  const thirdWaveScale = 2.5; //need to change this value

  const x1 = 145,
    y1 = 200,
    r = 143,
    headlen = 10;

  var theta, //angle set according to intensity range from 0 - 10 i.e min 0 = 226 and max 10 = 316
    cosA,
    sinA,
    colorLine = [
      {
        A: "red"
      },
      {
        B: "green"
      },
      {
        C: "blue"
      },
      {
        D: "yellow"
      }
    ];

  //This is the source of the first Oscillator value
  var oscillator1 = document.querySelector("#oscillator1");
  var oscillatorSubmit = document.querySelector("#oscillatorSubmit");
  oscillatorSubmit.addEventListener("click", drawSignalsOnContext1);

  //This is the source of the second Oscillator value
  var oscillator2 = document.querySelector("#oscillator2");
  var oscillatorSubmit2 = document.querySelector("#oscillatorSubmit2");
  oscillatorSubmit2.addEventListener("click", drawSignalsOnContext1);

  var unitButtons = document.querySelectorAll(".mode");
  var toggleUnit = document.querySelector("#MHz");

  var unitButtons1 = document.querySelectorAll(".mode1");
  var toggleUnit1 = document.querySelector("#MHz1");

  window.onload = init();

  function init() {
    drawWave(firstWaveScale);
    drawGauge();
    setupUnitButtons();
    setupUnitButtons1();
  }
  var i;

  function resetCanvas1() {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  }

  function resetCanvas2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  }

  function resetCanvas3() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  }

  function drawGauge() {
    ctx4.beginPath();
    ctx4.strokeStyle = "black";
    ctx4.arc(150, 200, 150, 1.25 * Math.PI, 1.75 * Math.PI);

    //draw point indicator
    drawPointIndicator(44, 95, headlen, 226);
    drawPointIndicator(147.5, 50, headlen, 271);
    drawPointIndicator(255.5, 95, headlen, 316);
    ctx4.stroke();
    //line draw with arrow
    ctx4.moveTo(x1, y1);

    //add point value at the co-ordinate defined
    ctx4.font = "15px serif";
    ctx4.strokeText(0, 38, 109);
    ctx4.strokeText(5, 138, 45);
    ctx4.strokeText(10, 252, 109);

    function drawPointIndicator(x1, y1, r, angle) {
      // draw point indicator at 0 - 5 - 10
      ctx4.moveTo(x1, y1);
      ctx4.lineTo(
        x1 + r * Math.cos((Math.PI * angle) / 180.0),
        y1 + r * Math.sin((Math.PI * angle) / 180.0)
      );
    }
  }

  //function to draw the first wave in the right most canvas
  function drawWave(scale, oscillatorFrequency) {
    if (scale === 1.1) {
      var firstPoint =
        (fixedFirstFrequencyPointWave1 - startingWidthCoordinateWave1) / scale;
      var secondPoint =
        (fixedSecondFrequencyPointWave1 - startingWidthCoordinateWave1) / scale;

      ctx3.beginPath();
      ctx3.strokeStyle = "black";
      ctx3.moveTo(firstPoint, heightCoordinate);
      ctx3.lineTo(
        firstPoint + shiftForZigZagLine,
        heightCoordinate - heightToSubstract
      );
      ctx3.lineTo(
        secondPoint - shiftForZigZagLine,
        heightCoordinate - heightToSubstract
      );
      ctx3.lineTo(secondPoint, heightCoordinate);
      ctx3.stroke();

      drawTextBox(
        canvas3,
        fixedFirstFrequencyPointWave1,
        firstPoint,
        heightCoordinate - heightToSubstract
      );
      drawTextBox(
        canvas3,
        fixedSecondFrequencyPointWave1,
        secondPoint,
        heightCoordinate - heightToSubstract
      );
    } else if (scale === 1.4) {
      var point = Math.abs(
        (fixedFirstFrequencyPointWave1 * 10 - oscillatorFrequency * 10) / 10
      ).toFixed(3);
      var secondPoint = Math.abs(
        (fixedSecondFrequencyPointWave1 * 10 - oscillatorFrequency * 10) / 10
      ).toFixed(3);

      var pointA = point / scale;
      var pointB = secondPoint / scale;

      ctx2.save();

      // ctx2.transform(1.6,0,0,1,0,0);
      ctx2.beginPath();
      ctx2.moveTo(pointA + 100, heightCoordinate);
      ctx2.lineTo(
        pointA + 100 + shiftForZigZagLine,
        heightCoordinate - heightToSubstract
      );
      ctx2.lineTo(
        pointB + 100 - shiftForZigZagLine,
        heightCoordinate - heightToSubstract
      );
      ctx2.lineTo(pointB + 100, heightCoordinate);
      ctx2.stroke();

      drawTextBox(
        canvas2,
        point,
        pointA + shiftForZigZagLine + 100,
        heightCoordinate - heightToSubstract
      );
      drawTextBox(
        canvas2,
        secondPoint,
        pointB - shiftForZigZagLine + 100,
        heightCoordinate - heightToSubstract
      );
      ctx2.restore();
    } else if (scale === 2.5) {
      // fixed values 110 and 0 for the low pass flter
      // var point = Math.abs((110 * 10 - oscillatorFrequency * 10) / 10);
      var point = Math.abs(
        (globalLowPassFilterValues.x2 * 10 - oscillatorFrequency * 10) / 10
      );
      //    var secondPoint = Math.abs(0 - oscillatorFrequency).toFixed(3);
      var secondPoint = Math.abs(0 - oscillatorFrequency) * scale;
      console.log("point==" + point);
      console.log("pointB==" + secondPoint);
      ctx1.save();
      ctx1.beginPath();

      ctx1.moveTo(point + 100, heightCoordinate);
      ctx1.lineTo(
        point + 100 + shiftForZigZagLine,
        heightCoordinate - heightToSubstract
      );
      ctx1.lineTo(
        secondPoint + 100 - shiftForZigZagLine,
        heightCoordinate - heightToSubstract
      );
      ctx1.lineTo(secondPoint + 100, heightCoordinate);
      ctx1.stroke();

      drawTextBox(
        canvas1,
        point.toFixed(3),
        point + shiftForZigZagLine + 100,
        heightCoordinate - heightToSubstract
      );
      drawTextBox(
        canvas1,
        secondPoint / scale.toFixed(3),
        secondPoint - shiftForZigZagLine + 100,
        heightCoordinate - heightToSubstract
      );
      ctx1.restore();
    }
  }

  function setupUnitButtons() {
    for (var i = 0; i < unitButtons.length; i++) {
      unitButtons[i].addEventListener("click", function() {
        unitButtons[0].classList.remove("selected");
        unitButtons[1].classList.remove("selected");
        this.classList.add("selected");
      });
    }
  }

  function setupUnitButtons1() {
    for (var i = 0; i < unitButtons1.length; i++) {
      unitButtons1[i].addEventListener("click", function() {
        unitButtons1[0].classList.remove("selected");
        unitButtons1[1].classList.remove("selected");
        this.classList.add("selected");
      });
    }
  }

  function writeText(ctx, text, x, y) {
    ctx.font = "15px serif";
    ctx.strokeText(text, x, y);
  }

  function drawTextBox(ctx, text, x, y, x1, x2) {
    var widthValue = {
      canvas3: 30,
      canvas2: 42,
      canvas1: 42
    };
    console.log(ctx.id);

    var input = new CanvasInput({
      canvas: ctx,
      x: x - 25,
      y: y - 25,
      x1: x1 ? true : false,
      x2: x2 ? true : false,
      value: text,
      fontSize: 10,
      fontFamily: x1 + "," + x2,
      fontColor: "#212121",
      fontWeight: "bold",
      width: widthValue[ctx.id],
      padding: 4,
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 3,
      boxShadow: "1px 1px 0px #fff",
      innerShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
      onsubmit: function(e) {
        alert(e.target.value);
        //resetLowPassFilterOnCanvas2(e.target.value);
        console.log("---------------------");
        var tempRslt = input.fontFamily().split(",");
        console.log(tempRslt);
        console.log("---------------------");
        if (tempRslt[0] == "true") {
          globalLowPassFilterValues.x1 = Number(input.value());
          //drawSignalsOnContext2();
          input.destroy();
          drawSignalsOnContext2();
        }
        if (tempRslt[1] == "true") {
          preX2 = globalLowPassFilterValues.x2;
          globalLowPassFilterValues.x2 = Number(input.value());
          // drawSignalsOnContext2();
          input.destroy();
          drawSignalsOnContext2();
        }
        console.log(globalLowPassFilterValues);
      }
    });
  }

  function drawOscillatorLine(ctx, oscillatorPoint) {
    // alert('khatte');
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(oscillatorPoint, heightCoordinate);
    ctx.lineTo(oscillatorPoint, heightCoordinate - heightToSubstract);
    ctx.moveTo(oscillatorPoint - 10, heightCoordinate - heightToSubstract);
    ctx.lineTo(oscillatorPoint + 10, heightCoordinate - heightToSubstract);
    ctx.lineTo(oscillatorPoint, heightCoordinate - heightToSubstract - 10);
    ctx.lineTo(oscillatorPoint - 10, heightCoordinate - heightToSubstract);
    ctx.stroke();
  }

  var shiftedPoint; //This global variable is used to pass the

  function drawFixedLowPassFilter(globalLowPassFilterValues) {
    var filterPoint = Number(globalLowPassFilterValues.x2) / secondWaveScale; // fixed low pass filter point 110
    //var filterPoint1 = Number(globalLowPassFilterValues.x1)/ secondWaveScale;
    //logic to draw the fix low pass filter, always in the same position
    ctx2.save();
    ctx2.beginPath();
    // ctx2.moveTo(((globalLowPassFilterValues.x1) / 1.4 + 100), heightCoordinate);
    ctx2.moveTo(globalLowPassFilterValues.x1 / 1.4 + 200, heightCoordinate);
    ctx2.lineTo(
      globalLowPassFilterValues.x1 / 1.4 + shiftForZigZagLine + 200,
      170
    );
    ctx2.lineTo(filterPoint - shiftForZigZagLine + 200, 170);
    ctx2.lineTo(globalLowPassFilterValues.x2 / 1.4 + 200, heightCoordinate);
    ctx2.stroke();

    // logic to print the text
    ctx2.font = "10px serif";
    drawTextBox(
      canvas2,
      globalLowPassFilterValues.x1 + "",
      globalLowPassFilterValues.x1 / 1.4 + 170,
      heightCoordinate,
      true,
      false
    );
    drawTextBox(
      canvas2,
      globalLowPassFilterValues.x2,
      filterPoint + 225,
      heightCoordinate,
      false,
      true
    );
    // ctx2.strokeText(0, 0, heightCoordinate)
    // ctx2.strokeText(110, filterPoint, heightCoordinate);
    // ctx2.strokeText("IF FILTER 1", filterPoint - 60, 250);
    ctx2.restore();
  }

  function drawFixedFilter2() {
    var filterPoint = 10.695;
    var filterPoint2 = 10.715;
    //fixd filter points 10.695 and 10.705
    ctx1.save();
    //  ctx1.translate(100, 0);
    // ctx1.transform(1, 0, 0, 1, 100, 0);
    // var filterPoint = 10.695 + 100;
    //  var filterPoint2 = 10.705 + 100;
    ctx1.beginPath();
    ctx1.moveTo(filterPoint + 100, heightCoordinate);
    ctx1.lineTo(filterPoint + 100, heightToSubstract);
    ctx1.lineTo(filterPoint2 + 105, heightToSubstract);
    ctx1.lineTo(filterPoint2 + 105, heightCoordinate);
    ctx1.stroke();
    ctx1.restore();
  }

  // logic for arrow up button and down button
  var arrowUpButton1 = document.querySelector("#arrowUpButtonOscillator1");
  var arrowDownButton1 = document.querySelector("#arrowDownButtonOscillator1");
  var stepValue1 = document.querySelector("#stepValue1");

  var arrowUpButton2 = document.querySelector("#arrowUpButtonOscillator2");
  var arrowDownButton2 = document.querySelector("#arrowDownButtonOscillator2");
  var stepValue2 = document.querySelector("#stepValue2");

  arrowUpButton1.addEventListener(
    "click",
    increaseFrequencyOfOscillator1ByStep
  );
  arrowDownButton1.addEventListener(
    "click",
    decreaseFrequencyOfOscillator1ByStep
  );

  arrowUpButton2.addEventListener(
    "click",
    increaseFrequencyOfOscillator2ByStep
  );
  arrowDownButton2.addEventListener(
    "click",
    decreaseFrequencyOfOscillator2ByStep
  );

  function increaseFrequencyOfOscillator1ByStep() {
    for (var i = 0; i < unitButtons1.length; i++) {
      if (unitButtons1[i].className === "mode1 selected") {
        if (unitButtons1[i].textContent === "MHz")
          oscillator1.value =
            (Number(stepValue1.value) * 10 + Number(oscillator1.value) * 10) /
            10;
        if (unitButtons1[i].textContent === "KHz") {
          oscillator1.value = (
            Number(stepValue1.value / 1000) + Number(oscillator1.value)
          ).toFixed(3);
        }
      }
    }
  }

  function decreaseFrequencyOfOscillator1ByStep() {
    for (var i = 0; i < unitButtons1.length; i++) {
      if (unitButtons1[i].className === "mode1 selected") {
        if (unitButtons1[i].textContent === "MHz")
          oscillator1.value =
            (Number(oscillator1.value) * 10 - Number(stepValue1.value) * 10) /
            10;
        if (unitButtons1[i].textContent === "KHz") {
          oscillator1.value = (
            (Number(oscillator1.value) * 10 -
              Number(stepValue1.value / 1000) * 10) /
            10
          ).toFixed(3);
        }
      }
    }
  }

  function increaseFrequencyOfOscillator2ByStep() {
    for (var i = 0; i < unitButtons.length; i++) {
      if (unitButtons[i].className === "mode selected") {
        if (unitButtons[i].textContent === "MHz")
          oscillator2.value =
            (Number(stepValue2.value) * 10 + Number(oscillator2.value) * 10) /
            10;
        if (unitButtons[i].textContent === "KHz") {
          oscillator2.value = (
            (Number(stepValue2.value / 1000) * 10 +
              Number(oscillator2.value) * 10) /
            10
          ).toFixed(3);
        }
      }
    }
  }

  function decreaseFrequencyOfOscillator2ByStep() {
    for (var i = 0; i < unitButtons.length; i++) {
      if (unitButtons[i].className === "mode selected") {
        if (unitButtons[i].textContent === "MHz")
          oscillator2.value =
            (Number(oscillator2.value) * 10 - Number(stepValue2.value) * 10) /
            10;
        if (unitButtons[i].textContent === "KHz") {
          oscillator2.value = (
            (Number(oscillator2.value) * 10 -
              Number(stepValue2.value / 1000) * 10) /
            10
          ).toFixed(3);
        }
      }
    }
  }

  // logic for canvas 4 the clock
  function pointDrawStart(intensity, pointNane, color) {
    var drawLineAtpoint = function(point) {
      var angleA = 226,
        singlePointAngleIncrease = (316 - 226) / 10;
      return angleA + point * singlePointAngleIncrease;
    };

    //   pointValue = intensityValues['intensity'];
    pointValue = intensity;

    if (pointValue != "") {
      theta = drawLineAtpoint(pointValue);
      cosA = Math.cos((Math.PI * theta) / 180.0);
      sinA = Math.sin((Math.PI * theta) / 180.0);

      //draw line with arrow
      // lineArrow(x1, y1, x1 + r * cosA, y1 + r * sinA, headlen, frequencyPoint["point"], getField(colorLine, frequencyPoint["point"]));
      lineArrow(
        x1,
        y1,
        x1 + r * cosA,
        y1 + r * sinA,
        headlen,
        pointNane,
        color
      );
      ctx4.stroke();
    }

    function lineArrow(fromx, fromy, tox, toy, headlen, pointName, color) {
      // draw line along with pointer
      var dx = tox - fromx,
        dy = toy - fromy,
        angle = Math.atan2(dy, dx);

      ctx4.beginPath();
      ctx4.strokeStyle = color;
      ctx4.moveTo(fromx, fromy);
      ctx4.lineTo(tox, toy);
      ctx4.lineTo(
        tox - headlen * Math.cos(angle - Math.PI / 6),
        toy - headlen * Math.sin(angle - Math.PI / 6)
      );
      ctx4.moveTo(tox, toy);
      ctx4.lineTo(
        tox - headlen * Math.cos(angle + Math.PI / 6),
        toy - headlen * Math.sin(angle + Math.PI / 6)
      );
      ctx4.font = "15px serif";
      ctx4.strokeText(
        pointName,
        tox - headlen * Math.cos(angle - Math.PI / 6),
        toy + 8 - headlen * Math.sin(angle - Math.PI / 6)
      );
    }

    function getField(input, field) {
      var output;
      for (var i = 0; i < input.length; ++i) {
        if (input[i][field] != undefined) output = input[i][field];
      }
      return output;
    }
  }
});
