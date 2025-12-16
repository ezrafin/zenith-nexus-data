import type { Company } from './types';
import { delay } from './utils';

// Dev-only mock companies data used before full backend integration.
const mockCompanies: Company[] = [
  {
    slug: 'nvidia',
    name: 'NVIDIA Corporation',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Nvidia_image_logo.svg/200px-Nvidia_image_logo.svg.png',
    sector: 'Technology',
    description: 'Leading designer of graphics processing units and AI computing platforms.',
    overview: 'NVIDIA Corporation is an American multinational technology company...',
    founded: '1993',
    headquarters: 'Santa Clara, CA',
    employees: '26,000+',
    marketCap: '$1.2T',
  },
];

export async function fetchCompanies(): Promise<Company[]> {
  // In production we avoid serving mock company data; return empty array instead.
  await delay(200);
  if (!import.meta.env.DEV) {
    return [];
  }
  return mockCompanies;
}

export async function fetchCompanyBySlug(slug: string): Promise<Company | null> {
  // In production, prefer real data; this mock helper is dev-only.
  await delay(200);
  if (!import.meta.env.DEV) {
    return null;
  }
  return mockCompanies.find(c => c.slug === slug) || null;
}
