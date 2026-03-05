import { Metadata } from 'next'
import NewsLayout from '@/components/NewsLayout'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Reigate.co team. We\'d love to hear from you.',
}

export default function ContactPage() {
  return (
    <NewsLayout showSidebar={false}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-gray-600 mb-8">
            Have a question, suggestion, or want to add your business to our directory? 
            We&apos;d love to hear from you.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select a subject...</option>
                <option value="business">Add my business</option>
                <option value="feedback">General feedback</option>
                <option value="correction">Correct a listing</option>
                <option value="advertising">Advertising enquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </NewsLayout>
  )
}
