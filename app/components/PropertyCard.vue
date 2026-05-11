<script setup lang="ts">
import type { Listing } from '~/types'

interface Props {
  listing: Listing
}

const props = defineProps<Props>()

const favoritesStore = useFavoritesStore()
const isFav = computed(() => favoritesStore.isFavorite(props.listing.id))

const toggleFavorite = () => {
  favoritesStore.toggleFavorite(props.listing.id)
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(price)
}
</script>

<template>
  <div class="card property-card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="listing.image" :alt="listing.title" />
      </figure>
      <div class="property-badge">
        <span v-if="listing.isNew" class="tag is-danger">Nowe</span>
      </div>
      <button
        class="favorite-btn"
        :class="{ 'is-favorite': isFav }"
        @click="toggleFavorite"
      >
        {{ isFav ? '❤️' : '🤍' }}
      </button>
    </div>
    <div class="card-content">
      <p class="title is-5">{{ listing.title }}</p>
      <p class="subtitle is-6">
        {{ listing.city }}, {{ listing.district }}
      </p>

      <div class="property-details">
        <div class="detail">
          <span class="icon">📐</span>
          <span>{{ listing.area }} m²</span>
        </div>
        <div class="detail">
          <span class="icon">🚪</span>
          <span>{{ listing.rooms }} pokoje</span>
        </div>
        <div v-if="listing.floor !== null" class="detail">
          <span class="icon">📍</span>
          <span>Pięto {{ listing.floor }}</span>
        </div>
      </div>

      <div class="property-price">
        <p class="heading is-size-6">{{ formatPrice(listing.price) }}</p>
        <p class="is-size-7 has-text-grey">
          {{ formatPrice(listing.pricePerMeter) }}/m²
        </p>
      </div>

      <div class="property-agency">
        <small>{{ listing.agency }}</small>
      </div>

      <NuxtLink
        :to="`/oferta/${listing.id}`"
        class="button is-fullwidth is-info mt-3"
      >
        Szczegóły
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.property-card {
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-image {
  position: relative;
  overflow: hidden;
}

.property-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 2;
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.favorite-btn.is-favorite {
  background: #ffebee;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.property-details {
  display: flex;
  gap: 12px;
  margin: 12px 0;
  flex-wrap: wrap;
  font-size: 0.875rem;
}

.detail {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.detail .icon {
  font-size: 1rem;
}

.property-price {
  margin: 12px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}

.property-agency {
  margin-top: 8px;
  color: #666;
}

.button {
  margin-top: auto;
}
</style>
