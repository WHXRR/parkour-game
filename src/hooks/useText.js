import * as Pixi from "pixi.js";

export const useText = (text, x, y) => {
  let startText = new Pixi.Text(text, {
    fontFamily: "Arial",
    fontSize: 30,
    fill: "white",
    align: "center",
  });
  startText.x = x || window.innerWidth / 2;
  startText.y = y || window.innerHeight / 2;
  startText.anchor.set(0.5);
  return startText
}