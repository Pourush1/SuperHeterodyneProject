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

pointDrawStart();
var button = document.querySelector('#submit');
button.addEventListener('click', pointDrawStart);


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


    for (i = 0; i <= 3; i++) {
        var point = pointName.split(','),
            pointValue = document.querySelector('#intensity' + point[i]).value;
        if (pointValue != "") {
            theta = drawLineAtpoint(pointValue);
            cosA = Math.cos(Math.PI * theta / 180.0);
            sinA = Math.sin(Math.PI * theta / 180.0);

            //draw line with arrow
            lineArrow(x1, y1, x1 + r * cosA, y1 + r * sinA, headlen, point[i]);
            ctx4.stroke();
        }
    }


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