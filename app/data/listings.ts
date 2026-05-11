import type { Listing } from '~/types'

const sharedImage =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=600&fit=crop'

const agencyNames = [
  'Good Life Estates',
  'Home Estates',
  'TomHouse - Nieruchomości',
  'Best Investments',
  'PROCHALSCY.PL',
  'PARTER PIĘTRO',
  'Di Brenta Nieruchomości',
  'Isabella Properties',
  'TimeForFuture',
  'Nieruchomości Arka',
]

const districts = {
  Warszawa: ['Centrum', 'Praga', 'Mokotów', 'Wawer', 'Wilanów', 'Ochota'],
  Kraków: ['Stare Miasto', 'Kazimierz', 'Podgórze', 'Nowa Huta', 'Krowodrza'],
  Wrocław: ['Stare Miasto', 'Nadodrze', 'Śródmieście', 'Fabryczna', 'Psie Pole'],
}

const titles = [
  'Mieszkanie 2-pokojowe',
  'Mieszkanie 3-pokojowe',
  'Apartament z garażem',
  'Mieszkanie z miejscem parkingowym',
  'Dom szeregowy',
  'Dom jednorodzinny',
  'Apartament umeblowany',
  'Nieruchomość z tarasem',
]

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateListingsForCity(city: string, count: number, priceMultiplier: number): Listing[] {
  const listings: Listing[] = []
  const cityDistricts = districts[city as keyof typeof districts] || ['Centrum']

  for (let i = 0; i < count; i++) {
    const seed = i + (city === 'Warszawa' ? 0 : city === 'Kraków' ? 1000 : 2000)
    const rand = (offset = 0) => seededRandom(seed + offset)

    const offerType = rand(1) > 0.5 ? 'sprzedaz' : 'wynajem'
    const propertyType = rand(2) > 0.6 ? 'mieszkanie' : 'dom'
    const rooms = propertyType === 'dom' ? Math.floor(rand(3) * 3 + 3) : Math.floor(rand(3) * 3 + 1)
    const area =
      propertyType === 'dom' ? Math.floor(rand(4) * 100 + 100) : Math.floor(rand(4) * 60 + 30)
    const basePrice =
      offerType === 'sprzedaz' ? area * (3000 + rand(5) * 2000) : area * (30 + rand(5) * 20)
    const price = Math.round(basePrice * priceMultiplier)
    const floor = propertyType === 'dom' ? null : Math.floor(rand(6) * 8)
    const yearBuilt = Math.floor(rand(7) * 30 + 1990)
    const createdAt = new Date(Date.now() - rand(8) * 60 * 24 * 60 * 1000).toISOString()

    const titleText = titles[Math.floor(rand(9) * titles.length)]
    const district = cityDistricts[Math.floor(rand(10) * cityDistricts.length)]
    const agency = agencyNames[Math.floor(rand(11) * agencyNames.length)]
    const image = sharedImage

    listings.push({
      id: i + 1 + (city === 'Kraków' ? 100 : city === 'Wrocław' ? 200 : 0),
      title: `${titleText}, ul. Generalna`,
      description: `Piękne ${propertyType} w ${district}. Idealnie położone, bliskie transportu publicznego. Liczę na szybkie zawarcie umowy.`,
      offerType,
      propertyType,
      price,
      pricePerMeter: Math.round(price / area),
      area,
      rooms,
      floor,
      yearBuilt,
      city,
      district,
      image,
      images: [sharedImage, sharedImage],
      agency,
      isNew: rand(14) > 0.8,
      createdAt,
    })
  }

  return listings
}

export function generateListings(): Listing[] {
  const warszawa = generateListingsForCity('Warszawa', 10, 1.0)
  const krakow = generateListingsForCity('Kraków', 10, 0.85)
  const wroclaw = generateListingsForCity('Wrocław', 10, 0.8)

  return [...warszawa, ...krakow, ...wroclaw]
}

export const listings = generateListings()
