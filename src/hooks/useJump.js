import * as Pixi from "pixi.js";

export const useJump = (baseTexture) => {
  const jumpTextures = new Pixi.Texture(
    baseTexture,
    new Pixi.Rectangle(1680, 0, 85, 100)
  );
  const jumpSprite = new Pixi.Sprite(jumpTextures);
  jumpSprite.visible = false;
  jumpSprite.initLocation = () => {
    jumpSprite.x = 60;
    jumpSprite.y = window.innerHeight - 140;
  }
  return jumpSprite
}