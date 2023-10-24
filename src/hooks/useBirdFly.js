import * as Pixi from "pixi.js";
import { useGameStore } from "@/store/game"
import { useSetLocation } from "@/hooks/useSetLocation"

export const useBirdFly = (baseTexture) => {
  const gameStore = useGameStore()
  const runTextures = [];
  for (let i = 0; i < 2; i++) {
    runTextures.push(
      new Pixi.Texture(
        baseTexture,
        new Pixi.Rectangle(258 + (i) * 93, 0, 92, 80)
      )
    );
  }
  const flyAnimation = new Pixi.AnimatedSprite(runTextures);
  flyAnimation.x = window.innerWidth;
  flyAnimation.y = window.innerHeight - 150;
  flyAnimation.animationSpeed = 0.1;
  flyAnimation.play();
  const x = Symbol('flyAnimation')
  flyAnimation.generate = () => {
    flyAnimation.x -= gameStore.moveSpeed;
    // 仙人掌到了屏幕外面
    if (flyAnimation.x < -50) {
      let locationX = useSetLocation()
      gameStore.locations[x] = locationX
      flyAnimation.x = locationX
    }
  }
  flyAnimation.initLocation = () => {
    let locationX = useSetLocation()
    gameStore.locations.push({
      [x]: locationX
    })
    flyAnimation.x = locationX
  }
  return flyAnimation
}