import { Metadata } from 'next'
import Link from 'next/link'
import NewsLayout from '@/components/NewsLayout'
import { getCategories } from '@/lib/db'

export const metadata: Metadata = {
  title: 'All Categories | Browse Local Businesses',
  description: 'Browse all business categories in Reigate, Redhill, and surrounding areas. Find restaurants, services, tradespeople and more.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <NewsLayout showSidebar={false}>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">All Categories</h1>
      <p className="text-gray-600 mb-8">
        Browse local businesses by category in Reigate, Redhill, and surrounding areas.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
          >
            <h2 className="font-bold text-gray-900 mb-1">{category.name}</h2>
            <p className="text-sm text-gray-500">{category.description}</p>
          </Link>
        ))}
      </div>
    </NewsLayout>
  )
}
