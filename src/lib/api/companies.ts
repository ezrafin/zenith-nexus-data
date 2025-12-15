import type { Company } from './types';
import { delay } from './utils';

// Mock Companies Data
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
  await delay(800);
  return mockCompanies;
}

export async function fetchCompanyBySlug(slug: string): Promise<Company | null> {
  await delay(500);
  return mockCompanies.find(c => c.slug === slug) || null;
}
