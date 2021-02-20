const questions = [
    'Yutuq 1', 
    'Yutuq 2', 
    'Yutuq 3', 
    'Yutuq 4', 
    'Yutuq 5', 
    'Yutuq 6', 
    'Yutuq 7', 
    'Yutuq 8', 
    'Yutuq 9', 
    'Yutuq 10', 
    'Yutuq 11', 
    'Yutuq 12', 
    'Yutuq 13', 
    'Yutuq 14', 
    'Spark 15'
];

const typer = document.getElementById('question');
let i = 0;

function load() {
    localStorage.setItem('deg', 0);
    localStorage.setItem('answered', JSON.stringify([]));
    localStorage.setItem('user', 1);
    localStorage.setItem('count', 0);
}

function del() {
    let txt = typer.innerText;
    txt = txt.substring(0, txt.length - 1);
    typer.innerText = txt;
    if (! txt == '') {
        setTimeout(del, 5);
    }
}

function type(text) {
    if (typer.innerText == '') {i = 0}
    if (i < text.length) {
        typer.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => {
            type(text);
        }, 20);
    }
}

function getRandom() {
    let answered = JSON.parse(localStorage.getItem('answered'));
    let n = Math.floor(Math.random() * 15);
    while (answered.includes(n)) {
        n = Math.floor(Math.random() * 15);
    }
    answered.push(n);
    localStorage.setItem('answered', JSON.stringify(answered));
    return [n * 24 + 1800, n]
}

function play() {
    let button = document.getElementById('play');
    let e = document.getElementById('wheel');
    let qs = document.querySelectorAll('.right > div');
    let users = document.querySelectorAll('.users > div');

    let deg = Number(localStorage.getItem('deg'));
    let user = localStorage.getItem('user');
    let count = localStorage.getItem('count');
    count++;
    let mp3 = new Audio('./assets/audio/wheel.mp3');
    mp3.play();

    r = getRandom();
    d = deg + 360 - deg % 360 + r[0];
    n = r[1];

    if (n == 14) {
        setTimeout(function () {
            typer.style.fontSize = '105px';
        }, 4000); 
    } else {
        setTimeout(function () {
            typer.style.fontSize = '64px';
        }, 4000);
    }
    
    e.style = `transform: rotateZ(-${d}deg)`;

    button.disabled = true;
    users[user-1].className = '';
    user = user % 3 + 1;
    users[user-1].className = 'active-user';
    
    localStorage.setItem('deg', `${d}`);
    localStorage.setItem('user', `${user}`);
    localStorage.setItem('count', `${count}`);

    del();
    setTimeout(function() {
        type(questions[n]);
        button.disabled = false;
        qs[n].className = 'answered';
        mp3.pause();
    }, 15000);

    if (n == 15) {
        setTimeout(function () {
            confetti.start();
        }, 15000);
        setTimeout(function () {
            confetti.stop()
        }, 25000);
    }
}