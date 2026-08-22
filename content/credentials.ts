export interface Publication {
  id: string;
  title: string;
  journal: string;
  date: string;
  doi?: string;
  url: string;
  summary: string;
  tags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  certNumber?: string;
  date: string;
  status: 'VERIFIED' | 'IN_PROGRESS';
  skills: string[];
  badgeColor: string;
}

export interface SecurityProject {
  id: string;
  name: string;
  type: string;
  period: string;
  summary: string;
  highlights: string[];
  techStack: string[];
}

export interface Achievement {
  title: string;
  organization: string;
  period: string;
  description: string;
  badge: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 'ml-malware-detection-2026',
    title: 'Machine Learning-Based Malware Detection: A Systematic Review',
    journal: 'International Journal of Scientific Research and Engineering Development (IJSCI)',
    date: 'Feb 23, 2026',
    doi: '10.70849/ijsci03022686331',
    url: 'https://ijsci.com/paper-details.php/61086331/machine-learning-based-malware-detection-a-systematic-review',
    summary:
      'A systematic review conducted using the PRISMA framework evaluating the evolution of Machine Learning (ML) and Deep Learning (DL) models, feature-extraction paradigms, benchmark datasets, and adversarial evasion challenges in malware detection.',
    tags: ['Machine Learning', 'Malware Detection', 'PRISMA Framework', 'Feature Extraction', 'Threat Analysis'],
  },
  {
    id: 'forensic-smartphone-evidence-2026',
    title: 'Silent Witnesses: The Forensic Handling of Smartphone Evidence at Crime Scenes',
    journal: 'Forensic Science E-Magazine (Vol. 24)',
    date: 'Aug 17, 2026',
    url: 'https://forensicfield.blog/forensic-science-e-magazine-vol-24/',
    summary:
      'Peer-published article detailing technical protocol for the physical and logical triage of mobile devices at crime scenes, covering volatile state preservation, Faraday isolation, physical/logical extraction, chain-of-custody integrity, and anti-forensic countermeasures.',
    tags: ['Digital Forensics', 'Mobile Extraction', 'Chain of Custody', 'Incident Triage', 'Evidence Integrity'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cybered-offensive-explorer',
    title: 'CyberED Certified Offensive Security Explorer',
    issuer: 'CyberED // Cybersecurity Competence Center',
    certNumber: 'CEWH-HC2-0056',
    date: 'Aug 06, 2026',
    status: 'VERIFIED',
    skills: ['Primary Access Attacks', 'Privilege Escalation', 'Internal Network Pivoting', 'Web Vulnerability Exploitation'],
    badgeColor: '#FF3B30',
  },
  {
    id: 'cnsp-secops',
    title: 'Certified Network Security Practitioner (CNSP)',
    issuer: 'The SecOps Group',
    date: '2025',
    status: 'VERIFIED',
    skills: ['Network Infrastructure Security', 'Protocol Auditing', 'Firewall & Egress Triage', 'Packet Dissection'],
    badgeColor: '#38BDF8',
  },
  {
    id: 'ms-sc200',
    title: 'Microsoft SC-200: Security Operations Analyst',
    issuer: 'Microsoft',
    date: '2026',
    status: 'IN_PROGRESS',
    skills: ['Threat Hunting', 'Microsoft Sentinel', 'Defender XDR', 'KQL Query Engineering', 'Incident Response'],
    badgeColor: '#8A5CF6',
  },
];

export const SECURITY_PROJECTS: SecurityProject[] = [
  {
    id: 'autohunter-pro',
    name: 'AutoHunter Pro',
    type: 'Burp Suite Offensive Extension',
    period: '2026 – Present',
    summary:
      'Engineered a self-contained Java/Python ExtensionCrawler performing BFS site crawling, hidden API endpoint mapping, and JavaScript bundle AST parsing for automated reconnaissance.',
    highlights: [
      'Automated BFS recursive crawling and sitemap tree reconstruction',
      'Webpack/Vite JavaScript bundle decompression for hidden route extraction',
      'Real-time passive traffic pattern analyzer integrated with Burp proxy',
    ],
    techStack: ['Java', 'Burp Extender API', 'JavaScript AST', 'Python'],
  },
  {
    id: 'vapt-leadhunter',
    name: 'VAPT LeadHunter',
    type: 'Automated Recon & Vulnerability Pipeline',
    period: '2026 – Present',
    summary:
      'Multi-iteration recon automation platform (v8) featuring a custom WafCircuitBreaker with CLOSED/OPEN/HALF_OPEN state machine to bypass rate limits and IP bans.',
    highlights: [
      'Integrated local LLM analysis (Ollama) to triage and rank discovered attack surfaces',
      'Source map unpacking to recover client-side production source code from .map files',
      'Persistent SQLite/JSON state machine preventing redundant scan executions',
    ],
    techStack: ['Python', 'Ollama (Local LLM)', 'Asyncio', 'WAF Circuit Breaker'],
  },
  {
    id: 'trinetra-ai',
    name: 'TRINETRA AI',
    type: 'Network & Packet Forensics Platform',
    period: '2026',
    summary:
      'Forensics platform designed for the Ahmedabad Cyber Crime Branch combining PCAP live stream dissection, Suricata signature rules, and ML anomaly classification.',
    highlights: [
      'Submitted to KANAD S.H.I.E.L.D. 2026 cybersecurity hackathon',
      'High-throughput data ingestion pipeline using Flask, Scapy, Kafka, and Elasticsearch',
      'Interactive D3.js visual graph representing network protocol conversations and malicious beaconing',
    ],
    techStack: ['Python/Scapy', 'Kafka', 'Elasticsearch', 'Suricata', 'React/D3.js'],
  },
  {
    id: 'android-ransomware-guard',
    name: 'Android Malware Early Warning System',
    type: 'On-Device Ransomware Defense',
    period: '2025',
    summary:
      'On-device behavioral monitoring agent utilizing Linux FileObserver subsystem events, canary honeyfiles, and on-device TFLite neural classification to stop encryption loops in real time.',
    highlights: [
      'Real-time I/O entropy detection for zero-delay encryption process interception',
      'Targeted for IEEE S&P / ICACCI academic symposium',
      'Zero cloud dependency: 100% on-device neural model inference',
    ],
    techStack: ['Android/Kotlin', 'C/C++ NDK', 'TensorFlow Lite', 'FileObserver API'],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Positive Hack Camp (Moscow)',
    organization: 'Positive Technologies',
    period: 'July – August 2026',
    description:
      'Selected for fully funded international intensive cybersecurity training camp in Moscow among an elite international competitive applicant pool.',
    badge: 'INTERNATIONAL SELECTION',
  },
  {
    title: 'Co-Founder // Universe of Hacking',
    organization: 'Universe of Hacking Community',
    period: '2025 – Present',
    description:
      'Co-founded community initiative focused on CTF training, applied vulnerability research, malware dissection workshops, and student mentorship.',
    badge: 'COMMUNITY INITIATIVE',
  },
  {
    title: '2nd Rank // AI Armoury Workshop',
    organization: 'Cybersecurity & AI Intensive',
    period: '2026',
    description:
      'Ranked 2nd out of 25 competing teams in a 5-day hackathon focused on AI in offensive security, automated malware triage, and defense orchestration.',
    badge: '2ND OF 25 TEAMS',
  },
];
