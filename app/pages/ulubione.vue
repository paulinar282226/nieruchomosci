<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  })

  const listingsStore = useListingsStore()
  const favoritesStore = useFavoritesStore()

  const favoriteListings = computed(() => {
    return listingsStore.listings.filter((listing) =>
      favoritesStore.favoriteIds.includes(listing.id),
    )
  })

  const removeFavorite = (listingId: number) => {
    favoritesStore.removeFavorite(listingId)
  }

  onMounted(() => {
    favoritesStore.loadFromStorage()
  })
</script>

<template>
  <div class="section">
    <div class="container">
      <h1 class="title mb-4">Moje ulubione</h1>

      <div v-if="favoriteListings.length > 0" class="columns is-multiline">
        <div
          v-for="listing in favoriteListings"
          :key="listing.id"
          class="column is-4-desktop is-6-tablet is-12-mobile"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="listing.image" :alt="listing.title" />
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-5">{{ listing.title }}</p>
              <p class="subtitle is-6">{{ listing.city }}, {{ listing.district }}</p>

              <div class="mb-3">
                <p>
                  <strong>{{
                    new Intl.NumberFormat('pl-PL', {
                      style: 'currency',
                      currency: 'PLN',
                    }).format(listing.price)
                  }}</strong>
                </p>
                <p class="is-size-7">{{ listing.area }} m² • {{ listing.rooms }} pokoje</p>
              </div>

              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <NuxtLink :to="`/oferta/${listing.id}`" class="button is-small is-info">
                      Szczegóły
                    </NuxtLink>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <button class="button is-small is-danger" @click="removeFavorite(listing.id)">
                      ✕ Usuń
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="notification is-info">
        <p>Nie masz żadnych ulubionych nieruchomości.</p>
        <NuxtLink to="/szukaj" class="button is-info mt-3"> Szukaj nieruchomości </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card {
    height: 100%;
  }
</style>
