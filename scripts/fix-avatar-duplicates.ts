#!/usr/bin/env tsx
/**
 * Script to fix duplicate avatars by assigning unique ones
 */

import { coursePeople } from '../src/data/coursePeople';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Unique Unsplash photo IDs for professional headshots
const uniquePhotoIds = [
  '1472099645785-5658abf4ff4e', // Michael Torres (keep)
  '1494790108377-be9c29b29330', // Sarah Mitchell (keep)
  '1507003211169-0a1dd7228f2d', // James Chen (keep)
  '1573496359142-b8d87734a5a2', // Amanda Foster (keep)
  '1524504388940-b1c1722653e1', // Lisa Wong (keep)
  '1544005313-94ddf0286df2', // Jennifer Blake / Assunta Novak (duplicate)
  '1519085360753-af0119f7cbe7', // Robert Nash / Robert Kim (duplicate)
  '1506794778202-cad84cf45f1d', // David Park / Lysander / Thomas / Anna / William / Daniel (many duplicates)
  '1500648767791-00dcc994a43e', // Christopher / Luca / Ryan (duplicate)
  '1534528741775-53994a69daeb', // Patricia / Xu / Amanda (duplicate)
  '1560250097-0b93528c311a', // Elias / Alexander (duplicate)
  '1438761681033-6461ffad8d80', // Anastasia / Rachel (duplicate)
  '1487412720507-e7ab37603c6f', // Isabelle / Sarah Chen (duplicate)
  '1517841905240-472988babdf9', // Lisa Wang / Sofia (duplicate)
  '1544723795-3fb6469f5b39', // James Mitchell (unique)
  '1525134479668-1bee5c7c6845', // Emily Rodriguez (unique)
  '1519345182560-3f2917c472ef', // Marcus Johnson (unique)
  '1580489944761-15a19d654956', // Catherine Lee (unique)
  // Additional unique photo IDs
  '1506794778202-cad84cf45f1d',
  '1507003211169-0a1dd7228f2d',
  '1494790108377-be9c29b29330',
  '1472099645785-5658abf4ff4e',
  '1544005313-94ddf0286df2',
  '1500648767791-00dcc994a43e',
  '1534528741775-53994a69daeb',
  '1560250097-0b93528c311a',
  '1438761681033-6461ffad8d80',
  '1487412720507-e7ab37603c6f',
  '1517841905240-472988babdf9',
];

const avatarToPeople: Map<string, string[]> = new Map();
for (const person of coursePeople) {
  if (!avatarToPeople.has(person.avatarUrl)) {
    avatarToPeople.set(person.avatarUrl, []);
  }
  avatarToPeople.get(person.avatarUrl)!.push(person.canonicalName);
}

const duplicates = Array.from(avatarToPeople.entries()).filter(([_, names]) => names.length > 1);
console.log(`Found ${duplicates.length} duplicate avatar groups`);

// For now, let's just output the current state and what needs to be fixed
console.log('\n=== Current Duplicates ===');
for (const [url, names] of duplicates) {
  console.log(`\n${url}`);
  console.log(`  Used by: ${names.join(', ')}`);
}

// Generate a mapping of person -> unique avatar
const personToUniqueAvatar = new Map<string, string>();
let photoIndex = 0;

// First, assign unique avatars to people who currently have duplicates
for (const [url, names] of duplicates) {
  // Keep the first person with this avatar, assign new ones to the rest
  for (let i = 1; i < names.length; i++) {
    // Use a different photo ID - cycle through available unique ones
    const photoId = uniquePhotoIds[photoIndex % uniquePhotoIds.length];
    const newUrl = `https://images.unsplash.com/photo-${photoId}?w=200&h=200&fit=crop&crop=face`;
    personToUniqueAvatar.set(names[i], newUrl);
    photoIndex++;
  }
}

console.log('\n=== Suggested Avatar Assignments ===');
for (const [name, url] of personToUniqueAvatar.entries()) {
  console.log(`${name}: ${url}`);
}

