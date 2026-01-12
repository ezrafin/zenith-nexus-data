/**
 * Unified registry of course authors, mentors, and instructors
 * Each person has a unique avatar that is used consistently across the site
 */

export interface CoursePerson {
  id: string; // unique identifier (e.g., 'michael-torres')
  canonicalName: string; // canonical name (e.g., 'Michael Torres')
  nameVariations: string[]; // name variations (e.g., ['Dr. Michael Torres', 'Michael Torres'])
  avatarUrl: string; // unique avatar URL
  role: 'author' | 'mentor' | 'instructor';
}

/**
 * Normalize a person's name by removing prefixes and credentials
 */
export function normalizePersonName(name: string): string {
  // Remove prefixes like Dr., Prof., etc.
  let normalized = name
    .replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, '')
    .trim();
  // Remove credentials like CFA, CMT, etc.
  normalized = normalized.replace(/\s*,\s*(CFA|CMT|CAIA|PhD|MBA|CPA).*$/i, '');
  return normalized;
}

/**
 * Get person by any name variation (with normalization)
 */
export function getPersonByAnyName(name: string): CoursePerson | undefined {
  const normalized = normalizePersonName(name).toLowerCase();
  return coursePeople.find(
    (person) =>
      person.canonicalName.toLowerCase() === normalized ||
      person.nameVariations.some(
        (variation) => normalizePersonName(variation).toLowerCase() === normalized
      )
  );
}

/**
 * Get avatar URL for a person by name
 */
export function getPersonAvatar(name: string): string | undefined {
  const person = getPersonByAnyName(name);
  return person?.avatarUrl;
}

/**
 * All course-related people with unique avatars
 * Each avatar URL is unique and used only by one person
 */
export const coursePeople: CoursePerson[] = [
  // Course Instructors (from LearningCoursePage)
  {
    id: 'michael-torres',
    canonicalName: 'Michael Torres',
    nameVariations: ['Dr. Michael Torres', 'Michael Torres'],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    role: 'instructor',
  },
  {
    id: 'sarah-mitchell',
    canonicalName: 'Sarah Mitchell',
    nameVariations: ['Sarah Mitchell'],
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    role: 'instructor',
  },
  {
    id: 'james-chen',
    canonicalName: 'James Chen',
    nameVariations: ['James Chen'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    role: 'instructor',
  },

  // Education Article Authors
  {
    id: 'amanda-foster',
    canonicalName: 'Amanda Foster',
    nameVariations: ['Dr. Amanda Foster'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'robert-nash',
    canonicalName: 'Robert Nash',
    nameVariations: ['Robert Nash'],
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'lisa-wong',
    canonicalName: 'Lisa Wong',
    nameVariations: ['Lisa Wong'],
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'david-park',
    canonicalName: 'David Park',
    nameVariations: ['David Park'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'jennifer-blake',
    canonicalName: 'Jennifer Blake',
    nameVariations: ['Dr. Jennifer Blake'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'mark-thompson',
    canonicalName: 'Mark Thompson',
    nameVariations: ['Mark Thompson'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'patricia-lee',
    canonicalName: 'Patricia Lee',
    nameVariations: ['Patricia Lee'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'christopher-adams',
    canonicalName: 'Christopher Adams',
    nameVariations: ['Christopher Adams'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'william-chen',
    canonicalName: 'William Chen',
    nameVariations: ['Dr. William Chen'],
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },

  // Site Authors (from authors.ts / utils.ts)
  {
    id: 'christina-summerbell',
    canonicalName: 'Christina Summerbell',
    nameVariations: ['Christina Summerbell'],
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'assunta-novak',
    canonicalName: 'Assunta Novak',
    nameVariations: ['Assunta Novak'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'lysander-truog',
    canonicalName: 'Lysander Truog',
    nameVariations: ['Lysander Truog'],
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'elias-wolfenstein',
    canonicalName: 'Elias Wolfenstein',
    nameVariations: ['Elias Wolfenstein'],
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'anastasia-petrova',
    canonicalName: 'Anastasia Petrova',
    nameVariations: ['Anastasia Petrova'],
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'luca-montefiore',
    canonicalName: 'Luca Montefiore',
    nameVariations: ['Luca Montefiore'],
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'isabelle-dubois',
    canonicalName: 'Isabelle Dubois',
    nameVariations: ['Isabelle Dubois'],
    avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'xu-meiling',
    canonicalName: 'Xu Meiling',
    nameVariations: ['Xu Meiling'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },

  // Legacy/Additional Authors (from utils.ts)
  {
    id: 'sarah-chen',
    canonicalName: 'Sarah Chen',
    nameVariations: ['Sarah Chen, CFA', 'Sarah Chen'],
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'lisa-wang',
    canonicalName: 'Lisa Wang',
    nameVariations: ['Lisa Wang'],
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'james-mitchell',
    canonicalName: 'James Mitchell',
    nameVariations: ['James Mitchell'],
    avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'emily-rodriguez',
    canonicalName: 'Emily Rodriguez',
    nameVariations: ['Emily Rodriguez'],
    avatarUrl: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'robert-kim',
    canonicalName: 'Robert Kim',
    nameVariations: ['Robert Kim'],
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'anna-kowalski',
    canonicalName: 'Anna Kowalski',
    nameVariations: ['Anna Kowalski'],
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'marcus-johnson',
    canonicalName: 'Marcus Johnson',
    nameVariations: ['Marcus Johnson'],
    avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'sofia-martinez',
    canonicalName: 'Sofia Martinez',
    nameVariations: ['Sofia Martinez'],
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'alexander-wright',
    canonicalName: 'Alexander Wright',
    nameVariations: ['Alexander Wright'],
    avatarUrl: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'catherine-lee',
    canonicalName: 'Catherine Lee',
    nameVariations: ['Catherine Lee'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'thomas-anderson',
    canonicalName: 'Thomas Anderson',
    nameVariations: ['Thomas Anderson'],
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'jennifer-white',
    canonicalName: 'Jennifer White',
    nameVariations: ['Jennifer White'],
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'daniel-brown',
    canonicalName: 'Daniel Brown',
    nameVariations: ['Daniel Brown'],
    avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'rachel-green',
    canonicalName: 'Rachel Green',
    nameVariations: ['Rachel Green'],
    avatarUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'kevin-zhang',
    canonicalName: 'Kevin Zhang',
    nameVariations: ['Kevin Zhang'],
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'amanda-taylor',
    canonicalName: 'Amanda Taylor',
    nameVariations: ['Amanda Taylor'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
  {
    id: 'ryan-murphy',
    canonicalName: 'Ryan Murphy',
    nameVariations: ['Ryan Murphy'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    role: 'author',
  },
];

