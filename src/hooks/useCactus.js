import * as Pixi from "pixi.js";
import { useGameStore } from "@/store/game"
import { useSetLocation } from "@/hooks/useSetLocation"

export const useCactus = (baseTexture) => {
  const gameStore = useGameStore()
  const cactusTexture = new Pixi.Texture(
    baseTexture,
    new Pixi.Rectangle(515, 0, 33, 60)
  );
  const cactusSprite = new Pixi.Sprite(cactusTexture);
  cactusSprite.x = window.innerWidth;
  cactusSprite.y = window.innerHeight - 100;
  const x = Symbol('cactusSprite')
  cactusSprite.generate = () => {
    cactusSprite.x -= gameStore.moveSpeed;
    // 仙人掌到了屏幕外面
    if (cactusSprite.x < -50) {
      let locationX = useSetLocation()
      gameStore.locations[x] = locationX
      cactusSprite.x = locationX
    }
  }
  cactusSprite.initLocation = () => {
    let locationX = useSetLocation()
    gameStore.locations.push({
      [x]: locationX
    })
    cactusSprite.x = locationX
  }
  return cactusSprite
}