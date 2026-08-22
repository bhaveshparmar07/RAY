# Null Terminus

Null Terminus is a high-performance, award-tier personal portfolio designed for a security researcher. It features a seamless, multi-layered "descent" navigation experience with interactive 3D elements and cinematic effects.

## Tech Stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS v4
- React Three Fiber / Drei (Three.js)
- GSAP & Lenis (Smooth Scrolling)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to add a new CVE case file

1. Open `data/cves.ts`.
2. Add a new `CVEEntry` object to the `CVE_DATA` array.
3. Fields to fill:
   - `id`: The CVE ID (e.g., 'CVE-2024-12345')
   - `title`: Short title of the vulnerability
   - `target`: The affected system/software (e.g., 'Acme CMS')
   - `targetVersion`: Version string (e.g., 'v3.2.1')
   - `cwe`: The CWE ID (e.g., 'CWE-89')
   - `cweLabel`: The CWE name (e.g., 'SQL Injection')
   - `vulnClass`: Class category ('XSS', 'SQLi', 'CSRF', 'IDOR', 'SSRF', 'RCE', 'BAC', 'AuthBypass', 'Other')
   - `cvss`: CVSS base score (e.g., 9.8)
   - `cvssVector`: CVSS base vector (e.g., 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H')
   - `severity`: Severity level ('critical', 'high', 'medium', 'low')
   - `status`: Patch status ('patched', 'unpatched', 'disputed')
   - `coordinates`: Spatial coordinate on the radar map `{ x: 0-1, y: 0-1, cluster: 'Web Apps' | 'APIs' | 'Infrastructure' | 'Auth' }`
   - `dates`: `{ found, reported, patched?, disclosed }`
   - `summary`: Short summary text
   - `rootCause`: Technical root cause detail
   - `affectedVersions`: Affected version description string
   - `chain`: Exploit timeline steps list `[ { step: 1, action: 'Recon', detail: '...' } ]`
   - `outcome`: Exploit resolution outcome text
   - `references`: Links array (e.g., MITRE, NVD URLs)

## Customization

- To update personal details, change `SITE.handle`, `SITE.role`, and links in `lib/site.ts` (this changes the handle across the entire page, including metadata and stamps).
- The Watchmaker About copy can be updated in `content/about.ts`.

## Deployment

Deploy easily to Vercel:

```bash
npm i -g vercel
vercel
```
Alternatively, connect your GitHub repository directly in the Vercel dashboard.

## Accessibility and Performance

This project implements `ReducedMotionProvider` for accessibility, gracefully disabling animations. It uses dynamic imports for heavy 3D elements, adapting particle counts based on device capability to maintain 60FPS.

## License
MIT
