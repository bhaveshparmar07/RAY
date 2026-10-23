/**
 * Core type definitions for Null Terminus.
 */

/** Vulnerability classification categories. */
export type VulnClass =
  | 'XSS'
  | 'SQLi'
  | 'CSRF'
  | 'IDOR'
  | 'SSRF'
  | 'RCE'
  | 'BAC'
  | 'BOLA'
  | 'PathTraversal'
  | 'AuthBypass'
  | 'Other';

/** CVSS severity tier. */
export type Severity = 'critical' | 'high' | 'medium' | 'low';

/** Disclosure / patch status. */
export type Status = 'patched' | 'unpatched' | 'disputed';

/** Conceptual cluster for the atlas map. */
export type Cluster = 'Web Apps' | 'APIs' | 'Infrastructure' | 'Auth';

/**
 * Normalized position in the abstract atlas space (0–1 range).
 * Positions are artistic, mapped by meaning not geography.
 */
export interface AtlasCoordinate {
  x: number; // 0–1
  y: number; // 0–1
  cluster: Cluster;
}

/** A single step in an exploit chain. */
export interface ExploitStep {
  step: number;
  action: string;
  detail: string;
}

/**
 * Full CVE entry — the canonical data shape for a finding.
 * Adding a new case file means pushing one of these into `data/cves.ts`.
 */
export interface CVEEntry {
  /** CVE identifier, e.g. "CVE-2024-48231" */
  id: string;

  /** Human-readable title. */
  title: string;

  /** Target system / application name. */
  target: string;

  /** Affected version string. */
  targetVersion: string;

  /** CWE identifier, e.g. "CWE-89". */
  cwe: string;

  /** CWE human label, e.g. "SQL Injection". */
  cweLabel: string;

  /** High-level vulnerability class for filtering. */
  vulnClass: VulnClass;

  /** CVSS v3.1 base score (0–10). */
  cvss: number;

  /** Full CVSS vector string, when published by the CNA. */
  cvssVector?: string;

  /** Severity tier derived from CVSS. */
  severity: Severity;

  /** Current disclosure / patch status. */
  status: Status;

  /** Position on the abstract atlas map. */
  coordinates: AtlasCoordinate;

  /** Key dates in the disclosure lifecycle. */
  dates: {
    found: string;     // ISO date
    reported: string;  // ISO date
    reserved?: string; // ISO date
    vendorContacted?: string; // ISO date
    patched?: string;  // ISO date — absent if unpatched
    disclosed: string; // ISO date
  };

  /** Executive summary paragraph. */
  summary: string;

  /** Root cause analysis. */
  rootCause: string;

  /** Affected version range string. */
  affectedVersions: string;

  /** Step-by-step exploit chain. */
  chain: ExploitStep[];

  /** Outcome / resolution paragraph. */
  outcome: string;

  /** External reference URLs. */
  references: string[];
}
