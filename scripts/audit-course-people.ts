#!/usr/bin/env tsx
/**
 * Script to audit all course authors and mentors
 * Extracts unique names from LearningCoursePage and educationArticles
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PersonInfo {
  name: string;
  source: string;
  avatarUrl?: string;
}

const people: PersonInfo[] = [];

// Extract from LearningCoursePage.tsx
const learningCoursePagePath = path.join(__dirname, '../src/pages/education/LearningCoursePage.tsx');
const learningCoursePageContent = fs.readFileSync(learningCoursePagePath, 'utf-8');

// Find instructors array
const instructorsMatch = learningCoursePageContent.match(/const instructors = \[([\s\S]*?)\];/);
if (instructorsMatch) {
  const instructorsContent = instructorsMatch[1];
  // Extract name and image from each instructor object
  const instructorMatches = instructorsContent.matchAll(/name:\s*['"]([^'"]+)['"][\s\S]*?image:\s*['"]([^'"]+)['"]/g);
  for (const match of instructorMatches) {
    people.push({
      name: match[1],
      source: 'LearningCoursePage.tsx',
      avatarUrl: match[2],
    });
  }
}

// Extract from educationArticles.ts
const educationArticlesPath = path.join(__dirname, '../src/data/educationArticles.ts');
const educationArticlesContent = fs.readFileSync(educationArticlesPath, 'utf-8');

// Find all author fields
const authorMatches = educationArticlesContent.matchAll(/author:\s*['"]([^'"]+)['"]/g);
for (const match of authorMatches) {
  const name = match[1];
  // Check if we already have this person
  if (!people.find(p => p.name === name && p.source === 'educationArticles.ts')) {
    people.push({
      name,
      source: 'educationArticles.ts',
    });
  }
}

// Extract from utils.ts authorAvatars
const utilsPath = path.join(__dirname, '../src/lib/api/utils.ts');
const utilsContent = fs.readFileSync(utilsPath, 'utf-8');

const avatarMatches = utilsContent.matchAll(/['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/g);
for (const match of avatarMatches) {
  const name = match[1];
  const avatarUrl = match[2];
  // Only add if it's a person name (not a category or other key)
  if (avatarUrl.includes('unsplash.com/photo-') || avatarUrl.includes('dicebear')) {
    const existing = people.find(p => p.name === name);
    if (existing && !existing.avatarUrl) {
      existing.avatarUrl = avatarUrl;
    } else if (!existing) {
      people.push({
        name,
        source: 'utils.ts (authorAvatars)',
        avatarUrl,
      });
    }
  }
}

// Group by normalized name to find duplicates
interface GroupedPerson {
  normalizedName: string;
  variations: PersonInfo[];
  avatarUrls: Set<string>;
}

function normalizeName(name: string): string {
  // Remove prefixes like Dr., Prof., etc.
  let normalized = name
    .replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, '')
    .trim();
  // Remove credentials like CFA, CMT, etc.
  normalized = normalized.replace(/\s*,\s*(CFA|CMT|CAIA|PhD|MBA|CPA).*$/i, '');
  // Convert to lowercase for comparison
  return normalized.toLowerCase();
}

const grouped: Map<string, GroupedPerson> = new Map();

for (const person of people) {
  const normalized = normalizeName(person.name);
  if (!grouped.has(normalized)) {
    grouped.set(normalized, {
      normalizedName: normalized,
      variations: [],
      avatarUrls: new Set(),
    });
  }
  const group = grouped.get(normalized)!;
  group.variations.push(person);
  if (person.avatarUrl) {
    group.avatarUrls.add(person.avatarUrl);
  }
}

// Find duplicate avatars
const avatarToPeople: Map<string, string[]> = new Map();
for (const person of people) {
  if (person.avatarUrl) {
    if (!avatarToPeople.has(person.avatarUrl)) {
      avatarToPeople.set(person.avatarUrl, []);
    }
    avatarToPeople.get(person.avatarUrl)!.push(person.name);
  }
}

const duplicates = Array.from(avatarToPeople.entries()).filter(([_, names]) => names.length > 1);

// Output results
console.log('=== Course Authors & Mentors Audit ===\n');
console.log(`Total unique people found: ${grouped.size}`);
console.log(`Total name variations: ${people.length}\n`);

console.log('=== People by Normalized Name ===');
for (const [normalized, group] of Array.from(grouped.entries()).sort()) {
  console.log(`\n${normalized}:`);
  for (const variation of group.variations) {
    console.log(`  - "${variation.name}" (${variation.source})`);
    if (variation.avatarUrl) {
      console.log(`    Avatar: ${variation.avatarUrl}`);
    }
  }
  if (group.avatarUrls.size > 1) {
    console.log(`  ⚠️  WARNING: Multiple avatars for this person!`);
  }
}

if (duplicates.length > 0) {
  console.log('\n=== Duplicate Avatars ===');
  for (const [avatarUrl, names] of duplicates) {
    console.log(`\nAvatar: ${avatarUrl}`);
    console.log(`Used by: ${names.join(', ')}`);
  }
} else {
  console.log('\n✅ No duplicate avatars found!');
}

// Generate JSON output for further processing
const output = {
  totalPeople: grouped.size,
  totalVariations: people.length,
  people: Array.from(grouped.values()).map(g => ({
    normalizedName: g.normalizedName,
    variations: g.variations,
    avatarUrls: Array.from(g.avatarUrls),
  })),
  duplicateAvatars: duplicates.map(([url, names]) => ({ url, names })),
};

fs.writeFileSync(
  path.join(__dirname, '../course-people-audit.json'),
  JSON.stringify(output, null, 2)
);

console.log('\n=== Audit complete ===');
console.log('Results saved to course-people-audit.json');

