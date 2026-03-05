import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import NewsLayout from '@/components/NewsLayout'
import { getBusinessBySlug, getBusinesses } from '@/lib/db'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const businesses = await getBusinesses()
  return businesses.map((business) => ({
    slug: business.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)
  
  if (!business) return {}

  return {
    title: `${business.name} | ${business.category} in ${business.area}`,
    description: business.description || `${business.name} is a ${business.category} located in ${business.area}. View contact details, reviews, and more.`,
  }
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)
  
  if (!business) {
    notFound()
  }

  return (
    <NewsLayout>
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-gray-500">
          <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
          <li>›</li>
          <li><Link href={`/${business.category}`} className="hover:text-emerald-600 capitalize">{business.category}</Link></li>
          <li>›</li>
          <li className="text-gray-900 font-medium truncate">{business.name}</li>
        </ol>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Hero Image */}
        {business.images && business.images.length > 0 && (
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src={business.images[0]}
              alt={business.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium text-sm">
                  {business.category}
                </span>
                <span className="text-gray-500 capitalize">{business.area}</span>
              </div>
            </div>
            
            {business.rating > 0 && (
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-yellow-500 text-2xl">★</span>
                  <span className="text-2xl font-bold text-gray-900">{business.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-500">{business.review_count} reviews</p>
              </div>
            )}
          </div>

          {/* Description */}
          {business.description && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">{business.description}</p>
            </div>
          )}

          {/* Contact Details */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {business.phone && (
                <a 
                  href={`tel:${business.phone}`}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:bg-emerald-50 transition-colors"
                >
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{business.phone}</p>
                  </div>
                </a>
              )}
              
              {business.website && (
                <a 
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 hover:bg-emerald-50 transition-colors"
                >
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="font-medium text-emerald-600">Visit website</p>
                  </div>
                </a>
              )}
              
              {business.address && (
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 md:col-span-2">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{business.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map placeholder */}
          {business.lat && business.lng && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Location</h2>
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <p className="text-gray-500">Map coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </NewsLayout>
  )
}
