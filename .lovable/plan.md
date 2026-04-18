
## Sahil Gupta — Portfolio Website

A premium, soft-dark portfolio with claymorphic 3D shapes, glassmorphic cards, and refined micro-interactions throughout.

### Design system
- **Palette:** deep navy base (`#0B1020`-ish), slightly lighter elevated surfaces, soft indigo + teal glow accents, off-white text with muted secondary text.
- **Claymorphism:** rounded soft shapes with dual-direction shadows (light highlight + dark depression) for a tactile 3D feel — used on stat tiles, skill chips, project cards, icon badges.
- **Glassmorphism:** frosted translucent cards with backdrop blur, thin gradient borders, subtle inner highlight — used for hero card, navbar, project overlays, contact card.
- **Typography:** modern sans (Inter/Space Grotesk) with tight headings and relaxed body.
- **Motion language:** gentle easing, 200–600ms, never bouncy or aggressive.

### Sections (single page, smooth-scroll nav)
1. **Sticky glass navbar** — logo mark "SG", anchor links (About, Skills, Projects, Achievements, Education, Contact), active-section highlight, blur intensifies on scroll.
2. **Hero — Interactive 3D scene** (React Three Fiber)
   - Floating claymorphic geometry (soft icosahedron / torus cluster) that gently rotates and tilts toward the cursor.
   - Glass card overlay with name "Sahil Gupta", role "Software Engineer · AI/ML Builder", typed tagline, location chip, and CTAs (View Projects, Download Resume, GitHub, LinkedIn).
   - Ambient floating particles + soft glow.
3. **About** — short intro paragraph + claymorphic stat tiles (Hackathons Won, Projects Shipped, Tech Stack count, Year of Study).
4. **Skills** — categorized glass panels (Languages, AI/ML, Frontend, Backend, DevOps & Tools, Data) with claymorphic chips that lift and glow on hover.
5. **Projects** — 3 detailed glass cards (Vegha, CivicConnect, Deepfake Detection) with tech badges, role, impact bullets, and hover tilt + reveal of action buttons.
6. **Achievements** — timeline-style claymorphic medals (Innovik 5.0 Winner, MUJ HackX 3.0 Runner-Up, CodeSlayer 2k25 2nd Runner-Up) with rank, event, scale.
7. **Education** — SPIT card with course, duration, coursework chips.
8. **Leadership & Extra-curriculars** — compact glass cards (Sports Committee Core Member, E-Cell Acquisition Arena).
9. **Contact** — large glass card with email, phone, LinkedIn, GitHub as clickable claymorphic icon buttons + "Download Resume" CTA.
10. **Footer** — minimal, with copyright and back-to-top.

### Scroll animations
- Section headers fade + slide up on enter (IntersectionObserver).
- Project/skill cards stagger-fade as they enter the viewport.
- Subtle parallax on hero 3D scene and decorative background blobs.
- Scroll progress bar at top of page.

### Micro-interactions
- Custom cursor glow (desktop only) that softens over interactive elements.
- Magnetic hover on primary CTAs.
- Tilt-on-hover for project cards (mouse-position based).
- Skill chips: lift, glow, and gentle scale on hover.
- Nav links: animated underline + active dot indicator.
- Smooth anchor scroll with offset for sticky nav.
- Resume download button with click ripple.

### Tech & assets
- React Three Fiber (`@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three@>=0.133`) for the hero scene.
- Tailwind extensions for clay shadows, glass utilities, and new keyframes (fade-in, slide-up, float, glow-pulse, shimmer).
- Resume PDF copied into `public/` so the Download Resume button serves the actual file.
- Fully responsive (mobile gets simplified 3D / static fallback, hamburger menu, single-column layout).
- All contact links open correctly (mailto, tel, external in new tab).
