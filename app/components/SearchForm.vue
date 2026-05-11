<script setup lang="ts">
const listingsStore = useListingsStore()
const route = useRoute()
const router = useRouter()

const handleSearch = () => {
  router.push('/szukaj')
}

const handleSelectCity = (city: string) => {
  listingsStore.setFilters({ city, query: '' })
  router.push('/szukaj')
}
</script>

<template>
  <div class="search-form-container">
    <div class="field is-grouped">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select v-model="listingsStore.filters.offerType">
            <option value="">Kupię / Wynajmę</option>
            <option value="sprzedaz">Kupię</option>
            <option value="wynajem">Wynajmę</option>
          </select>
        </div>
      </div>

      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select v-model="listingsStore.filters.propertyType">
            <option value="">Typ nieruchomości</option>
            <option value="mieszkanie">Mieszkanie</option>
            <option value="dom">Dom</option>
            <option value="dzialka">Działka</option>
            <option value="lokal">Lokal użytkowy</option>
            <option value="budynek">Budynek użytkowy</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          v-model="listingsStore.filters.query"
          type="text"
          class="input"
          placeholder="Wpisz miejscowość, dzielnicę lub ulicę"
          @keyup.enter="handleSearch()"
        />
      </div>
      <div class="control">
        <button class="button is-info" @click="handleSearch()">
          🔍 Szukaj
        </button>
      </div>
    </div>

    <div class="popular-cities">
      <p class="is-size-7 has-text-grey mb-2">Popularne miasta:</p>
      <div class="tags">
        <span
          v-for="city in listingsStore.cities"
          :key="city"
          class="tag is-light is-clickable"
          @click="handleSelectCity(city)"
        >
          {{ city }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-form-container {
  background: white;
  padding: 20px;
  border-radius: 4px;
  margin: 16px 0;
}

.popular-cities {
  margin-top: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag.is-clickable {
  cursor: pointer;
  transition: all 0.2s;
}

.tag.is-clickable:hover {
  background-color: #f0f0f0;
  color: #0a0a0a;
}
</style>
