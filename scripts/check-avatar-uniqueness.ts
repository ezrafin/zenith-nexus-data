#!/usr/bin/env tsx
/**
 * Script to check avatar uniqueness in coursePeople registry
 */

import { coursePeople } from '../src/data/coursePeople';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarToPeople: Map<string, string[]> = new Map();

for (const person of coursePeople) {
  if (!avatarToPeople.has(person.avatarUrl)) {
    avatarToPeople.set(person.avatarUrl, []);
  }
  avatarToPeople.get(person.avatarUrl)!.push(person.canonicalName);
}

const duplicates = Array.from(avatarToPeople.entries()).filter(([_, names]) => names.length > 1);

console.log('=== Avatar Uniqueness Check ===\n');
console.log(`Total people: ${coursePeople.length}`);
console.log(`Total unique avatars: ${avatarToPeople.size}\n`);

if (duplicates.length > 0) {
  console.log('❌ DUPLICATE AVATARS FOUND:\n');
  for (const [avatarUrl, names] of duplicates) {
    console.log(`Avatar: ${avatarUrl}`);
    console.log(`Used by: ${names.join(', ')}\n`);
  }
  process.exit(1);
} else {
  console.log('✅ All avatars are unique!');
  process.exit(0);
}

