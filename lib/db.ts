export interface Business {
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
  google_place_id?: string
  images?: string[]
  facebook_url?: string
  instagram_url?: string
  twitter_url?: string
  price_level?: number
  reviews?: GoogleReview[]
  editorial_summary?: string
}

export interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description: string
  profile_photo_url?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface Area {
  id: string
  name: string
  slug: string
  description: string
}

export interface EditorialArticle {
  id: string
  slug: string
  title: string
  subtitle?: string
  category: string
  author: string
  publishedAt: string
  featured: boolean
  heroImage: string
  excerpt: string
  content: ContentBlock[]
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'image' | 'quote'
  text?: string
  items?: string[]
  src?: string
  alt?: string
  caption?: string
}

// Cache for data
let businessesCache: Business[] | null = null
let categoriesCache: Category[] | null = null
let areasCache: Area[] | null = null
let articlesCache: EditorialArticle[] | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function loadData() {
  const now = Date.now()
  
  if (businessesCache && categoriesCache && areasCache && articlesCache && (now - cacheTimestamp) < CACHE_TTL) {
    return
  }
  
  try {
    const businesses = await import('../data/businesses.json')
    businessesCache = businesses.default as Business[]
  } catch {
    businessesCache = []
  }
  
  try {
    const categories = await import('../data/categories.json')
    categoriesCache = categories.default as Category[]
  } catch {
    categoriesCache = []
  }
  
  try {
    const areas = await import('../data/areas.json')
    areasCache = areas.default as Area[]
  } catch {
    areasCache = []
  }
  
  try {
    const articles = await import('../data/editorial-articles.json')
    articlesCache = articles.default as EditorialArticle[]
  } catch {
    articlesCache = []
  }
  
  cacheTimestamp = now
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  await loadData()
  return businessesCache!.find(b => b.slug === slug) || null
}

export async function getBusinessesByCategory(category: string, limit?: number): Promise<Business[]> {
  await loadData()
  let filtered = businessesCache!.filter(b => b.category === category)
  if (limit) filtered = filtered.slice(0, limit)
  return filtered
}

export async function getBusinessesByArea(area: string, limit?: number): Promise<Business[]> {
  await loadData()
  let filtered = businessesCache!.filter(b => b.area === area)
  if (limit) filtered = filtered.slice(0, limit)
  return filtered
}

export async function searchBusinesses(query: string): Promise<Business[]> {
  await loadData()
  const lowerQuery = query.toLowerCase()
  return businessesCache!.filter(b => 
    b.name.toLowerCase().includes(lowerQuery) ||
    b.description?.toLowerCase().includes(lowerQuery) ||
    b.category.toLowerCase().includes(lowerQuery) ||
    b.area.toLowerCase().includes(lowerQuery)
  )
}

export async function getCategories(): Promise<Category[]> {
  await loadData()
  return categoriesCache!
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await loadData()
  return categoriesCache!.find(c => c.slug === slug) || null
}

export async function getAreas(): Promise<Area[]> {
  await loadData()
  return areasCache!
}

export async function getAreaBySlug(slug: string): Promise<Area | null> {
  await loadData()
  return areasCache!.find(a => a.slug === slug) || null
}

export async function getFeaturedBusinesses(limit: number = 6): Promise<Business[]> {
  await loadData()
  return businessesCache!
    .filter(b => b.featured)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export async function getBusinesses(limit?: number): Promise<Business[]> {
  await loadData()
  let businesses = businessesCache!
  if (limit) businesses = businesses.slice(0, limit)
  return businesses
}

export async function getArticles(limit?: number): Promise<EditorialArticle[]> {
  await loadData()
  let articles = articlesCache!.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  if (limit) articles = articles.slice(0, limit)
  return articles
}

export async function getArticleBySlug(slug: string): Promise<EditorialArticle | null> {
  await loadData()
  return articlesCache!.find(a => a.slug === slug) || null
}

export async function getFeaturedArticles(limit: number = 3): Promise<EditorialArticle[]> {
  await loadData()
  return articlesCache!
    .filter(a => a.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
