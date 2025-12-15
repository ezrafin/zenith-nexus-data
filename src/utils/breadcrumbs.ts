export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbs(pathname: string, pageTitle?: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
  ];

  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return breadcrumbs;
  }

  // Map common routes to breadcrumb names
  const routeNames: Record<string, string> = {
    news: 'News',
    analytics: 'Analytics',
    markets: 'Markets',
    companies: 'Companies',
    forum: 'Forum',
    video: 'Video',
    education: 'Education',
    about: 'About',
    contact: 'Contact',
    careers: 'Careers',
    authors: 'Authors',
    topics: 'Topics',
    events: 'Events',
    community: 'Community',
  };

  // Market types
  const marketTypes: Record<string, string> = {
    indices: 'Indices',
    stocks: 'Stocks',
    commodities: 'Commodities',
    crypto: 'Crypto',
    currencies: 'Currencies',
  };

  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;

    // Skip numeric IDs and slugs in breadcrumbs (use page title instead)
    if (isLast && pageTitle) {
      breadcrumbs.push({
        name: pageTitle,
        url: currentPath || '/',
      });
      return;
    }

    // Check if it's a market type
    if (pathSegments[0] === 'markets' && marketTypes[segment]) {
      breadcrumbs.push({
        name: marketTypes[segment],
        url: currentPath,
      });
      return;
    }

    // Use route name or capitalize segment
    const name = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    // Skip if it's likely an ID (numeric or UUID-like)
    if (!isLast || !/^\d+$/.test(segment) && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) {
      breadcrumbs.push({
        name,
        url: currentPath || '/',
      });
    }
  });

  return breadcrumbs;
}

