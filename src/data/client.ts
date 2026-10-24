/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CLIENT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Business-specific copy: name, phone, email, address, socials.
 * Imported by Header, Footer, Contact page, and Head/SEO components.
 *
 * No component should hardcode a business name or phone number —
 * everything comes from this file or brand.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const client = {
  name: 'Bakinam Construction',
  email: 'contact@bakinamconstruction.com',
  phoneForTel: '+249123009572',
  phoneFormatted: '\u200E+249 12 300 9572',
  whatsAppNumber: '249123009572',
  whatsAppUrl: 'https://wa.me/249123009572',
  license: '',
  address: {
    lineOne: 'Kafouri Block 3',
    lineTwo: 'Khartoum North (Bahri)',
    city: 'Khartoum',
    state: 'Khartoum State',
    zip: '',
    country: 'SD',
    mapLink: 'https://maps.app.goo.gl/whiUw6LDdeXT61NM7',
  },
  socials: {
    facebook: '',
    instagram: '',
    google: '',
  },
  domain: 'https://bakinamconstruction.com',
} as const;

export type Client = typeof client;
