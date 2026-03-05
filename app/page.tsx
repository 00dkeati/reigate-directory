import Link from 'next/link'
import Image from 'next/image'
import NewsLayout from '@/components/NewsLayout'
import BusinessCard from '@/components/BusinessCard'
import { getFeaturedBusinesses, getCategories, getArticles } from '@/lib/db'

export default async function HomePage() {
  const featuredBusinesses = await getFeaturedBusinesses(6)
  const categories = await getCategories()
  const latestArticles = await getArticles(3)

  return (
    <NewsLayout showSidebar={false}>
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-8 mb-12">
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-20 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Reigate
            </h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Your complete guide to local businesses, services, and what&apos;s happening in Reigate, Redhill, and the Surrey Hills
            </p>
            
            {/* Search Bar */}
            <form action="/search" method="GET" className="max-w-xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="query"
                  placeholder="Search for restaurants, plumbers, hairdressers..."
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
                />
                <button
                  type="submit"
                  className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
            
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {['Restaurants', 'Plumbers', 'Hairdressers', 'Estate Agents', 'Cafes'].map((term) => (
                <Link
                  key={term}
                  href={`/search?query=${encodeURIComponent(term)}`}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      {featuredBusinesses.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">⭐ Featured Businesses</h2>
            <Link href="/featured" className="text-emerald-600 hover:text-emerald-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">📂 Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">✍️ Latest from the Editorial</h2>
            <Link href="/editorial" className="text-emerald-600 hover:text-emerald-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                href={`/editorial/${article.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                {article.heroImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.heroImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* About Reigate */}
      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Reigate</h2>
        <div className="prose prose-lg text-gray-600 max-w-none">
          <p>
            Reigate is a historic market town in Surrey, nestled at the foot of the North Downs. 
            With its picturesque High Street, excellent schools, and easy access to London, 
            Reigate has become one of Surrey&apos;s most sought-after places to live and work.
          </p>
          <p>
            From independent boutiques and award-winning restaurants to trusted local tradespeople, 
            Reigate.co is your guide to discovering the best of what this vibrant community has to offer.
          </p>
        </div>
      </section>
    </NewsLayout>
  )
}
