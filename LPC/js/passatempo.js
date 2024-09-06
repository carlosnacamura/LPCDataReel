const canvas = document.createElement("canvas");
const dimensao = canvas.getContext("2d");
const audio_cebolas = document.querySelector(".cebolas");
const audio_pix = document.querySelector(".pix");
const audio_sucesso = document.querySelector(".sucesso");
const memes = document.querySelector(".memes");
const pegar_cebolas = document.querySelector(".pegar_cebolas");
const cebolasPegas = 100;
canvas.width = 600;
canvas.height = 300;
document.querySelector(".passatempo").appendChild(canvas)
let bgReady = false;
const bgImage = new Image();
bgImage.onload = () => {
  bgReady = true;
};
bgImage.src =
  "https://img.freepik.com/fotos-premium/jogo-de-video-de-fundo-abstrato-de-esports-scifi-gaming-cyberpunk-vr-simulacao-de-realidade-virtual-e-cena-do-metaverso-suporte-pedestal-palco-ilustracao-3d-renderizacao-futurista-sala-de-brilho-de-neon_42100-4107.jpg";
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

const keysDown = {};

addEventListener("keydown", (evt) => {
  keysDown[evt.key] = true;
});
addEventListener("keyup", (evt) => {
  delete keysDown[evt.key];
});

const reset = () => {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  monster.x = 32 + Math.random() * (canvas.width - 32);
  monster.y = 32 + Math.random() * (canvas.height - 32);
};

const update = (modificador) => {
  if (keysDown["w"]) {
    hero.y -= hero.speed * modificador;
  }
  if (keysDown["s"]) {
    hero.y += hero.speed * modificador;
  }
  if (keysDown["a"]) {
    hero.x -= hero.speed * modificador;
  }
  if (keysDown["d"]) {
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
    reset();
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
};

const main = () => {
  const now = Date.now();
  const delta = now - then;

  update(delta / 1000);
  render();

  then = now;
  requestAnimationFrame(main);

  if (monstrosPegos == 5) {
    memes.style.display = "block";
  }
};

const w = window;
const requestAnimationFrame =
  w.requestAnimationFrame || w.webkitRequestAnimationFrame;
let then = Date.now();
reset();
main();
pegar_cebolas.addEventListener("click", () => {
  monstrosPegos--;
  if (monstrosPegos == 0) {
    audio_sucesso.play();
  } else if (monstrosPegos < 0) {
    monstrosPegos = 0;
    audio_sucesso.play();
  }
});
