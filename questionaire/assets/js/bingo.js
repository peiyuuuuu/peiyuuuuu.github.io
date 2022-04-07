$(document).ready(function () {
    // Array containing all of the potential square content and their descriptions, separated by "::".
    var squares = [
        "01::Filler content for testing purposes",
        "02::Filler content for testing purposes",
        "03::Filler content for testing purposes",
        "04::Filler content for testing purposes",
        "05::Filler content for testing purposes",
        "06::Filler content for testing purposes",
        "07::Filler content for testing purposes",
        "08::Filler content for testing purposes",
        "09::Filler content for testing purposes",
        "10::Filler content for testing purposes",
        "11::Filler content for testing purposes",
        "12::Filler content for testing purposes",
        "13::Filler content for testing purposes",
        "14::Filler content for testing purposes",
        "15::Filler content for testing purposes",
        "16::Filler content for testing purposes",
        "17::Filler content for testing purposes",
        "18::Filler content for testing purposes",
        "19::Filler content for testing purposes",
        "20::Filler content for testing purposes",
        "21::Filler content for testing purposes",
        "22::Filler content for testing purposes",
        "23::Filler content for testing purposes",
        "24::Filler content for testing purposes",
        "25::Filler content for testing purposes"
    ];
    var randomDab = ['dabbedRed', 'dabbedBlue', 'dabbedYellow', 'dabbedGreen', 'dabbedPurple', 'dabbedOrange', 'dabbedBlack'];
    var isDabbed = ['cell12'];
    var bingoRow = [];
    var bingoCol = [];
    var bingoDiag = [];
    var dabColor;

    // Function to shuffle/randomize array content
    function shuffle(v) {
        for (var j, x, i = v.length; i; j = parseInt(Math.random() * i, 10), x = v[--i], v[i] = v[j], v[j] = x);
        return v;
    }
    // Function to clear all dabs from the card
    function cleanCard() {
        $('td').removeClass();
        isDabbed = [];
        bingoRow = [];
        bingoCol = [];
        bingoDiag = [];
        $('#scoreRow').html(bingoRow.length);
        $('#scoreCol').html(bingoCol.length);
        $('#scoreDiag').html(bingoDiag.length);
    }
    // Function to fill the card with randomized square entries
    function fillCard() {
        cleanCard();
        shuffle(squares);
        for (i = 0; i < 25; i++) {
            var squareName = squares[i].substr(0, squares[i].indexOf("::"));
            var squareDesc = squares[i].substr(squares[i].indexOf("::") + 2, squares[i].length);
            $('#cell' + i).html(squareName).attr('title', squareDesc);
        }
    }
    // Function to give the customary free center dab
    function freeDab() {
        isDabbed.push('cell12');
        if (dabColor == 'random') {
            $('#cell12').addClass(randomDab[Math.floor(Math.random() * randomDab.length)]).html('Freebie!').attr('title', "");
        } else {
            $('#cell12').addClass(dabColor).html('Freebie!').attr('title', "");
        }
    }
    // Function to check for multiple values within an array
    function containsAll(needles, haystack) {
        for (var i = 0, len = needles.length; i < len; i++) {
            if ($.inArray(needles[i], haystack) == -1) return false;
        }
        return true;
    }
    // Function to check for bingos (by searching the isDabbed array for the right sequences of cells) then save them to the bingo array
    function bingoCheck() {
        // Check rows (cells 0-4, 5-9, 10-14, 15-19, and 20-24)
        for (i = 0; i < 21; i += 5) {
            // If all of a row's cells are in the isDabbed array, and if that row isn't already in the bingo array, add it
            if (containsAll(["cell" + i, "cell" + (i + 1), "cell" + (i + 2), "cell" + (i + 3), "cell" + (i + 4)], isDabbed)) {
                if ($.inArray("row" + i, bingoRow) == -1) {
                    bingoRow.push("row" + i);
                    $('#scoreRow').html(bingoRow.length);
                    alert("BINGO! You scored a row! Don't stop now!");
                }
                // If all of a row's cells are no longer in the isDabbed array, and if that row is already in the bingo array, remove it
            } else {
                if ($.inArray("row" + i, bingoRow) !== -1) {
                    bingoRow.splice($.inArray("row" + i, bingoRow), 1);
                    $('#scoreRow').html(bingoRow.length);
                }
            }
        }
        // Check columns (cells 0-20, 1-21, 2-22, 3-23, and 4-24)
        for (i = 0; i < 5; i++) {
            // If all of a column's cells are in the isDabbed array, and if that column isn't already in the bingo array, add it
            if (containsAll(["cell" + i, "cell" + (i + 5), "cell" + (i + 10), "cell" + (i + 15), "cell" + (i + 20)], isDabbed)) {
                if ($.inArray("col" + i, bingoCol) == -1) {
                    bingoCol.push("col" + i);
                    $('#scoreCol').html(bingoCol.length);
                    alert("BINGO! You scored a column! Keep it up!");
                }
                // If all of a column's cells are no longer in the isDabbed array, and if that column is already in the bingo array, remove it
            } else {
                if ($.inArray("col" + i, bingoCol) !== -1) {
                    bingoCol.splice($.inArray("col" + i, bingoCol), 1);
                    $('#scoreCol').html(bingoCol.length);
                }
            }
        }
        // Check forward diagonal (cells 0, 6, 12, 18, and 24)
        if (containsAll(["cell0", "cell6", "cell12", "cell18", "cell24"], isDabbed)) {
            if ($.inArray("diag0", bingoDiag) == -1) {
                bingoDiag.push("diag0");
                $('#scoreDiag').html(bingoDiag.length);
                alert("Bingo! You scored a diagonal! Nice moves!");
            }
        } else {
            if ($.inArray("diag0", bingoDiag) !== -1) {
                bingoDiag.splice($.inArray("diag0", bingoDiag), 1);
                $('#scoreDiag').html(bingoDiag.length);
            }
        }
        // Check backward diagonal (cells 4, 8, 12, 16, and 20)
        if (containsAll(["cell4", "cell8", "cell12", "cell16", "cell20"], isDabbed)) {
            if ($.inArray("diag4", bingoDiag) == -1) {
                bingoDiag.push("diag4");
                $('#scoreDiag').html(bingoDiag.length);
                alert("BINGO! You scored a diagonal! Nice moves!");
            }
        } else {
            if ($.inArray("diag4", bingoDiag) !== -1) {
                bingoDiag.splice($.inArray("diag4", bingoDiag), 1);
                $('#scoreDiag').html(bingoDiag.length);
            }
        }
        // Check for a full bingo of all 12 row/column/diagonal combinations
        if ((bingoRow.length == 5) && (bingoCol.length == 5) && (bingoDiag.length == 2)) {
            alert("CONGRATULATIONS - you're a WINNER!");
        }
    }
    // Function to switch the active dabbing color
    function switchDab(color, id) {
        dabColor = color;
        $('.dabSelect').removeClass('dabActive');
        $(id).addClass('dabActive');
    }

    // When clicking a 'td' element, (1) add/remove the 'dabbed' class, (2) add/remove its id to/from the isDabbed array, and (3) run a check for bingos
    $('td').click(function () {
        if ($.inArray(this.id, isDabbed) !== -1) {
            isDabbed.splice($.inArray(this.id, isDabbed), 1);
            $(this).removeClass();
        } else {
            isDabbed.push(this.id);
            if (dabColor == 'random') {
                $(this).addClass(randomDab[Math.floor(Math.random() * randomDab.length)]);
            } else {
                $(this).addClass(dabColor);
            }
        }
        bingoCheck();
    });
    // Refill the card when clicking the "#newCard" button
    $('#newCard').click(function () {
        fillCard();
        //freeDab();
    });
    // Clear all dabs from the card when clicking the "#cleanCard" button
    $('#cleanCard').click(function () {
        cleanCard();
    });
    // Switch the dabbing color to red
    $('#dabRed').click(function () {
        switchDab('dabbedRed', this);
    });
    // Switch the dabbing color to blue
    $('#dabBlue').click(function () {
        switchDab('dabbedBlue', this);
    });
    // Switch the dabbing color to green
    $('#dabYellow').click(function () {
        switchDab('dabbedYellow', this);
    });
    // Switch the dabbing color to yellow
    $('#dabGreen').click(function () {
        switchDab('dabbedGreen', this);
    });
    // Switch the dabbing color to purple
    $('#dabPurple').click(function () {
        switchDab('dabbedPurple', this);
    });
    // Switch the dabbing color to orange
    $('#dabOrange').click(function () {
        switchDab('dabbedOrange', this);
    });
    // Switch the dabbing color to black
    $('#dabBlack').click(function () {
        switchDab('dabbedBlack', this);
    });
    // Switch the dabbing color to random
    $('#dabRandom').click(function () {
        switchDab('random', this);
    });

    // Initialize the card on page load
    switchDab('dabbedRed', '#dabRed');
    fillCard();
    //freeDab();

});