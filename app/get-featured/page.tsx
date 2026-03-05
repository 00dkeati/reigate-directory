import { Metadata } from 'next'
import NewsLayout from '@/components/NewsLayout'

export const metadata: Metadata = {
  title: 'Get Featured | Add Your Business',
  description: 'Add your business to Reigate.co - the leading local directory for Reigate, Redhill, and surrounding areas.',
}

export default function GetFeaturedPage() {
  return (
    <NewsLayout showSidebar={false}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Business Featured</h1>
        <p className="text-xl text-gray-600 mb-8">
          Join Reigate&apos;s leading local business directory and connect with customers in your area.
        </p>
        
        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <span className="text-4xl mb-4 block">📍</span>
            <h3 className="font-bold text-gray-900 mb-2">Local Visibility</h3>
            <p className="text-sm text-gray-500">Be found by customers searching for services in Reigate</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <span className="text-4xl mb-4 block">⭐</span>
            <h3 className="font-bold text-gray-900 mb-2">Build Trust</h3>
            <p className="text-sm text-gray-500">Showcase reviews and build credibility with new customers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <span className="text-4xl mb-4 block">📈</span>
            <h3 className="font-bold text-gray-900 mb-2">Grow Your Business</h3>
            <p className="text-sm text-gray-500">Get more enquiries and boost your local presence</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Your Business</h2>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select a category...</option>
                  <option value="restaurants">Restaurants</option>
                  <option value="cafes">Cafes</option>
                  <option value="pubs">Pubs</option>
                  <option value="plumbers">Plumbers</option>
                  <option value="electricians">Electricians</option>
                  <option value="hairdressers">Hairdressers</option>
                  <option value="estate-agents">Estate Agents</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Business Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="123 High Street, Reigate, RH2 9AB"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Business Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Tell us about your business..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors"
            >
              Submit Your Business
            </button>
          </form>
        </div>
      </div>
    </NewsLayout>
  )
}
