import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply theme on initial load
function applyInitialTheme() {
  try {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      const preferences = JSON.parse(saved);
      if (preferences.theme) {
        const html = document.documentElement;
        html.classList.remove('light', 'dark', 'desert');
        html.classList.add(preferences.theme);
      }
    } else {
      // Default to dark theme
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    // If error, default to dark
    document.documentElement.classList.add('dark');
  }
}

// Apply theme before React renders
applyInitialTheme();

createRoot(document.getElementById("root")!).render(<App />);
