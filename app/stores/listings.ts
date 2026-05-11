import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Listing, SearchFilters } from '~/types'
import { listings as initialListings } from '~/data/listings'

export const useListingsStore = defineStore('listings', () => {
  const listings = ref<Listing[]>(initialListings)
  const filters = ref<SearchFilters>({
    query: '',
    offerType: '',
    propertyType: '',
    priceMin: null,
    priceMax: null,
    areaMin: null,
    areaMax: null,
    roomsMin: null,
    city: '',
  })

  const cities = computed(() => {
    const citySet = new Set(listings.value.map((l) => l.city))
    return Array.from(citySet).sort()
  })

  const filteredListings = computed(() => {
    return listings.value.filter((listing) => {
      if (
        filters.value.query &&
        !listing.title.toLowerCase().includes(filters.value.query.toLowerCase()) &&
        !listing.city.toLowerCase().includes(filters.value.query.toLowerCase()) &&
        !listing.district.toLowerCase().includes(filters.value.query.toLowerCase())
      ) {
        return false
      }

      if (filters.value.offerType && listing.offerType !== filters.value.offerType) {
        return false
      }

      if (filters.value.propertyType && listing.propertyType !== filters.value.propertyType) {
        return false
      }

      if (filters.value.city && listing.city !== filters.value.city) {
        return false
      }

      if (filters.value.priceMin !== null && listing.price < filters.value.priceMin) {
        return false
      }

      if (filters.value.priceMax !== null && listing.price > filters.value.priceMax) {
        return false
      }

      if (filters.value.areaMin !== null && listing.area < filters.value.areaMin) {
        return false
      }

      if (filters.value.areaMax !== null && listing.area > filters.value.areaMax) {
        return false
      }

      if (filters.value.roomsMin !== null && listing.rooms < filters.value.roomsMin) {
        return false
      }

      return true
    })
  })

  const setFilters = (newFilters: Partial<SearchFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      query: '',
      offerType: '',
      propertyType: '',
      priceMin: null,
      priceMax: null,
      areaMin: null,
      areaMax: null,
      roomsMin: null,
      city: '',
    }
  }

  const getListingById = (id: number) => {
    return listings.value.find((l) => l.id === id)
  }

  return {
    listings,
    filters,
    cities,
    filteredListings,
    setFilters,
    resetFilters,
    getListingById,
  }
})
