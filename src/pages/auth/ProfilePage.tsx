import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Save, User, Shield, TrendingUp, MessageSquare, BookOpen, Trophy, Camera, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AchievementList } from '@/components/forum/AchievementList';
import { ReputationBadge } from '@/components/forum/ReputationBadge';
import { AvatarSelector } from '@/components/user/AvatarSelector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { usePageBillCollection } from '@/hooks/usePageBillCollection';

export default function ProfilePage() {
  // Bill collection: profile_own_visit
  usePageBillCollection({ billId: 'profile_own_visit' });
  const { user, profile, loading: authLoading, updateProfile } = useUser();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState<'public' | 'private' | 'friends'>('public');
  const [saving, setSaving] = useState(false);
  const [avatarSelectorOpen, setAvatarSelectorOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  // Email change state
  const [newEmail, setNewEmail] = useState('');
  const [changingEmail, setChangingEmail] = useState(false);

  // Timeout to prevent infinite loading
  useEffect(() => {
    if (authLoading) {
      const timeout = setTimeout(() => {
        setLoadingTimeout(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [authLoading]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setBio(profile.bio || '');
      setPrivacyLevel(profile.privacy_level);
      setAvatarUrl(profile.avatar_url || null);
    }
  }, [profile]);

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (authLoading && !loadingTimeout) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loadingTimeout && !user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Session expired</h1>
            <p className="text-muted-foreground mb-6">Please sign in again.</p>
            <Link to="/auth/login">
              <Button>Sign in</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4">Please sign in</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to view your profile.</p>
            <Link to="/auth/login">
              <Button>Sign in</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAvatarSelect = async (url: string) => {
    setAvatarUrl(url);
    const { error } = await updateProfile({ avatar_url: url });
    if (error) {
      toast.error('Failed to update avatar');
    } else {
      toast.success('Avatar updated successfully');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      display_name: displayName,
      bio: bio,
      privacy_level: privacyLevel,
    });

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully');
    }
    setSaving(false);
  };

  const handleEmailChange = async () => {
    if (!newEmail || newEmail === user.email) {
      toast.error('Please enter a different email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setChangingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      
      if (error) {
        toast.error(error.message || 'Failed to update email');
      } else {
        toast.success('Confirmation email sent! Please check both your old and new email addresses to confirm the change.');
        setNewEmail('');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setChangingEmail(false);
    }
  };

  return (
    <Layout>
      <div className="section-spacing">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-lg mb-8">Profile Settings</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="premium-card p-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <button
                    onClick={() => setAvatarSelectorOpen(true)}
                    className="relative group cursor-pointer"
                  >
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatarUrl || undefined} alt={displayName || 'User'} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </button>
                  <div className="text-center">
                    <h3 className="font-semibold">{profile?.display_name || 'User'}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Click avatar to change</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span>Reputation</span>
                    </div>
                    <span className="font-semibold">{profile?.reputation || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>Posts</span>
                    </div>
                    <span className="font-semibold">{profile?.post_count || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>Comments</span>
                    </div>
                    <span className="font-semibold">{profile?.comment_count || 0}</span>
                  </div>
                  <div className="pt-2">
                    <ReputationBadge profile={profile} size="sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="md:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="premium-card p-6">
                <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Email Settings */}
              <div className="premium-card p-6">
                <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Settings
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentEmail">Current Email</Label>
                    <Input
                      id="currentEmail"
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newEmail">New Email Address</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter new email address"
                    />
                    <p className="text-xs text-muted-foreground">
                      You'll need to confirm the change from both your old and new email addresses.
                    </p>
                  </div>

                  <Button 
                    onClick={handleEmailChange} 
                    disabled={changingEmail || !newEmail}
                    variant="outline"
                  >
                    {changingEmail ? 'Sending confirmation...' : 'Change Email'}
                  </Button>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="premium-card p-6">
                <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="privacy">Profile Visibility</Label>
                    <Select value={privacyLevel} onValueChange={(value: 'public' | 'private' | 'friends') => setPrivacyLevel(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can view</SelectItem>
                        <SelectItem value="friends">Friends - Only followed users</SelectItem>
                        <SelectItem value="private">Private - Only you</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>

          </div>

          {/* Achievements - Full width at bottom */}
          <div className="mt-8 premium-card p-6">
            <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </h2>
            <AchievementList />
          </div>
        </div>
      </div>

      <AvatarSelector
        open={avatarSelectorOpen}
        onOpenChange={setAvatarSelectorOpen}
        currentAvatar={avatarUrl}
        onSelect={handleAvatarSelect}
        userId={user.id}
      />
    </Layout>
  );
}
