import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Mail, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { getMotionVariant, transitions, prefersReducedMotion, STAGGER } from '@/lib/animations';

// Google icon component
const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

export default function RegisterPage() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const { signUp, signInWithOAuth } = useUser();

  const passwordRequirements: PasswordRequirement[] = useMemo(() => [
    { label: t('auth.passwordRequirements.atLeast8Chars'), test: (p) => p.length >= 8 },
    { label: t('auth.passwordRequirements.containsNumber'), test: (p) => /\d/.test(p) },
    { label: t('auth.passwordRequirements.containsSpecial'), test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ], [t]);

  const getPasswordStrength = (password: string): { level: number; label: string; color: string } => {
    const metCount = passwordRequirements.filter((req) => req.test(password)).length;
    if (metCount === 0) return { level: 0, label: '', color: '' };
    if (metCount === 1) return { level: 1, label: t('auth.passwordStrength.weak'), color: 'bg-destructive' };
    if (metCount === 2) return { level: 2, label: t('auth.passwordStrength.medium'), color: 'bg-yellow-500' };
    return { level: 3, label: t('auth.passwordStrength.strong'), color: 'bg-green-500' };
  };

  const allRequirementsMet = passwordRequirements.every((req) => req.test(password));
  const passwordStrength = getPasswordStrength(password);

  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'User already registered': t('auth.accountAlreadyExists'),
      'Email already registered': t('auth.accountAlreadyExists'),
      'Password should be at least 6 characters': t('auth.passwordTooShort'),
      'Invalid email': t('auth.invalidEmail'),
      'Signup disabled': t('auth.signupDisabled'),
    };
    return errorMessages[errorCode] || errorCode || t('auth.registrationError');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!allRequirementsMet) {
      setError(t('auth.meetAllRequirements'));
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, username || undefined);

    if (error) {
      const message = getErrorMessage(error.message || error.code);
      setError(message);
      toast.error(message);
    } else {
      setEmailSent(true);
    }

    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    await signInWithOAuth('google');
  };

  // Email verification screen
  if (emailSent) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md space-y-8">
            <div className="premium-card p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              
              <div>
                <h1 className="heading-md mb-2">{t('auth.checkEmail')}</h1>
                <p className="text-muted-foreground">
                  {t('auth.verificationSent')}
                </p>
                <p className="font-medium text-lg mt-2">{email}</p>
              </div>

              <div className="text-sm text-muted-foreground space-y-3 text-left bg-secondary/30 rounded-lg p-4">
                <p className="font-medium text-foreground">{t('auth.whatsNext')}</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>{t('auth.openEmailInbox')}</li>
                  <li>{t('auth.clickVerificationLink')}</li>
                  <li>{t('auth.returnToSignIn')}</li>
                </ol>
                <p className="text-xs mt-4">
                  {t('auth.cantFindEmail')}
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <Link to="/auth/login" className="block">
                  <Button className="w-full">
                    {t('auth.goToSignIn')}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setEmailSent(false)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('auth.useDifferentEmail')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="heading-lg mb-2">{t('auth.createAccount')}</h1>
            <p className="text-muted-foreground">{t('auth.getStarted')}</p>
          </div>

          <motion.div 
            className="premium-card p-8 space-y-6"
            initial={getMotionVariant('fadeInUp').initial}
            animate={getMotionVariant('fadeInUp').animate}
            transition={transitions.normal}
          >
            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={prefersReducedMotion() ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.95 }}
                  animate={prefersReducedMotion() ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion() ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.95 }}
                  transition={transitions.fast}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive",
                    !prefersReducedMotion() && "animate-shake"
                  )}
                >
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p>{error}</p>
                    {error.includes('already exists') && (
                      <Link to="/auth/login" className="underline hover:no-underline mt-1 block transition-colors">
                        {t('auth.signInInstead')}
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google OAuth Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <GoogleIcon />
              {t('auth.continueWithGoogle')}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t('auth.orSignUpWithEmail')}</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={prefersReducedMotion() ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
              transition={{ ...transitions.normal, delay: 0.1 }}
            >
              <motion.div 
                className="space-y-2"
                initial={prefersReducedMotion() ? {} : { opacity: 0, x: -10 }}
                animate={prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                transition={{ ...transitions.fast, delay: 0.2 }}
              >
                <Label htmlFor="username">{t('auth.usernameOptional')}</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t('auth.usernamePlaceholder')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={prefersReducedMotion() ? {} : { opacity: 0, x: -10 }}
                animate={prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                transition={{ ...transitions.fast, delay: 0.3 }}
              >
                <Label htmlFor="email">{t('labels.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholderExample')}
                  value={email}
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  required
                  disabled={loading}
                  error={!!error}
                />
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={prefersReducedMotion() ? {} : { opacity: 0, x: -10 }}
                animate={prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                transition={{ ...transitions.fast, delay: 0.4 }}
              >
                <Label htmlFor="password">{t('labels.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    required
                    disabled={loading}
                    error={!!error}
                    className="pr-10"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={!prefersReducedMotion() ? { scale: 1.1 } : undefined}
                    whileTap={!prefersReducedMotion() ? { scale: 0.95 } : undefined}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </motion.button>
                </div>

                {/* Password strength indicator */}
                <AnimatePresence>
                  {password && (
                    <motion.div 
                      className="space-y-2"
                      initial={prefersReducedMotion() ? {} : { opacity: 0, height: 0 }}
                      animate={prefersReducedMotion() ? {} : { opacity: 1, height: 'auto' }}
                      exit={prefersReducedMotion() ? {} : { opacity: 0, height: 0 }}
                      transition={transitions.fast}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden flex gap-0.5">
                          {[1, 2, 3].map((level) => (
                            <motion.div
                              key={level}
                              className={cn(
                                'flex-1 h-full rounded-full transition-colors',
                                passwordStrength.level >= level ? passwordStrength.color : 'bg-secondary'
                              )}
                              initial={prefersReducedMotion() ? {} : { scaleX: 0 }}
                              animate={prefersReducedMotion() ? {} : { scaleX: passwordStrength.level >= level ? 1 : 0 }}
                              transition={{ ...transitions.fast, delay: level * 0.1 }}
                            />
                          ))}
                        </div>
                        {passwordStrength.label && (
                          <motion.span 
                            className={cn(
                              'text-xs font-medium',
                              passwordStrength.level === 1 && 'text-destructive',
                              passwordStrength.level === 2 && 'text-yellow-500',
                              passwordStrength.level === 3 && 'text-green-500'
                            )}
                            initial={prefersReducedMotion() ? {} : { opacity: 0 }}
                            animate={prefersReducedMotion() ? {} : { opacity: 1 }}
                            transition={transitions.fast}
                          >
                            {passwordStrength.label}
                          </motion.span>
                        )}
                      </div>

                      {/* Password requirements */}
                      <div className="space-y-1.5">
                        {passwordRequirements.map((req, index) => (
                          <motion.div
                            key={index}
                            className={cn(
                              'flex items-center gap-2 text-xs transition-colors',
                              req.test(password) ? 'text-green-500' : 'text-muted-foreground'
                            )}
                            initial={prefersReducedMotion() ? {} : { opacity: 0, x: -10 }}
                            animate={prefersReducedMotion() ? {} : { opacity: 1, x: 0 }}
                            transition={{ ...transitions.fast, delay: index * 0.05 }}
                          >
                            <motion.div
                              animate={req.test(password) && !prefersReducedMotion() ? {
                                scale: [1, 1.2, 1],
                              } : {}}
                              transition={transitions.fast}
                            >
                              <CheckCircle className={cn('h-3 w-3', req.test(password) ? 'opacity-100' : 'opacity-40')} />
                            </motion.div>
                            {req.label}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion() ? {} : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                transition={{ ...transitions.fast, delay: 0.5 }}
              >
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !allRequirementsMet}
                  loading={loading}
                >
                  {loading ? t('auth.creatingAccount') : t('auth.createAccount')}
                </Button>
              </motion.div>
            </motion.form>

            <motion.p 
              className="text-center text-sm text-muted-foreground"
              initial={prefersReducedMotion() ? {} : { opacity: 0 }}
              animate={prefersReducedMotion() ? {} : { opacity: 1 }}
              transition={{ ...transitions.fast, delay: 0.6 }}
            >
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to="/auth/login" className="text-primary hover:underline font-medium transition-colors">
                {t('buttons.signIn')}
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

