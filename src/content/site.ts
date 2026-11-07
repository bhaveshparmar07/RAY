/**
 * CANONICAL CONTENT SINGLE SOURCE OF TRUTH: RAY x XOR
 * Extracted from verified public records, CVE data, publications, and credentials.
 * DO NOT ALTER ANY FACTS, LINKS, NUMBERS, OR CVE IDENTIFIERS.
 */

export interface CVEData {
  id: string;
  title: string;
  target: string;
  targetVersion: string;
  affectedVersions: string;
  cwe: string;
  cweLabel: string;
  vulnClass: 'BAC' | 'BOLA' | 'SSRF' | 'PathTraversal' | 'RCE';
  cvss: number;
  cvssVector: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'patched' | 'unpatched';
  dates: {
    found: string;
    reported: string;
    reserved?: string;
    vendorContacted?: string;
    patched?: string;
    disclosed: string;
  };
  summary: string;
  rootCause: string;
  chain: Array<{ step: number; action: string; detail: string }>;
  outcome: string;
  references: string[];
}

export interface ResearchDomain {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: string;
  description: string;
  focusAreas: string[];
  tools: string[];
  metrics: string;
  truthLayerSnippet: string;
}

export interface ToolItem {
  name: string;
  type: string;
  proficiency: 'ADVANCED' | 'PROFICIENT';
  category: 'binary' | 'dynamic' | 'forensics' | 'development';
  categoryLabel: string;
  color: string;
}

export interface PublicationItem {
  id: string;
  index: string;
  title: string;
  typeLabel: string;
  venue: string;
  journal?: string;
  date: string;
  status: 'PUBLISHED' | 'PEER_REVIEWED';
  doi?: string;
  url: string;
  summary: string;
  tags: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  certNumber?: string;
  date: string;
  status: 'VERIFIED' | 'IN_PROGRESS';
  skills: string[];
  badgeColor: string;
}

export interface SecurityProjectItem {
  id: string;
  name: string;
  type: string;
  period: string;
  summary: string;
  highlights: string[];
  techStack: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  details: string[];
  badge: string;
}

export const SITE_IDENTITY = {
  handle: 'RAY',
  realName: 'Bhaveshkumar Parmar',
  role: 'Cybersecurity Researcher',
  degree: 'M.Sc. Cybersecurity & Forensic Science',
  university: 'Gujarat University',
  location: 'Ahmedabad, Gujarat, India',
  geoCoordinates: { lat: '23.0225° N', lng: '72.5714° E' },
  tagline: 'Security is a myth. Everything is secure until someone asks, "What if?"',
  heroQuote: 'Security is a myth',
  subQuote: 'Everything is secure... until someone asks, "What if?"',
  creedTitle: 'Research Background & Principles',
  creedPhilosophy: 'The world runs on assumptions. I test them.',
  bio: 'M.Sc. Cybersecurity & Forensic Science postgraduate at Gujarat University with a research-driven foundation in vulnerability discovery, digital forensics, malware analysis, and applied offensive security. Author of CVE-2026-16577 and first author of published research in malware detection and digital forensics.',
  creedParagraphs: [
    `I'm a cybersecurity researcher driven by empirical investigation, exploring malware analysis, binary reverse engineering, digital forensics, bug bounties, and CTF challenges while developing security automation pipelines. I focus on discovering structural flaws in application logic and understanding the low-level behavior of modern software systems.`,
    `My methodology is grounded in curiosity and rigorous verification. Whether disassembling suspicious binaries in Ghidra, dissecting network protocols in Wireshark, or auditing complex web application architectures for authorization oversights, I treat every system as an interconnected set of assumptions waiting to be tested.`,
    `I believe offensive insights directly empower defensive resilience. Through responsible vulnerability disclosure, detailed technical documentation, and community CTF mentorship, I aim to advance cybersecurity understanding and contribute to a more resilient digital infrastructure.`,
  ],
  stats: {
    publishedCVEs: 4,
    affectedInstalls: '30K+',
    vulnClasses: 'SSRF · RCE',
    authFindings: 'BAC · BOLA',
    verification: 'WPScan / NVD',
  },
  pgp: {
    fingerprint: '4A8F C391 B902 77AE D412 88B1 F902 E311',
    short: '4A8F C391 B902 77AE D412',
  },
  links: {
    email: 'mailto:parmarbhavesh2075@gmail.com',
    rawEmail: 'parmarbhavesh2075@gmail.com',
    hackerone: 'https://hackerone.com/ethen_3616',
    hackeroneUser: 'ethen_3616',
    ctftime: 'https://ctftime.org/user/263827',
    ctftimeUser: 'ctftime.org/user/263827',
    github: 'https://github.com/bhaveshparmar07',
    githubUser: 'bhaveshparmar07',
    twitter_x: 'https://x.com/___bhavesh_07',
    twitterUser: '@___bhavesh_07',
    linkedin: 'https://www.linkedin.com/in/bhavesh-parmar-ray-219283269',
    linkedinUser: 'bhavesh-parmar-ray',
  },
} as const;

export const CVES: CVEData[] = [
  {
    id: 'CVE-2026-16577',
    title: 'Dokan WooCommerce Multivendor Marketplace - Incorrect Authorization in Reverse-Withdrawal Payment Validation',
    target: 'Dokan (dokan-lite)',
    targetVersion: '< 5.0.14',
    affectedVersions: '< 5.0.14 (Fixed in v5.0.14)',
    cwe: 'CWE-863',
    cweLabel: 'Incorrect Authorization',
    vulnClass: 'BAC',
    cvss: 2.7,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:N/I:L/A:N',
    severity: 'low',
    status: 'patched',
    dates: {
      found: '2026-07-15',
      reported: '2026-07-20',
      reserved: '2026-07-22',
      vendorContacted: '2026-07-22',
      patched: '2026-08-17',
      disclosed: '2026-08-19',
    },
    summary:
      "The Dokan WooCommerce Multivendor Marketplace plugin (30,000+ active installations) did not validate a client-supplied payment amount against the vendor's actual outstanding reverse-withdrawal balance when recording a payment transaction. An authenticated vendor with an existing commission debt could supply an arbitrarily large amount to the reverse-withdrawal add-to-cart endpoint, causing the system to credit their ledger with a fraudulent balance — flipping their due-status to clear and disabling enforcement actions without paying their real debt.",
    rootCause:
      "The POST /dokan/v1/reverse-withdrawal/add-to-cart REST endpoint accepted a client-supplied amount parameter with no server-side validation against Helper::get_vendor_due_status(). The amount was passed directly into Cart::woocommerce_custom_price_to_cart_item(), which set the WooCommerce cart item price to the attacker-controlled value. On checkout completion, Order::insert_payment() read the amount back from the order line-item meta and credited exactly that amount to the vendor's reverse-withdrawal ledger as a vendor_payment transaction with no reconciliation against the real outstanding balance.",
    chain: [
      {
        step: 1,
        action: 'Debt Generation & Endpoint Recon',
        detail: 'Identified that POST /dokan/v1/reverse-withdrawal/add-to-cart accepted arbitrary amount parameters with an active ₹110 commission debt.',
      },
      {
        step: 2,
        action: 'Arbitrary Amount Cart Injection',
        detail: 'Submitted an inflated payment amount of ₹999,999 to the vulnerable endpoint and selected Cash-on-Delivery as the standard payment method.',
      },
      {
        step: 3,
        action: 'Order Completion & Ledger Credit',
        detail: 'Upon administrative completion of the order, Order::insert_payment() credited the full ₹999,999 directly into the vendor reverse-withdrawal ledger without balance verification.',
      },
      {
        step: 4,
        action: 'Enforcement Bypass & Negative Balance Lock',
        detail: 'Vendor due status flipped from balance ₹110 (restricted) to -₹999,889 (clear), indefinitely disabling platform enforcement and drawing down future commissions against the fake credit.',
      },
    ],
    outcome:
      'WeDevs / Dokan patched the issue in dokan-lite v5.0.14 on August 17, 2026 by validating the submitted payment amount against the actual outstanding balance and preventing ledger over-credit injection.',
    references: [
      'https://wpscan.com/vulnerability/a98036e6-3dd1-495f-ba48-2bf75fa219e2',
      'https://www.cve.org/CVERecord?id=CVE-2026-16577',
      'https://nvd.nist.gov/vuln/detail/CVE-2026-16577',
    ],
  },
  {
    id: 'CVE-2026-81427',
    title: 'WC Vendors - Broken Object-Level Authorization in Front-End Shipment Status Update',
    target: 'WC Vendors',
    targetVersion: '< 2.7.2.1',
    affectedVersions: '< 2.7.2.1 (Fixed in v2.7.2.1)',
    cwe: 'CWE-862',
    cweLabel: 'Missing Authorization',
    vulnClass: 'BOLA',
    cvss: 4.3,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N',
    severity: 'medium',
    status: 'patched',
    dates: {
      found: '2026-08-01',
      reported: '2026-08-15',
      reserved: '2026-09-02',
      disclosed: '2026-09-02',
      patched: '2026-09-02',
    },
    summary:
      "The WC Vendors WordPress plugin before 2.7.2.1 does not verify that the authenticated vendor submitting a front-end order shipment status change actually owns the referenced order. Any authenticated vendor could mark another vendor's order as shipped, inject a fraudulent order note falsely attributed to the victim vendor, and trigger the customer shipment notification email — impersonating a peer vendor and corrupting order-state integrity across the marketplace.",
    rootCause:
      "The front-end shipment status update handler accepted a vendor-supplied order ID without performing an ownership check comparing the order's assigned vendor against the currently authenticated user. The missing object-level authorization check (CWE-862) allowed cross-vendor order manipulation without capability verification.",
    chain: [
      {
        step: 1,
        action: 'Cross-Vendor Order ID Enumeration',
        detail: "Identified that the front-end shipment update endpoint accepted an arbitrary order ID parameter without restricting it to the authenticated vendor's own orders.",
      },
      {
        step: 2,
        action: 'Unauthorized Shipment Status Mutation',
        detail: "Submitted a shipment status update request referencing a victim vendor's order ID, which the system processed without any ownership verification.",
      },
      {
        step: 3,
        action: 'Order Note Injection & Customer Notification Trigger',
        detail: "The system attached an order note falsely attributed to the victim vendor's account and dispatched the customer shipment notification email.",
      },
    ],
    outcome:
      'WC Vendors patched the vulnerability in v2.7.2.1 by adding object-level authorization checks confirming ownership. Published by WPScan (contact@wpscan.com).',
    references: [
      'https://wpscan.com/vulnerability/f7fcf650-6e5e-4629-97ac-a76a5a0551db',
      'https://www.cve.org/CVERecord?id=CVE-2026-81427',
      'https://nvd.nist.gov/vuln/detail/CVE-2026-81427',
    ],
  },
  {
    id: 'CVE-2026-84046',
    title: 'Directorist: AI-Powered Business Directory - Server-Side Request Forgery (SSRF) via Unvalidated URL Fetch',
    target: 'Directorist: AI-Powered Business Directory, Listings & Classified Ads',
    targetVersion: '< 8.9.5',
    affectedVersions: '< 8.9.5 (Fixed in v8.9.5)',
    cwe: 'CWE-918',
    cweLabel: 'Server-Side Request Forgery (SSRF)',
    vulnClass: 'SSRF',
    cvss: 5.0,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:L/I:N/A:N',
    severity: 'medium',
    status: 'patched',
    dates: {
      found: '2026-09-01',
      reported: '2026-09-10',
      reserved: '2026-09-23',
      disclosed: '2026-09-23',
      patched: '2026-09-23',
    },
    summary:
      'The Directorist WordPress plugin before 8.9.5 does not validate a user-supplied URL before fetching it server-side, allowing authenticated users with subscriber-level access or above to make the server issue HTTP requests to arbitrary internal or external addresses. Enables probing internal topology and cloud metadata (AWS IMDSv1).',
    rootCause:
      'A server-side URL fetch handler accepted a user-supplied URL parameter without validating the scheme, host, or destination against an allowlist. The Scope: Changed (S:C) CVSS vector confirms the vulnerability crosses the perimeter boundary.',
    chain: [
      {
        step: 1,
        action: 'SSRF Endpoint Discovery',
        detail: 'Located the URL fetch endpoint accessible to subscriber-role authenticated users with no additional privilege requirements.',
      },
      {
        step: 2,
        action: 'Internal Address Probing',
        detail: 'Submitted requests targeting internal RFC-1918 addresses (169.254.169.254 cloud metadata, 10.x.x.x internal services).',
      },
      {
        step: 3,
        action: 'Metadata & Secret Exfiltration',
        detail: 'Server-side fetch returned internal service responses including cloud instance metadata, confirming cross-boundary disclosure.',
      },
    ],
    outcome:
      'Directorist patched in v8.9.5 by implementing URL validation blocking internal network addresses. Published 2026-09-23 by WPScan.',
    references: [
      'https://wpscan.com/vulnerability/a5279c4b-ce91-4322-b5c3-70cd1d6d3ba8',
      'https://www.cve.org/CVERecord?id=CVE-2026-84046',
      'https://nvd.nist.gov/vuln/detail/CVE-2026-84046',
    ],
  },
  {
    id: 'CVE-2026-86828',
    title: 'BackWPup - Path Traversal to Remote Code Execution via Fallback Archive Library',
    target: 'BackWPup',
    targetVersion: '< 5.7.7',
    affectedVersions: '< 5.7.7 (Fixed in v5.7.7)',
    cwe: 'CWE-22',
    cweLabel: 'Path Traversal',
    vulnClass: 'PathTraversal',
    cvss: 6.6,
    cvssVector: 'CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H',
    severity: 'medium',
    status: 'patched',
    dates: {
      found: '2026-09-15',
      reported: '2026-09-25',
      reserved: '2026-10-08',
      disclosed: '2026-10-08',
      patched: '2026-10-08',
    },
    summary:
      'The BackWPup WordPress plugin before 5.7.7 does not properly restrict the destination path of files extracted during a backup restore when its fallback archive library is used. High-privileged users can write files outside the intended restore directory via path traversal sequences (CWE-22), potentially achieving remote code execution.',
    rootCause:
      'The fallback archive extraction library did not sanitize or canonicalize file paths within the backup archive before writing them to disk. Compressed entries with directory traversal sequences (../../) were extracted verbatim relative to the restore base directory, dropping executable PHP outside the target.',
    chain: [
      {
        step: 1,
        action: 'Crafted Backup Archive Preparation',
        detail: 'Constructed an archive containing a PHP webshell payload with a path traversal sequence (../../wp-content/uploads/shell.php).',
      },
      {
        step: 2,
        action: 'Backup Restore Trigger via Fallback Library',
        detail: 'Initiated the backup restore process using the fallback archive extraction path.',
      },
      {
        step: 3,
        action: 'Out-of-Directory File Write',
        detail: 'The PHP payload was written to a web-accessible location outside the restore sandbox.',
      },
      {
        step: 4,
        action: 'Remote Code Execution',
        detail: 'Attacker-controlled PHP file was executed via HTTP with web server process privileges.',
      },
    ],
    outcome:
      'BackWPup patched in v5.7.7 by implementing path canonicalization and boundary checks. Published 2026-10-08 by WPScan.',
    references: [
      'https://wpscan.com/vulnerability/be8c0eab-1874-4490-b94e-394f62a522f3',
      'https://www.cve.org/CVERecord?id=CVE-2026-86828',
      'https://nvd.nist.gov/vuln/detail/CVE-2026-86828',
    ],
  },
];

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  {
    id: 'malware-analysis',
    num: '01',
    title: 'Malware Analysis & Dissection',
    subtitle: 'Static & Dynamic Behavioral Triage',
    tag: 'REVERSE_ENG // MAL_01',
    icon: '☣',
    description:
      'Static, dynamic, and behavioral triage of Windows PE binaries, unpacking obfuscated payloads, reconstructing API call chains, and mapping persistence mechanisms. Dissecting ransomware execution loops, anti-analysis evasion tactics, and extracting network command-and-control indicators.',
    focusAreas: [
      'PE Header & Section Entropy Analysis',
      'Unpacking UPX & Custom Packers',
      'Process Injection & API Hooking',
      'YARA Rule Authoring & Detection',
    ],
    tools: ['Ghidra', 'x64dbg', 'PEStudio', 'Procmon', 'YARA'],
    metrics: 'Static / Dynamic / Entropy Triage',
    truthLayerSnippet: '0x4D 0x5A 0x90 0x00 | MZ PE Header | VirtualAllocEx -> WriteProcessMemory -> CreateRemoteThread',
  },
  {
    id: 'reverse-engineering',
    num: '02',
    title: 'Reverse Engineering',
    subtitle: 'Binary Decompilation & Assembly Reconstruction',
    tag: 'BINARY_DECOMP // ASM_02',
    icon: '⚙',
    description:
      'Disassembling compiled executables across x86, x64, and ARM architectures. Navigating assembly control flows, decompiling stripped symbols, reversing proprietary protocols, and auditing software for algorithmic flaws, buffer overflows, and format-string vulnerabilities.',
    focusAreas: [
      'Control Flow Graph (CFG) Reconstruction',
      'Decompilation & Type Recovery',
      'GDB / GEF Dynamic Debugging',
      'Binary Patching & PoC Prototyping',
    ],
    tools: ['IDA Pro', 'Ghidra', 'Binary Ninja', 'Radare2'],
    metrics: 'x86 / x64 / ARM / MIPS Architectures',
    truthLayerSnippet: 'push rbp; mov rbp, rsp; sub rsp, 0x40; mov [rbp-0x8], rdi; call sym.auth_check; test eax, eax; jz fail',
  },
  {
    id: 'digital-forensics',
    num: '03',
    title: 'Digital Forensics & Incident Triage',
    subtitle: 'Volatile Memory & Disk Artifact Reconstruction',
    tag: 'INCIDENT_IR // FOR_03',
    icon: '🔬',
    description:
      'Extracting and reconstructing evidence from volatile RAM, raw disk images, and mobile filesystems. Investigating breach timelines, credential scraping, process hollowing, and persistence vectors under strict chain-of-custody protocols.',
    focusAreas: [
      'Volatility 3 Memory Pool Carving',
      'Shimcache, Amcache & MFT Parsing',
      'Mobile Forensic Extraction (Android/iOS)',
      'Timeline Synthesis & Lateral Movement Triage',
    ],
    tools: ['Volatility 3', 'Autopsy', 'FTK Imager', 'KAPE', 'Plaso'],
    metrics: 'Memory Forensics & Evidence Integrity',
    truthLayerSnippet: 'vol.py -f mem.raw windows.pslist | grep lsass.exe | vadinfo -> extracted injected shellcode at 0x7fff0000',
  },
  {
    id: 'web-api-security',
    num: '04',
    title: 'Web & API Vulnerability Research',
    subtitle: 'Business-Logic Flaws & Authorization Bypasses',
    tag: 'APP_SEC // WEB_04',
    icon: '⚡',
    description:
      'Auditing complex web application architectures for business-logic vulnerabilities, Broken Access Control (BAC), Broken Object-Level Authorization (BOLA), SSRF, and authentication bypasses. Author of CVE-2026-16577 (Dokan Reverse-Withdrawal Logic Flaw).',
    focusAreas: [
      'Business Logic & State Machine Flaws',
      'REST & GraphQL API Authorization (IDOR/BOLA)',
      'Server-Side Request Forgery (SSRF)',
      'Custom Burp Suite Extension Development',
    ],
    tools: ['Burp Suite Pro', 'Postman', 'Caido', 'Custom Python Fuzzers'],
    metrics: '4 Confirmed Public CVEs (WPScan)',
    truthLayerSnippet: 'POST /dokan/v1/reverse-withdrawal/add-to-cart HTTP/1.1 -> amount=999999 -> ledger credit = -999889 [FLIPPED]',
  },
  {
    id: 'ctf-exploit-dev',
    num: '05',
    title: 'CTF Operations & Exploit Labs',
    subtitle: 'Competitive Offensive Security & Proof-of-Concepts',
    tag: 'EXPLOIT_LAB // CTF_05',
    icon: '🎯',
    description:
      'Active CTF practitioner across international competitions. Designing and solving challenges in binary exploitation (ret2libc, ROP chains, format strings), reverse engineering, cryptography, and web security. Co-founder of Universe of Hacking community.',
    focusAreas: [
      'ROP Chain Construction & ret2libc',
      'Format String Exploitation',
      'Heap Grooming & Fastbin Duplication',
      'Custom Exploit Automation with Pwntools',
    ],
    tools: ['Pwntools', 'GDB / GEF', 'CyberChef', 'ROPgadget'],
    metrics: 'Top National Rankings / Active CTFtime',
    truthLayerSnippet: 'payload = pwn.flat({offset: [pop_rdi, bin_sh_addr, system_addr]}); p.sendline(payload); p.interactive()',
  },
  {
    id: 'ai-sec-automation',
    num: '06',
    title: 'AI-Powered Security Automation',
    subtitle: 'Machine Learning for Triage & Threat Intelligence',
    tag: 'AI_AGENT // AUTO_06',
    icon: '🤖',
    description:
      'Developing AI-assisted static code triage pipelines, automated vulnerability surface clustering, and intelligent workflow assistants to accelerate security research.',
    focusAreas: [
      'Automated AST Code Auditing',
      'LLM Triage Pipelines',
      'Threat Intelligence Synthesis',
      'Custom Security Agents',
    ],
    tools: ['Python', 'LangChain', 'FastAPI', 'Tree-sitter', 'Ollama'],
    metrics: 'Next-Gen Research Acceleration',
    truthLayerSnippet: 'tree_sitter.parse(ast) -> query("(call_expression function: (identifier) @f)") -> LLM prompt triage',
  },
];

export const ARSENAL_TOOLS: ToolItem[] = [
  // Binary
  { name: 'Ghidra', type: 'NSA Decompiler & Analysis Suite', proficiency: 'ADVANCED', category: 'binary', categoryLabel: 'BINARY REVERSE', color: '#6FE7FF' },
  { name: 'IDA Pro / x64dbg', type: 'Interactive Disassembler & Debugger', proficiency: 'ADVANCED', category: 'binary', categoryLabel: 'BINARY REVERSE', color: '#6FE7FF' },
  { name: 'PEStudio & DIE', type: 'Executable Header & Entropy Triage', proficiency: 'ADVANCED', category: 'binary', categoryLabel: 'BINARY REVERSE', color: '#6FE7FF' },
  { name: 'Binary Ninja', type: 'Intermediate Representation Analysis', proficiency: 'PROFICIENT', category: 'binary', categoryLabel: 'BINARY REVERSE', color: '#6FE7FF' },
  // Dynamic
  { name: 'Burp Suite Pro', type: 'HTTP/WebSocket Protocol Interception', proficiency: 'ADVANCED', category: 'dynamic', categoryLabel: 'DYNAMIC & NETWORK', color: '#C8FF2E' },
  { name: 'Frida & Objection', type: 'Dynamic Runtime Instrumentation', proficiency: 'ADVANCED', category: 'dynamic', categoryLabel: 'DYNAMIC & NETWORK', color: '#C8FF2E' },
  { name: 'Wireshark', type: 'Packet & Network Protocol Dissection', proficiency: 'ADVANCED', category: 'dynamic', categoryLabel: 'DYNAMIC & NETWORK', color: '#C8FF2E' },
  { name: 'Procmon & Sysinternals', type: 'Kernel & Process Call Tracing', proficiency: 'ADVANCED', category: 'dynamic', categoryLabel: 'DYNAMIC & NETWORK', color: '#C8FF2E' },
  // Forensics
  { name: 'Volatility 3', type: 'Advanced Volatile Memory Forensics', proficiency: 'ADVANCED', category: 'forensics', categoryLabel: 'DIGITAL FORENSICS', color: '#FFB800' },
  { name: 'Autopsy & FTK Imager', type: 'Disk Image Extraction & Indexing', proficiency: 'ADVANCED', category: 'forensics', categoryLabel: 'DIGITAL FORENSICS', color: '#FFB800' },
  { name: 'KAPE & Zimmerman', type: 'Rapid Target Artifact Triage', proficiency: 'ADVANCED', category: 'forensics', categoryLabel: 'DIGITAL FORENSICS', color: '#FFB800' },
  { name: 'YARA', type: 'Pattern Matching & Malware Rule Engine', proficiency: 'ADVANCED', category: 'forensics', categoryLabel: 'DIGITAL FORENSICS', color: '#FFB800' },
  // Dev & Automation
  { name: 'Python 3', type: 'PoC Exploit Dev & Network Scripting', proficiency: 'ADVANCED', category: 'development', categoryLabel: 'DEV & AUTOMATION', color: '#E066FF' },
  { name: 'Pwntools', type: 'Rapid Exploit Prototyping Framework', proficiency: 'ADVANCED', category: 'development', categoryLabel: 'DEV & AUTOMATION', color: '#E066FF' },
  { name: 'Bash / PowerShell', type: 'Environment & Tooling Automation', proficiency: 'ADVANCED', category: 'development', categoryLabel: 'DEV & AUTOMATION', color: '#E066FF' },
  { name: 'Docker Labs', type: 'Isolated Research Sandboxes', proficiency: 'ADVANCED', category: 'development', categoryLabel: 'DEV & AUTOMATION', color: '#E066FF' },
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: 'comparative-malware-analysis-2026',
    index: '01',
    title: 'A Comparative Static, Dynamic, and Network Forensic Analysis of Five Malware Families',
    typeLabel: 'FIRST-AUTHOR PUBLICATION',
    venue: 'International Journal of Research Publication and Reviews (IJRPR)',
    date: 'August 25, 2026',
    status: 'PUBLISHED',
    url: 'https://ijrpr.com/uploads/V7ISSUE8/IJRPR69149.pdf',
    summary:
      'Published first-author research on the comparative forensic analysis of five malware families using static, dynamic, and network-based techniques. Combines binary triage, behavioral analysis, system monitoring, and network traffic analysis to identify indicators and characterize malicious behavior.',
    tags: ['Malware Analysis', 'Static & Dynamic Triage', 'Network Forensics', 'Behavioral Profiling', 'IoC Extraction'],
  },
  {
    id: 'ml-malware-detection-2026',
    index: '02',
    title: 'Machine Learning-Based Malware Detection: A Systematic Review',
    typeLabel: 'PEER-REVIEWED PAPER',
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
    index: '03',
    title: 'Silent Witnesses: The Forensic Handling of Smartphone Evidence at Crime Scenes',
    typeLabel: 'FIRST-AUTHOR PUBLICATION',
    venue: 'Forensic Science E-Magazine (Vol. 24)',
    date: 'August 2026',
    status: 'PUBLISHED',
    url: 'https://forensicfield.blog/forensic-science-e-magazine-vol-24/',
    summary:
      'First-author forensic publication establishing technical protocols for mobile device digital forensics: volatile memory preservation, Faraday RF isolation, logical/physical acquisition standards, chain-of-custody integrity, and anti-forensics mitigation.',
    tags: ['Digital Forensics', 'Mobile Extraction', 'Chain of Custody', 'Incident Response', 'Evidence Preservation'],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
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
    badgeColor: '#6FE7FF',
  },
  {
    id: 'ms-sc200',
    title: 'Microsoft SC-200: Security Operations Analyst',
    issuer: 'Microsoft',
    date: '2026',
    status: 'IN_PROGRESS',
    skills: ['Threat Hunting & KQL', 'Microsoft Sentinel', 'Defender XDR', 'Security Operations & Incident Triage'],
    badgeColor: '#C8FF2E',
  },
];

export const SECURITY_PROJECTS: SecurityProjectItem[] = [
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
      'Multi-stage recon framework featuring a state-machine WafCircuitBreaker (Closed/Open/Half-Open) to intelligently prevent IP blocks during vulnerability enumeration, coupled with local LLM triage.',
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

export const ACHIEVEMENTS: AchievementItem[] = [
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
