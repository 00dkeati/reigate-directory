# Reigate.co - Local Business Directory

A local business directory and community guide for Reigate, Redhill, and surrounding areas in Surrey.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Data:** JSON files (no database needed)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── [category]/         # Category pages
│   ├── biz/[slug]/         # Business profile pages
│   ├── editorial/[slug]/   # Article pages
│   └── search/             # Search results
├── components/             # React components
├── data/                   # JSON data files
│   ├── businesses.json     # Business listings
│   ├── categories.json     # Business categories
│   ├── areas.json          # Area definitions
│   └── editorial-articles.json  # Editorial content
├── lib/                    # Utility functions
│   └── db.ts               # Data access functions
└── public/                 # Static assets
    └── images/             # Business images
```

## Adding Businesses

Add businesses to `data/businesses.json`:

```json
{
  "id": "unique-id",
  "name": "Business Name",
  "slug": "business-name",
  "category": "restaurants",
  "area": "reigate",
  "address": "123 High Street, Reigate, RH2 9AB",
  "phone": "01onal 123456",
  "website": "https://example.com",
  "description": "Description of the business",
  "rating": 4.5,
  "review_count": 42,
  "featured": true,
  "images": ["/images/businesses/business-name.jpg"],
  "lat": 51.2374,
  "lng": -0.2050
}
```

## Adding Editorial Articles

Add articles to `data/editorial-articles.json`:

```json
{
  "id": "article-slug",
  "slug": "article-slug",
  "title": "Article Title",
  "category": "Guide",
  "author": "Reigate.co",
  "publishedAt": "2025-03-05T10:00:00.000Z",
  "featured": true,
  "heroImage": "/images/articles/hero.jpg",
  "excerpt": "Short description",
  "content": [
    { "type": "paragraph", "text": "Article content..." },
    { "type": "heading", "text": "Section heading" }
  ]
}
```

## Deployment

Push to GitHub and connect to Vercel for automatic deployments.

```bash
git add .
git commit -m "Update content"
git push
```

## License

MIT
