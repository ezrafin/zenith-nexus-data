/**
 * Cookie utilities for secure cookie management
 * Implements best practices: Secure, SameSite, proper expiration
 */

export interface CookieOptions {
  maxAge?: number; // in seconds
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  httpOnly?: boolean; // Note: httpOnly can only be set server-side
}

const DEFAULT_OPTIONS: CookieOptions = {
  path: '/',
  secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
  sameSite: 'Lax',
};

/**
 * Set a cookie with secure defaults
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') {
    return; // SSR safety
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (opts.maxAge !== undefined) {
    cookieString += `; max-age=${opts.maxAge}`;
  } else if (opts.expires) {
    cookieString += `; expires=${opts.expires.toUTCString()}`;
  }

  if (opts.path) {
    cookieString += `; path=${opts.path}`;
  }

  if (opts.domain) {
    cookieString += `; domain=${opts.domain}`;
  }

  if (opts.secure) {
    cookieString += '; secure';
  }

  if (opts.sameSite) {
    cookieString += `; samesite=${opts.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null; // SSR safety
  }

  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
}

/**
 * Delete a cookie by setting it to expire in the past
 */
export function deleteCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  const opts = { path: DEFAULT_OPTIONS.path, ...options };
  setCookie(name, '', {
    ...opts,
    expires: new Date(0),
  });
}

/**
 * Check if cookies are enabled in the browser
 */
export function areCookiesEnabled(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  try {
    const testCookie = 'cookiesEnabledTest';
    setCookie(testCookie, '1', { maxAge: 1 });
    const enabled = getCookie(testCookie) !== null;
    deleteCookie(testCookie);
    return enabled;
  } catch {
    return false;
  }
}

/**
 * Cookie consent categories
 */
export type CookieCategory = 'essential' | 'analytics' | 'preferences';

export interface CookieConsent {
  essential: boolean; // Always true, cannot be disabled
  analytics: boolean;
  preferences: boolean;
  timestamp: number;
}

const CONSENT_COOKIE_NAME = 'cookie_consent';
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Get current cookie consent
 */
export function getCookieConsent(): CookieConsent | null {
  const consentStr = getCookie(CONSENT_COOKIE_NAME);
  if (!consentStr) {
    return null;
  }

  try {
    return JSON.parse(consentStr) as CookieConsent;
  } catch {
    return null;
  }
}

/**
 * Set cookie consent
 */
export function setCookieConsent(consent: Partial<CookieConsent>): void {
  const current = getCookieConsent();
  const newConsent: CookieConsent = {
    essential: true, // Always enabled
    analytics: consent.analytics ?? current?.analytics ?? false,
    preferences: consent.preferences ?? current?.preferences ?? false,
    timestamp: Date.now(),
  };

  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(newConsent), {
    maxAge: CONSENT_COOKIE_MAX_AGE,
  });
}

/**
 * Check if a specific cookie category is consented
 */
export function hasCookieConsent(category: CookieCategory): boolean {
  const consent = getCookieConsent();
  if (!consent) {
    return category === 'essential'; // Only essential allowed by default
  }

  if (category === 'essential') {
    return true; // Always allowed
  }

  return consent[category] ?? false;
}

