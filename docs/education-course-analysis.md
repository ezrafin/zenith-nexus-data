## Education Course Page (`/education/course`) – Scenarios, Risks, and Recommendations

### 1. Architecture Overview

- **Route & Component**
  - Path: `/education/course`.
  - Component: `LearningCoursePage` in `src/pages/education/LearningCoursePage.tsx`.
  - Purpose: marketing / pre-launch landing page for an education course (\"Mentor Education\"), separate from the full `/academy` platform.

- **Static Config in Component**
  - `courseModules` – array of 8 curriculum modules with:
    - `title`, `lessons`, `duration` as human-readable strings.
  - `features` – list of bullet-point benefits (self-paced modules, quizzes, community, etc.).
  - `instructors` – hardcoded instructor cards with:
    - `name`, `title`, `credentials`, `image` (Unsplash), `bio`.
  - `testimonials` – static social proof with:
    - `name`, `role`, `image`, `quote`, `rating`.

- **i18n**
  - Uses `useTranslation({ namespace: 'education' })` for:
    - hero section (`learningCourse.hero.*`),
    - stats, curriculum, features, instructors, testimonials, CTA.
  - Uses `useTranslation({ namespace: 'ui' })` as `tUi` for:
    - email placeholder (`auth.emailPlaceholder`),
    - button labels / toast copy (`toast.courseNotification`, `toast.joinWaitlist`).
  - Most visible text is translatable; some internal module labels are still English in `courseModules` and then combined with localized pieces.

- **Form & Interactions**
  - Email waitlist form:
    - `email` state stored locally.
    - `handleNotify`:
      - `preventDefault()`,
      - if `email` is non-empty, shows `toast.success(tUi('toast.courseNotification'))` and clears email.
    - No current Supabase or external API integration: this is a **front-only** waitlist.

- **Layout & Visual Structure**
  - No custom `SEOHead` for now (relies on parent layout or could be easily added).
  - Page sections:
    1. Hero (badge, big title + gradient subtitle, description, primary notify form).
    2. Stats (video lessons, hours of content, comprehensive modules, certification).
    3. Curriculum (modules list, each as a card).
    4. Features (checklist with social proof block).
    5. Instructors grid.
    6. Testimonials grid.
    7. Final CTA with another email form.

### 2. Key User Scenarios

1. **Discover the education course offering**
   - User lands on `/education/course` from:
     - Learning hub `/education/learning`,
     - navigation menu, or internal promos.
   - Sees:
     - clear positioning of the course,
     - high-level stats and promise,
     - outline of modules and benefits.
   - Expected:
     - Understand quickly what the course covers and at what level.
     - Perceive it as a serious, structured product (not just blog articles).

2. **Evaluate quality and credibility**
   - User scans:
     - instructor credentials (CFA/CMT, institutional background),
     - social proof via testimonials,
     - course features and curriculum.
   - Expected:
     - Photos, titles, bios, and quotes look real and consistent.
     - No obvious contradictions with what `/academy` offers.

3. **Join the waitlist / express interest**
   - User enters email in:
     - hero form or bottom CTA form.
   - Expected:
     - A clear confirmation (toast) that the request was received.
     - Ideally, actual persistence in backend or mailing system.

4. **Transition to real course experience**
   - From this landing page, user should:
     - either understand that the course is \"coming soon\" with a waitlist,
     - or be guided to the active `/academy` course if it already exists.
   - Expected:
     - Messaging clarifies whether the course is live or in pre-launch status.

### 3. Identified / Potential Issues

#### 3.1 No Real Backend for Waitlist

- The email forms only trigger a success toast (`toast.courseNotification`) and reset state; they do **not** call Supabase or an external email service.

**Risks**
- Users may think they have truly registered / joined a waitlist while no data is stored.
- You cannot contact interested users or measure demand.

**Suggested improvements**
- Connect the form to a Supabase table, e.g. `course_waitlist`:
  - `id`, `email`, `language`, `created_at`, `source` (\"education-course-page\").
  - Handle duplicate emails gracefully on client (e.g. show \"already on waitlist\").
- Alternatively integrate with an external mailing platform via edge function.
- Adjust copy if you intentionally keep it as a demo (e.g. \"Demo form\" label in non-production).

#### 3.2 Duplication / Divergence from `/academy` Course

- `/education/course` describes a generalized finance/markets course, while `/academy` already has a fully structured `finance-markets` course definition.

**Risks**
- Modules, duration, and promises on the marketing page may diverge from the real course content:
  - Different units or lesson counts,
  - Different level/difficulty or target audience.
- If a user moves from this page to `/academy`, expectations may not match.

**Suggested improvements**
- Decide if `/education/course` represents:
  - the same `finance-markets` course as in `/academy`, or
  - a separate mentor-led program.
- If it is the same course:
  - Source module names, durations, and stats directly from `financeMarketsCourse` and `courseTypes` instead of hardcoding arrays.
  - Show a CTA button linking into `/academy/finance-markets`.
- If it is a different experience:
  - Clarify this in copy (e.g. \"Mentor-guided version of our Finance & Markets curriculum\").
  - Ensure stats and modules are still realistic and not accidentally copied from `/academy`.

#### 3.3 Static Content and I18n Coverage

- All high-level text uses `learningCourse.*` keys, but:
  - `courseModules` titles and durations are plain English strings.
  - Instructor names and bios are partly hardcoded English text with localized wrappers.

**Risks**
- Partial translation: some pieces remain English in non-English locales (especially module names and bios).
- Harder to update text across languages if it lives both in the component and in `ui.json`.

**Suggested improvements**
- Move module titles and descriptions fully into `ui.json` (e.g. `learningCourse.modules.module1.title` and `learningCourse.modules.module1.description`).
- For instructors and testimonials:
  - Keep names static, but move bios/quotes fully into i18n with no duplicated English strings in the component.
- Optionally, add a small linter/check for missing `learningCourse.*` keys across locales.

#### 3.4 No Explicit SEO Metadata

- Unlike many other pages, `LearningCoursePage` currently does not configure `SEOHead` (only uses layout).

**Risks**
- Missed opportunity for strong SEO targeting around \"investment course\", \"financial markets course\", etc.

**Suggested improvements**
- Add `SEOHead` with:
  - `title`: e.g. `t('learningCourse.seoTitle')` with default like \"Financial Markets Course | INVESTOPATRONUS\".
  - `description`: e.g. `t('learningCourse.seoDescription')`.
  - `isCoursePage={true}` to align with other course pages.

#### 3.5 Relationship with `/education/learning` and `/academy`

- `/education/course` is accessible from `/education/learning` CTA and co-exists with `/academy`.

**Risks**
- Users might be unsure:
  - whether this is a real, live course or a teaser,
  - how it connects to the free article-based learning paths and to `/academy`.

**Suggested improvements**
- Add explicit copy like:
  - \"This is an upcoming structured course built on top of the free lessons in the Learning Hub\"; or
  - \"Already want to start? Access our full Finance & Markets course in the Academy\" (with button to `/academy/finance-markets`).
- Consider a section that visually connects:
  - `/education/learning` (articles),
  - `/education/videos` (video tutorials),
  - `/academy` (full course journey).

### 4. Summary and Next Steps

- `/education/course` is a polished marketing page for a finance course, with strong UX (hero, stats, curriculum, features, instructors, testimonials, double CTA).
- Today it behaves purely as a **front-end teaser**: it does not yet persist waitlist emails or synchronize content with the actual Academy course.
- Main improvement vectors:
  1. Connect the email forms to real backend storage (Supabase or mailing service).
  2. Align curriculum and stats with actual course data from `/academy` (or clearly separate them in messaging).
  3. Push more of the textual content into i18n and add SEO metadata for this page.


