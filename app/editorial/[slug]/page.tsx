import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import NewsLayout from '@/components/NewsLayout'
import { getArticleBySlug, getArticles } from '@/lib/db'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      images: article.heroImage ? [{ url: article.heroImage }] : [],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }

  return (
    <NewsLayout>
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-gray-500">
          <li><Link href="/" className="hover:text-emerald-600">Home</Link></li>
          <li>›</li>
          <li><Link href="/editorial" className="hover:text-emerald-600">Editorial</Link></li>
          <li>›</li>
          <li className="text-gray-900 font-medium truncate">{article.title}</li>
        </ol>
      </nav>

      <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Hero Image */}
        {article.heroImage && (
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
              {article.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">By {article.author}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-xl text-gray-600 mb-8">{article.subtitle}</p>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.map((block, index) => {
              switch (block.type) {
                case 'paragraph':
                  return <p key={index}>{block.text}</p>
                case 'heading':
                  return <h2 key={index}>{block.text}</h2>
                case 'list':
                  return (
                    <ul key={index}>
                      {block.items?.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  )
                case 'quote':
                  return <blockquote key={index}>{block.text}</blockquote>
                case 'image':
                  return (
                    <figure key={index} className="my-8">
                      <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
                        <Image
                          src={block.src!}
                          alt={block.alt || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="text-center text-sm text-gray-500 mt-2">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  )
                default:
                  return null
              }
            })}
          </div>
        </div>
      </article>
    </NewsLayout>
  )
}
