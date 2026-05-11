import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Reservation } from '~/types'

export const useReservationsStore = defineStore('reservations', () => {
  const reservations = ref<Reservation[]>([])

  const loadFromStorage = () => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('reservations')
    if (stored) {
      reservations.value = JSON.parse(stored)
    }
  }

  const saveToStorage = () => {
    if (typeof window === 'undefined') return
    localStorage.setItem('reservations', JSON.stringify(reservations.value))
  }

  const createReservation = (
    listingId: number,
    userId: string,
    type: 'sprzedaz' | 'wynajem',
    listingTitle: string,
    listingPrice: number,
    listingCity: string,
  ): string => {
    const id = Date.now().toString()
    const reservation: Reservation = {
      id,
      listingId,
      userId,
      type,
      status: 'aktywna',
      createdAt: new Date().toISOString(),
      listingTitle,
      listingPrice,
      listingCity,
    }

    reservations.value.push(reservation)
    saveToStorage()
    return id
  }

  const cancelReservation = (reservationId: string) => {
    const reservation = reservations.value.find((r) => r.id === reservationId)
    if (reservation) {
      reservation.status = 'anulowana'
      saveToStorage()
    }
  }

  const completeReservation = (reservationId: string) => {
    const reservation = reservations.value.find((r) => r.id === reservationId)
    if (reservation) {
      reservation.status = 'zakonczona'
      saveToStorage()
    }
  }

  const terminateReservation = (reservationId: string) => {
    const reservation = reservations.value.find((r) => r.id === reservationId)
    if (reservation) {
      reservation.status = 'rozwiazana'
      saveToStorage()
    }
  }

  const getUserReservations = (userId: string) => {
    return reservations.value.filter((r) => r.userId === userId)
  }

  return {
    reservations,
    loadFromStorage,
    createReservation,
    cancelReservation,
    completeReservation,
    terminateReservation,
    getUserReservations,
  }
})
