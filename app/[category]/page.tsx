import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import NewsLayout from '@/components/NewsLayout'
import BusinessCard from '@/components/BusinessCard'
import { getCategoryBySlug, getBusinessesByCategory, getCategories } from '@/lib/db'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) return {}

  return {
    title: `${category.name} in Reigate | Find Local ${category.name}`,
    description: `Find the best ${category.name.toLowerCase()} in Reigate, Redhill, and surrounding areas. Read reviews, compare prices, and contact local businesses.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }

  const businesses = await getBusinessesByCategory(category.slug)

  return (
    <NewsLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category.name} in Reigate
        </h1>
        <p className="text-gray-600">
          Find the best {category.name.toLowerCase()} in Reigate, Redhill, and surrounding areas
        </p>
      </div>

      {businesses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-gray-500 mb-4">No businesses found in this category yet.</p>
          <p className="text-sm text-gray-400">
            Check back soon — we&apos;re adding new businesses every day!
          </p>
        </div>
      )}
    </NewsLayout>
  )
}
