let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
  playerState = e.target.value;
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src =
  "/gaming/super_puppy/super_puppy.png";
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7
  },
  {
    name: "jump",
    frames: 7
  },
  {
    name: "fall",
    frames: 7
  },
  {
    name: "run",
    frames: 9
  },
  {
    name: "dizzy",
    frames: 11
  },
  {
    name: "sit",
    frames: 5
  },
  {
    name: "roll",
    frames: 7
  },
  {
    name: "bite",
    frames: 7
  },
  {
    name: "ko",
    frames: 12
  },
  {
    name: "getHit",
    frames: 4
  }
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  };

  for (let i = 0; i < state.frames; i++) {
    let positionX = i * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const maxFrame = spriteAnimations[playerState].loc.length;
  const position = Math.floor(gameFrame / staggerFrames) % maxFrame;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  // ctx.drawImage(image, sx, sx, sw, sh, dx, dy, dw, dy);
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();