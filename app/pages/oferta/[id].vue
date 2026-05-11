<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  })

  const route = useRoute()
  const router = useRouter()
  const listingsStore = useListingsStore()
  const authStore = useAuthStore()
  const favoritesStore = useFavoritesStore()
  const reservationsStore = useReservationsStore()

  const listingId = computed(() => parseInt(route.params.id as string))
  const listing = computed(() => listingsStore.getListingById(listingId.value))
  const isFavorite = computed(() => favoritesStore.isFavorite(listingId.value))
  const showReservationModal = ref(false)

  const toggleFavorite = () => {
    favoritesStore.toggleFavorite(listingId.value)
  }

  const createReservation = () => {
    if (!authStore.isAuthenticated) {
      router.push('/logowanie')
      return
    }

    if (!listing.value) return

    reservationsStore.createReservation(
      listing.value.id,
      authStore.currentUser!.id,
      listing.value.offerType,
      listing.value.title,
      listing.value.price,
      listing.value.city,
    )

    showReservationModal.value = false

    useRouter().push('/konto')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(price)
  }

  onMounted(() => {
    authStore.loadFromStorage()
    favoritesStore.loadFromStorage()
    reservationsStore.loadFromStorage()
  })
</script>

<template>
  <div class="section" v-if="listing">
    <div class="container">
      <div class="columns">
        <div class="column is-8">
          <figure class="image is-3by2 mb-4">
            <img :src="listing.image" :alt="listing.title" />
          </figure>

          <div class="box">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <h1 class="title">{{ listing.title }}</h1>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <button
                    class="button is-rounded"
                    :class="{ 'is-danger': isFavorite }"
                    @click="toggleFavorite()"
                  >
                    {{ isFavorite ? '❤️ Ulubione' : '🤍 Ulubione' }}
                  </button>
                </div>
              </div>
            </div>

            <p class="subtitle is-6">{{ listing.city }}, {{ listing.district }}</p>

            <div class="columns mt-4">
              <div class="column is-3">
                <div class="box has-background-light">
                  <p class="heading is-size-7">Cena</p>
                  <p class="title is-5">{{ formatPrice(listing.price) }}</p>
                </div>
              </div>
              <div class="column is-3">
                <div class="box has-background-light">
                  <p class="heading is-size-7">Powierzchnia</p>
                  <p class="title is-5">{{ listing.area }} m²</p>
                </div>
              </div>
              <div class="column is-3">
                <div class="box has-background-light">
                  <p class="heading is-size-7">Pokoje</p>
                  <p class="title is-5">{{ listing.rooms }}</p>
                </div>
              </div>
              <div class="column is-3">
                <div class="box has-background-light">
                  <p class="heading is-size-7">Cena/m²</p>
                  <p class="title is-5">{{ formatPrice(listing.pricePerMeter) }}</p>
                </div>
              </div>
            </div>

            <div class="box">
              <h2 class="title is-5">Szczegóły nieruchomości</h2>
              <div class="columns">
                <div class="column is-6">
                  <p><strong>Typ nieruchomości:</strong> {{ listing.propertyType }}</p>
                  <p><strong>Rok budowy:</strong> {{ listing.yearBuilt }}</p>
                </div>
                <div class="column is-6">
                  <p v-if="listing.floor !== null"><strong>Piętro:</strong> {{ listing.floor }}</p>
                  <p><strong>Biuro:</strong> {{ listing.agency }}</p>
                </div>
              </div>
            </div>

            <div class="box">
              <h2 class="title is-5">Opis</h2>
              <p>{{ listing.description }}</p>
            </div>
          </div>
        </div>

        <div class="column is-4">
          <div class="box">
            <h2 class="title is-5">
              {{ listing.offerType === 'sprzedaz' ? 'Chcę kupić' : 'Chcę wynająć' }}
            </h2>
            <p class="mb-4">Zarezerwuj tę nieruchomość</p>
            <button class="button is-success is-fullwidth" @click="showReservationModal = true">
              Rezerwuj
            </button>
          </div>

          <div class="box">
            <h3 class="title is-6">Biuro nieruchomości</h3>
            <p>{{ listing.agency }}</p>
          </div>

          <div class="box">
            <button class="button is-light is-fullwidth" @click="$router.back()">← Wróć</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" :class="{ 'is-active': showReservationModal }">
      <div class="modal-background" @click="showReservationModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Potwierdzenie rezerwacji</p>
          <button class="delete" aria-label="close" @click="showReservationModal = false"></button>
        </header>
        <section class="modal-card-body">
          <p class="mb-3">Czy na pewno chcesz zarezerwować tę nieruchomość?</p>
          <div class="box has-background-light">
            <p>
              <strong>{{ listing.title }}</strong>
            </p>
            <p>{{ listing.city }}, {{ listing.district }}</p>
            <p class="mt-2">{{ formatPrice(listing.price) }}</p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="showReservationModal = false">Anuluj</button>
          <button class="button is-success" @click="createReservation()">Rezerwuj</button>
        </footer>
      </div>
    </div>
  </div>

  <div v-else class="section">
    <div class="container">
      <div class="notification is-danger">
        <p>Nieruchomość nie znaleziona.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .box {
    border-radius: 4px;
  }
</style>
