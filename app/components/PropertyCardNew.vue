<script setup lang="ts">
import type { Listing } from '~/types'

interface Props {
  listing: Listing
}

const props = defineProps<Props>()
const favoritesStore = useFavoritesStore()
const isFav = computed(() => favoritesStore.isFavorite(props.listing.id))
const showQuickInfo = ref(false)

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
  <div class="card-modern">
    <div class="card-modern__image" @mouseenter="showQuickInfo = true" @mouseleave="showQuickInfo = false">
      <img :src="listing.image" :alt="listing.title" />
      
      <div v-if="listing.isNew" class="card-modern__badge">
        NOWE
      </div>

      <button class="card-modern__heart" :class="{ active: isFav }" @click="toggleFavorite()">
        {{ isFav ? '❤️' : '🤍' }}
      </button>

      <div v-if="showQuickInfo" class="card-modern__overlay">
        <div class="overlay-content">
          <p class="overlay-price">{{ formatPrice(listing.price) }}</p>
          <p class="overlay-size">{{ listing.area }}m² • {{ listing.rooms }} pok.</p>
          <NuxtLink :to="`/oferta/${listing.id}`" class="overlay-link">
            SZCZEGÓŁY →
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="card-modern__body">
      <h3 class="card-modern__title">{{ listing.title }}</h3>
      <p class="card-modern__location">{{ listing.city }}, {{ listing.district }}</p>

      <div class="card-modern__meta">
        <span>📏 {{ listing.area }}m²</span>
        <span>🚪 {{ listing.rooms }}</span>
        <span v-if="listing.floor !== null">📍 P{{ listing.floor }}</span>
      </div>

      <div class="card-modern__footer">
        <div>
          <p class="card-modern__price">{{ formatPrice(listing.price) }}</p>
          <p class="card-modern__pricePerMeter">{{ formatPrice(listing.pricePerMeter) }}/m²</p>
        </div>
        <NuxtLink :to="`/oferta/${listing.id}`" class="card-modern__cta">
          ZOBACZ
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-modern {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-modern:hover {
  border-color: #3273dc;
  box-shadow: 0 16px 32px rgba(50, 115, 220, 0.12);
  transform: translateY(-2px);
}

.card-modern__image {
  position: relative;
  width: 100%;
  padding-bottom: 66%;
  overflow: hidden;
  background: #f5f5f5;
}

.card-modern__image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card-modern:hover .card-modern__image img {
  transform: scale(1.1);
}

.card-modern__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ff5555;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  z-index: 2;
}

.card-modern__heart {
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.card-modern__heart:hover,
.card-modern__heart.active {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-modern__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(50, 115, 220, 0.3));
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 16px;
  color: white;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.overlay-content {
  width: 100%;
}

.overlay-price {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.overlay-size {
  font-size: 0.9rem;
  margin: 0 0 12px 0;
  opacity: 0.95;
}

.overlay-link {
  display: inline-block;
  padding: 8px 16px;
  background: white;
  color: #3273dc;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.2s;
}

.overlay-link:hover {
  background: #f0f0f0;
  transform: translateX(4px);
}

.card-modern__body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-modern__title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: #1f2937;
  line-height: 1.3;
}

.card-modern__location {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 12px 0;
}

.card-modern__meta {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: #4b5563;
}

.card-modern__meta span {
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.card-modern__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.card-modern__price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3273dc;
  margin: 0;
}

.card-modern__pricePerMeter {
  font-size: 0.75rem;
  color: #9ca3af;
  margin: 2px 0 0 0;
}

.card-modern__cta {
  padding: 8px 14px;
  background: #3273dc;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  white-space: nowrap;
  margin-left: 8px;
}

.card-modern__cta:hover {
  background: #2366d1;
  transform: translateX(-2px);
}
</style>
