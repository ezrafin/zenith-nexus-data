import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// All available theme classes
const ALL_THEMES = ['dark', 'glacier', 'harvest', 'lavender', 'brutalist', 'obsidian', 'orchid', 'solar', 'tide', 'verdant'];
// Legacy theme classes to remove
const LEGACY_THEMES = ['light', 'desert'];

// Apply theme on initial load
function applyInitialTheme() {
  try {
    const html = document.documentElement;
    
    // Remove all possible theme classes (current + legacy)
    [...ALL_THEMES, ...LEGACY_THEMES].forEach(theme => html.classList.remove(theme));
    
    // Try multiple localStorage keys (anonymous + any user-specific ones)
    let theme: string | null = null;
    
    // Check anonymous preferences first
    const anonPrefs = localStorage.getItem('userPreferences');
    if (anonPrefs) {
      try {
        const parsed = JSON.parse(anonPrefs);
        if (parsed.theme && ALL_THEMES.includes(parsed.theme)) {
          theme = parsed.theme;
        }
      } catch {}
    }
    
    // If no valid theme found, check all userPreferences_* keys
    if (!theme) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('userPreferences_')) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || '');
            if (parsed.theme && ALL_THEMES.includes(parsed.theme)) {
              theme = parsed.theme;
              break;
            }
          } catch {}
        }
      }
    }
    
    // Apply theme or default to dark
    html.classList.add(theme || 'dark');
  } catch (e) {
    // If error, default to dark
    document.documentElement.classList.add('dark');
  }
}

// Apply theme before React renders
applyInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
