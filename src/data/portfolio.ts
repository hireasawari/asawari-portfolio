export const portfolio = {
  name: "Asawari Hire",
  role: "Data Analyst · AI/ML Builder",
  tagline: "I build data-driven products and AI-powered solutions that ship.",
  location: "Mumbai, India",
  email: "hireasawari@gmail.com",
  phone: "",
  github: "https://github.com/AsawariHire",
  linkedin: "https://linkedin.com/in/asawari-hire",
  resume: "/Asawari_Hire_Resume.pdf",

  about:
    "Computer Engineering undergrad at SPIT with a passion for data and AI. I love turning raw data into actionable insights and intelligent systems — from stock sentiment dashboards and emergency prediction models to LLM-powered recruitment tools. Datathon winner, intern-tested, and deeply curious about systems that learn.",

  stats: [
    { label: "Hackathon Wins", value: "1+" },
    { label: "Projects Shipped", value: "3+" },
    { label: "Tech Stack", value: "15+" },
    { label: "Year of Study", value: "3rd" },
  ],

  skills: [
    {
      category: "Languages",
      items: ["Python", "C", "C++", "C#", "Java", "R", "SQL"],
    },
    {
      category: "AI / ML",
      items: ["TensorFlow", "Keras", "Deep Learning", "OpenAI", "RAG", "Azure LLM", "BERT"],
    },
    {
      category: "Frontend",
      items: ["React", "Bootstrap", "Streamlit", "Power BI"],
    },
    {
      category: "Backend",
      items: ["Flask", "FastAPI", "Node.js", "tkinter", "REST", "SMTP", "Twilio"],
    },
    {
      category: "DevOps & Tools",
      items: ["GitHub", "Postman", "Canva", "Excel", "Jupyter", "n8n", "Zapier", "Airtable"],
    },
    {
      category: "Data",
      items: ["MySQL", "Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Beautiful Soup", "Selenium"],
    },
  ],

  projects: [
    {
      title: "AI DIY Project Generator & Evaluator",
      role: "Full-Stack & AI Lead",
      description:
        "An intelligent recruitment platform that matches resumes to job descriptions using NLP, semantic similarity scoring, and BERT-based contextual embeddings — built with a scalable FastAPI backend and responsive React frontend.",
      impact: [
        "Designed NLP pipeline using BERT embeddings with spaCy preprocessing and cosine similarity for ranking",
        "Enabled multi-resume uploads, job role classification, and match score generation",
        "Built scalable FastAPI backend with a responsive React frontend",
      ],
      tech: ["Flask", "FastAPI", "React", "OpenRouter", "Gemini", "Whisper", "ScrapingDog"],
      links: { github: "#", live: "#" },
    },
    {
      title: "911 Emergency Call Prediction",
      role: "Data Scientist",
      description:
        "A geospatial ML system that analyses 5 years of 911 call data to predict future emergency hotspots, with an interactive Streamlit app generating PDF reports and maps.",
      impact: [
        "Cleaned 5 years of 911 call data (2015–2020) and performed EDA using Power BI",
        "Used clustering (KL Divergence: 0.0001) and Folium-based geospatial modelling for hotspot prediction",
        "Developed Streamlit app generating PDF reports and interactive maps for future emergencies",
      ],
      tech: ["Python", "Pandas", "scikit-learn", "Folium", "Power BI", "Streamlit"],
      links: { github: "#", live: "#" },
    },
    {
      title: "Stock Market Sentiment Analysis",
      role: "Data Analyst",
      description:
        "A real-time sentiment tracking system that scrapes live tweets on 10+ stock tickers, classifies sentiment using VADER, and visualises trends through Power BI dashboards.",
      impact: [
        "Automated Selenium-based web scraping to collect and analyse 320+ live tweets",
        "Applied VADER sentiment analysis — 51.56% positive, 36.25% neutral, 12.19% negative",
        "Developed Power BI dashboards for sentiment trends, distribution, and keyword analysis",
      ],
      tech: ["Python", "Selenium", "VADER", "Power BI"],
      links: { github: "#", live: "#" },
    },
  ],

  achievements: [
    {
      rank: "Winner",
      event: "Datathon 2025",
      year: "2025",
      description: "1st place at ARTIMAS, Pune — solved a multi-class text classification task using TF-IDF, XGBoost, and an SGDClassifier pipeline.",
    },
    {
      rank: "Certification",
      event: "The Data Science Course: Complete Data Science Bootcamp 2025",
      year: "2025",
      description: "Completed a comprehensive data science bootcamp covering statistics, ML, and Python.",
    },
    {
      rank: "Certification",
      event: "100 Days of Code: The Complete Python Pro Bootcamp",
      year: "2025",
      description: "Completed 100 days of Python programming covering automation, web scraping, and data projects.",
    },
  ],

  education: {
    school: "Sardar Patel Institute of Technology (SPIT), Mumbai",
    degree: "B.Tech in Computer Engineering",
    duration: "2023 — 2027",
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Deep Learning",
      "DBMS",
      "Statistics",
      "Software Engineering",
    ],
  },

  leadership: [
    {
      title: "IIC Startup Coordinator",
      org: "IIC SPIT",
      description: "Manage and coordinate institutional events each quarter while preparing structured event reports.",
    },
    {
      title: "Data Analyst Intern",
      org: "Strivepoint Capital, New York",
      description: "Built AutoStockInsight using n8n and Azure LLM; supported investment research with dashboards, financial data automation, and factor models.",
    },
  ],
} as const;