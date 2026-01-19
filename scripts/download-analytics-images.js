import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read slugs
const slugsPath = path.join(__dirname, '..', 'analytics-slugs.json');
const slugs = JSON.parse(fs.readFileSync(slugsPath, 'utf8'));

// Create analytics directory
const analyticsDir = path.join(__dirname, '..', 'public', 'analytics');
if (!fs.existsSync(analyticsDir)) {
  fs.mkdirSync(analyticsDir, { recursive: true });
  console.log(`Created directory: ${analyticsDir}`);
}

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Function to generate seed from slug for deterministic images
function getSeedFromSlug(slug) {
  const hash = createHash('md5').update(slug).digest('hex');
  // Convert first 8 hex chars to number (for Picsum seed)
  return parseInt(hash.substring(0, 8), 16);
}

// Function to get image URL - using Picsum with seed for deterministic unique images
function getImageUrl(slug) {
  const seed = getSeedFromSlug(slug);
  // Picsum Photos with seed - gives deterministic unique images
  // Size: 1600x900 (wide aspect ratio for analytics cards)
  return `https://picsum.photos/seed/${seed}/1600/900`;
}

// Alternative: Using Unsplash Source (uncomment if Picsum doesn't work well)
// function getImageUrl(slug) {
//   // Extract keywords from slug for better relevance
//   const keywords = slug.split('-').slice(0, 3).join(',');
//   return `https://source.unsplash.com/1600x900/?${keywords},finance,business`;
// }

async function downloadAllImages() {
  console.log(`Starting download of ${slugs.length} images...`);
  
  let successCount = 0;
  let failCount = 0;
  const failed = [];

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const imagePath = path.join(analyticsDir, `${slug}.jpg`);
    
    // Skip if already exists
    if (fs.existsSync(imagePath)) {
      console.log(`[${i + 1}/${slugs.length}] Skipping ${slug}.jpg (already exists)`);
      successCount++;
      continue;
    }

    try {
      const imageUrl = getImageUrl(slug);
      console.log(`[${i + 1}/${slugs.length}] Downloading ${slug}.jpg...`);
      
      // Download as JPG (Picsum returns JPG)
      await downloadImage(imageUrl, imagePath);
      
      successCount++;
      console.log(`✓ Downloaded ${slug}.jpg`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      failCount++;
      failed.push(slug);
      console.error(`✗ Failed to download ${slug}.jpg: ${error.message}`);
    }
  }

  console.log('\n=== Download Summary ===');
  console.log(`Total: ${slugs.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  
  if (failed.length > 0) {
    console.log('\nFailed slugs:');
    failed.forEach(slug => console.log(`  - ${slug}`));
  }
}

// Run
downloadAllImages().catch(console.error);

