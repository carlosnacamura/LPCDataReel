const canvas = document.createElement("canvas");
const dimensao = canvas.getContext("2d");
const audio_cebolas = document.querySelector(".cebolas");
const audio_pix = document.querySelector(".pix");
const audio_sucesso = document.querySelector(".sucesso");
const memes = document.querySelector(".memes");
const pegar_cebolas = document.querySelector(".pegar_cebolas");
const btnIniciar = document.getElementById("iniciarJogo");
const cebolasPegas = 100;

canvas.width = 600;
canvas.height = 300;
document.querySelector(".passatempo").appendChild(canvas);

let bgReady = false;
const bgImage = new Image();
bgImage.onload = () => {
    bgReady = true;
};
bgImage.src = "imgs/backgroundPassatempo.png";

let heroReady = false;
let heroImage = new Image();
heroImage.onload = () => {
    heroReady = true;
};
heroImage.src = "imgs/shrek.png";

let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = () => {
    monsterReady = true;
};
monsterImage.src = "imgs/cebola.png";

const hero = {
    speed: 256,
    x: 0,
    y: 0,
};

const monster = {
    x: 0,
    y: 0,
};

let monstrosPegos = 0;
let tempoRestante = 30; 
let jogoAcabou = true; 
let then;

const keysDown = {};

addEventListener("keydown", (evt) => {
    keysDown[evt.key] = true;
});

addEventListener("keyup", (evt) => {
    delete keysDown[evt.key];
});

const reset = () => {
    hero.x = (canvas.width - 20) / 2;
    hero.y = (canvas.height - 20) / 2;
    monstrosPegos = 0;
    tempoRestante = 30;
    jogoAcabou = false;
    reposicionarMonstro();
    then = Date.now(); 
};

const reposicionarMonstro = () => {
    monster.x = 32 + Math.random() * (canvas.width - 64);
    monster.y = 32 + Math.random() * (canvas.height - 64);
};

const update = (modificador) => {
    if (jogoAcabou) return;

    
    tempoRestante -= modificador;

    if (tempoRestante <= 0) {
        tempoRestante = 0;
        jogoAcabou = true;
        alert("Game Over! Tempo esgotado.");
        btnIniciar.style.display = "block"; 
        return;
    }

    if (keysDown["w"] || keysDown["ArrowUp"] && hero.y > 0) {
        hero.y -= hero.speed * modificador;
    }

    if (keysDown["s"] || keysDown["ArrowDown"] && hero.y < canvas.height - 32) {
        hero.y += hero.speed * modificador;
    }

    if (keysDown["a"] || keysDown["ArrowLeft"] && hero.x > 0) {
        hero.x -= hero.speed * modificador;
    }

    if (keysDown["d"] || keysDown["ArrowRight"] && hero.x < canvas.width - 32) {
        hero.x += hero.speed * modificador;
    }

    if (
        hero.x <= monster.x + 32 &&
        monster.x <= hero.x + 32 &&
        hero.y <= monster.y + 32 &&
        monster.y <= hero.y + 32
    ) {
        ++monstrosPegos;

        if (monstrosPegos % cebolasPegas == 0) {
            audio_pix.play();
        }

        audio_cebolas.play();
        reposicionarMonstro(); 
    }

    if (monstrosPegos >= 25) {
        jogoAcabou = true;
        alert("Parabéns! Você coletou 25 dados com nosso DataReel!.");
        btnIniciar.style.display = "block"; 
        return;
    }
};

const render = () => {
    if (bgReady) {
        dimensao.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        dimensao.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        dimensao.drawImage(monsterImage, monster.x, monster.y);
    }

    dimensao.fillStyle = "rgb(250,250,250)";
    dimensao.font = "24px Helvetica";
    dimensao.textAlign = "left";
    dimensao.textBaseline = "top";
    dimensao.fillText("Dados pegos: " + monstrosPegos, 32, 32);
    dimensao.fillText("Tempo: " + Math.ceil(tempoRestante) + "s", 32, 64);
};

const main = () => {
    if (jogoAcabou) return;

    const now = Date.now();
    const delta = (now - then) / 1000;

    update(delta);
    render();

    then = now;

    requestAnimationFrame(main);

    if (monstrosPegos == 30) {
        memes.style.display = "block";
    }
};

const w = window;
const requestAnimationFrame =
    w.requestAnimationFrame || w.webkitRequestAnimationFrame;

btnIniciar.addEventListener("click", () => {
    reset();
    main();
    btnIniciar.style.display = "none"; 
});

pegar_cebolas.addEventListener("click", () => {
    if (jogoAcabou) return;

    monstrosPegos--;

    if (monstrosPegos <= 0) {
        monstrosPegos = 0;
        audio_sucesso.play();
    }
});