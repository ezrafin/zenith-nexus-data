import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get slug from command line argument or use default
const slug = process.argv[2] || 'etf-strategies-for-long-term-wealth-building';

// Get Pexels API key from environment variable or command line argument
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || process.argv[3];

if (!PEXELS_API_KEY) {
  console.error('Error: PEXELS_API_KEY is required. Set it as environment variable or pass as second argument.');
  console.error('Usage: node scripts/download-single-image.js <slug> <PEXELS_API_KEY>');
  process.exit(1);
}

// Create analytics directory
const analyticsDir = path.join(__dirname, '..', 'public', 'analytics');
if (!fs.existsSync(analyticsDir)) {
  fs.mkdirSync(analyticsDir, { recursive: true });
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

// Stop words to exclude from keywords
const STOP_WORDS = new Set([
  'and', 'the', 'for', 'in', 'of', 'to', 'a', 'an', 'on', 'at', 'by', 'with',
  'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
  'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'it',
  'its', 'or', 'but', 'not', 'if', 'then', 'than', 'so', 'such', 'more',
  'most', 'very', 'just', 'only', 'also', 'too', 'well', 'now', 'here',
  'there', 'when', 'where', 'why', 'how', 'all', 'each', 'both', 'few',
  'many', 'other', 'some', 'same', 'own', 'new', 'old', 'first', 'last',
  'next', 'previous', 'another', 'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten', 'vs', 'versus', 'vs-', 'the-'
]);

// Function to extract keywords from slug
function extractKeywords(slug) {
  // Split slug by hyphens and filter out stop words and short words
  const words = slug
    .split('-')
    .filter(word => {
      // Remove stop words, numbers, and very short words
      return word.length > 2 && 
             !STOP_WORDS.has(word.toLowerCase()) && 
             !/^\d+$/.test(word);
    })
    .map(word => word.toLowerCase());

  // Prioritize thematic words (first 3-5 words are usually most important)
  // Also add finance/business context for better relevance
  const keywords = words.slice(0, 5).join(' ');
  
  // Add finance/business context if not already present
  const hasFinanceContext = words.some(w => 
    ['finance', 'investment', 'market', 'trading', 'business', 'economic', 'financial'].includes(w)
  );
  
  if (!hasFinanceContext && keywords) {
    return `${keywords} finance business`;
  }
  
  return keywords || 'finance business investment';
}

// Function to search Pexels API for relevant image
async function searchPexelsImage(keywords, apiKey) {
  return new Promise((resolve, reject) => {
    const encodedKeywords = encodeURIComponent(keywords);
    const url = `https://api.pexels.com/v1/search?query=${encodedKeywords}&per_page=1&orientation=landscape&size=large`;
    
    const options = {
      headers: {
        'Authorization': apiKey
      }
    };

    https.get(url, options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            if (json.photos && json.photos.length > 0) {
              // Get the largest available size (preferably 1600x900 or closest)
              const photo = json.photos[0];
              const src = photo.src;
              
              // Prefer large landscape image
              const imageUrl = src.large2x || src.large || src.medium || src.original;
              resolve(imageUrl);
            } else {
              reject(new Error('No images found'));
            }
          } catch (error) {
            reject(new Error(`Failed to parse Pexels response: ${error.message}`));
          }
        } else if (response.statusCode === 429) {
          // Rate limit exceeded
          reject(new Error('Rate limit exceeded'));
        } else {
          reject(new Error(`Pexels API error: ${response.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to generate seed from slug for deterministic images (fallback)
function getSeedFromSlug(slug) {
  const hash = createHash('md5').update(slug).digest('hex');
  // Convert first 8 hex chars to number (for Picsum seed)
  return parseInt(hash.substring(0, 8), 16);
}

// Function to get Picsum fallback URL
function getPicsumFallbackUrl(slug) {
  const seed = getSeedFromSlug(slug);
  // Picsum Photos with seed - gives deterministic unique images
  // Size: 1600x900 (wide aspect ratio for analytics cards)
  return `https://picsum.photos/seed/${seed}/1600/900`;
}

// Function to get image URL - try Pexels first, fallback to Picsum
async function getImageUrl(slug, apiKey) {
  try {
    const keywords = extractKeywords(slug);
    console.log(`Keywords: ${keywords}`);
    const pexelsUrl = await searchPexelsImage(keywords, apiKey);
    return { url: pexelsUrl, source: 'pexels' };
  } catch (error) {
    console.warn(`Pexels failed: ${error.message}, using Picsum fallback`);
    return { url: getPicsumFallbackUrl(slug), source: 'picsum' };
  }
}

async function downloadSingleImage() {
  const imagePath = path.join(analyticsDir, `${slug}.jpg`);
  
  // Skip if already exists
  if (fs.existsSync(imagePath)) {
    console.log(`File ${slug}.jpg already exists`);
    return;
  }

  try {
    console.log(`Processing ${slug}.jpg...`);
    
    // Get image URL (Pexels with Picsum fallback)
    const { url: imageUrl, source } = await getImageUrl(slug, PEXELS_API_KEY);
    
    console.log(`Downloading from ${source}...`);
    await downloadImage(imageUrl, imagePath);
    
    console.log(`✓ Downloaded ${slug}.jpg (${source})`);
  } catch (error) {
    console.error(`✗ Failed to download ${slug}.jpg: ${error.message}`);
    process.exit(1);
  }
}

// Run
downloadSingleImage().catch(console.error);

