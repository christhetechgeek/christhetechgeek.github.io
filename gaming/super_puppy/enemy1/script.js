const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 800);
let gameFrame = 0;

const numberOfEnemies = 20;
const enemiesArray = [];

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src =
      "https://technophile-host-server.netlify.app/images/enemies/enemy1.png";
    this.scale = 0.5;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1); /* 1 <-> 4 */
  }

  update() {
    this.x += Math.random() * 5 - 2.5; /* -2.5 <-> 2.5 */
    this.y += Math.random() * 5 - 2.5; /* -2.5 <-> 2.5 */
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  enemiesArray.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
