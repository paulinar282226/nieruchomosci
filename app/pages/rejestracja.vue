<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  })

  const router = useRouter()
  const authStore = useAuthStore()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const errorMessage = ref('')
  const successMessage = ref('')
  const isLoading = ref(false)

  const handleRegister = async () => {
    errorMessage.value = ''
    successMessage.value = ''
    isLoading.value = true

    if (!name.value || !email.value || !password.value || !passwordConfirm.value) {
      errorMessage.value = 'Uzupełnij wszystkie pola'
      isLoading.value = false
      return
    }

    if (password.value !== passwordConfirm.value) {
      errorMessage.value = 'Hasła nie są identyczne'
      isLoading.value = false
      return
    }

    if (password.value.length < 3) {
      errorMessage.value = 'Hasło musi mieć co najmniej 3 znaki'
      isLoading.value = false
      return
    }

    const success = authStore.register(email.value, name.value, password.value)

    if (success) {
      successMessage.value = 'Rejestracja powiodła się! Przekierowuję...'
      setTimeout(() => {
        router.push('/konto')
      }, 1500)
    } else {
      errorMessage.value = 'Użytkownik z tym emailem już istnieje'
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
            <h1 class="title">Zarejestruj się</h1>

            <div v-if="errorMessage" class="notification is-danger mb-4">
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="notification is-success mb-4">
              {{ successMessage }}
            </div>

            <form @submit.prevent="handleRegister()">
              <div class="field">
                <label class="label">Imię i nazwisko</label>
                <div class="control">
                  <input
                    v-model="name"
                    type="text"
                    class="input"
                    placeholder="Twoje imię i nazwisko"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input v-model="email" type="email" class="input" placeholder="Twój email" />
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

              <div class="field">
                <label class="label">Potwierdź hasło</label>
                <div class="control">
                  <input
                    v-model="passwordConfirm"
                    type="password"
                    class="input"
                    placeholder="Powtórz hasło"
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
                    Zarejestruj się
                  </button>
                </div>
                <div class="control">
                  <NuxtLink to="/" class="button is-light"> Anuluj </NuxtLink>
                </div>
              </div>
            </form>

            <p class="mt-4">
              Masz już konto?
              <NuxtLink to="/logowanie" class="has-text-info"> Zaloguj się </NuxtLink>
            </p>
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
