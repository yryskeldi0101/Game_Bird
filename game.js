const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "./assets/images/flappy_bird_bird.png";
bg.src = "./assets/images/flappy_bird_bg.png";
fg.src = "./assets/images/flappy_bird_fg.png";
pipeUp.src = "./assets/images/flappy_bird_pipeUp.png";
pipeBottom.src = "./assets/images/flappy_bird_pipeBottom.png";
const fly = new Audio();
const score_audio = new Audio();
fly.src = "./assets/audio/fly.mp3";
score_audio.src = "./assets/audio/score.mp3";

let score = 0;

const gap = 90;
let xPos = 10;
let yPos = 150;
const grav = 1.5;
document.addEventListener("keydown", moveUp);
function moveUp() {
  yPos -= 35;
  fly.play();
}
const pipe = [
  {
    x: cvs.width,
    y: 0,
  },
];
function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }
    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
