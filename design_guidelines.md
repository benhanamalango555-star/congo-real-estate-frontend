# Design Guidelines: RDC Maison Appart Rapide Rapide

## Design Approach

**Selected Approach**: Reference-Based Design inspired by modern real estate platforms (Airbnb, Zillow, Realtor.com)

**Rationale**: Real estate platforms succeed through strong visual hierarchy, prominent property imagery, and intuitive browsing experiences. This platform requires clear categorization, easy property discovery, and trust-building through professional presentation.

**Core Principles**:
- Photo-first presentation showcasing properties prominently
- Clean, scannable listing cards with essential information hierarchy
- Clear call-to-action patterns for publishing and browsing
- Mobile-optimized for Congo's mobile-first internet usage
- Trustworthy, professional aesthetic to build confidence in transactions

---

## Typography System

**Font Families** (Google Fonts):
- **Primary**: Inter (400, 500, 600, 700) - UI elements, body text, forms
- **Accent**: Poppins (600, 700) - headings, hero text, emphasis

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl font-bold (Poppins)
- Page Titles: text-3xl md:text-4xl font-bold (Poppins)
- Section Headers: text-2xl font-semibold (Poppins)
- Card Titles: text-xl font-semibold (Inter)
- Body Text: text-base font-normal (Inter)
- Metadata/Labels: text-sm font-medium (Inter)
- Small Print: text-xs (Inter)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Tight spacing: p-2, gap-2
- Standard spacing: p-4, gap-4, m-6
- Section padding: py-12 md:py-16 lg:py-20
- Container gaps: gap-8, gap-12
- Hero sections: py-16 md:py-24

**Grid System**:
- Listings Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Featured Properties: grid-cols-1 lg:grid-cols-2
- Form Layouts: grid-cols-1 md:grid-cols-2 gap-6
- Admin Dashboard: grid-cols-1 lg:grid-cols-3 for stats, grid for listings table

**Container Widths**:
- max-w-7xl for main content areas
- max-w-4xl for forms and focused content
- Full-width for hero and image sections

---

## Component Library

### Navigation
- Sticky header with max-w-7xl container
- Logo left, navigation center/right
- Primary CTA: "Publier une Annonce" (prominent button)
- Browse link, Admin access (subtle)
- Mobile: Hamburger menu with slide-out drawer
- Height: h-20, shadow on scroll

### Hero Section
- **Large Hero Image**: Full-width background image of Kinshasa/Congo cityscape or modern apartment building
- Height: min-h-[500px] md:min-h-[600px]
- Centered content overlay with semi-transparent backdrop
- Hero headline: "Trouvez Votre Maison Rapide Rapide"
- Subheadline emphasizing ease and speed
- Two primary CTAs: "Publier" and "Parcourir" with blurred backgrounds (backdrop-blur-sm)
- Quick search bar below CTAs (optional city/neighborhood input)

### Property Listing Cards
- Aspect ratio 4:3 image container with rounded-xl corners
- Image carousel dots for multiple photos
- Overlay badges: "À Vendre" / "À Louer", "Vedette" for featured
- Card content padding: p-4
- Property type icon + text (text-sm)
- Price: Large, bold (text-2xl font-bold)
- Location hierarchy: Commune, Quartier (text-sm with icons)
- Room count with icon: "3 Chambres"
- CTA button: "Voir Détails" (full-width or prominent)
- Hover: subtle lift (transform scale-105 on desktop)

### Forms (Publishing)
- Clean, stepped form or single-page with clear sections
- Input fields: h-12, rounded-lg, border with focus states
- Label above input: text-sm font-medium mb-2
- Required field indicators: asterisk in accent treatment
- Photo upload: Drag-and-drop zone with preview thumbnails in grid
- Dropzone: min-h-[200px], dashed border, upload icon
- Progress indicator if multi-step
- Bottom sticky bar with "Publier" button showing payment requirement

### Payment Modal/Section
- Centered modal or dedicated page section
- Clear payment amount display (large, bold)
- Mobile money number: +243831140205 (copyable, prominent)
- Step-by-step instructions
- Confirmation message field or upload receipt option
- "J'ai Payé" button to submit for admin validation
- Pending state indicator

### Property Detail Page
- Full-width image gallery (carousel or grid)
- Two-column layout: Details left, contact/action right
- Property specs in icon + text grid (2 columns on mobile, 3-4 on desktop)
- Description: max-w-3xl, generous line-height
- Phone number section: Initially shows "Débloquer le Numéro" button with 2500 CFA indicator
- After payment: Display number large, copyable, with WhatsApp/call links

### Browse/Search Section
- Search bar: Large, prominent (h-14), with search icon
- Manual text inputs for Ville, Commune, Quartier (no dropdowns)
- Filter chips: Type de Propriété, Prix range (collapsible on mobile)
- Results count display
- Sort options: "Plus Récent", "Prix Croissant/Décroissant"
- Grid of listing cards (responsive as above)

### Admin Dashboard
- Access modal: Single centered input for secret code with "Accéder" button
- Dashboard layout: 
  - Top stats bar: Total Listings, Pending, Revenue (grid-cols-3)
  - "Approuver Tout" button: Large, prominent, positioned top-right
  - Tabs: "Annonces en Attente", "Paiements à Valider", "Toutes les Annonces"
  - Table/card view of listings with thumbnail, key details, status badges
  - Action buttons per listing: "Approuver", "Rejeter" (icon buttons or text)
  - Bulk selection checkboxes for multi-approve
  - Real-time updates: Toast notifications on approval

### Footer
- Three-column layout (single column mobile)
- Column 1: About platform, mission
- Column 2: Quick links (Publier, Parcourir, Contact)
- Column 3: Contact info, social media
- Bottom bar: Copyright, simple links
- Padding: py-12

---

## Images

**Hero Section**: 
- Large hero background image showing vibrant Congolese cityscape (Kinshasa skyline or modern residential area)
- Image treatment: Subtle overlay to ensure text readability
- Position: center center, cover

**Property Listings**:
- Each listing requires 3-8 property photos
- Photos show: exterior, interior rooms, kitchen, bathroom, outdoor space
- Placeholder images during development: Modern apartments and houses

**Featured Section**:
- 2-4 featured properties with larger image treatment
- Prominent placement on homepage below hero

**No Background Patterns**: Keep backgrounds clean to let property photos stand out

---

## Interactions & States

**Minimal Animations**:
- Card hover: slight scale and shadow increase (duration-200)
- Button hover: subtle brightness adjustment
- Modal entry: fade + scale from 95% to 100%
- Page transitions: Simple fade
- Image loading: Blur-up effect
- NO scroll animations or parallax

**Loading States**:
- Skeleton screens for listing cards
- Spinner for form submissions
- Optimistic UI for admin approvals (instant visual feedback)

**Success States**:
- Toast notifications: slide in from top-right
- Success checkmarks for completed actions
- Green highlight for approved listings

---

## Accessibility & Responsiveness

- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- ARIA labels for icon-only buttons
- Semantic HTML structure (header, main, footer, section, article)
- Form labels properly associated with inputs
- Alt text for all property images
- Mobile breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px
- Touch targets minimum 44x44px on mobile
- Readable contrast ratios throughout