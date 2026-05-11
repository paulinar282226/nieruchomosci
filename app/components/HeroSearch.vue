<script setup lang="ts">
import type { SearchFilters } from '~/types'

const listingsStore = useListingsStore()
const router = useRouter()

const offerType = ref<SearchFilters['offerType']>('')
const propertyType = ref<SearchFilters['propertyType']>('')
const location = ref('')

const cityStats = computed(() => {
  const counts = new Map<string, number>()

  listingsStore.listings.forEach((listing) => {
    const current = counts.get(listing.city) || 0
    counts.set(listing.city, current + 1)
  })

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }))
})

const setCity = (city: string) => {
  location.value = city

  listingsStore.setFilters({
    offerType: offerType.value,
    propertyType: propertyType.value,
    city,
    query: '',
  })

  router.push('/szukaj')
}

const handleSearch = () => {
  const normalizedLocation = location.value.trim().toLowerCase()

  const matchingCity = cityStats.value.find(
    (city) => city.name.toLowerCase() === normalizedLocation,
  )

  listingsStore.setFilters({
    offerType: offerType.value,
    propertyType: propertyType.value,
    city: matchingCity?.name || '',
    query: matchingCity ? '' : location.value,
  })

  router.push('/szukaj')
}
</script>

<template>
  <section class="hero-home">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-variable is-7 is-vcentered">
          <div class="column is-7-desktop">
            <div class="hero-copy">
              <p class="hero-kicker">nieruchomości online</p>
              <h1 class="hero-title">
                Znajdź miejsce,
                <span>które naprawdę</span>
                pasuje do Ciebie.
              </h1>
              <p class="hero-subtitle">
                Szukaj po mieście, cenie i typie nieruchomości. W kilka sekund
                przejdziesz od pomysłu do konkretnej oferty.
              </p>
            </div>

            <div class="search-shell">
              <div class="columns is-mobile is-variable is-2 mb-2">
                <div class="column">
                  <div class="select is-fullwidth select-modern">
                    <select v-model="offerType">
                      <option value="">Kupię / Wynajmę</option>
                      <option value="sprzedaz">Kupię</option>
                      <option value="wynajem">Wynajmę</option>
                    </select>
                  </div>
                </div>
                <div class="column">
                  <div class="select is-fullwidth select-modern">
                    <select v-model="propertyType">
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

              <div class="field has-addons mb-4">
                <div class="control is-expanded">
                  <input
                    v-model="location"
                    class="input input-modern"
                    type="text"
                    placeholder="Wpisz miejscowość, dzielnicę lub ulicę"
                    @keyup.enter="handleSearch"
                  />
                </div>
                <div class="control">
                  <button class="button button-search" @click="handleSearch">
                    Szukaj
                  </button>
                </div>
              </div>

              <div class="city-pills">
                <button
                  v-for="city in cityStats"
                  :key="city.name"
                  class="city-pill"
                  @click="setCity(city.name)"
                >
                  {{ city.name }}
                  <span>{{ city.count }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="column is-5-desktop">
            <div class="hero-visual">
              <div class="visual-ring visual-ring-a"></div>
              <div class="visual-ring visual-ring-b"></div>
              <div class="visual-card">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
                  alt="Nowoczesny dom"
                />
                <div class="visual-overlay">
                  <p>Top oferta tygodnia</p>
                  <h3>Dom • 168 m2 • Kraków</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="home-stats">
    <div class="container">
      <div class="columns is-mobile is-multiline">
        <div class="column is-6-mobile is-3-desktop">
          <div class="stat-item">
            <p>Aktywne ogłoszenia</p>
            <strong>31 000+</strong>
          </div>
        </div>
        <div class="column is-6-mobile is-3-desktop">
          <div class="stat-item">
            <p>Miasta w bazie</p>
            <strong>120+</strong>
          </div>
        </div>
        <div class="column is-6-mobile is-3-desktop">
          <div class="stat-item">
            <p>Nowe oferty dziennie</p>
            <strong>500+</strong>
          </div>
        </div>
        <div class="column is-6-mobile is-3-desktop">
          <div class="stat-item">
            <p>Zadowoleni użytkownicy</p>
            <strong>94%</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-home {
  background:
    radial-gradient(circle at 10% 10%, rgba(232, 196, 196, 0.28), transparent 40%),
    radial-gradient(circle at 90% 20%, rgba(242, 215, 182, 0.32), transparent 35%),
    linear-gradient(160deg, #fff8f8 0%, #fffefb 60%, #fff6f6 100%);
  border-bottom: 1px solid #f0dfdf;
  overflow: hidden;
}

.hero-body {
  padding: 6.2rem 1.5rem 3.6rem;
}

.hero-copy {
  animation: riseIn 0.7s ease-out;
}

.hero-kicker {
  display: inline-block;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: #b67272;
  background: #fdeeee;
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #4a3b3b;
  margin-bottom: 1rem;

  span {
    color: #c48484;
    display: inline-block;
  }
}

.hero-subtitle {
  font-size: 1.05rem;
  color: #756161;
  max-width: 640px;
  margin-bottom: 1.7rem;
}

.search-shell {
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(10px);
  border: 1px solid #eedddd;
  border-radius: 18px;
  padding: 1.1rem;
  box-shadow: 0 20px 40px rgba(132, 84, 84, 0.1);
}

.select-modern select,
.input-modern {
  border-radius: 12px;
  border-color: #e6d3d3;
  height: 2.95rem;
  font-weight: 600;
}

.input-modern:focus,
.select-modern select:focus {
  border-color: #c48484;
  box-shadow: 0 0 0 0.15rem rgba(196, 132, 132, 0.16);
}

.button-search {
  border: none;
  border-radius: 12px;
  height: 2.95rem;
  padding: 0 1.25rem;
  font-weight: 700;
  background: linear-gradient(130deg, #c48484, #b07272);
  color: #fff;
}

.button-search:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(154, 97, 97, 0.24);
}

.city-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.city-pill {
  border: 1px solid #f0dfdf;
  background: #fff;
  color: #5f4d4d;
  border-radius: 999px;
  font-size: 0.8rem;
  padding: 0.35rem 0.65rem;
  cursor: pointer;
  transition: all 0.18s ease;

  span {
    color: #947979;
    margin-left: 0.2rem;
  }
}

.city-pill:hover {
  border-color: #d5a0a0;
  transform: translateY(-1px);
}

.hero-visual {
  position: relative;
  min-height: 430px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: floatIn 0.8s ease-out;
}

.visual-card {
  position: relative;
  width: min(440px, 100%);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.74);
  box-shadow: 0 30px 60px rgba(90, 53, 53, 0.22);

  img {
    width: 100%;
    height: 470px;
    object-fit: cover;
  }
}

.visual-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(60, 40, 40, 0.8), transparent);
  color: #fff;
  padding: 1rem;

  p {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.35rem;
    opacity: 0.88;
  }

  h3 {
    font-weight: 700;
    font-size: 1rem;
  }
}

.visual-ring {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
}

.visual-ring-a {
  width: 200px;
  height: 200px;
  background: rgba(232, 196, 196, 0.32);
  left: -30px;
  top: 30px;
}

.visual-ring-b {
  width: 130px;
  height: 130px;
  background: rgba(242, 215, 182, 0.34);
  right: -10px;
  bottom: 24px;
}

.home-stats {
  background: #fff8f8;
  padding: 1rem 0 1.4rem;
  border-bottom: 1px solid #f1dede;
}

.stat-item {
  background: #fff;
  border: 1px solid #f0dddd;
  border-radius: 12px;
  padding: 0.85rem;

  p {
    color: #907575;
    font-size: 0.82rem;
    margin-bottom: 0.2rem;
  }

  strong {
    font-size: 1.1rem;
    color: #5c4949;
  }
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 1023px) {
  .hero-body {
    padding-top: 5.8rem;
  }

  .hero-visual {
    min-height: 350px;
    margin-top: 1.25rem;
  }

  .visual-card img {
    height: 380px;
  }
}

@media (max-width: 768px) {
  .hero-body {
    padding-top: 5.4rem;
  }

  .field.has-addons {
    display: block;
  }

  .field.has-addons .control,
  .field.has-addons .button-search {
    width: 100%;
  }

  .field.has-addons .control + .control {
    margin-top: 0.45rem;
  }

}
</style>
