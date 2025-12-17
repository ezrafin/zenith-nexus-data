import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Mail, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const passwordRequirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'Contains a number', test: (p) => /\d/.test(p) },
  { label: 'Contains a special character (!@#$%^&*)', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

const getPasswordStrength = (password: string): { level: number; label: string; color: string } => {
  const metCount = passwordRequirements.filter((req) => req.test(password)).length;
  if (metCount === 0) return { level: 0, label: '', color: '' };
  if (metCount === 1) return { level: 1, label: 'Weak', color: 'bg-destructive' };
  if (metCount === 2) return { level: 2, label: 'Medium', color: 'bg-yellow-500' };
  return { level: 3, label: 'Strong', color: 'bg-green-500' };
};

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const { signUp, signInWithOAuth } = useUser();

  const allRequirementsMet = passwordRequirements.every((req) => req.test(password));
  const passwordStrength = getPasswordStrength(password);

  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      'User already registered': 'An account with this email already exists. Please sign in instead.',
      'Email already registered': 'An account with this email already exists. Please sign in instead.',
      'Password should be at least 6 characters': 'Password must be at least 8 characters.',
      'Invalid email': 'Please enter a valid email address.',
      'Signup disabled': 'Registration is currently disabled. Please try again later.',
    };
    return errorMessages[errorCode] || errorCode || 'An error occurred during registration.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!allRequirementsMet) {
      setError('Please meet all password requirements');
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
                <h1 className="heading-md mb-2">Check your email</h1>
                <p className="text-muted-foreground">
                  We've sent a verification link to:
                </p>
                <p className="font-medium text-lg mt-2">{email}</p>
              </div>

              <div className="text-sm text-muted-foreground space-y-3 text-left bg-secondary/30 rounded-lg p-4">
                <p className="font-medium text-foreground">What's next?</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Open your email inbox</li>
                  <li>Click the verification link in the email</li>
                  <li>Return here to sign in</li>
                </ol>
                <p className="text-xs mt-4">
                  Can't find the email? Check your spam or junk folder.
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <Link to="/auth/login" className="block">
                  <Button className="w-full">
                    Go to Sign In
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setEmailSent(false)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Use a different email
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
            <h1 className="heading-lg mb-2">Create an account</h1>
            <p className="text-muted-foreground">Get started with your free account</p>
          </div>

          <div className="premium-card p-8 space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>{error}</p>
                  {error.includes('already exists') && (
                    <Link to="/auth/login" className="underline hover:no-underline mt-1 block">
                      Sign in instead
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Google OAuth Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <GoogleIcon />
              Continue with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or sign up with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username (optional)</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
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
                  className={cn(error && 'border-destructive')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password strength indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden flex gap-0.5">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              'flex-1 h-full rounded-full transition-colors',
                              passwordStrength.level >= level ? passwordStrength.color : 'bg-secondary'
                            )}
                          />
                        ))}
                      </div>
                      {passwordStrength.label && (
                        <span className={cn(
                          'text-xs font-medium',
                          passwordStrength.level === 1 && 'text-destructive',
                          passwordStrength.level === 2 && 'text-yellow-500',
                          passwordStrength.level === 3 && 'text-green-500'
                        )}>
                          {passwordStrength.label}
                        </span>
                      )}
                    </div>

                    {/* Password requirements */}
                    <div className="space-y-1.5">
                      {passwordRequirements.map((req, index) => (
                        <div
                          key={index}
                          className={cn(
                            'flex items-center gap-2 text-xs transition-colors',
                            req.test(password) ? 'text-green-500' : 'text-muted-foreground'
                          )}
                        >
                          <CheckCircle className={cn('h-3 w-3', req.test(password) ? 'opacity-100' : 'opacity-40')} />
                          {req.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !allRequirementsMet}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

