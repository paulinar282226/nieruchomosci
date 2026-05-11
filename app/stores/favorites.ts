import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favoriteIds = ref<number[]>([])

  const loadFromStorage = () => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('favorites')
    if (stored) {
      favoriteIds.value = JSON.parse(stored)
    }
  }

  const saveToStorage = () => {
    if (typeof window === 'undefined') return
    localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
  }

  const toggleFavorite = (listingId: number) => {
    const index = favoriteIds.value.indexOf(listingId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
    } else {
      favoriteIds.value.push(listingId)
    }
    saveToStorage()
  }

  const isFavorite = (listingId: number) => {
    return favoriteIds.value.includes(listingId)
  }

  const removeFavorite = (listingId: number) => {
    const index = favoriteIds.value.indexOf(listingId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
      saveToStorage()
    }
  }

  const favoritesCount = computed(() => favoriteIds.value.length)

  return {
    favoriteIds,
    favoritesCount,
    loadFromStorage,
    toggleFavorite,
    isFavorite,
    removeFavorite,
  }
})
