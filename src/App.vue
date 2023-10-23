<script setup>
import * as Pixi from "pixi.js";
import { ref } from "vue";
import GameImg from "./assets/game.png";
const app = new Pixi.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000000',
  resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

const container = new Pixi.Container();
app.stage.addChild(container);

// 创建恐龙精灵
const baseTexture = Pixi.BaseTexture.from(GameImg);
const dinoTexture = new Pixi.Texture(
  baseTexture,
  new Pixi.Rectangle(75, 0, 88, 100)
);
const dino = new Pixi.Sprite(dinoTexture);
dino.visible = false;
container.addChild(dino);

// 创建恐龙跑步动画
const runTextures = [];
for (let i = 0; i < 2; i++) {
  runTextures.push(
    new Pixi.Texture(
      baseTexture,
      new Pixi.Rectangle(1679 + (i + 2) * 88, 0, 85, 100)
    )
  );
}
const runAnimation = new Pixi.AnimatedSprite(runTextures);
runAnimation.animationSpeed = 0.1;
runAnimation.play();
runAnimation.visible = false;
container.addChild(runAnimation);

// 创建恐龙跳跃精灵图
const jumpTextures = new Pixi.Texture(
  baseTexture,
  new Pixi.Rectangle(1680, 0, 85, 100)
);
const jumpSprite = new Pixi.Sprite(jumpTextures);
jumpSprite.x = 60;
jumpSprite.y = window.innerHeight - 140;
jumpSprite.visible = false;
container.addChild(jumpSprite);

// 创建地面
const groundTexture = new Pixi.Texture(
  baseTexture,
  new Pixi.Rectangle(50, 102, 1600, 28)
);
const groundSprite = new Pixi.TilingSprite(groundTexture);
groundSprite.width = window.innerWidth * 2;
groundSprite.height = 28;
groundSprite.position.set(0, window.innerHeight - 50);
container.addChild(groundSprite);

// 创建仙人掌精灵
const cactusTexture = new Pixi.Texture(
  baseTexture,
  new Pixi.Rectangle(515, 0, 30, 60)
);
const cactusSprite = new Pixi.Sprite(cactusTexture);
cactusSprite.x = window.innerWidth / 2;
cactusSprite.y = window.innerHeight - 50 - 50;
container.addChild(cactusSprite);

// 创建开始游戏文字
let startText = new Pixi.Text("按空格开始游戏", {
  fontFamily: "Arial",
  fontSize: 30,
  fill: "white",
  align: "center",
});
startText.x = window.innerWidth / 2;
startText.y = window.innerHeight / 2;
startText.anchor.set(0.5);
container.addChild(startText);

// 创建分数
let score = 0
const scoreText = new Pixi.Text("得分：0", {
  fontFamily: "Arial",
  fontSize: 30,
  fill: "white",
  align: "center",
});
scoreText.x = 100;
scoreText.y = 100;
scoreText.anchor.set(0.5);
container.addChild(scoreText);

let isGameStart = false;
let jumpSpeed = 20;
// 初始化重力
let gravity = 1;
app.ticker.add((delta) => {
  // 开始游戏
  if (isGameStart) {
    cactusSprite.x -= 10;
    groundSprite.x -= 10;
    score++;
    scoreText.text = "得分：" + score;
    // 仙人掌到了屏幕外面
    if (cactusSprite.x < -50) {
      cactusSprite.x = window.innerWidth;
    }
    if (groundSprite.x < -window.innerWidth) {
      groundSprite.x = 0;
    }
    // 跳跃
    if (jumpSprite.visible) {
      jumpSpeed -= gravity;
      jumpSprite.y -= jumpSpeed;
      if (jumpSprite.y > window.innerHeight - 140) {
        jumpSprite.y = window.innerHeight - 140;
        jumpSpeed = 20;
        jumpSprite.visible = false;
        runAnimation.visible = true;
      }
      // 跳跃时碰撞
      if (
        jumpSprite.x + 85 >= cactusSprite.x &&
        jumpSprite.x <= cactusSprite.x + 30 &&
        jumpSprite.y + 100 >= cactusSprite.y
      ) {
        gameOver();
      }
    } else {
      // 走路时碰撞
      if (
        runAnimation.x + 85 >= cactusSprite.x &&
        runAnimation.x <= cactusSprite.x + 30
      ) {
        gameOver();
      }
    }
  }
});
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    if (!isGameStart) {
      playGame();
    } else {
      runAnimation.visible = false;
      jumpSprite.visible = true;
      jumpSpeed = 20;
    }
  } else if (e.keyCode === 27) {
    isGameStart = false;
    startText.visible = true;
    runAnimation.visible = false;
    jumpSprite.visible = false;
  }
});

function playGame() {
  isGameStart = true;
  startText.visible = false;
  runAnimation.visible = true;
  jumpSprite.visible = false;
  score = 0;
  runAnimation.x = 60;
  runAnimation.y = window.innerHeight - 140;
  cactusSprite.x = window.innerWidth;
}
function gameOver() {
  isGameStart = false;
  startText.visible = true;
  jumpSpeed = 20;
}
</script>
<template>
  <div></div>
</template>
<style lang="scss" scoped></style>
