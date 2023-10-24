<script setup>
import * as Pixi from "pixi.js";
import GameImg from "./assets/game.png";
import { useGameStore } from "@/store/game";
import { useDino } from "@/hooks/useDino";
import { useRunAnimation } from "@/hooks/useRunAnimation";
import { useJump } from "@/hooks/useJump";
import { useGround } from "@/hooks/useGround";
import { useCactus } from "@/hooks/useCactus";
import { useBird } from "@/hooks/useBird";
import { useBirdFly } from "@/hooks/useBirdFly";
import { useText } from "@/hooks/useText";
import { useCollision } from "@/hooks/useCollision";

const gameStore = useGameStore();
const app = new Pixi.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#000000",
  resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);
const container = new Pixi.Container();
app.stage.addChild(container);

// 引入精灵图
const baseTexture = Pixi.BaseTexture.from(GameImg);
// 创建恐龙精灵
// const dinoSprite = useDino(baseTexture);
// container.addChild(dinoSprite);

// 创建恐龙跑步动画
const runAnimation = useRunAnimation(baseTexture);
container.addChild(runAnimation);

// 创建恐龙跳跃精灵图
const jumpSprite = useJump(baseTexture);
container.addChild(jumpSprite);

// 创建地面
const groundSprite = useGround(baseTexture);
container.addChild(groundSprite);

// 创建仙人掌精灵
const cactusSprites = [];
for (let i = 0; i < 3; i++) {
  const cactusSprite = useCactus(baseTexture, gameOver);
  cactusSprites.push(cactusSprite);
  container.addChild(cactusSprite);
}

// 创建鸟动画
const birdSprites = [];
for (let i = 0; i < 1; i++) {
  const flyAnimation = useBirdFly(baseTexture, gameOver);
  cactusSprites.push(flyAnimation);
  container.addChild(flyAnimation);
}

// 创建开始游戏文字
let startText = useText("按空格开始游戏");
container.addChild(startText);

// 创建分数
let score = 0;
const scoreText = useText("得分：0", 100, 100);
container.addChild(scoreText);

let isGameStart = false;
// 跳跃高度
let jumpSpeed = 20;
// 初始化重力
let gravity = 1;
app.ticker.add((delta) => {
  // 开始游戏
  if (isGameStart) {
    gameStore.moveSpeed += 0.01;
    cactusSprites.forEach((item) => item.generate());
    birdSprites.forEach((item) => item.generate());
    groundSprite.generate();
    score++;
    scoreText.text = "得分：" + score;
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
      cactusSprites.forEach((item) => useCollision(jumpSprite, item, gameOver));
      birdSprites.forEach((item) => useCollision(jumpSprite, item, gameOver));
    } else {
      // 走路时碰撞
      cactusSprites.forEach((item) =>
        useCollision(runAnimation, item, gameOver)
      );
      birdSprites.forEach((item) =>
        useCollision(runAnimation, item, gameOver)
      );
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
    }
  }
});

function playGame() {
  isGameStart = true;
  startText.visible = false;
  jumpSprite.visible = false;
  runAnimation.visible = true;
  // 初始化分数
  score = 0;
  // 初始化跳跃位置
  jumpSpeed = 20;
  // 初始化记录位置的数组
  gameStore.locations = [];
  // 初始化移动速度
  gameStore.initMoveSpeed();
  // 初始化跳跃位置
  jumpSprite.initLocation();
  // 初始化恐龙位置
  runAnimation.initLocation();
  // 初始化仙人掌位置
  cactusSprites.forEach((item) => item.initLocation());
  // 初始化鸟位置
  birdSprites.forEach((item) => item.initLocation());
}
function gameOver() {
  isGameStart = false;
  startText.visible = true;
}
</script>
<template>
  <div></div>
</template>
<style lang="scss" scoped></style>
