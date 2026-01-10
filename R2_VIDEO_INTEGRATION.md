# Cloudflare R2 Video Integration

## Overview
Videos for academy courses are stored in Cloudflare R2 and served via public URLs.

## R2 Configuration
- **Public URL**: `https://pub-3a415fdd495c4b5eaaadb487006b4f22.r2.dev`
- **Bucket**: `academy`

## File Structure

### Folder Organization
- **Macroeconomics**: `/macro/`
- **Microeconomics**: `/micro/`
- **Finance & Markets**: `/finance/`
- **Economics & Personal Finance**: `/economics/`

### Filename Format
Videos follow this naming convention:
```
{CoursePrefix}-U{Unit}-L{Lesson}-V{Video}.mp4
```

**Examples:**
- `Macroeconomics-U1-L1-V1.mp4` (Macroeconomics, Unit 1, Lesson 1, Video 1)
- `Microeconomics-U1-L1-V1.mp4` (Microeconomics, Unit 1, Lesson 1, Video 1)
- `Finance&Markets-U1-L1-V1.mp4` (Finance & Markets, Unit 1, Lesson 1, Video 1)
- `Economics&Personal-U1-L1-V1.mp4` (Economics & Personal Finance, Unit 1, Lesson 1, Video 1)

### Course Prefixes
- **Macroeconomics**: `Macroeconomics`
- **Microeconomics**: `Microeconomics`
- **Finance & Markets**: `Finance&Markets`
- **Economics & Personal Finance**: `Economics&Personal`

## Implementation

### Utility Functions
Located in `src/lib/r2VideoUtils.ts`:

- `getVideoUrl(courseId, moduleIndex, lessonIndex, videoIndex)` - Generate single video URL
- `getLessonVideoUrls(courseId, moduleIndex, lessonIndex, videoCount)` - Generate all video URLs for a lesson
- `generateVideoFilename(courseId, moduleIndex, lessonIndex, videoIndex)` - Generate filename only

### Video Player Component
Located in `src/components/education/VideoPlayer.tsx`:

Features:
- Play/pause controls
- Volume control
- Progress bar with seeking
- Fullscreen support
- Loading states
- Error handling

### Usage in CoursePlatformPage
Videos are automatically loaded based on:
- Course ID
- Module index (0-based, converted to 1-based for filename)
- Lesson index (0-based, converted to 1-based for filename)
- Video count (default: 1, can be set in `Lesson.videoCount`)

## Adding Videos

1. Upload videos to R2 bucket `academy` in the appropriate folder
2. Name files according to the format: `{CoursePrefix}-U{Unit}-L{Lesson}-V{Video}.mp4`
3. Videos will automatically appear in the course player

## Multiple Videos per Lesson

To support multiple videos in a lesson, set the `videoCount` property in the lesson data:

```typescript
{
  id: 'lesson-1-1',
  title: 'Introduction to macroeconomics',
  videoCount: 3, // Will load V1, V2, V3
  // ... other properties
}
```

## Notes

- All indices are 0-based in code but converted to 1-based for filenames
- Videos are loaded lazily when the lesson is selected
- Error handling displays user-friendly messages if videos fail to load
- Video player supports standard HTML5 video features

