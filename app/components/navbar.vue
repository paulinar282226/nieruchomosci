<script setup lang="ts">
  const authStore = useAuthStore()
  const favoritesStore = useFavoritesStore()

  onMounted(() => {
    authStore.loadFromStorage()
    favoritesStore.loadFromStorage()
  })

  const handleLogout = () => {
    authStore.logout()
    const router = useRouter()
    router.push('/')
  }
</script>

<template>
  <nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <NuxtLink class="navbar-item" to="/">
          <strong class="has-text-primary is-size-5">nieruchomosci-online.pl</strong>
        </NuxtLink>
      </div>

      <div id="mainNav" class="navbar-menu always-open">
        <div class="navbar-start">
          <NuxtLink class="navbar-item search-item" to="/szukaj"> Szukaj </NuxtLink>
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
              <NuxtLink class="navbar-item" to="/konto"> Moje konto </NuxtLink>
              <hr class="navbar-divider" />
              <a class="navbar-item" @click="handleLogout"> Wyloguj sie </a>
            </div>
          </div>

          <div v-else class="navbar-item">
            <div class="buttons">
              <NuxtLink class="button is-primary" to="/rejestracja"> Zarejestruj sie </NuxtLink>
              <NuxtLink class="button is-light" to="/logowanie"> Zaloguj sie </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .always-open {
    display: flex !important;
  }
  .navbar-item.search-item {
    font-weight: 600;
  }
  @media screen and (max-width: 1023px) {
    .navbar-menu {
      background-color: white;
      box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
      padding: 0.5rem 0;
    }
  }
</style>
