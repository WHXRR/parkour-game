import * as Pixi from "pixi.js";
import { useGameStore } from "@/store/game"

export const useGround = (baseTexture) => {
  const gameStore = useGameStore()
  const groundTexture = new Pixi.Texture(
    baseTexture,
    new Pixi.Rectangle(50, 102, 1600, 28)
  );
  const groundSprite = new Pixi.TilingSprite(groundTexture);
  groundSprite.width = window.innerWidth * 2;
  groundSprite.height = 28;
  groundSprite.position.set(0, window.innerHeight - 50);
  groundSprite.generate = () => {
    groundSprite.x -= gameStore.moveSpeed;
    if (groundSprite.x < -window.innerWidth) {
      groundSprite.x = 0;
    }
  }
  return groundSprite
}