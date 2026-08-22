export interface Publication {
  id: string;
  index: string;
  title: string;
  venue: string;
  journal?: string;
  date: string;
  status: 'PUBLISHED' | 'PEER_REVIEWED' | 'IN_PROGRESS';
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
  location?: string;
  period: string;
  description: string;
  details?: string[];
  badge: string;
}

export const RESEARCH_OUTPUTS: Publication[] = [
  {
    id: 'ml-malware-detection-2026',
    index: '01',
    title: 'Machine Learning-Based Malware Detection: A Systematic Review',
    venue: 'International Journal of Scientific Research and Engineering Development (IJSCI)',
    date: 'February 2026',
    status: 'PUBLISHED',
    doi: '10.70849/ijsci03022686331',
    url: 'https://ijsci.com/paper-details.php/61086331/machine-learning-based-malware-detection-a-systematic-review',
    summary:
      'Comprehensive systematic review conducted under the PRISMA framework evaluating the architecture, feature extraction pipelines, benchmark datasets, and adversarial evasion vectors across state-of-the-art ML/DL malware classification systems.',
    tags: ['Machine Learning', 'Malware Detection', 'PRISMA Framework', 'Feature Extraction', 'Adversarial Defense'],
  },
  {
    id: 'forensic-smartphone-evidence-2026',
    index: '02',
    title: 'Silent Witnesses: The Forensic Handling of Smartphone Evidence at Crime Scenes',
    venue: 'Forensic Science E-Magazine (Vol. 24)',
    date: 'August 2026',
    status: 'PUBLISHED',
    url: 'https://forensicfield.blog/forensic-science-e-magazine-vol-24/',
    summary:
      'Peer-reviewed first-author publication establishing technical protocols for mobile device digital forensics: volatile memory preservation, Faraday RF isolation, logical/physical acquisition standards, chain-of-custody integrity, and anti-forensics mitigation.',
    tags: ['Digital Forensics', 'Mobile Extraction', 'Chain of Custody', 'Incident Response', 'Evidence Preservation'],
  },
];

export const PUBLICATIONS = RESEARCH_OUTPUTS;

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cybered-offensive-explorer',
    title: 'CyberED Certified Offensive Security Explorer',
    issuer: 'CyberED // Cybersecurity Competence Center (Positive Technologies)',
    certNumber: 'CEWH-HC2-0056',
    date: 'August 06, 2026',
    status: 'VERIFIED',
    skills: ['Primary Access & Recon', 'Privilege Escalation', 'Internal Network Pivoting', 'Web Application Exploitation'],
    badgeColor: '#FF3B30',
  },
  {
    id: 'cnsp-secops',
    title: 'Certified Network Security Practitioner (CNSP)',
    issuer: 'The SecOps Group',
    date: '2025',
    status: 'VERIFIED',
    skills: ['Network Protocol Auditing', 'Firewall & Egress Triage', 'Packet Dissection', 'Infrastructure Hardening'],
    badgeColor: '#38BDF8',
  },
  {
    id: 'ms-sc200',
    title: 'Microsoft SC-200: Security Operations Analyst',
    issuer: 'Microsoft',
    date: '2026',
    status: 'IN_PROGRESS',
    skills: ['Threat Hunting & KQL', 'Microsoft Sentinel', 'Defender XDR', 'Security Operations & Incident Triage'],
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
      'Engineered an offensive reconnaissance extension for Burp Suite that automates recursive BFS sitemap discovery and parses JavaScript bundle ASTs to extract unpublished API endpoints.',
    highlights: [
      'Automated BFS recursive crawling and sitemap tree reconstruction',
      'Webpack/Vite JavaScript bundle AST decompilation for hidden route extraction',
      'Integrated passive traffic pattern analysis with Burp proxy pipeline',
    ],
    techStack: ['Java', 'Burp Extender API', 'JavaScript AST', 'Python'],
  },
  {
    id: 'vapt-leadhunter',
    name: 'VAPT LeadHunter',
    type: 'Automated Recon & Vulnerability Pipeline',
    period: '2026 – Present',
    summary:
      'Multi-stage recon framework (v8) featuring a state-machine WafCircuitBreaker (Closed/Open/Half-Open) to intelligently prevent IP blocks during vulnerability enumeration, coupled with local LLM triage.',
    highlights: [
      'Integrated local LLM analysis (Ollama) to triage and rank discovered attack surfaces',
      'Source map unpacker recovering production frontend source code from .map files',
      'Persistent SQLite state machine preventing redundant scan executions',
    ],
    techStack: ['Python', 'Ollama (Local LLM)', 'Asyncio', 'WAF Circuit Breaker'],
  },
  {
    id: 'trinetra-ai',
    name: 'TRINETRA AI',
    type: 'Network & Packet Forensics Platform',
    period: '2026',
    summary:
      'High-throughput packet forensics platform designed for the Ahmedabad Cyber Crime Branch, combining live PCAP stream dissection with Suricata signature matching and ML anomaly classification.',
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
      '100% on-device neural model inference with zero cloud telemetry dependency',
      'Targeted for IEEE S&P / ICACCI academic symposium',
    ],
    techStack: ['Android/Kotlin', 'C/C++ NDK', 'TensorFlow Lite', 'FileObserver API'],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Positive Hack Camp (Moscow)',
    organization: 'Positive Technologies',
    location: 'Moscow, Russia',
    period: 'July – August 2026',
    description:
      'Selected for an elite, fully funded international cybersecurity intensive training camp in Moscow among a competitive international applicant pool.',
    details: [
      'Selected participant in rigorous international qualification process',
      'Completed CyberED Certified Offensive Security Explorer certification (№ CEWH-HC2-0056)',
      'Hands-on technical tracks: initial access, privilege escalation, internal network pivot attacks, and binary analysis',
      'Active participant in the official closing ceremony and technical collaboration with international practitioners',
    ],
    badge: 'INTERNATIONAL SELECTION 🇷🇺',
  },
  {
    title: 'Co-Founder // Universe of Hacking',
    organization: 'Universe of Hacking Community',
    period: '2025 – Present',
    description:
      'Co-founded community initiative focused on CTF training, applied vulnerability research, malware dissection workshops, and student mentorship.',
    details: [
      'Mentoring researchers in binary exploitation, web security, and digital forensics',
      'Organizing structured CTF practice sessions and vulnerability breakdown labs',
    ],
    badge: 'COMMUNITY INITIATIVE',
  },
  {
    title: '2nd Rank // AI Armoury Workshop',
    organization: 'Cybersecurity & AI Intensive',
    period: '2026',
    description:
      'Ranked 2nd out of 25 competing teams in a 5-day hackathon focused on AI in offensive security, automated malware triage, and defense orchestration.',
    details: [
      'Engineered automated triage pipeline combining ML anomaly detection with threat intelligence',
      'Awarded 2nd place overall among 25 competing university and researcher teams',
    ],
    badge: '2ND OF 25 TEAMS 🏆',
  },
];
