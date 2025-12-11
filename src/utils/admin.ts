// Admin utilities
export const ADMIN_EMAIL = 'mark.lindt.finance@gmail.com';

export function isAdmin(userEmail: string | undefined | null): boolean {
  return userEmail === ADMIN_EMAIL;
}

