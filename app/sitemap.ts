import { MetadataRoute } from 'next'
import { getBusinesses, getCategories, getAreas, getArticles } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.reigate.co'
  
  const businesses = await getBusinesses()
  const categories = await getCategories()
  const areas = await getAreas()
  const articles = await getArticles()

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/editorial`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
  ]

  const businessPages = businesses.map((business) => ({
    url: `${baseUrl}/biz/${business.slug}`,
    lastModified: new Date(business.updated_at || business.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const areaPages = areas.map((area) => ({
    url: `${baseUrl}/area/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/editorial/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...businessPages, ...categoryPages, ...areaPages, ...articlePages]
}
