const board = document.getElementById("board1");
board.width=800;
const ctxofbubble = board.getContext("2d");
// board.width = window.innerWidth - 50;
// board.height = window.innerHeight - 50;
// ctx.moveTo(0,0);
// ctx.lineTo(200,200);
// ctx.stroke();
// ctxofbubble;
// ctx.strokeWidth=1;
// ctx.lineWidth = 0;
var arr = [];

function generateRandomValued() {
    for (var i = 0; i < 80; i++) {
        arr.push((5 + Math.floor(Math.random() * 100))%board.height)
    }
}

function draw(ctx ,arr) {
    ctx.strokeStyle = "#ff7a5a"
    ctx.clearRect(0,0,board.width,board.height);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.stroke();
    var y = board.height;
    var move =board.width / arr.length;
    var x = 0;
    // ctx.fillStyle = "red";
    arr.forEach(num => {
        ctx.moveTo(x, y);
        ctx.rect(x, y, move, -num);
        x += move
        ctx.stroke()
    });
    // console.log("hello")
    // requestAnimationFrame(draw));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function delaycallback(delaytime, arrt,ctxofbubble) {
    sleep(delaytime)
        .then(() => { draw(ctxofbubble,arrt) });
}

function bubblesort(arr,ctxofbubble) {
    var k = 2;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 1; j < arr.length - i; j++) {
            if (arr[j - 1] > arr[j]) {
                var t = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = t;

            }
            k++
            var arrt = arr.slice(0);
            delaycallback(k * 10, arrt,ctxofbubble);


        }
    }
}

// bubblesort(arr);
var k = 1;
function quicksort(arr, l, r) {
    console.log(k + " " + l + " " + r);
    if (r <= l) {
        return;
    } else {
        var p = l + Math.floor(Math.random() * 100) % (r - l + 1);
        var curr = l;
        var t = arr[p];
        arr[p] = arr[r];
        arr[r] = t;

        for (var i = l; i < r; i++) {
            if (arr[i] <= t) {
                var x = arr[i];
                arr[i] = arr[curr];
                arr[curr] = x;
                curr++;
            }
            k++;
            var arrt = arr.slice(0);
            delaycallback(k * 10, arrt);
        }
        t = arr[curr];
        arr[curr] = arr[r];
        arr[r] = t;
        quicksort(arr, l, curr - 1);
        quicksort(arr, curr + 1, r);
    }

}
generateRandomValued();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function callsorting(algo) {
    arr = shuffle(arr);
    if (algo == "bubble") {
        bubblesort(arr,ctxofbubble);
    } else if (algo == "quick") {
        quicksort(arr, 0, arr.length - 1);
    }
}
// var canvases=document.getElementsByTagName(canvas);
