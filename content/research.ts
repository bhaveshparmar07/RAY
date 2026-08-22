export interface ResearchDomain {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
  tools: string[];
  metrics: string;
  icon: string;
}

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  {
    id: 'malware-analysis',
    tag: 'DOM-01 // MALWARE',
    title: 'Malware Analysis & Dissection',
    subtitle: 'Static & Dynamic Binary Triage',
    description:
      'Deep behavioral inspection of malicious payloads, unpacking obfuscated loaders, analyzing anti-analysis hooks, and extracting C2 indicators of compromise (IOCs).',
    focusAreas: ['Unpacking & Deobfuscation', 'API Hook Monitoring', 'Sandbox Behavioral Triage', 'C2 Protocol Decryption'],
    tools: ['Ghidra', 'x64dbg', 'PEStudio', 'Procmon', 'YARA'],
    metrics: 'Dynamic & Static Isolation',
    icon: '☣',
  },
  {
    id: 'reverse-engineering',
    tag: 'DOM-02 // REVERSE_ENG',
    title: 'Reverse Engineering',
    subtitle: 'Binary Decompilation & Protocol Audit',
    description:
      'Disassembling compiled executables, understanding complex proprietary protocols, inspecting firmware logic, and reconstructing closed-source architecture.',
    focusAreas: ['x86/x64 Assembly Analysis', 'Internal Logic Reconstruction', 'Cryptographic Algorithm Audit', 'Binary Patching'],
    tools: ['IDA Pro', 'Ghidra', 'Binary Ninja', 'Radare2'],
    metrics: 'Low-Level Architecture',
    icon: '⚙',
  },
  {
    id: 'digital-forensics',
    tag: 'DOM-03 // FORENSICS',
    title: 'Digital Forensics & Incident Triage',
    subtitle: 'Artifact Discovery & Timeline Reconstruction',
    description:
      'Forensic extraction from volatile memory dumps, filesystem journaling, registry triage, and reconstructing attacker lateral movement step-by-step.',
    focusAreas: ['Memory Extraction (RAM)', 'Master File Table (MFT) Parsing', 'Event Log Triage', 'Timeline Reconstruction'],
    tools: ['Volatility 3', 'Autopsy', 'FTK Imager', 'KAPE', 'Plaso'],
    metrics: 'Evidence Integrity Verified',
    icon: '🔍',
  },
  {
    id: 'web-api-security',
    tag: 'DOM-04 // VULN_RESEARCH',
    title: 'Web & API Vulnerability Research',
    subtitle: 'Broken Access Control & Logic Bypasses',
    description:
      'Manual security audits targeting complex business logic flaws, unauthorized ledger manipulations, authentication confusions, and responsible 0-day disclosure.',
    focusAreas: ['Broken Access Control (BAC)', 'Ledger & Transaction Bypasses', 'JWT & Auth Confusion', 'SSRF / TOCTOU Pivoting'],
    tools: ['Burp Suite Pro', 'Postman', 'Caido', 'Custom Python Fuzzers'],
    metrics: 'CVE-2026-16577 Published',
    icon: '🛡',
  },
  {
    id: 'ctf-exploit-dev',
    tag: 'DOM-05 // EXPLOIT_OPS',
    title: 'CTF Operations & Exploit Labs',
    subtitle: 'Competitive Hacking & Challenge Triage',
    description:
      'Continuous competitive skill honing across international CTF tournaments, focusing on PWN, binary exploitation, heap manipulation, and exotic crypto puzzles.',
    focusAreas: ['Binary Exploitation (PWN)', 'Heap & Stack Overflows', 'Web Application Exploitation', 'Crypto & Steganography'],
    tools: ['Pwntools', 'GDB / GEF', 'CyberChef', 'ROPgadget'],
    metrics: 'Active CTF Participant',
    icon: '⚔',
  },
  {
    id: 'ai-sec-automation',
    tag: 'DOM-06 // AI_AUTOMATION',
    title: 'AI-Powered Security Automation',
    subtitle: 'Intelligent Recon & Triage Workflows',
    description:
      'Developing AI-assisted static code triage pipelines, automated vulnerability surface clustering, and intelligent workflow assistants to accelerate security research.',
    focusAreas: ['Automated AST Code Auditing', 'LLM Triage Pipelines', 'Threat Intelligence Synthesis', 'Custom Security Agents'],
    tools: ['Python', 'LangChain', 'FastAPI', 'Tree-sitter', 'Ollama'],
    metrics: 'Next-Gen Research Acceleration',
    icon: '⚡',
  },
];

export interface ToolCategory {
  category: string;
  items: { name: string; type: string; proficiency: string }[];
}

export const ARSENAL_TOOLKIT: ToolCategory[] = [
  {
    category: 'STATIC & BINARY REVERSE ENGINEERING',
    items: [
      { name: 'Ghidra', type: 'NSA Decompiler & Analysis Suite', proficiency: 'ADVANCED' },
      { name: 'IDA Pro / x64dbg', type: 'Interactive Disassembler & Debugger', proficiency: 'ADVANCED' },
      { name: 'PEStudio & DIE', type: 'Executable Header & Entropy Triage', proficiency: 'ADVANCED' },
      { name: 'Binary Ninja', type: 'Intermediate Representation Analysis', proficiency: 'PROFICIENT' },
    ],
  },
  {
    category: 'DYNAMIC ANALYSIS & INTERCEPTION',
    items: [
      { name: 'Burp Suite Professional', type: 'HTTP/WebSocket Protocol Interception', proficiency: 'ADVANCED' },
      { name: 'Frida & Objection', type: 'Dynamic Runtime Instrumentation', proficiency: 'ADVANCED' },
      { name: 'Wireshark', type: 'Packet & Network Protocol Dissection', proficiency: 'ADVANCED' },
      { name: 'Procmon & Sysinternals', type: 'Kernel & Process Call Tracing', proficiency: 'ADVANCED' },
    ],
  },
  {
    category: 'DIGITAL FORENSICS & INCIDENT RESPONSE',
    items: [
      { name: 'Volatility 3', type: 'Advanced Volatile Memory Forensics', proficiency: 'ADVANCED' },
      { name: 'Autopsy & FTK Imager', type: 'Disk Image Extraction & Indexing', proficiency: 'ADVANCED' },
      { name: 'KAPE & Eric Zimmerman Tools', type: 'Rapid Target Artifact Triage', proficiency: 'ADVANCED' },
      { name: 'YARA', type: 'Pattern Matching & Malware Rule Engine', proficiency: 'ADVANCED' },
    ],
  },
  {
    category: 'DEVELOPMENT & RESEARCH AUTOMATION',
    items: [
      { name: 'Python 3', type: 'PoC Exploit Dev & Network Scripting', proficiency: 'ADVANCED' },
      { name: 'Pwntools', type: 'Rapid Exploit Prototyping Framework', proficiency: 'ADVANCED' },
      { name: 'Bash / PowerShell', type: 'Environment & Tooling Automation', proficiency: 'ADVANCED' },
      { name: 'Docker & Linux Labs', type: 'Isolated Research Sandboxes', proficiency: 'ADVANCED' },
    ],
  },
];
