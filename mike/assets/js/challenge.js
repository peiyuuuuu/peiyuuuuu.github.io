document.getElementById('challenge').classList.add('active')
firebase.database().ref().on('value', snapshot => {
    var snap = snapshot.val()['question']
    var question = Object.keys(snap)
    var status = Object.values(snap)

    for (let i = 0; i < question.length; i++) {
        if (status[i] == 1) {
            if (i != question.length - 1) {
                document.getElementById(question[i]).classList.remove('disabled')
                var icon = document.getElementById(question[i]).childNodes[1]['firstElementChild'].classList
                icon.remove('bi-x')
                icon.add('bi-check')

            } else {
                document.getElementById(question[i]).classList.remove('disabled')
                var icon = document.getElementById(question[i]).childNodes[1]['firstElementChild'].classList

            }
        }

    }

})

document.getElementById('33tab').onclick = function() {
    document.getElementById('44puzzle').style.display = 'none'
    document.getElementById('33puzzle').style.display = 'block'
    shuffle3();
}

document.getElementById('44tab').onclick = function() {
    document.getElementById('33puzzle').style.display = 'none'
    document.getElementById('44puzzle').style.display = 'block'
    shuffle4();
}

document.getElementById('reset').onclick = function() {
    firebase.database().ref().on('value', snapshot => {
        var snap = snapshot.val()['question']
        var question = Object.keys(snap)
        var status = Object.values(snap)
        for (let i = 0; i < question.length; i++) {
            firebase.database().ref('question').update({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, secret: 0 })
            firebase.database().ref('answers').set({ q1: 'initial', q2: 'initial', q3: 'initial', q4: 'initial', q5: 'initial', q6: 'initial', q7: 'initial', q8: 'initial' })

        }
    })

}

var NUM = 4

function swapTiles4(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
    checkStatus4();
}

function swapTiles3(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
    checkStatus3();
}

var flag33 = false;
var flag44 = false;

function shuffle4() {
    //Use nested loops to access each cell of the 3x3 grid
    if (flag44) {
        document.getElementById('cell44').className = 'tile16';
        flag44 = false;
    }

    for (var row = 1; row <= NUM; row++) { //For each row of the 3x3 grid
        for (var column = 1; column <= NUM; column++) { //For each column in this row

            var row2 = Math.floor(Math.random() * NUM + 1); //Pick a random row from 1 to 3
            var column2 = Math.floor(Math.random() * NUM + 1); //Pick a random column from 1 to 3

            swapTiles4("cell" + row + column, "cell" + row2 + column2); //Swap the look & feel of both cells
        }
    }
}

function shuffle3() {
    if (flag33) {
        document.getElementById('cll33').className = 'tle9';
        flag33 = false;
    }

    //Use nested loops to access each cell of the 3x3 grid
    for (var row = 1; row <= 3; row++) { //For each row of the 3x3 grid
        for (var column = 1; column <= 3; column++) { //For each column in this row

            var row2 = Math.floor(Math.random() * 3 + 1); //Pick a random row from 1 to 3
            var column2 = Math.floor(Math.random() * 3 + 1); //Pick a random column from 1 to 3

            swapTiles3("cll" + row + column, "cll" + row2 + column2); //Swap the look & feel of both cells
        }
    }
}
shuffle3()

function clickTile4(row, column) {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;

    if (tile != "tile16") {
        //Checking if white tile on the right
        if (column < NUM) {
            if (document.getElementById("cell" + row + (column + 1)).className == "tile16") {
                swapTiles4("cell" + row + column, "cell" + row + (column + 1));
                return;
            }
        }
        //Checking if white tile on the left
        if (column > 1) {
            if (document.getElementById("cell" + row + (column - 1)).className == "tile16") {
                swapTiles4("cell" + row + column, "cell" + row + (column - 1));
                return;
            }
        }
        //Checking if white tile is above
        if (row > 1) {
            if (document.getElementById("cell" + (row - 1) + column).className == "tile16") {
                swapTiles4("cell" + row + column, "cell" + (row - 1) + column);
                return;
            }
        }
        //Checking if white tile is below
        if (row < NUM) {
            if (document.getElementById("cell" + (row + 1) + column).className == "tile16") {
                swapTiles4("cell" + row + column, "cell" + (row + 1) + column);
                return;
            }
        }
    }

}

function clickTile3(row, column) {
    var cell = document.getElementById("cll" + row + column);
    var tile = cell.className;

    if (tile != "tle9") {
        //Checking if white tile on the right
        if (column < 3) {
            if (document.getElementById("cll" + row + (column + 1)).className == "tle9") {
                swapTiles3("cll" + row + column, "cll" + row + (column + 1));
                return;
            }
        }
        //Checking if white tile on the left
        if (column > 1) {
            if (document.getElementById("cll" + row + (column - 1)).className == "tle9") {
                swapTiles3("cll" + row + column, "cll" + row + (column - 1));
                return;
            }
        }
        //Checking if white tile is above
        if (row > 1) {
            if (document.getElementById("cll" + (row - 1) + column).className == "tle9") {
                swapTiles3("cll" + row + column, "cll" + (row - 1) + column);
                return;
            }
        }
        //Checking if white tile is below
        if (row < 3) {
            if (document.getElementById("cll" + (row + 1) + column).className == "tle9") {
                swapTiles3("cll" + row + column, "cll" + (row + 1) + column);
                return;
            }
        }
    }

}

function checkStatus4() {
    let total = 0
    for (let i = 1; i <= NUM; i++) {
        for (let j = 1; j <= NUM; j++) {
            if (document.getElementById('cell' + i + j).className === ('tile' + ((i - 1) * NUM + j).toString())) {
                total += 1;
            }
        }
    }
    if (total === 16) {
        document.getElementById('cell44').className = 'tile16-1';
        flag44 = true;
        alert('冰冷凍庫')

    }
}


function checkStatus3() {
    let total = 0
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (document.getElementById('cll' + i + j).className === ('tle' + ((i - 1) * 3 + j).toString())) {
                total += 1;
            }
        }
    }
    if (total === 9) {
        document.getElementById('cll33').className = 'tle9-1'
        flag33 = true;
        alert('把卡片')

    }
}