/**
 * Utility functions for preloading images to improve perceived performance
 */

/**
 * Preload a single image by creating an Image object and loading it
 * @param url - The URL of the image to preload
 * @returns Promise that resolves when the image is loaded or fails
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Skip if URL is empty or invalid
    if (!url || typeof url !== 'string') {
      resolve();
      return;
    }

    // Check if image is already cached
    const img = new Image();
    
    img.onload = () => {
      resolve();
    };
    
    img.onerror = () => {
      // Don't reject - just resolve silently to avoid blocking other preloads
      // Image might fail to load, but that's okay - it will fallback to icon component
      resolve();
    };
    
    // Start loading
    img.src = url;
  });
}

/**
 * Preload multiple images in parallel
 * @param urls - Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded or failed
 */
export function preloadImages(urls: string[]): Promise<void> {
  if (!urls || urls.length === 0) {
    return Promise.resolve();
  }

  // Filter out empty/invalid URLs and duplicates
  const validUrls = Array.from(new Set(urls.filter(url => url && typeof url === 'string')));
  
  if (validUrls.length === 0) {
    return Promise.resolve();
  }

  // Preload all images in parallel
  return Promise.all(validUrls.map(url => preloadImage(url))).then(() => {
    // All images loaded (or failed gracefully)
  });
}

