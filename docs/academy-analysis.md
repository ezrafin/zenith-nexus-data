## Academy Section (`/academy`) – Scenarios, Risks, and Recommendations

### 1. Architecture Overview

- **Entry Points & Routing**
  - `/academy` → `CourseListingPage`
    - Fetches all courses via `getAllCourses()` from `data/courses`.
    - Renders a grid of `CourseCard` components with high-level info for each course.
    - Uses `education` namespace (`courses.*`) for SEO and page copy.
  - `/academy/:courseId` → `CoursePlatformPage`
    - Main learning environment for a specific course.
    - Retrieves the course via `getCourseById(courseId)` with a fallback to `getAllCourses()[0]`.
    - On invalid course ID, redirects to `/academy`.

- **Course Data Model**
  - `data/courseTypes.ts` defines core types:
    - `ContentItem` – discriminated union for different learning blocks:
      - `video` (with `videoIndex` and metadata),
      - `article`/`markdown` content,
      - `quiz` with `QuizContent` (questions, options, correct answers),
      - `masteryCheck` and final exam (`QuizQuestion[]`).
    - `Lesson`
      - Has `id`, `title`, `duration`, and an ordered list of `contentItems`.
    - `Unit`
      - Groups lessons and may include a `masteryCheck`.
    - `Course`
      - `id`, `title`, `description`, `units`, optional `finalExamPassRate` and `finalExam`.
  - `data/courses/finance-markets.ts`
    - Implements `financeMarketsCourse` with 10 detailed units and many lessons.
    - This is currently the main (or only) concrete course powering `/academy`.
  - `data/courses/index.ts` (not shown here)
    - Likely exports `getAllCourses()` and `getCourseById()` using the course definitions.

- **Player & Supporting Utilities**
  - `CoursePlatformPage`:
    - Uses `VideoPlayer` and `getVideoContentUrl()` for video playback.
    - Uses `MarkdownContent` for article-style content.
    - Uses `collectAllQuizQuestions` and `selectRandomQuestions` for building quizzes/mastery checks/final exams.
    - Tracks progress, selected lesson/content item, quiz states, and various UI toggles.
    - Integrates `UserContext` (user object) but currently stores progress only in `localStorage`.
  - SEO:
    - `SEOHead` receives `isCoursePage={true}` and builds titles/descriptions from `courses.*` and `course.<id>.*` i18n keys with sensible fallbacks.

### 2. Key User Scenarios

1. **Browse all courses (`/academy`)**
   - User lands on Academy home and sees:
     - localized hero (badge, title, subtitle),
     - a grid of course cards (`CourseCard`),
     - an info card describing platform benefits.
   - Expected:
     - Every course in data is visible and clickable.
     - Basic meta (duration, skill level, content type, etc.) is surfaced in `CourseCard`.

2. **Open a specific course (`/academy/:courseId`)**
   - User clicks a card and navigates into `CoursePlatformPage`.
   - Sees:
     - SEO-friendly title/description based on the selected course,
     - a two- or three-column layout:
       - navigation sidebar with units/lessons/content items,
       - main content pane (video/article/quiz),
       - progress and mastery sections.
   - Expected:
     - Invalid course IDs gracefully redirect to `/academy` (already implemented).
     - First unit/lesson/content is auto-selected for a smooth start.

3. **Watch videos and read lesson content**
   - Within a lesson, user can:
     - view video content with `VideoPlayer` (R2-backed URLs from `getVideoContentUrl`),
     - read markdown / article-type content via `MarkdownContent`.
   - Expected:
     - Video IDs and URLs are stable and match the underlying storage.
     - Content ordering in `contentItems` reflects the learning flow (video first, then text, etc.).

4. **Complete quizzes, mastery checks, and final exam**
   - Some content items are quizzes; units can have mastery checks; course can have final exam.
   - User answers multiple-choice questions; app tracks answers and can evaluate results.
   - Expected:
     - Questions, options, and correct answers are consistent with course goals.
     - Result feedback is clear and progress or badges are updated accordingly.

5. **Track course progress**
   - `CoursePlatformPage` calculates a `progressPercent` based on number of completed lessons:
     - Completes a lesson when user explicitly triggers completion (e.g., after finishing content).
     - Persists `completedLessons` in `localStorage` under `course_progress_<courseId>`.
   - Expected:
     - Progress persists across browser sessions on the same device.
     - Respects lesson IDs; if IDs change in data, old progress may become stale.

### 3. Identified / Potential Issues

#### 3.1 Local-only Progress (No Server Sync Yet)

- Progress is stored only in `localStorage` and not tied to `user.id` or Supabase.

**Risks**
- Users switching devices or clearing storage lose all progress.
- If you later add Supabase-based progress, you must reconcile or override local state.
- Multi-user environments on the same browser can share progress unintentionally.

**Suggested improvements**
- Introduce a Supabase table, e.g. `course_progress`:
  - Columns: `user_id`, `course_id`, `lesson_id`, `completed_at`.
  - Optionally: store quiz scores/mastery check outcomes.
- On login:
  - Load remote progress and merge with localStorage (union of lesson IDs).
  - After successful sync, designate server state as the source of truth.

#### 3.2 Assumption of a Single Primary Course

- `CoursePlatformPage` uses `getCourseById(courseId) || getAllCourses()[0]`.

**Risks**
- If multiple courses exist, an invalid `courseId` silently sends the user into the first course, then immediately redirects to `/academy` if `course` becomes `undefined` in some branch.
- Deep links or bookmarks to removed/renamed courses may confuse users.

**Suggested improvements**
- When `courseId` is invalid:
  - Show a dedicated \"Course not found\" screen with a link back to `/academy`, instead of automatically falling back to the first course.
  - Or, only redirect if `courseId` is missing; treat invalid IDs as 404-style inside the Academy.

#### 3.3 Tight Coupling Between Content IDs and Video URL Scheme

- Video IDs and URLs are derived from:
  - `course.id`, `unitIndex`, `lessonIndex`, `videoContent.videoIndex`.

**Risks**
- Reordering units/lessons or inserting content between existing items can change indices, breaking existing video links or caching in R2/CDN if they rely on ID patterns.
- Hard to perform large refactors of the course structure without reviewing all storage paths.

**Suggested improvements**
- Consider adding stable `videoId` fields in course data and use those for URLs, decoupling from positional indices.
- Keep a small helper that maps old positional IDs to new stable IDs for backward compatibility if needed.

#### 3.4 Quiz & Mastery Logic Complexity

- `CoursePlatformPage` manages multiple quiz-related states:
  - `showQuiz`, `showFinalExam`, `showMasteryCheck`,
  - `quizAnswers`, `finalExamAnswers`, `masteryCheckAnswers`,
  - separate question indices for each flow.

**Risks**
- UI complexity increases risk of subtle bugs (e.g., wrong answers being evaluated, indices not resetting, stale state leaking between units).
- Harder to test and extend when adding new assessment types.

**Suggested improvements**
- Extract quiz/mastery/final-exam logic into dedicated hooks (`useQuiz`, `useMasteryCheck`, `useFinalExam`) with clear contracts.
- Write small unit tests for these hooks to ensure transitions between states are correct.

#### 3.5 I18n and Content Duplication

- Titles/descriptions are defined both in course data (`financeMarketsCourse`) and in `education` namespace keys (`course.<id>.*`, `courses.*`).

**Risks**
- Divergence between localized titles and underlying course metadata.
- If you add new courses and forget i18n keys, UI may show English fallbacks or raw keys.

**Suggested improvements**
- Decide whether the **source of truth** for course naming lives in:
  - data files (then i18n keys simply reference them), or
  - `ui.json` (then course data might omit text fields except for IDs).
- Add simple checks/scripts to verify `course.<id>.*` keys exist for every course in `getAllCourses()`.

#### 3.6 Relationship with `/education` Learning Pages

- `/education/course` is a separate landing page for a (mentor) course, while `/academy` houses the structured course platform.

**Risks**
- Users may be unsure whether `/education/course` and `/academy` offer the same course or different ones.
- Stats, modules, and instructors could drift out of sync if you update one side but not the other.

**Suggested improvements**
- Make the connection explicit:
  - If `/education/course` promotes the same `finance-markets` course, source its stats/modules from the same `Course` definition.
  - Add cross-links in both directions (\"Go to Academy\" / \"See free education articles\").
- If they are intentionally different, adjust copy so expectations are clear (e.g., `/education/course` as an intro/waitlist vs `/academy` as full platform).

### 4. Summary and Next Steps

- The Academy section is already structured as a **real course platform** with:
  - course listing, detailed course model, rich content types, and quiz/misatery logic.
  - local progress tracking per course.
- Main technical concerns are about long-term maintainability: progress persistence across devices, stability of video/lesson identifiers, and manageable quiz logic.
- Main UX concerns are clarity around invalid/changed course IDs and the relationship between `/academy` and `/education` course marketing.

If you want to evolve this area next, strong candidates are:
1. Introduce server-side course progress (Supabase) with migration from `localStorage`.
2. Stabilize video identifiers and audit existing R2 video URLs against the current course structure.
3. Refactor assessment logic into dedicated hooks/components and add tests to support future new courses.


