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
    id: "burger-king-redesign",
    title: "Burger King App Redesign – UI/UX Case Study",
    shortDescription: "A complete redesign of the Burger King mobile app focusing on usability, visual hierarchy, and a smoother ordering experience.",
    techStack: ["Figma", "UI/UX Design", "User Research", "Prototyping", "Design Systems"],
    thumbnail: "/images/bk/thumbnail.png",
    featured: true,
    visible: true,
    type: "design",
    details: {
      overview: "This project is a UI/UX redesign of the Burger King mobile application aimed at improving usability, simplifying navigation, and enhancing the overall ordering experience. The redesign focuses on modern design principles, better visual hierarchy, and a smoother user journey.",

      problem: [
        "Cluttered interface with poor visual hierarchy making it hard to find items",
        "Confusing navigation flow with too many steps to complete an order",
        "Lack of clear call-to-action buttons leading to abandoned carts",
        "Inconsistent design language and typography across screens",
        "Poor mobile usability and limited accessibility support"
      ],

      designProcess: [
        { label: "Research", description: "Conducted heuristic analysis of the existing app and identified key user pain points through competitive benchmarking." },
        { label: "Wireframes", description: "Created low-fidelity wireframes to restructure the layout and simplify the core ordering flow." },
        { label: "UI Design", description: "Designed high-fidelity screens with improved visual hierarchy, spacing, and a consistent design system." },
        { label: "Prototyping", description: "Built an interactive prototype in Figma to validate the new user flow end-to-end." },
        { label: "Iteration", description: "Refined designs based on feedback, focusing on micro-interactions and edge cases in the ordering flow." }
      ],

      solution: [
        "Introduced a clean and minimal interface that highlights food imagery",
        "Streamlined navigation with clear sections and persistent bottom tab bar",
        "Enhanced call-to-action visibility with high-contrast primary buttons",
        "Standardized design system — spacing, typography, and color tokens",
        "Optimized touch targets and layout for one-handed mobile use"
      ],

      designHighlights: [
        "Modern minimal visual design with bold food photography",
        "Improved accessibility with WCAG-compliant contrast ratios",
        "Reduced steps to checkout from 6 to 3",
        "Consistent component library for scalability",
        "Mobile-first with responsive layout considerations"
      ],

      screens: [
        {
          src: "/images/bk/screen_home.png",
          before: "/images/bk/before/screen_home.png",
          label: "Home Screen",
          description: "Redesigned home screen with featured items, quick access categories, and a cleaner hero banner that puts food front and center.",
          improved: [
            "Replaced cluttered promo grid with a focused hero + category strip",
            "Added a persistent search bar for faster item discovery",
            "Reduced visual noise by 60% — clearer white space and hierarchy",
            "Prominent 'Order Now' CTA above the fold"
          ]
        },
        {
          src: "/images/bk/screen_menu.png",
          before: "/images/bk/before/screen_menu.png",
          label: "Menu & Browse",
          description: "Restructured menu layout with sticky category tabs and better item cards that surface nutritional info and customisation options.",
          improved: [
            "Sticky category tabs eliminate need to scroll back to top",
            "Card layout replaced dense list view with visual-first design",
            "Calories and price displayed prominently on each card",
            "One-tap add-to-cart without opening item detail"
          ]
        },
        {
          src: "/images/bk/screen_rewards.png",
          before: "/images/bk/before/screen_rewards.png",
          label: "Crown Rewards",
          description:
            "A redesigned rewards dashboard that clearly showcases user points, available rewards, and redemption options in a visually engaging and easy-to-navigate layout.",
          improved: [
            "Prominent display of Crown points balance at the top for instant visibility",
            "Clear separation between available rewards and locked rewards",
            "Card-based reward layout improves scannability and selection",
            "Progress indicators show how close users are to unlocking rewards",
            "Simplified redemption flow with fewer steps and clearer CTA",
            "Consistent visual hierarchy improves readability and engagement"
          ]
        },
        {
          src: "/images/bk/screen_cart.png",
          before: "/images/bk/before/screen_cart.png",
          label: "Cart & Checkout",
          description: "Simplified cart with order summary, applied offers, and a streamlined single-step checkout flow — from cart to confirmed in 3 taps.",
          improved: [
            "Checkout reduced from 6 steps to 3 with smart address memory",
            "Promo code and loyalty points visible inline on cart screen",
            "Order total breakdown made transparent and scannable",
            "Saved payment methods surfaced for one-tap payment"
          ]
        },
        {
          src: "/images/bk/screen_nearby.png",
          before: "/images/bk/before/screen_nearby.png",
          label: "Nearby Stores",
          description:
            "A map-first store discovery experience where users can visually explore nearby outlets, making location selection faster and more intuitive compared to a traditional list-based layout.",
          improved: [
            "Map-first interface replaces static list view for intuitive location discovery",
            "Store pins provide instant visual context of proximity and distribution",
            "Selected store highlighted directly on map for better focus",
            "Bottom sheet preview shows key store details without leaving the map",
            "Seamless transition from map selection to ordering flow",
            "Reduced cognitive load by prioritizing visual navigation over text-heavy lists"
          ]
        }
      ],

      prototype: "",
      figma: "",
      github: ""
    } as DesignProjectDetails
  }
];