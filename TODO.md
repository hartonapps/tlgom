# TLGOM Website TODO

## Foundation

- [x] Scaffold Next.js with TypeScript, App Router, Tailwind CSS, ESLint, and pnpm
- [ ] Organize the `src` structure for public website, Control Room, components, and shared logic
- [ ] Add shadcn/ui, Radix UI, React Hook Form, and Zod
- [x] Add Lucide React icons
- [ ] Create environment-variable templates and application configuration
- [x] Add TLGOM branding, logo, colors, typography, and global styles

## Backend and security

- [ ] Configure Firebase project and Firestore
- [ ] Configure Firebase Authentication for administrators
- [x] Add admin authorization with custom claims and Security Rules
- [ ] Configure Cloudinary image storage and CDN
- [ ] Configure Resend email notifications
- [ ] Define Firestore collections, relationships, slugs, ordering, drafts, and publishing states

## Shared application structure

- [x] Build initial public header, navigation, mobile navigation, footer, and page structure
- [ ] Build reusable buttons, cards, forms, modals, loading, empty, error, and pagination states
- [ ] Create shared hooks/services for settings, SEO, media, and content queries
- [ ] Add authentication and protected Control Room layout

## Public website

- [ ] Homepage with CMS-managed hero slides and story sections
- [ ] About page and ministry history
- [ ] Leadership/team directory
- [ ] Dynamic ministries and ministry detail pages
- [ ] Sermon archive, YouTube embeds, detail pages, and search
- [ ] Upcoming and past events
- [ ] Liberty Convention historical archive
- [ ] Anniversary records and pages
- [ ] Nested gallery albums, photos, lightbox, and progressive loading
- [ ] Articles/blog with categories, tags, and related content
- [ ] Approved testimonies
- [ ] Prayer request form
- [ ] Give page
- [ ] Contact page and contact form

## Control Room

- [ ] Dashboard with metrics, recent activity, and quick actions
- [ ] Homepage and site settings management
- [x] Slideshow image management with upload, delete, drag-and-drop, and move ordering
- [ ] CRUD for sermons, events, ministries, team, articles, conventions, and anniversaries
- [ ] Gallery and nested-album management with bulk uploads and reordering
- [ ] Testimony review and publishing workflow
- [ ] Prayer request and contact-message management
- [ ] Giving information management
- [ ] SEO management

## Quality and launch

- [ ] Add responsive mobile-first layouts and accessibility support
- [ ] Add metadata, canonical URLs, Open Graph, sitemap, robots.txt, and JSON-LD
- [ ] Add image optimization, lazy loading, caching, and pagination
- [ ] Add validation, error handling, and security review
- [ ] Add Vitest and Playwright tests
- [ ] Add Sentry and analytics
- [ ] Deploy to Vercel and verify production configuration
