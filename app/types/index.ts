export interface Listing {
  id: number
  title: string
  description: string
  offerType: 'sprzedaz' | 'wynajem'
  propertyType: 'mieszkanie' | 'dom' | 'dzialka' | 'lokal' | 'budynek'
  price: number
  pricePerMeter: number
  area: number
  rooms: number
  floor: number | null
  yearBuilt: number
  city: string
  district: string
  image: string
  images: string[]
  agency: string
  isNew: boolean
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string
  password: string
}

export interface Reservation {
  id: string
  listingId: number
  userId: string
  type: 'sprzedaz' | 'wynajem'
  status: 'aktywna' | 'zakonczona' | 'anulowana' | 'rozwiazana'
  createdAt: string
  listingTitle: string
  listingPrice: number
  listingCity: string
}

export interface SearchFilters {
  query: string
  offerType: '' | 'sprzedaz' | 'wynajem'
  propertyType: '' | 'mieszkanie' | 'dom' | 'dzialka' | 'lokal' | 'budynek'
  priceMin: number | null
  priceMax: number | null
  areaMin: number | null
  areaMax: number | null
  roomsMin: number | null
  city: string
}
