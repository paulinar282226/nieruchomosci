<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  if (!email.value || !password.value) {
    errorMessage.value = 'Uzupełnij wszystkie pola'
    isLoading.value = false
    return
  }

  const success = authStore.login(email.value, password.value)

  if (success) {
    await router.push('/konto')
  } else {
    errorMessage.value = 'Nieprawidłowy email lub hasło'
  }

  isLoading.value = false
}

onMounted(() => {
  authStore.loadFromStorage()
})
</script>

<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-desktop is-8-tablet">
          <div class="box">
            <h1 class="title">Zaloguj się</h1>

            <div v-if="errorMessage" class="notification is-danger mb-4">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin()">
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    v-model="email"
                    type="email"
                    class="input"
                    placeholder="Twój email"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Hasło</label>
                <div class="control">
                  <input
                    v-model="password"
                    type="password"
                    class="input"
                    placeholder="Twoje hasło"
                  />
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button
                    type="submit"
                    class="button is-success"
                    :class="{ 'is-loading': isLoading }"
                    :disabled="isLoading"
                  >
                    Zaloguj się
                  </button>
                </div>
                <div class="control">
                  <NuxtLink to="/" class="button is-light">
                    Anuluj
                  </NuxtLink>
                </div>
              </div>
            </form>

            <p class="mt-4">
              Nie masz konta?
              <NuxtLink to="/rejestracja" class="has-text-info">
                Zarejestruj się
              </NuxtLink>
            </p>

            <div class="box has-background-light mt-4">
              <p class="is-size-7">
                <strong>Demo:</strong><br />
                Email: user@example.com<br />
                Hasło: user123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  border-radius: 4px;
}
</style>
