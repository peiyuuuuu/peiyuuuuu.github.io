function calScore() {
    var sum = 0;
    for (let i = 1; i < 10; i++) {
        let qRadio;
        try {
            qRadio = document.getElementById('q' + i.toString()).querySelector('input:checked').value;

        } catch {
            alert('做完好嗎');
            return;
        }
        sum += parseInt(qRadio);

    }
    alert('你的分數： ' + sum + '分');
}
document.getElementById('submit').onclick = calScore