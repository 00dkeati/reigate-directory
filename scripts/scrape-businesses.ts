import * as fs from 'fs'
import * as path from 'path'

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || ''

interface PlaceResult {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  rating?: number
  user_ratings_total?: number
  types?: string[]
  business_status?: string
  photos?: Array<{ photo_reference: string }>
  formatted_phone_number?: string
  website?: string
  opening_hours?: {
    weekday_text?: string[]
  }
  editorial_summary?: {
    overview?: string
  }
}

interface Business {
  id: string
  name: string
  slug: string
  category: string
  area: string
  postcode: string
  address: string
  lat: number
  lng: number
  phone: string
  website: string
  description: string
  opening_hours_json: string
  rating: number
  review_count: number
  featured: boolean
  created_at: string
  updated_at: string
  google_place_id: string
  images: string[]
}

const CATEGORIES = [
  { query: 'restaurant', category: 'restaurants' },
  { query: 'cafe coffee shop', category: 'cafes' },
  { query: 'pub bar', category: 'pubs' },
  { query: 'plumber', category: 'plumbers' },
  { query: 'electrician', category: 'electricians' },
  { query: 'hairdresser hair salon', category: 'hairdressers' },
  { query: 'estate agent', category: 'estate-agents' },
  { query: 'gym fitness', category: 'gyms' },
  { query: 'dentist dental', category: 'dentists' },
  { query: 'garage car repair MOT', category: 'garages' },
]

const LOCATIONS = [
  { name: 'reigate', lat: 51.2374, lng: -0.2050 },
  { name: 'redhill', lat: 51.2400, lng: -0.1700 },
  { name: 'horley', lat: 51.1743, lng: -0.1622 },
  { name: 'dorking', lat: 51.2321, lng: -0.3296 },
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function extractPostcode(address: string): string {
  const match = address.match(/[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/i)
  return match ? match[0].toUpperCase() : ''
}

function determineArea(address: string, lat: number, lng: number): string {
  const lowerAddress = address.toLowerCase()
  if (lowerAddress.includes('reigate')) return 'reigate'
  if (lowerAddress.includes('redhill')) return 'redhill'
  if (lowerAddress.includes('horley')) return 'horley'
  if (lowerAddress.includes('dorking')) return 'dorking'
  if (lowerAddress.includes('merstham')) return 'merstham'
  
  // Default based on closest location
  let closest = 'reigate'
  let minDist = Infinity
  for (const loc of LOCATIONS) {
    const dist = Math.sqrt(Math.pow(lat - loc.lat, 2) + Math.pow(lng - loc.lng, 2))
    if (dist < minDist) {
      minDist = dist
      closest = loc.name
    }
  }
  return closest
}

async function searchPlaces(query: string, lat: number, lng: number): Promise<PlaceResult[]> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&keyword=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
  
  const response = await fetch(url)
  const data = await response.json()
  
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error(`API Error for ${query}:`, data.status, data.error_message)
    return []
  }
  
  return data.results || []
}

async function getPlaceDetails(placeId: string): Promise<PlaceResult | null> {
  const fields = 'place_id,name,formatted_address,geometry,rating,user_ratings_total,types,business_status,photos,formatted_phone_number,website,opening_hours,editorial_summary'
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_API_KEY}`
  
  const response = await fetch(url)
  const data = await response.json()
  
  if (data.status !== 'OK') {
    console.error(`Details API Error for ${placeId}:`, data.status)
    return null
  }
  
  return data.result
}

function getPhotoUrl(photoReference: string): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`
}

async function main() {
  if (!GOOGLE_API_KEY) {
    console.error('GOOGLE_PLACES_API_KEY not set')
    process.exit(1)
  }

  const businesses: Business[] = []
  const seenPlaceIds = new Set<string>()
  
  console.log('Starting Reigate business scrape...\n')

  for (const { query, category } of CATEGORIES) {
    console.log(`\n📂 Searching: ${category} (${query})`)
    
    for (const location of LOCATIONS) {
      console.log(`  📍 ${location.name}...`)
      
      const results = await searchPlaces(query, location.lat, location.lng)
      console.log(`     Found ${results.length} results`)
      
      for (const place of results) {
        if (seenPlaceIds.has(place.place_id)) continue
        seenPlaceIds.add(place.place_id)
        
        // Get detailed info
        const details = await getPlaceDetails(place.place_id)
        if (!details) continue
        
        // Skip if not operational
        if (details.business_status && details.business_status !== 'OPERATIONAL') continue
        
        const address = details.formatted_address || ''
        const lat = details.geometry?.location?.lat || 0
        const lng = details.geometry?.location?.lng || 0
        
        // Skip if too far from Surrey
        if (lat < 51.0 || lat > 51.4 || lng < -0.5 || lng > 0.1) continue
        
        const images: string[] = []
        if (details.photos && details.photos.length > 0) {
          // Get first 3 photos
          for (const photo of details.photos.slice(0, 3)) {
            images.push(getPhotoUrl(photo.photo_reference))
          }
        }
        
        const business: Business = {
          id: place.place_id,
          name: details.name || '',
          slug: slugify(details.name || ''),
          category,
          area: determineArea(address, lat, lng),
          postcode: extractPostcode(address),
          address,
          lat,
          lng,
          phone: details.formatted_phone_number || '',
          website: details.website || '',
          description: details.editorial_summary?.overview || '',
          opening_hours_json: JSON.stringify(details.opening_hours?.weekday_text || []),
          rating: details.rating || 0,
          review_count: details.user_ratings_total || 0,
          featured: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          google_place_id: place.place_id,
          images,
        }
        
        businesses.push(business)
        console.log(`     ✓ ${business.name} (${business.area})`)
        
        // Rate limiting
        await new Promise(r => setTimeout(r, 100))
      }
      
      // Rate limiting between locations
      await new Promise(r => setTimeout(r, 500))
    }
  }
  
  // Sort by rating
  businesses.sort((a, b) => b.rating - a.rating)
  
  // Mark top 10 as featured
  businesses.slice(0, 10).forEach(b => b.featured = true)
  
  // Ensure unique slugs
  const slugCounts: Record<string, number> = {}
  for (const b of businesses) {
    if (slugCounts[b.slug]) {
      slugCounts[b.slug]++
      b.slug = `${b.slug}-${slugCounts[b.slug]}`
    } else {
      slugCounts[b.slug] = 1
    }
  }
  
  // Save
  const outputPath = path.join(__dirname, '..', 'data', 'businesses.json')
  fs.writeFileSync(outputPath, JSON.stringify(businesses, null, 2))
  
  console.log(`\n✅ Scraped ${businesses.length} businesses`)
  console.log(`   Saved to: ${outputPath}`)
  
  // Stats
  const byCategory: Record<string, number> = {}
  const byArea: Record<string, number> = {}
  for (const b of businesses) {
    byCategory[b.category] = (byCategory[b.category] || 0) + 1
    byArea[b.area] = (byArea[b.area] || 0) + 1
  }
  
  console.log('\n📊 By Category:')
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count}`)
  }
  
  console.log('\n📊 By Area:')
  for (const [area, count] of Object.entries(byArea).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${area}: ${count}`)
  }
}

main().catch(console.error)
