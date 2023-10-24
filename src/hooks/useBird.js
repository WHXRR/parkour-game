import * as Pixi from "pixi.js";

export const useBird = (baseTexture) => {
  const birdTexture = new Pixi.Texture(
    baseTexture,
    new Pixi.Rectangle(258, 0, 94, 80)
  );
  const birdSprite = new Pixi.Sprite(birdTexture);
  return birdSprite
}