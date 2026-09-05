---

# The Life Global Outreach Ministries

## Church Website — Complete Structure & Requirements

---

# 1. PROJECT OVERVIEW

I want to build a modern, responsive, SEO-friendly website for **The Life Global Outreach Ministries (TLGOM)**.

The website should serve two major purposes:

1. **Public Church Website** — where visitors can learn about the ministry, watch sermons, see events and historical moments, view galleries, submit prayer requests, share testimonies, give, and contact the church.
2. **Control Room** — a private administration system where authorized administrators can manage almost all of the website's content without needing to edit the code.

I want the website to be **content-driven rather than hardcoded**. This means things such as sermons, events, gallery albums, team members, ministries, articles, hero slides, testimonies, and other content should be manageable from the Control Room.

The structure should also allow me to add new features and content types in the future without having to rebuild the entire website.

---

# 2. CHURCH IDENTITY

## Brand

**Official Name:**

> The Life Global Outreach Ministries

**Original/Formal Ministry Expression:**

> The Life and Fire Assembly

The website should explain this history properly without creating confusion about the church's official name.

The original expression represents the ministry's vision:

* **The Life** — the Word of God
* **The Fire** — deliverance and the power of God

The officially registered name is **The Life Global Outreach Ministries**, while the Life and Fire vision remains part of the ministry's identity.

---

# 3. BRAND COLORS

I want the website to follow the church's existing visual identity.

### Primary

`#2A2B77`

Deep Royal Blue

### Secondary / Accent

`#E7272D`

Bright Red

### Supporting

`#55374E`

Dark Purple

### Neutral

`#FFFFFF`

White

The colors should not simply be applied everywhere. I want the design to use them intentionally so that the website feels like a **church/ministry website**, but still looks modern and professional.

---

# 4. PUBLIC WEBSITE

The public website is the part visitors see.

I want the navigation to remain relatively simple even though the website contains a lot of information.

The main navigation can contain:

**Home**

**About**

**Ministries**

**Media**

**Events**

**Gallery**

**Articles**

**Give**

**Contact**

There should also be a prominent **Prayer Request** action.

Some sections, such as Leadership, Sermons, Liberty Convention and Anniversaries, can live inside their relevant navigation sections rather than making the main navigation overcrowded.

---

# 5. HOMEPAGE

The homepage should act as the main introduction to TLGOM.

I don't want it to simply contain random sections stacked together. The sections should tell the story of the ministry progressively.

The homepage will contain:

### Hero

The hero will be a **full-width slideshow**.

I want the slides to automatically change after a certain amount of time.

Visitors should also be able to manually control it using:

* Previous button
* Next button
* Slide indicators

The slideshow should continue automatically unless the visitor interacts with it.

Most importantly, **I want to control the hero slides from the Control Room.**

I want to be able to:

* Upload the hero image
* Change the title
* Change the description
* Add a button
* Change the button link
* Reorder slides
* Enable/disable slides
* Change the displayed images whenever I want

I don't want to edit source code whenever I want to change the homepage hero.

---

# 6. HOMEPAGE CONTENT

After the hero, I want the homepage to introduce the church gradually.

The general flow will be:

### Hero

↓

### Welcome / Introduction

A short introduction to TLGOM with a link to the About page.

↓

### Vision & Mission

A visual presentation of the ministry's:

* Vision
* Mission
* Life & Fire identity

↓

### Battle Cry

A dedicated section for:

> Jesus Christ the same yesterday, today and forever.
> Hebrews 13:8

↓

### Foundation Scripture

A dedicated section for:

> There is therefore now no condemnation for those who are in Christ Jesus.
> Romans 8:1

↓

### Featured Sermons

Show a few recently added or selected sermons.

↓

### Upcoming Events

Show upcoming church events.

↓

### Ministries

Show the major ministries.

↓

### Gallery Preview

Show selected photographs from the gallery.

↓

### Testimonies

Show approved testimonies.

↓

### Prayer Request CTA

Invite visitors to submit prayer requests.

↓

### Give CTA

Invite visitors to support the ministry.

↓

### Visit / Contact

Show church location, service information and contact details.

---

# 7. ABOUT

The About section should explain who TLGOM is.

It should contain:

### Who We Are

The general introduction to the ministry.

### Our Story

This is where I want to explain the history of the ministry and the relationship between:

**The Life and Fire Assembly**

and

**The Life Global Outreach Ministries**

I want this to be presented as part of the ministry's story rather than as a technical/legal explanation.

### Vision

The Life & Fire.

### Mission

To lead people to Christ massively, worldwide, and establish them in the Word of God.

### Battle Cry

Hebrews 13:8.

### Foundation Scripture

Romans 8:1.

### Leadership

A link to the leadership section.

---

# 8. LEADERSHIP / TEAM

I want a dedicated section where visitors can see the people leading and serving in the ministry.

This could include:

* Head / General Overseer
* Wife / Spouse
* Bishops
* Pastors
* Apostles
* Ministers
* Department leaders
* Other team members

I don't want these people hardcoded into the website.

From the Control Room, I want to be able to:

* Add a person
* Upload their photograph
* Add their name
* Add their position
* Add their biography
* Assign them to a ministry
* Add social links where applicable
* Change their order
* Hide/remove them

---

# 9. MINISTRIES

I want Ministries to be dynamic.

The initial ministries can include:

* Youth
* Children
* Men
* Women
* Prayer
* Evangelism / Outreach

But I don't want the system to be limited to these.

From the Control Room, I should be able to create another ministry later.

Each ministry can have its own:

* Name
* Description
* Cover image
* Leader
* Meeting information
* Events
* Gallery
* Articles
* Related content

This means adding a new ministry later shouldn't require a developer.

---

# 10. EVENTS

I want the church to have an event system rather than manually creating event sections.

I should be able to create an event from the Control Room.

An event can contain:

* Event name
* Description
* Cover image
* Start date
* End date
* Time
* Location
* Speaker
* Registration information
* Category
* Related gallery
* Related sermons

The website should separate:

**Upcoming Events**

from:

**Past Events**

---

# 11. LIBERTY CONVENTION ARCHIVE

This is an important historical section.

The church is going into its **16th year**, and I have convention themes going back approximately 15 years.

I want these historical conventions preserved on the website.

Instead of treating each convention as just another event, I want a dedicated archive.

For example:

```text
Liberty Convention
   │
   ├── 2012
   ├── 2013
   ├── 2014
   ├── 2015
   ├── ...
   ├── 2025
   └── 2026
```

Each convention can contain:

* Year
* Theme
* Scripture
* Description
* Speakers
* Photos
* Videos
* Sermons
* Related articles

This allows the website to become a historical archive of the ministry.

---

# 12. ANNIVERSARIES

I don't currently have complete historical anniversary information for every ministry such as Youth, Children, Men and Women.

I want to start documenting them properly from this year.

The system should therefore allow me to create anniversary records in the future.

For example:

```text
Anniversary 2026
   │
   ├── General Anniversary
   ├── Youth Anniversary
   ├── Children's Anniversary
   ├── Men's Anniversary
   └── Women's Anniversary
```

These can then connect directly to the gallery system.

---

# 13. GALLERY

I want the gallery to be one of the major features of the website.

I don't want a simple gallery where everything is thrown into one page.

I want a proper **album system**.

The important part is that albums should support **nested albums**.

For example:

```text
Anniversary
   │
   └── 2026
       │
       ├── Youth
       ├── Children
       ├── Men
       └── Women
```

Another example:

```text
Liberty Convention
   │
   ├── 2024
   ├── 2025
   └── 2026
```

And I should be able to create completely new structures later.

---

# 14. NESTED ALBUM SYSTEM

I want the Control Room to allow me to create an album and then create another album inside it.

For example, I could create:

> **Anniversary 2026**

Then inside it:

> **Youth Anniversary**

Then upload photos into the Youth Anniversary album.

I could also create:

> **Liberty Convention 2026**

and inside it create:

> Day 1
> Day 2
> Day 3

The system shouldn't have a fixed maximum structure.

The album system should basically understand:

**Parent Album → Child Album → Child Album**

rather than assuming every gallery must have only one level.

---

# 15. GALLERY MANAGEMENT

From the Control Room I want to be able to:

* Create albums
* Create sub-albums
* Upload photos
* Upload multiple photos at once
* Edit album information
* Change album cover
* Rename albums
* Move albums
* Delete albums
* Move photos
* Delete photos
* Reorder photos
* Hide/publish albums

I also want a **General Gallery** for photographs that don't belong to a specific event or ministry.

---

# 16. MEDIA / SERMONS

I want a dedicated sermon archive.

I don't want to host the actual sermon videos directly on the website.

The sermon video will remain on YouTube.

For each sermon I want to store:

* Sermon title/topic
* Speaker
* Date
* Cover image
* Description
* YouTube URL
* Scripture
* Category
* Tags

The website will use the information stored in the database and display the YouTube video.

---

# 17. SERMON SEARCH

As the sermon archive becomes larger, visitors should be able to search it.

I want visitors to search by:

* Topic
* Speaker
* Date
* Year
* Category
* Keywords

For example:

```text
Search: Faith
```

could return all sermons related to faith.

---

# 18. ARTICLES

I want to add an article/blog system.

One possible workflow is:

```text
Sermon
   ↓
Transcription
   ↓
Editing
   ↓
Article
   ↓
Publish
```

This will allow sermon content to become written resources.

Articles should have:

* Title
* Slug
* Cover image
* Author
* Content
* Excerpt
* Category
* Tags
* Published date
* Updated date
* SEO information

The article system should be completely manageable from the Control Room.

---

# 19. TESTIMONIES

I want visitors to be able to share testimonies.

There should be a:

**Share Your Testimony**

form.

The submitted testimony should:

1. Be saved in the database.
2. Trigger an email notification.
3. Appear inside the Control Room.
4. Remain unpublished until an administrator reviews it.

I want a review workflow such as:

```text
Pending
   ↓
Reviewed
   ↓
Approved
   ↓
Published
```

or rejected/archived when necessary.

---

# 20. PRAYER REQUESTS

I want visitors to be able to submit prayer requests.

The prayer request should:

* Be submitted through the website.
* Be stored in the database.
* Send an email notification.
* Appear inside the Control Room.

I want administrators to be able to manage the requests from there.

Prayer requests should **not automatically become public content**.

---

# 21. CONTACT

I want a proper contact section with:

* Church address
* Phone
* Email
* Service times
* Social media
* Map/location
* Contact form

Contact form submissions should also be accessible from the Control Room and sent through the email notification system.

---

# 22. GIVE

I want a dedicated Give page.

The page should be able to display:

* Giving information
* Bank transfer details
* Online giving option
* Other giving methods

The giving information should be manageable from the Control Room so that if account information changes, I don't have to modify the source code.

---

# 23. CONTROL ROOM

The Control Room is the private administration area of the website.

I want it to function as a **CMS for the church**.

The goal is that once the website is deployed, I can manage the majority of the site's content myself.

The Control Room should have sections for:

### Dashboard

Overview of the website.

### Homepage

Hero slides and homepage content.

### Content

Pages, articles and other editable content.

### Sermons

Create and manage sermons.

### Events

Create and manage events.

### Ministries

Create and manage ministries.

### Team

Create and manage leadership/team members.

### Conventions

Manage Liberty Convention history.

### Anniversaries

Manage anniversary information.

### Gallery

Manage albums and photos.

### Testimonials

Review submitted testimonies.

### Prayer Requests

View and manage prayer requests.

### Messages

View contact submissions.

### Giving

Manage giving information.

### SEO

Manage SEO information.

### Settings

Manage general church information.

---

# 24. AUTHENTICATION & SECURITY

I want Firebase Authentication to handle administrator login.

The Control Room should not be accessible simply because someone knows the URL.

The system should verify that the authenticated user is actually authorized to access the Control Room.

The database security rules should also enforce the permissions.

The frontend hiding an admin page should **not** be considered the actual security layer.

---

# 25. MEDIA ARCHITECTURE

I want to separate **media storage** from **database storage**.

The database should store information about images, while the actual image files should live in the dedicated media storage/CDN service.

The architecture should work approximately like this:

```text
Admin
  ↓
Upload Photo
  ↓
[MEDIA STORAGE / CDN]
  ↓
Image URL
  ↓
Database
  ↓
Album + Photo Metadata
```

For example, the database can store:

```text
title
imageUrl
albumId
date
description
order
createdAt
```

while the actual image remains in the media storage service.

---

# 26. SHARED WEBSITE COMPONENTS

I don't want to recreate the same header, footer, buttons, cards and other UI elements on every page.

I want reusable components.

For example:

```text
Header
Footer
Navigation
Mobile Navigation
Page Header
Breadcrumbs
Buttons
Cards
Modal
Forms
Loading State
Empty State
Error State
Pagination
```

The main website layout should automatically provide the common elements.

Conceptually:

```text
             PUBLIC LAYOUT
                  │
        ┌─────────┴─────────┐
        │                   │
      HEADER              FOOTER
        │
        ↓
     PAGE CONTENT
```

That way, if I change the header later, I change it in one place instead of changing 20 different pages.

---

# 27. REUSABLE LOGIC / COMPOSABLES

I also want the application logic separated properly.

For example:

```text
[useAuth]
[useFirebase]
[useSiteSettings]
[useHeroSlides]
[useAlbums]
[useGallery]
[useSermons]
[useEvents]
[useArticles]
[useMinistries]
[useTeam]
[useTestimonials]
[usePrayerRequests]
[useContact]
[useSEO]
```

The purpose is to prevent Firebase queries and business logic from being duplicated throughout the pages.

---

# 28. SEO

SEO should be part of the architecture from the beginning.

I want the website to be SEO-friendly and properly indexed by search engines.

Important areas include:

* Server-side rendering
* Proper page titles
* Meta descriptions
* Canonical URLs
* Open Graph metadata
* Social sharing images
* Sitemap
* Robots.txt
* Structured data
* Semantic HTML
* Proper heading hierarchy
* Image alt text
* SEO-friendly URLs
* Fast image delivery
* Optimized images

Dynamic content such as:

```text
Sermons
Articles
Events
Ministries
Albums
Conventions
```

should also have their own SEO-friendly pages.

---

# 29. URL STRUCTURE

I want clean URLs such as:

```text
/about
/leadership
/ministries
/ministries/youth
/sermons
/sermons/the-power-of-faith
/events
/events/liberty-convention-2026
/gallery
/gallery/anniversary-2026
/articles
/articles/the-power-of-faith
/prayer-request
/testimonies
/give
/contact
```

I don't want URLs that expose random database IDs where a readable slug can be used.

---

# 30. RESPONSIVE DESIGN

The website needs to work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

The Control Room should also be responsive enough to manage the website from smaller screens where practical.

The public website especially needs to be designed **mobile-first**, because a significant portion of visitors will likely access the church website from their phones.

---

# 31. PERFORMANCE

Because the gallery could eventually contain **a very large number of photos**, I want the architecture to account for that from the beginning.

The website shouldn't load hundreds of original images when someone opens an album.

I want:

* Optimized images
* CDN delivery
* Lazy loading
* Pagination/infinite loading where appropriate
* Responsive image sizes
* Proper caching
* Optimized thumbnails
* Efficient database queries

The same principle should apply to sermons, articles and events as the content grows.

---

# 32. TECHNOLOGY PLACEHOLDER

I want the final technology stack documented here, but I can update the exact technologies later.

```text| Layer          | Recommendation                              | Why                                                     |
| -------------- | ------------------------------------------- | ------------------------------------------------------- |
| Frontend       | **React + TypeScript**                      | Strong component architecture and type safety           |
| Framework      | **Next.js**                                 | SSR/SSG, SEO, routing, image optimization, scalability  |
| Styling        | **Tailwind CSS**                            | Fast, consistent responsive UI                          |
| UI Components  | **shadcn/ui + Radix UI**                    | Accessible reusable components                          |
| Database       | **Firebase Firestore**                      | Flexible content-driven data model                      |
| Authentication | **Firebase Authentication**                 | Fits your admin-login requirement                       |
| Authorization  | **Firebase Security Rules + custom claims** | Real security for Control Room                          |
| Media          | **Cloudinary**                              | Excellent image transformation, thumbnails and CDN      |
| CDN            | **Cloudinary CDN**                          | Especially useful for your future large gallery         |
| Video          | **YouTube**                                 | Matches your requirement to keep videos off your server |
| Email          | **Resend**                                  | Good developer-friendly transactional email             |
| Hosting        | **Vercel**                                  | Excellent Next.js deployment and global CDN             |
| SEO            | **Next.js Metadata API + JSON-LD**          | Strong foundation for dynamic SEO                       |
| Forms          | **React Hook Form + Zod**                   | Validation and maintainable forms                       |
| Icons          | **Lucide React**                            | Clean, consistent icon set                              |
| Analytics      | **Google Analytics 4 / Search Console**     | Traffic + search visibility                             |
| Monitoring     | **Sentry**                                  | Error tracking                                          |
| Testing        | **Vitest + Playwright**                     | Unit/integration + end-to-end testing                   |

```

---

# 33. OVERALL SYSTEM FLOW

The final system should essentially work like this:

```text
                    TLGOM WEBSITE
                         │
             ┌───────────┴───────────┐
             │                       │
          PUBLIC                 CONTROL ROOM
          WEBSITE                    │
             │                       │
             │                  Authentication
             │                       │
             │                    Admin
             │                       │
             │                    Content
             │                       │
             │             ┌─────────┼─────────┐
             │             │         │         │
             │          Database   Gallery   Submissions
             │             │         │         │
             │             │     Media CDN    │
             │             │         │         │
             └─────────────┴─────────┴─────────┘
                           │
                      PUBLIC CONTENT
```

The key principle is:

> **I want the public website to be the presentation layer, while the Control Room becomes the place where I manage the church's digital content.**

That way, when TLGOM is 17, 18, 20 years old and there are hundreds of sermons, thousands of photos, more ministries, more conventions, more anniversaries and more articles, **I shouldn't need to rebuild the website just because the church has grown.**





# TLGOM WEBSITE — CREATIVE DIRECTION

## 1. Creative Vision

The website for **The Life Global Outreach Ministries (TLGOM)** should feel like a living expression of the ministry—not simply a church information website.

The creative direction should communicate:

**Life. Fire. Faith. Freedom. Movement. Legacy. People.**

The experience should feel modern and premium while remaining warm, spiritual, welcoming, and distinctly African.

The website should communicate that TLGOM is:

* A Christ-centered ministry.
* A place of transformation.
* A growing global outreach.
* A community of people.
* A ministry with history and heritage.
* A ministry actively looking toward the future.

The design should avoid the stereotypical appearance of an outdated church website.

Instead, it should feel like a **modern global ministry platform**.

---

# 2. Brand Personality

The visual personality should balance five characteristics:

### Bold

The ministry should have visual confidence.

Large typography, strong photography, intentional color blocks, powerful statements, and confident layouts should communicate conviction.

### Warm

Despite the boldness, the website should feel welcoming.

Visitors should immediately feel:

> "There is a place for me here."

### Spiritual

The website should create a sense of reverence without becoming visually heavy or overly religious in its design language.

Use scripture, imagery, light, atmosphere, and storytelling rather than filling every section with religious symbols.

### Contemporary

The website should feel current and technologically polished.

Avoid:

* dated gradients
* excessive drop shadows
* cluttered layouts
* tiny typography
* excessive borders
* overly decorative church templates
* generic stock photography

### Historic

TLGOM has a story.

The website should preserve and communicate that story through conventions, anniversaries, photographs, sermons, testimonies, and articles.

The site should feel like both:

**a ministry today**

and

**an archive of where the ministry has come from.**

---

# 3. The Central Creative Idea

## "A Living Legacy. A Global Mission."

The website should visually connect three ideas:

```text
             THE PAST
                │
             Legacy
                ↓
             THE NOW
                │
          Transformation
                ↓
            THE FUTURE
                │
         Global Outreach
```

Historical content should not feel buried in an archive.

It should feel like part of the ministry's continuing story.

The gallery, Liberty Convention archive, anniversaries, sermons, testimonies, and articles should collectively demonstrate:

> **God has been faithful, people have been transformed, and the mission continues.**

---

# 4. Visual Direction

The visual language should be:

**Editorial + Cinematic + Contemporary + Spiritual**

Think of the website as a combination of:

* modern ministry website
* premium editorial publication
* documentary archive
* digital community platform

The visual hierarchy should be strong.

Use generous whitespace and large visual moments.

Allow photography to breathe.

Use large headlines rather than filling the screen with paragraphs.

---

# 5. Color Strategy

The existing brand colors should remain the foundation.

### Primary Blue

`#2A2B77`

This is the dominant brand color.

Use it for:

* navigation
* major section backgrounds
* primary buttons
* headings
* overlays
* important UI states

It should communicate:

**trust, authority, depth and stability.**

### Accent Red

`#E7272D`

Use red deliberately.

Red should represent:

**fire, action, passion and urgency.**

Use it for:

* primary CTAs
* highlights
* active states
* important labels
* small visual accents
* selected navigation states

Avoid turning the entire website red.

Red should feel powerful because it is used selectively.

### Dark Purple

`#55374E`

Use as a supporting tone for:

* secondary sections
* cards
* overlays
* quote sections
* visual transitions

### White

`#FFFFFF`

White should provide breathing room.

The website should not feel saturated with brand colors.

Use neutral/light surfaces extensively so that the primary colors retain their visual power.

---

# 6. Typography

Typography should be modern, confident and highly readable.

Use a strong display typeface for major headlines and a highly readable sans-serif for body content.

The hierarchy should resemble:

```text
DISPLAY HEADLINE
Large / Bold / Emotional

Section Heading
Strong / Clear

Body
Comfortable / Readable

Supporting Text
Smaller / Subtle

Metadata
Compact / Quiet
```

Large typography should be used as a visual element.

For example:

> JESUS CHRIST
> THE SAME YESTERDAY,
> TODAY AND FOREVER.

should feel like a statement—not simply another paragraph.

---

# 7. Photography Direction

Photography is one of the most important parts of the website.

Whenever possible, prioritize **real TLGOM photography** over stock imagery.

Photography should capture:

* worship
* preaching
* prayer
* people
* families
* children
* youth
* outreach
* conventions
* celebrations
* testimonies
* community
* leadership
* historical moments

Images should feel candid and authentic.

Avoid overly staged stock photographs of people praying or generic church interiors.

The website should make visitors recognize:

> "These are real people. This is a real ministry."

---

# 8. Hero Direction

The homepage hero should be cinematic.

Use a full-width image slideshow with:

* large imagery
* dark/light overlays where necessary
* strong headline
* short supporting copy
* clear CTA
* slide navigation
* subtle animation

The hero should never feel like a generic rotating banner.

Each slide should tell a story.

Example structure:

```text
[IMAGE]

THE LIFE GLOBAL
OUTREACH MINISTRIES

Leading people to Christ massively,
worldwide, and establishing them
in the Word of God.

[DISCOVER THE MINISTRY]

01  ●  ○  ○
```

The imagery should remain the dominant visual element.

Text should be concise.

---

# 9. Homepage Storytelling

The homepage should feel like a journey.

Do not design it as:

```text
Hero
Card
Card
Card
Card
Card
Footer
```

Instead:

```text
INTRODUCTION
      ↓
IDENTITY
      ↓
WORD
      ↓
MINISTRY
      ↓
PEOPLE
      ↓
STORIES
      ↓
INVITATION
```

Each section should naturally answer the question created by the previous section.

---

# 10. Welcome Section

Immediately after the hero, introduce TLGOM.

Keep it concise.

Use:

* a short statement
* a strong headline
* one supporting paragraph
* one CTA
* an authentic ministry photograph

The section should answer:

> "Who are these people?"

---

# 11. Life & Fire Identity

This should be one of the most visually distinctive sections on the homepage.

Present:

**THE LIFE**

The Word of God.

and

**THE FIRE**

The power of God and deliverance.

The two concepts can be visually represented as two complementary experiences.

For example:

```text
┌──────────────────┐   ┌──────────────────┐
│                  │   │                  │
│    THE LIFE      │ + │    THE FIRE      │
│                  │   │                  │
│  Word of God     │   │ Power of God     │
│                  │   │ Deliverance      │
│                  │   │                  │
└──────────────────┘   └──────────────────┘
```

The section should feel symbolic rather than literal.

---

# 12. Battle Cry

The Battle Cry deserves a powerful visual treatment.

> Jesus Christ the same yesterday, today and forever.

**Hebrews 13:8**

This should not look like ordinary body text.

Treat it as a major statement.

Possible direction:

* full-width deep blue section
* large white typography
* subtle background photography
* restrained red accent
* generous vertical spacing

The goal is to make the scripture memorable.

---

# 13. Foundation Scripture

The Romans 8:1 scripture should have a different visual personality from the Battle Cry.

Where the Battle Cry feels bold and declarative, the Foundation Scripture should feel:

**calm, reassuring and reflective.**

Use:

* light background
* elegant typography
* subtle imagery
* generous whitespace

This creates visual rhythm between sections.

---

# 14. Sermons

The sermon section should feel like a media library.

Cards should emphasize:

* cover image
* sermon title
* speaker
* date
* category
* duration where available

Use a strong play icon treatment.

Example:

```text
┌──────────────────────────┐
│                          │
│        SERMON IMAGE       │
│                          │
│           ▶              │
│                          │
├──────────────────────────┤
│ THE POWER OF FAITH       │
│ Pastor Name              │
│ May 18, 2026             │
└──────────────────────────┘
```

The section should encourage exploration rather than simply showing three random videos.

---

# 15. Events

Events should feel active and current.

Use date-focused cards.

The visitor should immediately understand:

**What?**

**When?**

**Where?**

**Who?**

Use visual urgency for upcoming events.

Past events should have a more archival/editorial appearance.

---

# 16. Ministries

Ministries should feel like communities rather than categories.

Each ministry should have strong photography.

Example:

```text
YOUTH
Growing a generation grounded
in Christ and His Word.

[EXPLORE]
```

Cards should use imagery heavily.

Hover effects can subtly reveal additional information.

---

# 17. Testimonies

Testimonies should feel human.

Do not make them look like generic testimonials from a SaaS website.

Use:

* real names where permission exists
* photographs where appropriate
* short excerpts
* story-focused layouts

The emotional structure should communicate:

```text
BEFORE
  ↓
ENCOUNTER
  ↓
TRANSFORMATION
```

The goal is to show the impact of the ministry.

---

# 18. Prayer Request CTA

The prayer section should be emotionally warm.

It should communicate:

> You don't have to carry this alone.

Use a calm visual treatment rather than aggressive CTA styling.

Primary CTA:

**Submit a Prayer Request**

Secondary messaging can reassure visitors that requests are treated appropriately and privately.

---

# 19. Give Section

Giving should be clear and trustworthy.

Avoid aggressive fundraising language.

The design should communicate:

**partnership + stewardship + mission**

Use a simple layout with clearly separated giving methods.

The Control Room should allow administrators to update all financial information without changing code.

---

# 20. Gallery Direction

The gallery should be one of the most visually impressive parts of the website.

Treat it like a **digital archive**, not a generic photo grid.

Use album covers as entry points.

Example:

```text
THE TLGOM ARCHIVE

[ LIBERTY CONVENTION ]
        2026

[ ANNIVERSARY ]
        2026

[ YOUTH ]
        2026

[ OUTREACH ]
        2026
```

Once inside an album, use a responsive masonry/grid layout.

Images should load progressively.

Opening an image should provide an immersive lightbox experience.

---

# 21. Historical Archive

The Liberty Convention archive should have a distinct editorial feel.

Imagine a timeline:

```text
2012 ─── 2014 ─── 2016 ─── 2018 ───
                         │
                         ↓
                       2026
```

Each year becomes a historical chapter.

The visual language can incorporate:

* large year numbers
* historical photographs
* themes
* scripture
* speakers
* sermon recordings
* articles

This should feel like exploring the history of a movement.

---

# 22. Anniversaries

Anniversaries should celebrate milestones.

Use photography and large numbers.

Example:

```text
16
YEARS

OF GOD'S FAITHFULNESS
```

Individual ministry anniversaries can appear as chapters within the larger celebration.

---

# 23. Articles

The article experience should feel editorial.

Use:

* large cover image
* strong headline
* author
* date
* category
* readable article width
* related sermons
* related articles

Avoid extremely narrow text columns or dense layouts.

Articles should feel comfortable to read on mobile.

---

# 24. About Page

The About page should be story-driven.

Instead of presenting:

```text
Mission
Vision
History
Values
```

as disconnected boxes, create a narrative.

Suggested sequence:

```text
WHO WE ARE
     ↓
OUR STORY
     ↓
THE LIFE & FIRE
     ↓
OUR VISION
     ↓
OUR MISSION
     ↓
BATTLE CRY
     ↓
FOUNDATION SCRIPTURE
     ↓
LEADERSHIP
```

---

# 25. Leadership

Leadership should feel personal and dignified.

Use large portraits.

Each person can have:

* photograph
* name
* position
* short biography
* ministry assignment
* social links where applicable

Avoid overly corporate team layouts.

The photography should feel consistent.

---

# 26. Navigation

The navigation should be simple.

Desktop:

```text
LOGO

Home
About
Ministries
Media
Events
Gallery
Articles
Give

[Prayer Request]
```

On mobile:

```text
LOGO                    ☰
```

The mobile navigation should be easy to operate with one hand.

The Prayer Request action should remain visually prominent.

---

# 27. Page Headers

Interior pages should have consistent page headers.

Example:

```text
MEDIA

Sermons, messages and resources
to strengthen your faith.

Home / Media
```

Use the same component across:

* About
* Ministries
* Sermons
* Events
* Gallery
* Articles
* Contact

This creates visual consistency.

---

# 28. Microinteractions

Animations should be subtle.

Use:

* fade-ins
* gentle slide transitions
* image reveals
* hover movement
* button transitions
* smooth page transitions
* subtle parallax where appropriate

Avoid excessive animation.

The website should feel **alive**, not distracting.

Animation should reinforce storytelling.

---

# 29. Control Room Creative Direction

The Control Room should look completely different from the public website in terms of information density.

The public site is:

**emotional + visual + spacious**

The Control Room is:

**functional + organized + efficient**

Use a clean dashboard structure:

```text
┌───────────────────────────────────────────┐
│ TLGOM CONTROL ROOM                        │
├─────────────┬─────────────────────────────┤
│ Dashboard   │                             │
│ Homepage    │       CONTENT AREA          │
│ Sermons     │                             │
│ Events      │                             │
│ Ministries  │                             │
│ Team        │                             │
│ Gallery     │                             │
│ Articles    │                             │
│ Testimonials│                             │
│ Prayer      │                             │
│ Messages    │                             │
│ Giving      │                             │
│ SEO         │                             │
│ Settings    │                             │
└─────────────┴─────────────────────────────┘
```

Prioritize clarity over decoration.

---

# 30. Control Room Dashboard

The dashboard should immediately communicate the health and activity of the website.

Possible metrics:

```text
SERMONS
128

ARTICLES
42

EVENTS
8

GALLERY PHOTOS
4,892

PENDING TESTIMONIES
7

PRAYER REQUESTS
24

CONTACT MESSAGES
12
```

Also show:

* recent submissions
* recent sermons
* upcoming events
* recent gallery uploads
* quick actions

---

# 31. Content Management Philosophy

The Control Room should make content management feel simple.

For example, creating a sermon should feel like:

```text
+ NEW SERMON

Title
Speaker
Date
Scripture
Category
Tags
Description
YouTube URL
Cover Image

[Save Draft] [Publish]
```

Not like editing a database.

The administrator should think in terms of:

**content**

rather than:

**technical records.**

---

# 32. Empty States

Empty states should be designed intentionally.

Instead of:

> No data found.

Use helpful messaging.

Example:

> No sermons have been added yet.

> Start building the sermon archive by adding your first message.

[Add Sermon]

The same philosophy should apply throughout the Control Room.

---

# 33. Mobile Experience

Mobile is not a secondary version of the website.

It is a primary experience.

Design mobile-first.

Prioritize:

* large tap targets
* readable typography
* fast image loading
* simple navigation
* minimal form friction
* sticky CTA where appropriate
* responsive galleries
* easy YouTube playback
* accessible forms

A visitor should be able to:

**find a sermon, submit a prayer request, view an event, give, or contact the church**

comfortably from a phone.

---

# 34. Accessibility

Accessibility should be built into the design.

Use:

* sufficient color contrast
* keyboard navigation
* semantic HTML
* visible focus states
* descriptive alt text
* accessible forms
* appropriate heading hierarchy
* reduced-motion support
* accessible buttons and controls

The website should be welcoming to everyone.

---

# 35. Overall Visual Rhythm

The website should alternate between different visual weights.

For example:

```text
CINEMATIC
Hero

↓
LIGHT
Welcome

↓
BOLD
Life & Fire

↓
DARK
Battle Cry

↓
LIGHT
Foundation Scripture

↓
MEDIA
Sermons

↓
EVENT
Upcoming Events

↓
PHOTOGRAPHIC
Ministries

↓
EDITORIAL
Gallery

↓
HUMAN
Testimonies

↓
CALM
Prayer

↓
BOLD
Give

↓
WARM
Visit / Contact
```

This prevents the page from becoming visually monotonous.

---

# 36. The Emotional Journey

A visitor should ideally experience the homepage in this order:

### 1. Attraction

**"This looks different."**

The hero captures attention.

### 2. Understanding

**"I understand who this ministry is."**

The introduction and Life & Fire identity explain the ministry.

### 3. Belief

**"I understand what they stand for."**

Scripture, mission and Battle Cry establish identity.

### 4. Discovery

**"There is something here for me."**

Sermons, ministries and events invite exploration.

### 5. Connection

**"These are real people and real stories."**

Gallery and testimonies create emotional connection.

### 6. Participation

**"I can take a step."**

Prayer, Give and Contact provide clear next actions.

---

# 37. Design Principle

The most important design principle is:

> **Don't design a website that tells people everything about TLGOM. Design a website that makes people want to discover TLGOM.**

Information should be available, but it should be presented through storytelling, visual hierarchy and progressive discovery.

---

# 38. Final Creative Statement

The final website should feel like:

**The word for the world**

It should carry the weight of TLGOM's history while looking confidently toward its future.

It should preserve photographs, sermons, conventions, anniversaries and testimonies as part of a growing digital heritage.

It should communicate the **Life** through the Word.

It should communicate the **Fire** through power, transformation and deliverance.

And above all, every page should ultimately point visitors toward:

**Jesus Christ.**

### Creative keywords

**Bold.**

**Warm.**

**Spirit-filled.**

**Modern.**

**Cinematic.**

**Authentic.**

**Editorial.**

**Human.**

**Global.**

**Legacy-driven.**

**Christ-centered.**
