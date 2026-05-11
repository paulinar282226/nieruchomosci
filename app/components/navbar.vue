<script setup lang="ts">
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()

onMounted(() => {
  authStore.loadFromStorage()
  favoritesStore.loadFromStorage()
})
</script>

<template>
  <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <NuxtLink class="navbar-item" to="/">
          <strong class="has-text-primary is-size-5">nieruchomości-online.pl</strong>
        </NuxtLink>
      </div>

      <div id="mainNav" class="navbar-menu always-open">
        <div class="navbar-start">
          <NuxtLink class="navbar-item search-item" to="/szukaj">
            Szukaj
          </NuxtLink>
        </div>

        <div class="navbar-end">
          <NuxtLink class="navbar-item" to="/ulubione">
            Ulubione
            <span v-if="favoritesStore.favoritesCount > 0" class="tag is-danger ml-2">
              {{ favoritesStore.favoritesCount }}
            </span>
          </NuxtLink>

          <div v-if="authStore.isAuthenticated" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ authStore.currentUser?.name }}
            </a>
            <div class="navbar-dropdown">
              <NuxtLink class="navbar-item" to="/konto">
                Moje konto
              </NuxtLink>
              <hr class="navbar-divider" />
              <NuxtLink
                class="navbar-item"
                @click="authStore.logout(); $router.push('/')"
                to="/"
              >
                Wyloguj się
              </NuxtLink>
            </div>
          </div>

          <div v-else class="navbar-item">
            <div class="buttons">
              <NuxtLink class="button is-primary" to="/rejestracja">
                Zarejestruj się
              </NuxtLink>
              <NuxtLink class="button is-light" to="/logowanie">
                Zaloguj się
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .always-open {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
    flex-shrink: 0;
  }

  @media (max-width: 1023px) {
    .always-open {
      display: block;
      box-shadow: none;
      padding: 0;
    }
  }

  .search-item {
    background: #f6f6f6;
    border-radius: 10px;
    margin: 0.4rem 0.5rem;
    font-weight: 600;
    color: #5f5757;
  }

  .search-item:hover {
    background: #ececec;
    color: #4a3b3b;
  }

  .category-bar {
    margin-top: 3.25rem;
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
  }

  .tabs ul {
    border-bottom: none;
  }

  .tabs a {
    color: #4a4a4a;
    font-weight: 500;

    &:hover {
      color: #00a68b;
      border-bottom-color: #00a68b;
    }
  }
</style>
