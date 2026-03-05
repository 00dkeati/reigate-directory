'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface NewsLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  showSidebar?: boolean
}

export default function NewsLayout({ children, sidebar, showSidebar = true }: NewsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-sm">
        <div className="container mx-auto max-w-7xl px-4 py-2 flex justify-between items-center">
          <span className="text-slate-400">Your local news & business directory</span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-white text-slate-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white text-slate-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">Reigate</span>
              <span className="text-2xl font-light text-emerald-600">.co</span>
            </Link>

            {/* Search */}
            <form action="/search" method="GET" className="hidden md:flex items-center">
              <input
                type="text"
                name="query"
                placeholder="Search businesses..."
                className="w-64 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* CTA */}
            <Link 
              href="/get-featured"
              className="hidden sm:inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm"
            >
              Add Business
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 py-2 overflow-x-auto text-sm border-t">
            <Link href="/news" className="px-3 py-1.5 rounded-md hover:bg-gray-100 font-medium text-red-700 whitespace-nowrap">
              📰 News
            </Link>
            <Link href="/editorial" className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-600 whitespace-nowrap">
              ✍️ Editorial
            </Link>
            <Link href="/restaurants" className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-600 whitespace-nowrap">
              🍽️ Restaurants
            </Link>
            <Link href="/services" className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-600 whitespace-nowrap">
              🔧 Services
            </Link>
            <Link href="/property" className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-600 whitespace-nowrap">
              🏠 Property
            </Link>
            <Link href="/categories" className="px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-600 whitespace-nowrap">
              📂 All Categories
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {showSidebar ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              {children}
            </div>
            <aside className="lg:col-span-4 mt-8 lg:mt-0">
              {sidebar || <DefaultSidebar />}
            </aside>
          </div>
        ) : (
          children
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Popular Categories</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/restaurants" className="hover:text-white">Restaurants</Link></li>
                <li><Link href="/services" className="hover:text-white">Services</Link></li>
                <li><Link href="/property" className="hover:text-white">Property</Link></li>
                <li><Link href="/categories" className="hover:text-white">All Categories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Latest Guides</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/editorial" className="hover:text-white">All Articles</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Areas</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/area/reigate" className="hover:text-white">Reigate</Link></li>
                <li><Link href="/area/redhill" className="hover:text-white">Redhill</Link></li>
                <li><Link href="/area/horley" className="hover:text-white">Horley</Link></li>
                <li><Link href="/area/dorking" className="hover:text-white">Dorking</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/get-featured" className="hover:text-white">Add Your Business</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-6 mt-8 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Reigate.co — Your local directory
          </div>
        </div>
      </footer>
    </div>
  )
}

function DefaultSidebar() {
  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Search Directory</h3>
        <form action="/search" method="GET">
          <input
            type="text"
            name="query"
            placeholder="Find businesses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </form>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Popular Searches</h3>
        <div className="flex flex-wrap gap-2">
          {['Restaurants', 'Plumbers', 'Hairdressers', 'Estate Agents', 'Cafes'].map((term) => (
            <Link
              key={term}
              href={`/search?query=${encodeURIComponent(term)}`}
              className="bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1 rounded-full text-sm transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-5 text-white">
        <h3 className="font-bold mb-2">Get Listed</h3>
        <p className="text-emerald-100 text-sm mb-4">Add your business to Reigate&apos;s #1 directory</p>
        <Link 
          href="/get-featured"
          className="inline-block bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-emerald-50 transition-colors"
        >
          Get Featured →
        </Link>
      </div>
    </div>
  )
}
