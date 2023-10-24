import { defineStore } from 'pinia'
import { ref } from "vue";

export const useGameStore = defineStore('game', () => {
  const moveSpeed = ref(10)
  const initMoveSpeed = () => {
    moveSpeed.value = 10
  }
  const locations = ref([])
  return {
    moveSpeed,
    locations,
    initMoveSpeed
  }
})