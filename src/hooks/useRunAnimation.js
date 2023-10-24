import * as Pixi from "pixi.js";

function useRunAnimation(baseTexture) {
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
  runAnimation.initLocation = () => {
    runAnimation.x = 60;
    runAnimation.y = window.innerHeight - 140;
  }
  return runAnimation
}

export { useRunAnimation }