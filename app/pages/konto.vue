<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const router = useRouter()
const authStore = useAuthStore()
const reservationsStore = useReservationsStore()

const userReservations = computed(() => {
  if (!authStore.currentUser) return []
  return reservationsStore.getUserReservations(authStore.currentUser.id)
})

const handleLogout = () => {
  authStore.logout()
  router.push('/logowanie')
}

const handleCancelReservation = (reservationId: string) => {
  reservationsStore.cancelReservation(reservationId)
}

const handleCompleteReservation = (reservationId: string) => {
  reservationsStore.completeReservation(reservationId)
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'aktywna':
      return 'is-info'
    case 'zakonczona':
      return 'is-success'
    case 'anulowana':
      return 'is-danger'
    case 'rozwiazana':
      return 'is-warning'
    default:
      return 'is-grey'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'aktywna':
      return 'Aktywna'
    case 'zakonczona':
      return 'Zakończona'
    case 'anulowana':
      return 'Anulowana'
    case 'rozwiazana':
      return 'Rozwiązana'
    default:
      return status
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(price)
}

onMounted(() => {
  authStore.loadFromStorage()
  reservationsStore.loadFromStorage()

  if (!authStore.isAuthenticated) {
    router.push('/logowanie')
  }
})
</script>

<template>
  <div class="section" v-if="authStore.isAuthenticated">
    <div class="container">
      <div class="level mb-4">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">Moje konto</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button class="button is-light" @click="handleLogout()">
              Wyloguj się
            </button>
          </div>
        </div>
      </div>

      <div class="box mb-4">
        <h2 class="title is-5">Informacje o koncie</h2>
        <p><strong>Imię i nazwisko:</strong> {{ authStore.currentUser?.name }}</p>
        <p><strong>Email:</strong> {{ authStore.currentUser?.email }}</p>
      </div>

      <div class="box">
        <h2 class="title is-5">Moje rezerwacje</h2>

        <div v-if="userReservations.length > 0">
          <div v-for="reservation in userReservations" :key="reservation.id" class="mb-4 box">
            <div class="level mb-3">
              <div class="level-left">
                <div class="level-item">
                  <div>
                    <p class="title is-6">{{ reservation.listingTitle }}</p>
                    <p class="subtitle is-7">{{ reservation.listingCity }}</p>
                  </div>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span :class="['tag', getStatusBadgeClass(reservation.status)]">
                    {{ getStatusLabel(reservation.status) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-4">
                <p><strong>Cena:</strong> {{ formatPrice(reservation.listingPrice) }}</p>
              </div>
              <div class="column is-4">
                <p><strong>Typ:</strong> {{ reservation.type === 'sprzedaz' ? 'Kupno' : 'Wynajem' }}</p>
              </div>
              <div class="column is-4">
                <p><strong>Data:</strong> {{ new Date(reservation.createdAt).toLocaleDateString('pl-PL') }}</p>
              </div>
            </div>

            <div class="mt-3" v-if="reservation.status === 'aktywna'">
              <button
                class="button is-success is-small mr-2"
                @click="handleCompleteReservation(reservation.id)"
              >
                Zakończ
              </button>
              <button
                class="button is-danger is-small"
                @click="handleCancelReservation(reservation.id)"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>

        <div v-else class="notification is-info">
          <p>Nie masz żadnych rezerwacji. Zacznij szukać nieruchomości!</p>
          <NuxtLink to="/szukaj" class="button is-info mt-3">
            Szukaj nieruchomości
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  border-radius: 4px;
}

.tag {
  text-transform: capitalize;
}
</style>
