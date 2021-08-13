document.getElementById('q1').classList.add('active')
document.getElementById('q1').classList.remove('disabled')
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

document.getElementById('submit').onclick = function() {
    if (document.getElementById('answer').value === '陳冠廷/翁以璉' || document.getElementById('answer').value === '翁以璉/陳冠廷') {
        firebase.database().ref('question').update({ q1: 1 })
        document.getElementById('q2').classList.add('active')
        document.getElementById('q2').classList.remove('disabled')
        document.getElementById('q1').classList.remove('active')

        var q1icon = document.getElementById('q1').childNodes[1]['firstElementChild'].classList
        q1icon.remove('bi-x')
        q1icon.add('bi-check')

        var bs = document.getElementById('bs')
        bs.style.visibility = 'visible'
        bs.childNodes[1].setAttribute('src', './assets/images/liangyes.jpg');
        setTimeout((function() {
            bs.style.visibility = 'hidden';
        }), 2000);

    } else {
        var bs = document.getElementById('bs')
        bs.style.visibility = 'visible'
        bs.childNodes[1].setAttribute('src', './assets/images/liangno.jpg');
        setTimeout((function() {
            bs.style.visibility = 'hidden';
        }), 2000);
    }
}
document.getElementById('reset').onclick = function() {
    firebase.database().ref().on('value', snapshot => {
        var snap = snapshot.val()['question']
        var question = Object.keys(snap)
        var status = Object.values(snap)
        for (let i = 0; i < question.length; i++) {
            firebase.database().ref('question').update({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, secret: 0 })

        }
    })

}