/**
 * Site-wide configuration.
 * ─────────────────────────
 * Single source of truth for identity, links, and metadata.
 */

export const SITE = {
  /** Display handle — shown in the hero and header. */
  handle: 'RAY',

  /** Real name. */
  realName: 'Bhaveshkumar Parmar',

  /** Role / title line beneath the handle. */
  role: 'Cybersecurity Researcher',

  /** Secondary focus areas. */
  specialization: 'Malware Analysis, Digital Forensics & Threat Research',

  /** Tagline used in metadata and OG description. */
  tagline: 'Everything is secure... until someone asks, "What if?"',

  /** Site title for <head>. */
  title: 'RAY (Bhaveshkumar Parmar) // Cybersecurity Researcher',

  /** Meta description. */
  description:
    'Cybersecurity Researcher (M.Sc. Cybersecurity & Forensic Science). Author of CVE-2026-16577. Specializing in malware analysis, reverse engineering, digital forensics, and CTFs.',

  /** OG image path (relative to /public). */
  ogImage: '/og-image.png',

  /** Location. */
  location: 'Ahmedabad, Gujarat, India',

  /** Hero quote. */
  heroQuote: 'Security is a myth',

  /** External profile links. */
  links: {
    email: 'mailto:parmarbhavesh2075@gmail.com',
    hackerone: 'https://hackerone.com/ethen_3616',
    ctftime: 'https://ctftime.org/user/263827',
    github: 'https://github.com/bhaveshparmar07',
    twitter_x: 'https://x.com/___bhavesh_07',
    linkedin: 'https://www.linkedin.com/in/bhavesh-parmar-ray-219283269',
  },
} as const;
