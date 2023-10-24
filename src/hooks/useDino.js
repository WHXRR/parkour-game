import * as Pixi from "pixi.js";

function useDino(baseTexture) {
  const dinoTexture = new Pixi.Texture(
    baseTexture,
    new Pixi.Rectangle(75, 0, 88, 100)
  );
  const dinoSprite = new Pixi.Sprite(dinoTexture);
  dinoSprite.visible = false;
  return dinoSprite
}

export { useDino }