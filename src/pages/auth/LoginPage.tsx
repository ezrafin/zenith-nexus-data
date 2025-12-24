import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { getMotionVariant, transitions, prefersReducedMotion } from '@/lib/animations';
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

export default function LoginPage() {
  const { t } = useTranslation({ namespace: 'ui' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signInWithOAuth } = useUser();
  const navigate = useNavigate();

  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'Invalid login credentials': 'Incorrect email or password. Please try again.',
      'Email not confirmed': 'Please verify your email address before signing in.',
      'User not found': 'No account found with this email address.',
      'Too many requests': 'Too many login attempts. Please try again later.',
      'invalid_credentials': 'Incorrect email or password. Please try again.',
      'email_not_confirmed': 'Please verify your email address before signing in.',
    };
    return errorMessages[errorCode] || errorCode || 'An error occurred during sign in.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      const message = getErrorMessage(error.message || error.code);
      setError(message);
      toast.error(message);
    } else {
      toast.success('Signed in successfully');
      navigate('/');
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signInWithOAuth('google');
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="heading-lg mb-2">{t('auth.welcomeBack')}</h1>
            <p className="text-muted-foreground">{t('auth.signInToContinue')}</p>
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
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google OAuth Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
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
                <span className="bg-card px-2 text-muted-foreground">{t('auth.orContinueWithEmail')}</span>
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
                <Label htmlFor="email">{t('labels.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
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
                transition={{ ...transitions.fast, delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('labels.password')}</Label>
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs text-primary hover:underline transition-colors"
                  >
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
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
              </motion.div>

              <motion.div
                initial={prefersReducedMotion() ? {} : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion() ? {} : { opacity: 1, y: 0 }}
                transition={{ ...transitions.fast, delay: 0.4 }}
              >
                <Button type="submit" className="w-full" disabled={loading} loading={loading}>
                  {loading ? t('auth.signingIn') : t('buttons.signIn')}
                </Button>
              </motion.div>
            </motion.form>

            <motion.p 
              className="text-center text-sm text-muted-foreground"
              initial={prefersReducedMotion() ? {} : { opacity: 0 }}
              animate={prefersReducedMotion() ? {} : { opacity: 1 }}
              transition={{ ...transitions.fast, delay: 0.5 }}
            >
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/auth/register" className="text-primary hover:underline font-medium transition-colors">
                {t('auth.signUp')}
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

