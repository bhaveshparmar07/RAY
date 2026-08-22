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
    ],
  },
];
