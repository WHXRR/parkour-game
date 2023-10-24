import { useGameStore } from "@/store/game"

let count = 1
export const useSetLocation = () => {
  const gameStore = useGameStore()
  let locationX = window.innerWidth + Math.ceil(Math.random() * 1000);
  const locations = gameStore.locations.map(item => {
    const symbolValues = Object.getOwnPropertySymbols(item)
    return item[symbolValues[0]]
  })
  while (locations.filter(item => (item < locationX + 150) && (item > locationX - 150)).length) {
    locationX = window.innerWidth + Math.ceil(Math.random() * 1000);
  }
  return locationX
}