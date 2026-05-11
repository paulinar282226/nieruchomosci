import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const users = ref<User[]>([
    {
      id: '1',
      email: 'user@example.com',
      name: 'Jan Kowalski',
      password: 'dXNlcjEyMw==',
    },
  ])

  const currentUser = ref<User | null>(null)

  const isAuthenticated = computed(() => currentUser.value !== null)

  const loadFromStorage = () => {
    if (typeof window === 'undefined') return

    const storedUsers = localStorage.getItem('users')
    const storedCurrentUser = localStorage.getItem('currentUser')

    if (storedUsers) {
      users.value = JSON.parse(storedUsers)
    }

    if (storedCurrentUser) {
      currentUser.value = JSON.parse(storedCurrentUser)
    }
  }

  const saveToStorage = () => {
    if (typeof window === 'undefined') return
    localStorage.setItem('users', JSON.stringify(users.value))
    localStorage.setItem(
      'currentUser',
      JSON.stringify(currentUser.value),
    )
  }

  const encodePassword = (password: string): string => {
    return btoa(password)
  }

  const register = (
    email: string,
    name: string,
    password: string,
  ): boolean => {
    if (users.value.some((u) => u.email === email)) {
      return false
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      password: encodePassword(password),
    }

    users.value.push(newUser)
    currentUser.value = newUser
    saveToStorage()
    return true
  }

  const login = (email: string, password: string): boolean => {
    const user = users.value.find((u) => u.email === email)

    if (!user || user.password !== encodePassword(password)) {
      return false
    }

    currentUser.value = user
    saveToStorage()
    return true
  }

  const logout = () => {
    currentUser.value = null
    saveToStorage()
  }

  return {
    users,
    currentUser,
    isAuthenticated,
    loadFromStorage,
    register,
    login,
    logout,
  }
})
