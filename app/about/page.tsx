import { Metadata } from 'next'
import NewsLayout from '@/components/NewsLayout'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Reigate.co - your local business directory and community guide for Reigate, Redhill, and surrounding areas.',
}

export default function AboutPage() {
  return (
    <NewsLayout showSidebar={false}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Reigate.co</h1>
        
        <div className="prose prose-lg text-gray-600">
          <p>
            Reigate.co is your comprehensive local directory and community guide for Reigate, 
            Redhill, and the beautiful Surrey Hills area.
          </p>
          
          <p>
            We&apos;re dedicated to helping local residents discover the best businesses, services, 
            and experiences in our community. From finding a trusted tradesperson to discovering 
            a new favourite restaurant, we&apos;ve got you covered.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to connect local businesses with the community they serve. 
            We believe that supporting local businesses is vital for maintaining the unique 
            character and economy of our towns.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li><strong>Business Directory:</strong> Find local businesses across all categories</li>
            <li><strong>Reviews & Ratings:</strong> Make informed decisions with genuine reviews</li>
            <li><strong>Local News:</strong> Stay up to date with what&apos;s happening in the area</li>
            <li><strong>Editorial Content:</strong> In-depth guides to help you make the most of local services</li>
          </ul>

          <h2>Get Involved</h2>
          <p>
            Are you a local business owner? We&apos;d love to feature you on Reigate.co. 
            Contact us to learn more about getting listed.
          </p>
        </div>
      </div>
    </NewsLayout>
  )
}
