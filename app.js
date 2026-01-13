let appSeq = [];
let userSeq = [];
let h2 = document.querySelector('h2');

let btns = ['orange', 'red', 'purple', 'green'];

let started = false;
let level = 0;

document.addEventListener('keypress', function() {
    if(started == false) {
        started = true;
        levelUp();
    }

});

function btnFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    }, 250);
}

function btnFlashUser(btn) {
    btn.classList.add('user-flash');
    setTimeout(function() {
        btn.classList.remove('user-flash');
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    appSeq.push(randomColor);
    btnFlash(randomBtn);
}

function checkAns(idx) {
    if(userSeq[idx] == appSeq[idx]) {
        if(userSeq.length == appSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `game over, your score was <b>${level}</b><br>press any key to start`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 150);
        reset();
    }
}

function btnPress() {
    let pressedBtn = this;
    btnFlashUser(pressedBtn);

    let userColor = pressedBtn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns) {
    btn.addEventListener('click', btnPress);
};

function reset() {
    level = 0;
    userSeq = [];
    appSeq = [];
    started = false;
}