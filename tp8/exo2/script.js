const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

const bg = new Image(); bg.src = 'fond.png';
const sheet = new Image(); sheet.src = 'mario.png';

let ready = 0;
bg.onload = () => { ready++; startIfReady(); };
sheet.onload = () => { ready++; startIfReady(); };
bg.onerror = () => { ready++; startIfReady(); };
sheet.onerror = () => { ready++; startIfReady(); };

let bgOffset = 0;
const BG_SPEED = 1.2;

let frameIndex = 0;
let frameW = 64, frameH = 64;
let cols = 5;
let frames = 1;
const ANIM_SPEED = 6;
let animCounter = 0;

const marioX = 140;
const marioY = H - 140;

function startIfReady() {
  if (ready < 2) return;

  if (sheet.complete && sheet.width) {
    cols = 5;
    frameW = Math.floor(sheet.width / cols);
    frameH = frameW;
    const rows = Math.max(1, Math.round(sheet.height / frameH));
    frames = cols * rows;
  }

  requestAnimationFrame(loop);
}

function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

function update() {
  bgOffset = (bgOffset + BG_SPEED) % (bg.width || W);

  animCounter++;
  if (animCounter >= ANIM_SPEED) {
    animCounter = 0;
    frameIndex = (frameIndex + 1) % frames;
  }
}

function render() {
  if (bg.complete && bg.width) {
    const sw = bg.width, sh = bg.height;
    let startX = - (bgOffset % sw);
    for (let x = startX; x < W; x += sw) {
      ctx.drawImage(bg, x, H - sh, sw, sh);
    }
  } else {
    ctx.fillStyle = '#87ceeb'; ctx.fillRect(0,0,W,H);
  }

  if (sheet.complete && sheet.width) {
    const sx = (frameIndex % cols) * frameW;
    const sy = Math.floor(frameIndex / cols) * frameH;
    ctx.drawImage(sheet, sx, sy, frameW, frameH, marioX, marioY - frameH, frameW, frameH);
  } else {
    ctx.fillStyle = '#c44'; ctx.fillRect(marioX, marioY - frameH, frameW, frameH);
  }
}