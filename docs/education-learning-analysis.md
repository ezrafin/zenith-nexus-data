## Education / Learning Section – Scenarios, Risks, and Recommendations

### 1. Architecture Overview

- **Routes & Entry Points**
  - `/education/learning` → `LearningPage`\n    - Acts as a \"Learning Hub\" overview, aggregating both basic and advanced articles.\n    - Uses `allArticles`, `basicArticles`, `advancedArticles` from `src/data/educationArticles` (static content).\n  - `/education/basic` → `BasicArticlesPage`\n    - Focused list of beginner‑level articles.\n  - `/education/advanced` → `AdvancedArticlesPage`\n    - List of advanced/technical strategy articles.\n  - `/education/article/:articleId` → `ArticleDetailPage` (not shown above but part of flow)\n    - Displays full article content with breadcrumbs back to basic/advanced lists.\n  - `/education/course` → `LearningCoursePage`\n    - Marketing/landing page for a structured course (separate from `/academy` course platform).\n  - `/education/videos` → (video hub page, not detailed here but linked from LearningPage).\n  - Separate but related: `/academy` + `/academy/:courseId` for full course platform (driven by `courseTypes` and `financeMarketsCourse`).

- **Shared Helpers**
  - `lib/educationRoutes.ts` – centralizes all `/education/*` route paths and helper functions (e.g. `getEducationLearningPath`, `getEducationArticlePath`).\n  - `education` namespace in `ui.json` – all copy for headings, CTAs, stats, etc. is translated here.

- **Data**
  - `data/educationArticles.ts` (not shown here) defines a structured array of articles:\n    - Each article has: `id`, `title`, `excerpt`, `slug` or `path`, `type: 'basic' | 'advanced'`, `category` (one of shared `categoryNames`), difficulty, and metadata.\n  - `coursePeople.ts` & `courses/*` – separate course metadata for `/academy`, referenced from `LearningCoursePage` and course platform pages.\n  - There is **no database dependency** for `/education/*`; everything is static file‑based content.

### 2. Key User Scenarios

1. **Discover learning resources (`/education/learning`)**\n   - User wants an overview of available educational materials.\n   - Sees:\n     - hero with badge, title, subtitle,\n     - prominent CTAs to basic/advanced article lists and videos,\n     - left sidebar with categories and counts,\n     - difficulty legend (Beginner / Intermediate / Advanced / Expert),\n     - main grid of filtered `ArticleCard`s,\n     - CTA card to the course page at the bottom.\n   - Expected:\n     - Category and level filters work together intuitively.\n     - Article counts match the number of cards displayed.\n     - Navigation to more detailed views (basic/advanced lists, videos, course) is straightforward.

2. **Progress through basic articles (`/education/basic`)**\n   - User opens basic section.\n   - Sees:\n     - static category list in sidebar (Getting Started, Stock Basics, etc.),\n     - grid of beginner articles,\n     - local progress tracking by marking articles as completed.\n   - Local progress is tracked in `localStorage` under key `education-basic-articles-read`.\n   - Expected:\n     - Progress persists across sessions on the same device/browser.\n     - Error handling around `localStorage` is graceful (no crashes on quota errors).\n

3. **Progress through advanced articles (`/education/advanced`)**\n   - Similar to basic, but for advanced topics.\n   - Uses `education-advanced-articles-read` in `localStorage` to store completed article IDs.\n   - Sidebar emphasizes prerequisites and advanced difficulty.\n

4. **Read a single education article (`/education/article/:articleId`)**\n   - User navigates from any list to a detail article page.\n   - Expected:\n     - Article content is rendered with proper typography (likely via `ArticleDetailPage`).\n     - Breadcrumb or clear navigation back to basic/advanced lists.\n     - Optional: mark completion from detail page so progress stays in sync with lists.

5. **Explore Learning Course (`/education/course`)**\n   - User visits `LearningCoursePage`.\n   - Sees:\n     - hero with course positioning,\n     - stats (video lessons, hours, modules, certification),\n     - curriculum modules, feature list,\n     - social proof, instructors, testimonials,\n     - email capture form for \"notify me\".\n   - Expected:\n     - Submitting email shows a success toast, even though there is no backend subscription yet.\n     - Text and imagery are aligned with actual course offering when it launches (sync with `/academy` data).

### 3. Identified / Potential Issues

#### 3.1 Static Content vs Real Course Platform

- `/education/course` is effectively a **marketing landing page** for a future/parallel course offering, while `/academy` hosts actual structured courses built from `Course` definitions.\n\n**Risks**\n- Misalignment between promises on `LearningCoursePage` and the real `/academy` content (e.g. modules, hours, instructors) if they diverge over time.\n- Users may get confused by two different \"course\" concepts (`/education/course` vs `/academy/:courseId`).\n\n**Suggested improvements**\n- Either:\n  - make `/education/course` explicitly a **pre-course waitlist** page and link clearly to `/academy` for live courses,\n  - or eventually merge them: have `/education/course` redirect or embed the actual first course from `/academy`.\n- Keep stats and module lists driven by shared course metadata instead of duplicating arrays in `LearningCoursePage`.

#### 3.2 Hardcoded Category Definitions

- `LearningPage` uses a shared `categoryNames` array, while `BasicArticlesPage` and `AdvancedArticlesPage` each define their own `categories` arrays with hardcoded `count` values.\n\n**Risks**\n- Divergence between:\n  - real article categorization in `educationArticles.ts`, and\n  - static counts displayed in sidebars of basic/advanced pages.\n- If articles are added/removed or re-categorized, sidebars may show incorrect numbers without any warnings.\n\n**Suggested improvements**\n- Derive category counts for `/education/basic` and `/education/advanced` from the same `basicArticles` / `advancedArticles` arrays used for the grids, similar to `LearningPage`.\n- Keep **one** list of canonical category labels (e.g. in `educationArticles.ts` or a separate config) to avoid string mismatches.

#### 3.3 LocalStorage Progress Tracking

- Both basic and advanced pages maintain completion state in `localStorage` and guard for JSON parse errors.\n\n**Risks**\n- Progress is device/browser-specific and not tied to user accounts:\n  - users switching devices or clearing storage lose their progress.\n- If article IDs change (due to refactors), stored completion IDs become stale and may not match actual articles.\n\n**Suggested improvements**\n- If you later tie learning progress to user accounts:\n  - move completion state into Supabase (e.g. `education_progress` table keyed by `user_id` + `article_id`),\n  - keep a small migration layer that reconciles `localStorage` into server state on login.\n- In current static model:\n  - keep IDs stable; when refactoring content, consider mapping old IDs to new ones or resetting progress intentionally.

#### 3.4 Duplication Between Lists and Detail Views

- Article lists (LearningPage, Basic/Advanced pages) and the detail page all depend on `educationArticles` data.\n\n**Risks**\n- If the detail page duplicates some metadata (e.g. SEO titles or descriptions) instead of reading from the same source, inconsistencies may appear.\n- If an article is removed from `educationArticles.ts` but there are still links or bookmarks to `/education/article/:articleId`, detail view may break or show a generic \"not found\" without context.\n\n**Suggested improvements**\n- Ensure `ArticleDetailPage` always resolves content **only** via `educationArticles` by `id`/`slug`.\n- Provide a friendly \"Article archived\" page when an `articleId` is missing, potentially suggesting related current content.

#### 3.5 I18n Coverage

- Education pages use `education` namespace heavily (e.g. `learningHub.*`, `basic.*`, `advanced.*`, `learningCourse.*`).\n\n**Risks**\n- As content grows, there is a lot of copy to maintain in multiple languages; missing keys fall back to English or show as raw keys.\n- Some elements (like category names) are stored as plain English strings in data files instead of i18n keys, leading to partial localization.\n\n**Suggested improvements**\n- For user-visible labels like category names, consider storing i18n keys in data and using `t(...)` inside components.\n- Periodically run i18n checks to ensure all referenced `education.*` keys exist for each locale you care about.

#### 3.6 LearningCourse Email Capture

- `LearningCoursePage` has a simple email capture form that, on submit, only shows a success toast and clears the field.\n\n**Risks**\n- Users may assume they are truly \"registered\" or \"on the waitlist\" even though no backend persistence is happening.\n\n**Suggested improvements**\n- Either:\n  - wire this form to a real backend endpoint (Supabase table or external email service), or\n  - adjust copy and UI to make it clear this is a **demo** or non-binding interaction.

#### 3.7 Navigation and Cohesion with `/academy`

- There is a conceptual split:\n  - `/education/*` focuses on free, static learning content and marketing,\n  - `/academy/*` is the course platform with detailed course/lesson structures.\n\n**Risks**\n- Users might not understand the relationship between the two portals.\n- SEO and internal linking may feel fragmented if `/education` and `/academy` are not clearly tied together.\n\n**Suggested improvements**\n- Add clear cross-links:\n  - from `LearningPage` and `LearningCoursePage` to `/academy` (e.g. \"Explore full Academy courses\"),\n  - from `/academy` back to `/education` as a free preparation/reading resource.\n- Ensure SEO metadata for both sections describe their distinct roles but also mention each other where appropriate.

### 4. Summary and Next Steps

- The Education/Learning section provides a well-structured, static content experience with:\n  - high-level hub (`/education/learning`),\n  - separate basic/advanced tracks with local progress,\n  - a course landing page and links into the fuller Academy platform.\n- The main **technical** concerns are about maintaining consistency between multiple representations of categories, counts, and course metadata.\n- The main **UX** considerations are around coherence between `/education` and `/academy`, clarity of progress persistence, and accurate expectations around the course notification form.\n\nIf you choose to evolve this area next, good candidate tasks would be:\n1. Consolidate category and article metadata into a single source of truth and derive all sidebar counts from it.\n2. Connect `LearningCoursePage` stats and module lists to real course definitions (e.g. from `financeMarketsCourse`).\n3. Decide on a long-term strategy for syncing learning progress across devices (local-only vs account-based in Supabase).\n+

