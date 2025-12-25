import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// All available theme classes
const ALL_THEMES = ['dark', 'glacier', 'harvest', 'lavender', 'brutalist', 'obsidian', 'orchid', 'solar', 'tide', 'verdant'];

// Apply theme on initial load
function applyInitialTheme() {
  try {
    const html = document.documentElement;
    // Remove all theme classes first
    ALL_THEMES.forEach(theme => html.classList.remove(theme));
    
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      const preferences = JSON.parse(saved);
      if (preferences.theme && ALL_THEMES.includes(preferences.theme)) {
        html.classList.add(preferences.theme);
        return;
      }
    }
    // Default to dark theme
    html.classList.add('dark');
  } catch (e) {
    // If error, default to dark
    document.documentElement.classList.add('dark');
  }
}

// Apply theme before React renders
applyInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
