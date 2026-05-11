<script setup lang="ts">
const listingsStore = useListingsStore()

const propertyTypes = [
  { label: 'Mieszkanie', value: 'mieszkanie' },
  { label: 'Dom', value: 'dom' },
  { label: 'Działka', value: 'dzialka' },
  { label: 'Lokal użytkowy', value: 'lokal' },
  { label: 'Budynek użytkowy', value: 'budynek' },
]

const offerTypes = [
  { label: 'Kupię', value: 'sprzedaz' },
  { label: 'Wynajmę', value: 'wynajem' },
]

const updateFilters = () => {
  listingsStore.setFilters({
    query: listingsStore.filters.query,
    offerType: listingsStore.filters.offerType,
    propertyType: listingsStore.filters.propertyType,
    priceMin: listingsStore.filters.priceMin,
    priceMax: listingsStore.filters.priceMax,
    areaMin: listingsStore.filters.areaMin,
    areaMax: listingsStore.filters.areaMax,
    roomsMin: listingsStore.filters.roomsMin,
    city: listingsStore.filters.city,
  })
}

const resetFilters = () => {
  listingsStore.resetFilters()
}
</script>

<template>
  <aside class="menu">
    <p class="menu-label">Filtry wyszukiwania</p>

    <div class="menu-list mb-4">
      <div class="field">
        <label class="label is-size-7">Typ oferty</label>
        <div class="control offer-types">
          <div
            v-for="type in offerTypes"
            :key="type.value"
            class="offer-option"
          >
            <input
              :id="`offer-${type.value}`"
              type="radio"
              name="offerType"
              :value="type.value"
              :checked="listingsStore.filters.offerType === type.value"
              @change="listingsStore.filters.offerType = type.value; updateFilters()"
            />
            <label :for="`offer-${type.value}`" class="ml-2">
              {{ type.label }}
            </label>
          </div>
          <input
            type="radio"
            name="offerType"
            value=""
            :checked="listingsStore.filters.offerType === ''"
            @change="listingsStore.filters.offerType = ''; updateFilters()"
            class="is-hidden"
          />
        </div>
      </div>
    </div>

    <div class="menu-list mb-4">
      <div class="field">
        <label class="label is-size-7">Typ nieruchomości</label>
        <div class="select is-fullwidth">
          <select
            v-model="listingsStore.filters.propertyType"
            @change="updateFilters()"
          >
            <option value="">Wszystkie</option>
            <option
              v-for="type in propertyTypes"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="menu-list mb-4">
      <div class="field">
        <label class="label is-size-7">Miasto</label>
        <div class="select is-fullwidth">
          <select
            v-model="listingsStore.filters.city"
            @change="updateFilters()"
          >
            <option value="">Wszystkie</option>
            <option
              v-for="city in listingsStore.cities"
              :key="city"
              :value="city"
            >
              {{ city }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="menu-list mb-4">
      <div class="field">
        <label class="label is-size-7">Cena od (PLN)</label>
        <div class="control">
          <input
            v-model.number="listingsStore.filters.priceMin"
            type="number"
            class="input is-small"
            placeholder="Min"
            @input="updateFilters()"
          />
        </div>
      </div>

      <div class="field">
        <label class="label is-size-7">Cena do (PLN)</label>
        <div class="control">
          <input
            v-model.number="listingsStore.filters.priceMax"
            type="number"
            class="input is-small"
            placeholder="Max"
            @input="updateFilters()"
          />
        </div>
      </div>
    </div>

    <div class="menu-list mb-4">
      <div class="field">
        <label class="label is-size-7">Powierzchnia od (m²)</label>
        <div class="control">
          <input
            v-model.number="listingsStore.filters.areaMin"
            type="number"
            class="input is-small"
            placeholder="Min"
            @input="updateFilters()"
          />
        </div>
      </div>

      <div class="field">
        <label class="label is-size-7">Powierzchnia do (m²)</label>
        <div class="control">
          <input
            v-model.number="listingsStore.filters.areaMax"
            type="number"
            class="input is-small"
            placeholder="Max"
            @input="updateFilters()"
          />
        </div>
      </div>
    </div>

    <div class="menu-list mb-4">
      <div class="field">
        <label class="label is-size-7">Liczba pokoi od</label>
        <div class="control">
          <input
            v-model.number="listingsStore.filters.roomsMin"
            type="number"
            class="input is-small"
            placeholder="Min"
            @input="updateFilters()"
          />
        </div>
      </div>
    </div>

    <div class="menu-list">
      <button class="button is-info is-fullwidth mb-2" @click="updateFilters()">
        Filtruj
      </button>
      <button class="button is-light is-fullwidth" @click="resetFilters()">
        Resetuj filtry
      </button>
    </div>
  </aside>
</template>

<style scoped>
.menu {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 4px;
}

.menu-label {
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.menu-list {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 12px;
}

.field {
  margin-bottom: 8px;
}

.label {
  color: #666;
  font-weight: 500;
}

.checkbox input[type='radio'] {
  margin-right: 4px;
}

.checkbox label {
  cursor: pointer;
  user-select: none;
}

.offer-types {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
}

.offer-option {
  display: inline-flex;
  align-items: center;
  margin: 0;
}

.offer-option label {
  margin-left: 6px;
  cursor: pointer;
  user-select: none;
}
</style>
