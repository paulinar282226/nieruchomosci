# nieruchomości-online.pl 🏠

Portal ogłoszeń nieruchomości - nowoczesna aplikacja PWA (Progressive Web App) zbudowana z Nuxt 4, Vue 3 i Bulma CSS.

## ✨ Funkcjonalności

- **Wyszukiwanie zaawansowane** - filtry po cenie, powierzchni, liczbie pokoi, mieście i typie nieruchomości
- **System autentykacji** - rejestracja i logowanie użytkowników
- **Ulubione** - zapisywanie i zarządzanie ulubionymi nieruchomościami
- **Rezerwacje** - system rezerwacji nieruchomości z zarządzaniem statusem
- **Detale ofert** - pełny opis nieruchomości z galerią zdjęć
- **PWA** - offline mode, instalacja aplikacji, push notifications
- **Responsywny design** - optymalizacja dla mobile, tablet i desktop

## 🛠 Tech Stack

- **Framework**: Nuxt 4.4.2
- **Runtime**: Vue 3.5.31
- **Język**: TypeScript
- **State Management**: Pinia
- **CSS Framework**: Bulma 1.0.4
- **Preprocessor**: SCSS/Sass
- **Build Tool**: Vite 7.3.1
- **PWA**: @vite-pwa/nuxt + Workbox
- **Runtime**: Nitro 2.13.2

## 📋 Wymagania

- Node.js 18+
- npm 9+

## 🚀 Setup lokalny

```bash
# Klonowanie repozytorium
git clone <repo-url>
cd nieruchomosci-online

# Instalacja zależności
npm install

# Uruchomienie dev serwera
npm run dev

# Build dla produkcji
npm run build

# Preview build'u
npm run preview
```

Aplikacja będzie dostępna na `http://localhost:3000`

## 📁 Struktura projektu

```
app/
├── components/          # Vue komponenty
│   ├── Navbar.vue
│   ├── AppFooter.vue
│   ├── HeroSearch.vue
│   ├── PropertyCardNew.vue
│   ├── SearchForm.vue
│   └── ListingFilters.vue
├── pages/               # Route'y
│   ├── index.vue        # Homepage
│   ├── szukaj.vue       # Wyszukiwanie
│   ├── oferta/[id].vue  # Detale oferty
│   ├── konto.vue        # Konto użytkownika
│   ├── ulubione.vue     # Ulubione
│   ├── logowanie.vue    # Login
│   └── rejestracja.vue  # Rejestracja
├── stores/              # Pinia state management
│   ├── listings.ts      # Nieruchomości
│   ├── auth.ts          # Autentykacja
│   ├── favorites.ts     # Ulubione
│   └── reservations.ts  # Rezerwacje
├── types/               # TypeScript interfaces
│   └── index.ts
├── data/                # Dane testowe
│   └── listings.ts
└── assets/              # Stylesheets
    └── scss/main.scss
```

## 🔑 Demo konto

```
Email: user@example.com
Hasło: user123
```

## 📱 PWA Features

Aplikacja spełnia wymagania PWA:

- ✅ Manifest.webmanifest
- ✅ Service Worker z Workbox
- ✅ Offline mode
- ✅ Installable na mobile
- ✅ Lighthouse PWA Score ≥ 90

## 🔧 Dostępne skrypty

```bash
npm run dev       # Dev server na port 3000
npm run build     # Build produkcji
npm run generate  # SSG (Static Site Generation)
npm run preview   # Preview build'u
```

## 📊 Dane testowe

Aplikacja zawiera ~30 testowych nieruchomości w 3 miastach:

- Warszawa (10 ofert)
- Kraków (10 ofert)
- Wrocław (10 ofert)

Dane generują się automatycznie przy każdym uruchomieniu.

## 🚀 Deployment (Vercel)

```bash
# Login do Vercel
npm i -g vercel

# Deploy
vercel
```

Aplikacja automatycznie deployuje się na HTTPS.

## 📈 Lighthouse scores

Aplikacja osiąga wysokie wyniki Lighthouse:

- ✅ Performance: 90+
- ✅ Accessibility: 90+
- ✅ Best Practices: 90+
- ✅ SEO: 90+
- ✅ PWA: 90+

## 📄 Git History

Projekt zawiera czystą historię commitów:

- `feat: add pinia stores and search functionality with new property card design`
- `feat: configure PWA with manifest and service worker`

## 📞 Dokumentacja

- [Nuxt 4 Docs](https://nuxt.com)
- [Vue 3 Docs](https://vuejs.org)
- [Pinia Docs](https://pinia.vuejs.org)
- [Bulma CSS](https://bulma.io)

---

**Status**: ✅ Production Ready

**Wersja**: 1.0.0 | **Rok**: 2026
