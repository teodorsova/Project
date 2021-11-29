window.onload = function () {
    var canvas = document.getElementById('showcase-canvas')
    var ctx = canvas.getContext('2d');
    var col = document.getElementById('showcase-title')
    var date = 1;
    var firstSquareXPos = 0;
    var counter = 0;
    canvas.width = col.scrollWidth - 24;
    canvas.height = col.scrollHeight;

    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }

    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    function drawText() {
        let h = canvas.height;
        let w = canvas.width;
        if (date === 29) {
            date = 1;
        }
        ctx.fillStyle = '#437C90';
        ctx.font = '40px mohave';
        if (date > 9) {
            ctx.fillText(date, w / 7.5, h / 2);
        } else {
            ctx.fillText(date, w / 7, h / 2);
        }
        ctx.font = '22px mohave';
        ctx.fillText('April', w / 7.5, h / 1.5);

        ctx.fillStyle = '#F7C548';
        ctx.font = '40px mohave';
        if (date > 8) {
            ctx.fillText(date + 1, w / 2.1, h / 2);
        } else {
            ctx.fillText(date + 1, w / 2.07, h / 2);
        }
        ctx.font = '22px mohave';
        ctx.fillText('April', w / 2.1, h / 1.5);

        ctx.fillStyle = '#437C90';
        ctx.font = '40px mohave';
        if (date > 7) {
            ctx.fillText(date + 2, w / 1.2495, h / 2);
        } else {
            ctx.fillText(date + 2, w / 1.235, h / 2);
        }
        ctx.font = '22px mohave';
        ctx.fillText('April', w / 1.25, h / 1.5);
        if (counter % 15 === 0) {
            date++;
            counter = 0;
        }
        counter++;
        
    }

    function drawRectangles() {
        let h = canvas.height;
        let w = canvas.width;

        ctx.fillStyle = '#F7C548';
        ctx.fillRect(0, h / 4, w / 3, h / 2);

        ctx.fillStyle = '#437C90';
        ctx.fillRect(w / 3, h / 4, w / 3 * 2, h / 2);

        ctx.fillStyle = '#F7C548';
        ctx.fillRect(w / 3 * 2, h / 4, w, h / 2);
    }

    function drawPelicularEffect() {
        let h = canvas.height;
        let w = canvas.width;

        if (firstSquareXPos === -40) {
            firstSquareXPos = 0;
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h / 12);
        ctx.fillRect(0, h / 12, w, h / 12);
        ctx.fillStyle = "white";
        for (let i = 0; i < w; i += 40) {
            ctx.beginPath();
            if (i === 0) {
                roundRect(ctx, 0, h / 12, 20 + firstSquareXPos, h / 12);
                i = firstSquareXPos;
            } else {
                roundRect(ctx, i, h / 12, 20, h / 12);
            }
            ctx.fill();
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, h / 6, w, h / 12);
        ctx.fillRect(0, 3 * h / 4, w, h / 12);
        ctx.fillRect(0, 5 * h / 6, w, h / 12);

        ctx.fillStyle = "white";
        for (let i = 0; i < w; i += 40) {
            ctx.beginPath();
            if (i === 0) {
                roundRect(ctx, 0, 5 * h / 6, 20 + firstSquareXPos, h / 12);
                i = firstSquareXPos;
            } else {
                roundRect(ctx, i, 5 * h / 6, 20, h / 12);
            }
            ctx.fill();
            ctx.closePath();
        }

        ctx.fillStyle = "black";
        ctx.fillRect(0, 11 * h / 12, w, h / 12);

        firstSquareXPos--;
    }

    function draw() {
        setTimeout(() => { window.requestAnimationFrame(draw) }, 20);
        clearCanvas();
        drawPelicularEffect();
        drawRectangles();
        drawText();

    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = col.scrollWidth;
        canvas.height = window.innerHeight / 6;
    });
}