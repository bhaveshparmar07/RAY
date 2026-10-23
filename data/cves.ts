import { CVEEntry } from '@/lib/types';

export const CVE_DATA: CVEEntry[] = [
  {
    id: 'CVE-2026-16577',
    title: 'Dokan WooCommerce Multivendor Marketplace - Incorrect Authorization in Reverse-Withdrawal Payment Validation',
    target: 'Dokan (dokan-lite)',
    targetVersion: '< 5.0.14',
    cwe: 'CWE-863',
    cweLabel: 'Incorrect Authorization',
    vulnClass: 'BAC',
    cvss: 2.7,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:N/I:L/A:N',
    severity: 'low',
    status: 'patched',
    coordinates: {
      x: 0.42,
      y: 0.38,
      cluster: 'Web Apps',
    },
    dates: {
      found: '2026-07-15',
      reported: '2026-07-20',
      reserved: '2026-07-22',
      vendorContacted: '2026-07-22',
      patched: '2026-08-17',
      disclosed: '2026-08-19',
    },
    summary:
      'The Dokan WooCommerce Multivendor Marketplace plugin (30,000+ active installations) did not validate a client-supplied payment amount against the vendor\'s actual outstanding reverse-withdrawal balance when recording a payment transaction. An authenticated vendor with an existing commission debt could supply an arbitrarily large amount to the reverse-withdrawal add-to-cart endpoint, causing the system to credit their ledger with a fraudulent balance — flipping their due-status to clear and disabling enforcement actions without paying their real debt.',
    rootCause:
      'The POST /dokan/v1/reverse-withdrawal/add-to-cart REST endpoint accepted a client-supplied amount parameter with no server-side validation against Helper::get_vendor_due_status(). The amount was passed directly into Cart::woocommerce_custom_price_to_cart_item(), which set the WooCommerce cart item price to the attacker-controlled value. On checkout completion, Order::insert_payment() read the amount back from the order line-item meta and credited exactly that amount to the vendor\'s reverse-withdrawal ledger as a vendor_payment transaction with no reconciliation against the real outstanding balance.',
    affectedVersions: '< 5.0.14 (Fixed in v5.0.14)',
    chain: [
      {
        step: 1,
        action: 'Debt Generation & Endpoint Recon',
        detail:
          'Identified that POST /dokan/v1/reverse-withdrawal/add-to-cart accepted arbitrary amount parameters with an active ₹110 commission debt.',
      },
      {
        step: 2,
        action: 'Arbitrary Amount Cart Injection',
        detail:
          'Submitted an inflated payment amount of ₹999,999 to the vulnerable endpoint and selected Cash-on-Delivery as the standard payment method.',
      },
      {
        step: 3,
        action: 'Order Completion & Ledger Credit',
        detail:
          'Upon administrative completion of the order, Order::insert_payment() credited the full ₹999,999 directly into the vendor reverse-withdrawal ledger without balance verification.',
      },
      {
        step: 4,
        action: 'Enforcement Bypass & Negative Balance Lock',
        detail:
          'Vendor due status flipped from balance ₹110 (restricted) to -₹999,889 (clear), indefinitely disabling platform enforcement and drawing down future commissions against the fake credit.',
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
    cwe: 'CWE-862',
    cweLabel: 'Missing Authorization',
    vulnClass: 'BOLA',
    cvss: 4.3,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N',
    severity: 'medium',
    status: 'patched',
    coordinates: {
      x: 0.62,
      y: 0.28,
      cluster: 'Auth',
    },
    dates: {
      found: '2026-08-01',
      reported: '2026-08-15',
      reserved: '2026-09-02',
      disclosed: '2026-09-02',
      patched: '2026-09-02',
    },
    summary:
      'The WC Vendors WordPress plugin before 2.7.2.1 does not verify that the authenticated vendor submitting a front-end order shipment status change actually owns the referenced order. Any authenticated vendor could mark another vendor\'s order as shipped, inject a fraudulent order note falsely attributed to the victim vendor, and trigger the customer shipment notification email — impersonating a peer vendor and corrupting order-state integrity across the marketplace.',
    rootCause:
      'The front-end shipment status update handler accepted a vendor-supplied order ID without performing an ownership check comparing the order\'s assigned vendor against the currently authenticated user. The missing object-level authorization check (CWE-862) allowed cross-vendor order manipulation. No capability or nonce verification tied the action to the object owner, making the endpoint vulnerable to any subscriber-level or vendor-role user.',
    affectedVersions: '< 2.7.2.1 (Fixed in v2.7.2.1)',
    chain: [
      {
        step: 1,
        action: 'Cross-Vendor Order ID Enumeration',
        detail:
          'Identified that the front-end shipment update endpoint accepted an arbitrary order ID parameter without restricting it to the authenticated vendor\'s own orders.',
      },
      {
        step: 2,
        action: 'Unauthorized Shipment Status Mutation',
        detail:
          'Submitted a shipment status update request referencing a victim vendor\'s order ID, which the system processed without any ownership verification.',
      },
      {
        step: 3,
        action: 'Order Note Injection & Customer Notification Trigger',
        detail:
          'The system attached an order note falsely attributed to the victim vendor\'s account and dispatched the customer shipment notification email, creating fraudulent shipping records.',
      },
    ],
    outcome:
      'WC Vendors patched the vulnerability in v2.7.2.1 by adding object-level authorization checks to confirm the requesting vendor owns the order before allowing any shipment status updates. Published 2026-09-02 by WPScan (CNA: contact@wpscan.com).',
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
    cwe: 'CWE-918',
    cweLabel: 'Server-Side Request Forgery (SSRF)',
    vulnClass: 'SSRF',
    cvss: 5.0,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:L/I:N/A:N',
    severity: 'medium',
    status: 'patched',
    coordinates: {
      x: 0.72,
      y: 0.55,
      cluster: 'APIs',
    },
    dates: {
      found: '2026-09-01',
      reported: '2026-09-10',
      reserved: '2026-09-23',
      disclosed: '2026-09-23',
      patched: '2026-09-23',
    },
    summary:
      'The Directorist WordPress plugin before 8.9.5 does not validate a user-supplied URL before fetching it server-side, allowing authenticated users with subscriber-level access or above to make the server issue HTTP requests to arbitrary internal or external addresses. This classic SSRF condition (CWE-918) enables an attacker to probe internal network topology, interact with cloud metadata endpoints (e.g. AWS IMDSv1), and exfiltrate environment-level secrets not directly exposed to the public internet.',
    rootCause:
      'A server-side URL fetch handler accepted a user-supplied URL parameter without validating the scheme, host, or destination against an allowlist. No DNS rebinding or SSRF mitigations (blocked IP ranges, allowlist enforcement, or redirect follow limits) were applied before the HTTP request was dispatched. The Scope: Changed (S:C) CVSS vector confirms the vulnerability crosses a security boundary — the web application perimeter — enabling lateral movement into internal infrastructure.',
    affectedVersions: '< 8.9.5 (Fixed in v8.9.5)',
    chain: [
      {
        step: 1,
        action: 'SSRF Endpoint Discovery',
        detail:
          'Located the URL fetch endpoint accessible to subscriber-role authenticated users with no additional privilege requirements.',
      },
      {
        step: 2,
        action: 'Internal Address Probing',
        detail:
          'Submitted requests targeting internal RFC-1918 addresses (e.g. 169.254.169.254 for cloud metadata, 10.x.x.x for internal services) to map accessible internal infrastructure.',
      },
      {
        step: 3,
        action: 'Metadata & Secret Exfiltration',
        detail:
          'Server-side fetch returned internal service responses including cloud instance metadata, confirming cross-boundary information disclosure via the SSRF vector.',
      },
    ],
    outcome:
      'Directorist patched the vulnerability in v8.9.5 by implementing URL validation to block server-side requests to internal or unintended destinations. Published 2026-09-23 by WPScan (CNA: contact@wpscan.com).',
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
    cwe: 'CWE-22',
    cweLabel: 'Path Traversal',
    vulnClass: 'PathTraversal',
    cvss: 6.6,
    cvssVector: 'CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:U/C:H/I:H/A:H',
    severity: 'medium',
    status: 'patched',
    coordinates: {
      x: 0.28,
      y: 0.65,
      cluster: 'Web Apps',
    },
    dates: {
      found: '2026-09-15',
      reported: '2026-09-25',
      reserved: '2026-10-08',
      disclosed: '2026-10-08',
      patched: '2026-10-08',
    },
    summary:
      'The BackWPup WordPress plugin before 5.7.7 does not properly restrict the destination path of files extracted during a backup restore when its fallback archive library is used. High-privileged users can write files outside the intended restore directory via path traversal sequences (CWE-22), potentially achieving remote code execution by placing a crafted PHP file in a web-accessible directory.',
    rootCause:
      'The fallback archive extraction library did not sanitize or canonicalize file paths within the backup archive before writing them to disk. Compressed entries containing directory traversal sequences (e.g. ../../) in their filename paths were extracted verbatim relative to the restore base directory. A crafted backup archive with a PHP payload at a traversed path (e.g. ../../wp-content/uploads/shell.php) would write the file outside the intended restore target, making it web-accessible and executable by the server.',
    affectedVersions: '< 5.7.7 (Fixed in v5.7.7)',
    chain: [
      {
        step: 1,
        action: 'Crafted Backup Archive Preparation',
        detail:
          'Constructed a ZIP/TAR backup archive containing a PHP webshell payload with a path traversal sequence (../../wp-content/uploads/shell.php) in the file entry name.',
      },
      {
        step: 2,
        action: 'Backup Restore Trigger via Fallback Library',
        detail:
          'Initiated the backup restore process using the vulnerable fallback archive extraction path, supplying the crafted archive. The library extracted the traversed path without sanitization.',
      },
      {
        step: 3,
        action: 'Out-of-Directory File Write',
        detail:
          'The PHP payload was written to wp-content/uploads/ (or another web-accessible location) outside the intended restore directory due to the unresolved traversal sequence.',
      },
      {
        step: 4,
        action: 'Remote Code Execution',
        detail:
          'The attacker-controlled PHP file was accessible over HTTP, enabling arbitrary server-side code execution with the web server process privileges.',
      },
    ],
    outcome:
      'BackWPup patched the vulnerability in v5.7.7 by implementing path canonicalization and boundary checks in the archive extraction routine to ensure all extracted files remain within the designated restore directory. Published 2026-10-08 by WPScan (CNA: contact@wpscan.com).',
    references: [
      'https://wpscan.com/vulnerability/be8c0eab-1874-4490-b94e-394f62a522f3',
      'https://www.cve.org/CVERecord?id=CVE-2026-86828',
      'https://nvd.nist.gov/vuln/detail/CVE-2026-86828',
    ],
  },
];
