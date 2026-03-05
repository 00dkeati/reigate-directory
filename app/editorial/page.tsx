import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import NewsLayout from '@/components/NewsLayout'
import { getArticles } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Editorial | Local News & Guides',
  description: 'Read the latest news, guides, and stories from Reigate and surrounding areas.',
}

export default async function EditorialPage() {
  const articles = await getArticles()

  return (
    <NewsLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editorial</h1>
        <p className="text-gray-600">
          Local news, guides, and stories from Reigate and the Surrey Hills
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
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
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className="font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center">
          <p className="text-gray-500 mb-4">No articles yet.</p>
          <p className="text-sm text-gray-400">
            Check back soon — we&apos;re adding new content every day!
          </p>
        </div>
      )}
    </NewsLayout>
  )
}
