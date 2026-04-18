export const portfolio = {
  name: "Sahil Gupta",
  role: "Software Engineer · AI/ML Builder",
  tagline: "I build AI-powered products and full-stack experiences that ship.",
  location: "Mumbai, India",
  email: "sahil160506@gmail.com",
  phone: "+91 7038711591",
  github: "https://github.com/Sahil-Gupta-16",
  linkedin: "https://linkedin.com/in/sahil-gupta-6b0069290",
  resume: "/Sahil_Gupta_Resume.pdf",

  about:
    "Computer Engineering undergrad at SPIT with a builder's mindset. I love turning rough ideas into shipped products — from AI agents and deepfake detection systems to civic-tech platforms. Three hackathon wins, multiple side projects, and a deep curiosity for systems that learn.",

  stats: [
    { label: "Hackathon Wins", value: "3+" },
    { label: "Projects Shipped", value: "5+" },
    { label: "Tech Stack", value: "15+" },
    { label: "Year of Study", value: "3rd" },
  ],

  skills: [
    {
      category: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "Java"],
    },
    {
      category: "AI / ML",
      items: ["PyTorch", "TensorFlow", "LangChain", "OpenAI", "HuggingFace", "RAG"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind", "Framer Motion", "Three.js"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "FastAPI", "Flask", "REST", "WebSockets"],
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "Git", "GitHub Actions", "Vercel", "Linux", "Postman"],
    },
    {
      category: "Data",
      items: ["PostgreSQL", "MongoDB", "Supabase", "Firebase", "Redis"],
    },
  ],

  projects: [
    {
      title: "Vegha",
      role: "Full-Stack & AI Lead",
      description:
        "An AI-powered productivity platform that turns natural-language goals into actionable plans, calendars, and progress tracking — built end-to-end during a hackathon and iterated post-event.",
      impact: [
        "Designed multi-agent planner using LangChain + GPT-4",
        "Built realtime collaborative UI with React + Supabase",
        "Onboarded 200+ early users in the first two weeks",
      ],
      tech: ["Next.js", "LangChain", "Supabase", "Tailwind", "OpenAI"],
      links: { github: "https://github.com/sahilgupta", live: "#" },
    },
    {
      title: "CivicConnect",
      role: "Founding Engineer",
      description:
        "A civic-tech platform connecting citizens with local representatives — featuring issue triage, geo-tagged complaints, and an AI summariser for incoming reports.",
      impact: [
        "Built complaint triage pipeline reducing manual review by 60%",
        "Implemented geo-clustering with PostGIS",
        "Recognised at MUJ HackX 3.0 (Runner-Up)",
      ],
      tech: ["React", "FastAPI", "PostgreSQL", "PostGIS", "Mapbox"],
      links: { github: "https://github.com/sahilgupta", live: "#" },
    },
    {
      title: "Deepfake Detection",
      role: "ML Engineer",
      description:
        "A computer-vision system that detects manipulated faces in video using a hybrid CNN + temporal-attention model with a lightweight web demo.",
      impact: [
        "Achieved 94% accuracy on FaceForensics++ subset",
        "Optimised inference pipeline to run in <120ms/frame",
        "Deployed Flask demo with live webcam scoring",
      ],
      tech: ["PyTorch", "OpenCV", "Flask", "Docker"],
      links: { github: "https://github.com/sahilgupta", live: "#" },
    },
  ],

  achievements: [
    {
      rank: "Winner",
      event: "Innovik 5.0",
      year: "2025",
      description: "1st place out of 120+ teams — built an AI-powered solution for sustainable urban living.",
    },
    {
      rank: "Runner-Up",
      event: "MUJ HackX 3.0",
      year: "2025",
      description: "2nd place at Manipal University Jaipur's flagship 36-hour national hackathon.",
    },
    {
      rank: "2nd Runner-Up",
      event: "CodeSlayer 2k25",
      year: "2025",
      description: "Top 3 finish in a competitive cross-college coding & product hackathon.",
    },
  ],

  education: {
    school: "Sardar Patel Institute of Technology (SPIT), Mumbai",
    degree: "B.Tech in Computer Engineering",
    duration: "2023 — 2027",
    coursework: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "Machine Learning",
      "Software Engineering",
    ],
  },

  leadership: [
    {
      title: "Core Member, Sports Committee",
      org: "SPIT",
      description: "Organised inter-college tournaments and managed logistics for 500+ participants.",
    },
    {
      title: "Acquisition Arena, E-Cell",
      org: "SPIT",
      description: "Led sponsor outreach and partnership building for entrepreneurship events.",
    },
  ],
} as const;
