// ─── Dev Project Types ────────────────────────────────────────────────────────
export interface ProjectDetails {
  overview: string;
  motivation: string;
  problem: string;
  solution: string;
  architecture: string;
  results: string;
  challenges: string;
  futureScope: string;
  images: string[];
  github: string;
  demo: string;
}

// ─── Design / UI-UX Project Types ────────────────────────────────────────────
export interface DesignScreen {
  src: string;
  before?: string;
  label: string;
  description: string;
  improved: string[];
}

export interface DesignProjectDetails {
  overview: string;
  problem: string[];
  designProcess: { label: string; description: string }[];
  solution: string[];
  designHighlights: string[];
  screens: DesignScreen[];
  beforeAfter?: { before: string; after: string; label: string }[];
  prototype: string;
  figma: string;
  github: string;
}

// ─── Unified Project ──────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  techStack: string[];
  thumbnail: string;
  featured: boolean;
  visible: boolean;
  type?: "dev" | "design";
  details: ProjectDetails | DesignProjectDetails;
}

export const projectsData: Project[] = [
  {
    id: "ai-diy-evaluator",
    title: "AI DIY Project Generator & Evaluator – Intelligent Recruitment Platform",
    shortDescription: "NLP-powered recruitment platform that matches resumes to job descriptions using BERT embeddings and semantic similarity scoring.",
    techStack: ["Python", "Flask", "FastAPI", "React", "BERT", "spaCy", "OpenRouter", "Gemini", "Whisper", "ScrapingDog"],
    thumbnail: "/images/ai-diy/thumbnail.png",
    featured: true,
    visible: true,
    type: "dev",
    details: {
      overview: "An intelligent recruitment platform that matches resumes to job descriptions using NLP, semantic similarity scoring, and BERT-based contextual embeddings. It enables multi-resume uploads, job role classification, and match score generation through a scalable FastAPI backend and responsive React frontend.",
      motivation: "Recruitment is often a manual, time-consuming process prone to bias and inefficiency. I wanted to build a system that could intelligently and objectively match candidates to roles using modern NLP techniques, reducing the burden on hiring teams.",
      problem: "Manually screening resumes against job descriptions is slow and inconsistent. Traditional keyword-matching approaches miss semantic relevance, leading to poor candidate-role alignment and high rejection of qualified applicants.",
      solution: "I designed an NLP pipeline using BERT-based contextual embeddings with spaCy preprocessing and cosine similarity for ranking. The system supports multi-resume uploads, classifies job roles, and generates match scores — all exposed through a fast FastAPI backend and a clean React frontend.",
      architecture: "Resumes and job descriptions are preprocessed using spaCy, then encoded into contextual embeddings via a BERT model. Cosine similarity is computed between resume and job description vectors to produce ranked match scores. The backend is built on FastAPI for async performance, with a React frontend for file uploads and result display. LLMs (OpenRouter, Gemini) are used for generative evaluation and feedback.",
      results: "The platform successfully ranked resumes by relevance with high semantic accuracy. Multi-resume batch processing and role classification worked reliably, significantly reducing manual screening effort.",
      challenges: "Ensuring BERT embeddings captured domain-specific nuances across varied job roles was challenging. Balancing inference speed with model accuracy, and building a responsive UI that handled async batch uploads gracefully, required careful engineering.",
      futureScope: "Future improvements include fine-tuning the embedding model on recruitment-specific data, integrating voice-based resume parsing via Whisper, and adding explainability features to justify match scores.",
      images: [
        "/images/ai-diy/pipeline.png",
        "/images/ai-diy/match-results.png",
        "/images/ai-diy/frontend.png"
      ],
      github: "#",
      demo: ""
    } as ProjectDetails
  },
  {
    id: "emergency-call-prediction",
    title: "911 Emergency Call Prediction – Geospatial ML System",
    shortDescription: "ML system analysing 5 years of 911 call data to predict future emergency hotspots with interactive geospatial visualisation.",
    techStack: ["Python", "Pandas", "scikit-learn", "Folium", "Power BI", "Streamlit"],
    thumbnail: "/images/emergency/thumbnail.png",
    featured: true,
    visible: true,
    type: "dev",
    details: {
      overview: "A geospatial machine learning system that cleans, analyses, and models 5 years of 911 call data (2015–2020) to identify emergency patterns and predict future hotspots. A Streamlit app allows users to input past data and receive a generated PDF report with an interactive map of predicted future emergencies.",
      motivation: "Emergency response systems rely heavily on reactive dispatching. I wanted to explore whether historical call data could be used to proactively predict where future emergencies are likely to occur, enabling smarter resource allocation.",
      problem: "Emergency services lack data-driven tools to anticipate demand spatially and temporally. Without predictive models, dispatching remains reactive, leading to delayed responses in high-frequency zones.",
      solution: "I cleaned and performed EDA on 5 years of 911 call data using Power BI to identify patterns in emergency types and locations. I then applied clustering with KL Divergence analysis and Folium-based geospatial modelling to predict future hotspots, wrapping everything in a Streamlit app that generates PDF reports and interactive maps.",
      architecture: "Data cleaning and feature engineering were done using Pandas. EDA and trend analysis were visualised in Power BI. Clustering was applied to segment call hotspots, with KL Divergence (call_type: 0.0001) used to validate distribution similarity. Folium handled geospatial rendering. The Streamlit frontend accepts past data, runs predictions, and outputs a downloadable PDF report with an embedded interactive map.",
      results: "The model successfully identified recurring emergency hotspots and predicted future high-risk zones with strong spatial accuracy. The Streamlit app made the system accessible to non-technical stakeholders.",
      challenges: "Handling 5 years of noisy, inconsistently formatted emergency call records required extensive cleaning. Selecting meaningful clustering parameters and validating geospatial predictions without ground truth future data was a key challenge.",
      futureScope: "Future scope includes integrating real-time 911 feed data, adding time-series forecasting for demand prediction by hour and day, and deploying the app as a public-facing dashboard for city planners.",
      images: [
        "/images/emergency/eda-dashboard.png",
        "/images/emergency/hotspot-map.png",
        "/images/emergency/streamlit-app.png"
      ],
      github: "#",
      demo: ""
    } as ProjectDetails
  },
  {
    id: "stock-sentiment-analysis",
    title: "Stock Market Sentiment Analysis – Real-Time Tweet Analytics",
    shortDescription: "Real-time sentiment tracking system scraping live tweets on 10+ stock tickers and visualising trends via Power BI dashboards.",
    techStack: ["Python", "Selenium", "VADER", "Power BI"],
    thumbnail: "/images/stock-sentiment/thumbnail.png",
    featured: true,
    visible: true,
    type: "dev",
    details: {
      overview: "A real-time market sentiment tracking system that automates tweet scraping for 10+ stock tickers, applies VADER sentiment analysis to classify tweets, and visualises sentiment trends, keyword distributions, and market signals through interactive Power BI dashboards.",
      motivation: "Stock markets are heavily influenced by public sentiment and news cycles. I wanted to build a system that could automatically track how the crowd feels about specific tickers in real time and surface those signals visually for investment research.",
      problem: "Manually monitoring social sentiment for multiple stocks is impractical at scale. Existing tools are expensive or lack granularity at the individual ticker level. There is a gap for a lightweight, automated sentiment pipeline accessible to independent analysts.",
      solution: "I automated Selenium-based web scraping to collect live tweets across 10+ stock tickers, enabling continuous real-time data collection. VADER sentiment analysis was applied to classify each tweet as positive, negative, or neutral. Results were piped into Power BI dashboards showing sentiment trends, distribution breakdowns, and keyword clouds per ticker.",
      architecture: "Selenium drives automated browser-based tweet scraping for specified stock ticker keywords. Scraped text is processed through the VADER sentiment analyser to generate polarity scores and classifications. Structured output is loaded into Power BI where pre-built dashboards visualise trends over time, sentiment distribution, and keyword frequency.",
      results: "The system successfully classified 320+ tweets with a distribution of 51.56% positive, 36.25% neutral, and 12.19% negative. Power BI dashboards provided clear, actionable visual insights into real-time market sentiment per ticker.",
      challenges: "Rate limiting and anti-scraping mechanisms on Twitter required robust retry logic and session management in Selenium. Ensuring VADER performed accurately on informal, abbreviated financial tweet language required preprocessing and tuning.",
      futureScope: "Future improvements include integrating news article scraping alongside tweets, adding time-series sentiment trend forecasting, and building alerting logic to notify on sharp sentiment shifts for monitored tickers.",
      images: [
        "/images/stock-sentiment/scraper-flow.png",
        "/images/stock-sentiment/sentiment-distribution.png",
        "/images/stock-sentiment/powerbi-dashboard.png"
      ],
      github: "#",
      demo: ""
    } as ProjectDetails
  },
  {
    id: "digilocker-redesign",
    title: "DigiLocker App Redesign – UI/UX Case Study",
    shortDescription: "A comprehensive redesign of the DigiLocker mobile app focusing on improved usability, modern design, and enhanced document management experience.",
    techStack: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Design Systems"],
    thumbnail: "/images/digilocker/home.png",
    featured: false,
    visible: true,
    type: "design",
    details: {
      overview: "This project is a UI/UX redesign of the DigiLocker mobile application, India's official digital document locker service. The redesign aims to modernize the interface, improve navigation, and make document access more intuitive and user-friendly.",

      problem: [
        "Outdated interface with poor visual hierarchy and cluttered layouts",
        "Confusing navigation structure making it hard to find documents quickly",
        "Lack of modern touch interactions and accessibility features",
        "Inefficient search functionality for large document collections",
        "Settings buried deep in menus with poor discoverability"
      ],

      designProcess: [
        { label: "User Research", description: "Conducted surveys and usability testing with DigiLocker users to identify pain points and user needs." },
        { label: "Wireframing", description: "Created low-fidelity wireframes to reorganize information architecture and simplify core workflows." },
        { label: "Visual Design", description: "Designed high-fidelity screens with a clean, modern aesthetic inspired by Material Design principles." },
        { label: "Prototyping", description: "Built interactive prototypes to test user flows and gather feedback on the redesigned experience." },
        { label: "Testing", description: "Iterated on designs based on user feedback, focusing on accessibility and performance improvements." }
      ],

      solution: [
        "Implemented a clean, card-based layout for better document organization",
        "Streamlined navigation with bottom tabs and clear categorization",
        "Enhanced search with filters and predictive suggestions",
        "Modernized settings with quick-access toggles and organized sections",
        "Improved accessibility with proper contrast ratios and larger touch targets"
      ],

      designHighlights: [
        "Modern minimalist design with India's tricolor-inspired color scheme",
        "Improved accessibility with WCAG 2.1 AA compliance",
        "Reduced navigation steps by 40% for common tasks",
        "Enhanced document preview and sharing capabilities",
        "Mobile-first responsive design for all screen sizes"
      ],

      screens: [
        {
          src: "/images/digilocker/home.png",
          before: "/images/digilocker/before/home.jpeg",
          label: "Home Screen",
          description: "Redesigned home screen with quick access to recent documents, issued certificates, and important notifications in a clean, organized layout.",
          improved: [
            "Organized documents into categorized cards for better scannability",
            "Added quick action buttons for common tasks like issuing new documents",
            "Integrated notifications panel to surface important updates",
            "Improved visual hierarchy with larger headings and better spacing",
            "Added search bar prominently at the top for instant access"
          ]
        },
        {
          src: "/images/digilocker/search.png",
          before: "/images/digilocker/before/search.jpeg",
          label: "Search & Filter",
          description: "Enhanced search interface with advanced filters, recent searches, and intelligent suggestions to help users find documents quickly and efficiently.",
          improved: [
            "Implemented advanced filtering options by document type and issuer",
            "Added recent searches and popular queries for quick access",
            "Introduced smart suggestions based on user behavior",
            "Improved search results layout with thumbnails and metadata",
            "Added voice search capability for hands-free operation"
          ]
        },
        {
          src: "/images/digilocker/documents.png",
          before: "/images/digilocker/before/document.jpeg",
          label: "Documents View",
          description: "Restructured documents screen with grid view, sorting options, and batch operations for better document management and organization.",
          improved: [
            "Switched to grid layout for better document visualization",
            "Added sorting and filtering options for document management",
            "Implemented batch selection for multiple document operations",
            "Enhanced document preview with zoom and share options",
            "Added document expiry notifications and renewal reminders"
          ]
        },
        {
          src: "/images/digilocker/settings.png",
          before: "/images/digilocker/before/settings.jpeg",
          label: "Settings & Profile",
          description: "Streamlined settings page with organized sections, quick toggles, and easy access to account management features.",
          improved: [
            "Grouped settings into logical categories with clear headings",
            "Added quick toggle switches for common preferences",
            "Improved account management with profile picture and verification status",
            "Enhanced security settings with biometric options",
            "Added help and support section with FAQs and contact options"
          ]
        }
      ],

      prototype: "",
      figma: "",
      github: ""
    } as DesignProjectDetails
  },
  {
    id: "burger-king-redesign",
    title: "Burger King App Redesign – UI/UX Case Study",
    shortDescription: "End-to-end mobile app redesign for Burger King, targeting clearer navigation, stronger visual hierarchy, and a friction-free ordering flow.",
    techStack: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Design Systems"],
    thumbnail: "/images/bk/thumbnail.png",
    featured: true,
    visible: false,
    type: "design",
    details: {
      overview: "A ground-up UI/UX overhaul of the Burger King mobile app, centered on cutting friction from the ordering journey. The work addressed structural navigation issues, inconsistent visual language, and weak information hierarchy — replacing them with a focused, modern experience built around clear user intent.",

      problem: [
        "Overwhelming screen layouts with no clear focal point, making item discovery frustrating",
        "Multi-step ordering process with redundant screens that caused drop-offs mid-flow",
        "Weak or missing CTAs leaving users unsure of the next action at every stage",
        "Fragmented visual language — mismatched type scales, spacing, and color usage",
        "Touch targets too small for comfortable single-hand operation on mobile"
      ],

      designProcess: [
        { label: "Discovery", description: "Ran a heuristic audit of the live app and mapped competitor approaches to surface structural gaps and missed UX conventions." },
        { label: "Wireframing", description: "Sketched low-fidelity layouts to rethink the information architecture and cut down the ordering flow to its essentials." },
        { label: "Visual Design", description: "Built high-fidelity screens applying a unified component system with deliberate spacing, contrast, and type hierarchy." },
        { label: "Prototype", description: "Assembled a clickable Figma prototype covering the full purchase journey to verify flow logic before finalising visuals." },
        { label: "Refinement", description: "Iterated on feedback by fine-tuning transitions, handling edge states, and pressure-testing the checkout path." }
      ],

      solution: [
        "Simplified, image-led interface that lets the food speak rather than compete with UI clutter",
        "Persistent bottom navigation with clearly labelled sections for zero-confusion wayfinding",
        "High-contrast, prominently placed action buttons that guide users at every decision point",
        "Unified token-based design system covering color, spacing, and typography across all screens",
        "Generous touch targets and thumb-friendly layout tuned for real-world one-handed use"
      ],

      designHighlights: [
        "Bold visual style anchored by full-bleed food photography",
        "Accessible color and contrast meeting WCAG AA requirements throughout",
        "Checkout path shortened from 6 screens to 3",
        "Shared component library enabling consistent scale across future screens",
        "Designed mobile-first with layout decisions grounded in device ergonomics"
      ],

      screens: [
        {
          src: "/images/bk/screen_home.png",
          before: "/images/bk/before/screen_home.png",
          label: "Home Screen",
          description: "Reworked landing screen leading with a strong hero moment, surfacing top categories immediately below, and cutting everything that competed for attention.",
          improved: [
            "Swapped a busy promotional grid for a focused hero banner paired with a tight category row",
            "Pinned search bar at the top so users can jump straight to what they want",
            "Stripped unnecessary elements — visual noise down roughly 60%, breathing room up",
            "Primary order CTA placed above the fold and always in view"
          ]
        },
        {
          src: "/images/bk/screen_menu.png",
          before: "/images/bk/before/screen_menu.png",
          label: "Menu & Browse",
          description: "Restructured the menu around sticky category tabs and visually richer item cards that surface the details users actually need before tapping.",
          improved: [
            "Category tabs stay fixed at the top so users never lose their place while browsing",
            "Image-forward card grid replaced a cramped, text-heavy list format",
            "Calorie count and price shown on the card itself — no drill-down required",
            "Direct add-to-cart action on the card eliminates an extra screen visit"
          ]
        },
        {
          src: "/images/bk/screen_rewards.png",
          before: "/images/bk/before/screen_rewards.png",
          label: "Crown Rewards",
          description: "Rebuilt the loyalty screen to make the user's points balance immediately visible and the path from points to redemption obvious and motivating.",
          improved: [
            "Crown points balance surfaced at the very top — no hunting required",
            "Available and locked rewards visually separated to avoid confusion",
            "Card-based layout makes reward options scannable at a glance",
            "Progress bars give users a clear sense of how close they are to the next reward",
            "Fewer taps to redeem — the flow was compressed and clarified",
            "Consistent spacing and type hierarchy across every rewards state"
          ]
        },
        {
          src: "/images/bk/screen_cart.png",
          before: "/images/bk/before/screen_cart.png",
          label: "Cart & Checkout",
          description: "Condensed the checkout into a transparent, confidence-building flow that takes users from a full cart to a placed order in just three interactions.",
          improved: [
            "Six-step checkout collapsed to three with remembered delivery address",
            "Promo codes and loyalty point redemption surfaced directly on the cart view",
            "Itemised price breakdown shown clearly so there are no surprises at payment",
            "Previously saved payment methods available with a single tap"
          ]
        },
        {
          src: "/images/bk/screen_nearby.png",
          before: "/images/bk/before/screen_nearby.png",
          label: "Nearby Stores",
          description: "Flipped the store-finder from a plain list to a map-led experience, letting users orient themselves spatially and pick a location with far less effort.",
          improved: [
            "Map view as the default entry point — spatial context beats a scrollable list",
            "Pin clustering gives an instant read of store density around the user",
            "Active store selection highlighted on the map, not just in a sidebar",
            "Slide-up detail sheet shows hours, distance, and ordering options without leaving the map",
            "Tapping a pin flows directly into the ordering session for that location",
            "Removed the cognitive overhead of cross-referencing a list against a mental map"
          ]
        }
      ],

      prototype: "",
      figma: "",
      github: ""
    } as DesignProjectDetails
  }
];