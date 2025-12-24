export interface OrganizationSchema {
  '@context': string;
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    contactType: string;
    email?: string;
    url?: string;
  };
}

export interface ArticleSchema {
  '@context': string;
  '@type': 'Article';
  headline: string;
  description?: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface BreadcrumbListSchema {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface WebSiteSchema {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'INVESTOPATRONUS',
    url: 'https://investopatronus.com',
    description: 'Professional financial market analytics, real-time data, and expert insights for informed investment decisions.',
    logo: 'https://investopatronus.com/investo.png',
    sameAs: [
      'https://twitter.com/investopatronus',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: 'https://investopatronus.com/contact',
    },
  };
}

export function generateArticleSchema(
  headline: string,
  description: string,
  image: string | string[],
  datePublished: string,
  authorName: string,
  url: string,
  dateModified?: string
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: Array.isArray(image) ? image : [image],
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'INVESTOPATRONUS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://investopatronus.com/investo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function generateBreadcrumbListSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'INVESTOPATRONUS',
    url: 'https://investopatronus.com',
    description: 'Professional financial market analytics, real-time data, and expert insights for informed investment decisions.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://investopatronus.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface PersonSchema {
  '@context': string;
  '@type': 'Person';
  name: string;
  url?: string;
  image?: string;
  description?: string;
  jobTitle?: string;
  worksFor?: {
    '@type': 'Organization';
    name: string;
  };
  sameAs?: string[];
}

export interface ForumPostingSchema {
  '@context': string;
  '@type': 'ForumPosting';
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  articleSection?: string;
  keywords?: string;
}

export interface CourseSchema {
  '@context': string;
  '@type': 'Course';
  name: string;
  description?: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url?: string;
  };
  courseCode?: string;
  educationalCredentialAwarded?: string;
  hasCourseInstance?: {
    '@type': 'CourseInstance';
    courseMode?: string;
    instructor?: {
      '@type': 'Person';
      name: string;
    };
  };
  url?: string;
  image?: string;
}

export function generatePersonSchema(
  name: string,
  url?: string,
  image?: string,
  description?: string,
  jobTitle?: string,
  organizationName?: string,
  sameAs?: string[]
): PersonSchema {
  const schema: PersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
  };

  if (url) schema.url = url;
  if (image) schema.image = image;
  if (description) schema.description = description;
  if (jobTitle) schema.jobTitle = jobTitle;
  if (organizationName) {
    schema.worksFor = {
      '@type': 'Organization',
      name: organizationName,
    };
  }
  if (sameAs && sameAs.length > 0) schema.sameAs = sameAs;

  return schema;
}

export function generateForumPostingSchema(
  headline: string,
  description: string,
  datePublished: string,
  authorName: string,
  url: string,
  dateModified?: string,
  authorUrl?: string,
  articleSection?: string,
  keywords?: string
): ForumPostingSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ForumPosting',
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'INVESTOPATRONUS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://investopatronus.com/investo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(articleSection && { articleSection }),
    ...(keywords && { keywords }),
  };
}

export function generateCourseSchema(
  name: string,
  description?: string,
  providerName?: string,
  providerUrl?: string,
  courseCode?: string,
  educationalCredentialAwarded?: string,
  courseMode?: string,
  instructorName?: string,
  url?: string,
  image?: string
): CourseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    ...(description && { description }),
    provider: {
      '@type': 'Organization',
      name: providerName || 'INVESTOPATRONUS',
      ...(providerUrl && { url: providerUrl }),
    },
    ...(courseCode && { courseCode }),
    ...(educationalCredentialAwarded && { educationalCredentialAwarded }),
    ...(courseMode || instructorName ? {
      hasCourseInstance: {
        '@type': 'CourseInstance',
        ...(courseMode && { courseMode }),
        ...(instructorName && {
          instructor: {
            '@type': 'Person',
            name: instructorName,
          },
        }),
      },
    } : {}),
    ...(url && { url }),
    ...(image && { image }),
  };
}

