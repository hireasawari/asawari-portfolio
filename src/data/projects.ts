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

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  techStack: string[];
  thumbnail: string;
  featured: boolean;
  visible: boolean;
  details: ProjectDetails;
}

export const projectsData: Project[] = [
  {
    id: "vegha",
    title: "Vegha - Smart AI Traffic Control System",
    shortDescription: "Adaptive AI-based traffic signal system using multi-agent reinforcement learning.",
    techStack: ["Python", "TensorFlow Lite", "Deep RL", "C++", "Simulation"],
    thumbnail: "/images/vegha/thumbnail.png",
    featured: true,
    visible: true,
    details: {
      overview: "Vegha is an AI-driven smart traffic control system designed to optimize signal timings dynamically based on real-time traffic conditions. It replaces traditional fixed-timer systems with adaptive decision-making using reinforcement learning.",
      motivation: "Urban traffic congestion is a growing problem, and traditional traffic lights operate on static timing rules that fail to adapt to real-time conditions. I wanted to build a system that could learn and respond dynamically to changing traffic patterns.",
      problem: "Fixed traffic signal systems lead to inefficient traffic flow, long waiting times, and increased fuel consumption. There is a need for a system that can adapt to real-time traffic conditions and optimize signal timings intelligently.",
      solution: "I designed a multi-agent reinforcement learning system where each traffic signal acts as an independent agent. These agents observe traffic density, queue length, and waiting time, and learn optimal signal switching strategies through reward-based learning.",
      architecture: "The system consists of a simulation environment where multiple traffic intersections are modeled. Each signal acts as an RL agent using a deep neural network to approximate optimal policies. The model is trained using simulation data and deployed using TensorFlow Lite for efficient edge inference.",
      results: "The system significantly reduced average waiting time and improved overall traffic flow compared to traditional fixed-timer systems. It also demonstrated scalability across multiple intersections.",
      challenges: "Designing stable reward functions and ensuring coordination between multiple agents was challenging. Training convergence and avoiding conflicting decisions between signals required careful tuning.",
      futureScope: "Future improvements include real-world deployment with IoT sensors, integration with live traffic data, and exploring more advanced multi-agent coordination techniques.",
      images: [
        "/images/vegha/traffic-simulation.png",
        "/images/vegha/architecture.png",
        "/images/vegha/results-graph.png"
      ],
      github: "https://github.com/Sahil-Gupta-16/FDRL_Traffic",
      demo: ""
    }
  },
  {
    id: "deepfake-detection",
    title: "Deepfake Detection System – Multi-Model AI Verification",
    shortDescription: "Robust deepfake detection system using ensemble deep learning and temporal analysis.",
    techStack: ["Python", "TensorFlow", "OpenCV", "React", "Redis", "Deep Learning"],
    thumbnail: "/images/deepfake/thumbnail.png",
    featured: true,
    visible: true,
    details: {
      overview: "This project is a multi-model AI system designed to detect deepfake videos by analyzing both spatial and temporal features. It combines multiple deep learning architectures to improve detection accuracy and robustness.",
      motivation: "With the rise of AI-generated content, deepfakes pose a serious threat to digital trust and misinformation. I wanted to build a system capable of identifying manipulated videos reliably across different scenarios.",
      problem: "Deepfake videos are becoming increasingly realistic, making them difficult to detect using traditional methods. Single-model approaches often fail to generalize across different types of manipulations.",
      solution: "I developed an ensemble-based system that processes videos frame-by-frame using multiple deep learning models and then applies temporal analysis using sequence models to detect inconsistencies across frames.",
      architecture: "The system extracts frames from input videos, processes them through multiple models including Xception, ResNet-50, EfficientNet, and Vision Transformers for feature extraction. These features are then passed to an LSTM network for temporal analysis. Outputs from all models are combined to produce a final prediction.",
      results: "The ensemble approach improved detection accuracy and robustness compared to individual models. The system performed well across various deepfake datasets and real-world samples.",
      challenges: "Handling large video data efficiently, reducing false positives, and ensuring generalization across different deepfake techniques were key challenges. Balancing performance and computational cost was also critical.",
      futureScope: "Future work includes real-time detection, deployment as a browser extension, and continuous learning using new deepfake datasets.",
      images: [
        "/images/deepfake/frame-analysis.png",
        "/images/deepfake/model-architecture.png",
        "/images/deepfake/results.png"
      ],
      github: "https://github.com/your-repo-link",
      demo: ""
    }
  },
  {
    id: "civicconnect",
    title: "CivicConnect – AI-Powered Civic Issue Reporting System",
    shortDescription: "Platform for reporting and managing civic issues with AI-based categorization and tracking.",
    techStack: ["React", "Flask", "PostgreSQL", "PostGIS", "Redis", "Python"],
    thumbnail: "/images/civicconnect/thumbnail.png",
    featured: true,
    visible: true,
    details: {
      overview: "CivicConnect is a smart platform that enables citizens to report civic issues such as potholes, garbage, and infrastructure problems, while using AI to categorize and route them to the appropriate authorities.",
      motivation: "Civic issue reporting systems are often slow, inefficient, and lack transparency. I wanted to create a system that empowers citizens and improves communication between the public and municipal authorities.",
      problem: "Manual reporting systems lead to delays, misclassification of issues, and lack of accountability. Authorities struggle to prioritize and manage large volumes of complaints effectively.",
      solution: "I built a web-based platform where users can report issues with images and location data. The system automatically categorizes issues using AI and routes them to the correct department, while providing real-time tracking to users.",
      architecture: "The frontend is built using React, while the backend uses Flask with PostgreSQL and PostGIS for geospatial data handling. Redis is used for caching and real-time updates. The AI module classifies issues based on text and image inputs.",
      results: "The system improved reporting efficiency, reduced response time, and increased transparency by allowing users to track issue status in real time.",
      challenges: "Accurate categorization of diverse civic issues and handling geospatial data efficiently were challenging. Ensuring scalability for large user bases was also important.",
      futureScope: "Future improvements include mobile app integration, predictive analytics for issue hotspots, and deeper integration with government systems.",
      images: [
        "/images/civicconnect/dashboard.png",
        "/images/civicconnect/report-flow.png",
        "/images/civicconnect/map-view.png"
      ],
      github: "https://github.com/Sahil-Gupta-16/CivicConnect",
      demo: ""
    }
  }
];