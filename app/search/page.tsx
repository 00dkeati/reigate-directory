import { Metadata } from 'next'
import NewsLayout from '@/components/NewsLayout'
import BusinessCard from '@/components/BusinessCard'
import { searchBusinesses } from '@/lib/db'

interface Props {
  searchParams: Promise<{ query?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { query } = await searchParams
  
  return {
    title: query ? `Search results for "${query}"` : 'Search Businesses',
    description: `Search for local businesses in Reigate, Redhill, and surrounding areas.`,
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { query } = await searchParams
  const results = query ? await searchBusinesses(query) : []

  return (
    <NewsLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {query ? `Search results for "${query}"` : 'Search Businesses'}
        </h1>
        
        {/* Search Form */}
        <form action="/search" method="GET" className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder="Search for restaurants, plumbers, hairdressers..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {query && (
        <>
          <p className="text-gray-600 mb-6">
            Found {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>

          {results.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">No businesses found matching your search.</p>
              <p className="text-sm text-gray-400">
                Try a different search term or browse our categories.
              </p>
            </div>
          )}
        </>
      )}
    </NewsLayout>
  )
}
