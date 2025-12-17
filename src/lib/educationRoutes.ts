export const EDUCATION_BASE_PATH = '/education';

export const educationRoutes = {
  root: EDUCATION_BASE_PATH,
  learning: `${EDUCATION_BASE_PATH}/learning`,
  course: `${EDUCATION_BASE_PATH}/course`,
  video: `${EDUCATION_BASE_PATH}/video`,
  basicArticles: `${EDUCATION_BASE_PATH}/basic`,
  advancedArticles: `${EDUCATION_BASE_PATH}/advanced`,
  article: `${EDUCATION_BASE_PATH}/article/:articleId`,
} as const;

export function getEducationRootPath() {
  return educationRoutes.root;
}

export function getEducationLearningPath() {
  return educationRoutes.learning;
}

export function getEducationCoursePath() {
  return educationRoutes.course;
}

export function getEducationVideoPath() {
  return educationRoutes.video;
}

export function getEducationBasicArticlesPath() {
  return educationRoutes.basicArticles;
}

export function getEducationAdvancedArticlesPath() {
  return educationRoutes.advancedArticles;
}

export function getEducationArticlePath(articleId: string) {
  return `${EDUCATION_BASE_PATH}/article/${articleId}`;
}


