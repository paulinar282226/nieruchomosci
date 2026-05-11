<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const listingsStore = useListingsStore()
</script>

<template>
  <div class="section">
    <div class="container">
      <SearchForm />

      <div class="columns">
        <div class="column is-3-desktop is-4-tablet">
          <ListingFilters />
        </div>

        <div class="column is-9-desktop is-8-tablet">
          <div class="mb-4">
            <p class="subtitle">
              Znaleziono
              <strong>{{ listingsStore.filteredListings.length }}</strong>
              ogłoszeń
            </p>
          </div>

          <div
            v-if="listingsStore.filteredListings.length > 0"
            class="columns is-multiline"
          >
            <div
              v-for="listing in listingsStore.filteredListings"
              :key="listing.id"
              class="column is-4-desktop is-6-tablet is-12-mobile"
            >
              <PropertyCardNew :listing="listing" />
            </div>
          </div>

          <div v-else class="notification is-warning">
            <p>Nie znaleziono ogłoszeń spełniających Twoje kryteria.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtitle strong {
  color: #3273dc;
}
</style>
