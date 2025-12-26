import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { validateAvatarFile } from '@/lib/utils/fileValidation';

// DiceBear Notionists background colors
const AVATAR_BACKGROUND_COLORS = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'];

// Avatar seeds for variety
const AVATAR_SEEDS = [
  'Felix', 'Aneka', 'Bailey', 'Charlie', 'Diana', 'Eden', 'Fiona', 'George',
  'Leo', 'Maria', 'Oscar', 'Sophie', 'Trader', 'Investor', 'Analyst', 'Broker',
  'Luna', 'Nova', 'Aria', 'Stella', 'Pro', 'Expert', 'Master', 'Guru',
  'Alex', 'Sam', 'Jordan', 'Taylor', 'Mason', 'Harper', 'Quinn', 'Riley'
];

// Generate Notionists avatars with gradient backgrounds
const AVATAR_OPTIONS = AVATAR_SEEDS.flatMap((seed) =>
  AVATAR_BACKGROUND_COLORS.map(
    (color) =>
      `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}&backgroundColor=${color}&backgroundType=gradientLinear`
  )
);

interface AvatarSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAvatar: string | null;
  onSelect: (avatarUrl: string) => void;
  userId?: string;
}

export function AvatarSelector({ open, onOpenChange, currentAvatar, onSelect, userId }: AvatarSelectorProps) {
  const { t } = useTranslation({ namespace: 'ui' });
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(currentAvatar);
  const [uploading, setUploading] = useState(false);
  const [unavailableAvatars, setUnavailableAvatars] = useState<Set<string>>(new Set());
  const [checkingAvatars, setCheckingAvatars] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load cached unavailable avatars on mount
  useEffect(() => {
    const cached = sessionStorage.getItem('unavailableAvatars');
    if (cached) {
      try {
        const cachedSet = new Set<string>(JSON.parse(cached));
        setUnavailableAvatars(cachedSet);
      } catch (error) {
        console.error('Failed to parse cached unavailable avatars:', error);
      }
    }
  }, []);

  // Check avatar availability when dialog opens
  useEffect(() => {
    if (!open) return;

    const checkAvatarAvailability = async () => {
      // Skip if we already have cached results
      const cached = sessionStorage.getItem('unavailableAvatars');
      if (cached) {
        try {
          const cachedSet = new Set<string>(JSON.parse(cached) as string[]);
          if (cachedSet.size > 0) {
            setUnavailableAvatars(cachedSet);
            return;
          }
        } catch {
          // Continue with check if cache is invalid
        }
      }

      setCheckingAvatars(true);
      const unavailable = new Set<string>();

      // Check avatars in batches to avoid overwhelming the API
      const batchSize = 20;
      for (let i = 0; i < AVATAR_OPTIONS.length; i += batchSize) {
        const batch = AVATAR_OPTIONS.slice(i, i + batchSize);
        const checks = await Promise.allSettled(
          batch.map(async (url) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
            
            try {
              const response = await fetch(url, { 
                method: 'HEAD', 
                cache: 'no-cache',
                signal: controller.signal
              });
              clearTimeout(timeoutId);
              if (!response.ok) {
                return url;
              }
              return null;
            } catch {
              clearTimeout(timeoutId);
              return url; // Mark as unavailable on error
            }
          })
        );

        checks.forEach((result, idx) => {
          if (result.status === 'fulfilled' && result.value) {
            unavailable.add(result.value);
          }
        });

        // Small delay between batches to avoid rate limiting
        if (i + batchSize < AVATAR_OPTIONS.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      setUnavailableAvatars(unavailable);
      setCheckingAvatars(false);

      // Cache results
      if (unavailable.size > 0) {
        sessionStorage.setItem('unavailableAvatars', JSON.stringify(Array.from(unavailable)));
      }
    };

    checkAvatarAvailability();
  }, [open]);

  // Filter out unavailable avatars
  const availableAvatars = AVATAR_OPTIONS.filter(avatar => !unavailableAvatars.has(avatar));

  const handleImageError = (avatar: string) => {
    setUnavailableAvatars(prev => {
      const updated = new Set(prev);
      updated.add(avatar);
      // Update cache
      sessionStorage.setItem('unavailableAvatars', JSON.stringify(Array.from(updated)));
      return updated;
    });
  };

  const handleSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);
    onOpenChange(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    setUploading(true);

    try {
      // Step 1: Client-side validation (fast feedback)
      const clientValidation = await validateAvatarFile(file);
      if (!clientValidation.valid) {
        toast.error(clientValidation.error || t('toast.pleaseSelectImageFile', { ns: 'ui' }));
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Step 2: Server-side validation via Edge Function (security layer)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error(t('toast.sessionExpired'));
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      // Call Edge Function with FormData
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const validateResponse = await fetch(`${supabaseUrl}/functions/v1/validate-avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      if (!validateResponse.ok) {
        const errorData = await validateResponse.json().catch(() => ({ error: 'Validation failed' }));
        toast.error(errorData.error || 'File validation failed');
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      const validateData = await validateResponse.json();
      if (!validateData.valid) {
        toast.error(validateData.error || 'File validation failed');
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Step 3: Generate unique filename with validated extension
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      const safeExt = allowedExts.includes(fileExt || '') ? fileExt : 'jpg';
      const fileName = `${Date.now()}.${safeExt}`;
      const filePath = `avatars/${userId}/${fileName}`;

      // Step 4: Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Step 5: Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      // Step 6: Update avatar
      setSelectedAvatar(publicUrl);
      onSelect(publicUrl);
      onOpenChange(false);
      toast.success(t('toast.avatarUploadedSuccess', { ns: 'ui' }));
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(t('toast.failedToUploadAvatar', { ns: 'ui' }));
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Avatar</DialogTitle>
        </DialogHeader>

        {/* Upload Section */}
        {userId && (
          <div className="mb-4 p-4 border border-dashed border-border rounded-lg">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileUpload}
              className="hidden"
              id="avatar-upload"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Custom Avatar
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Max 2MB, JPG/PNG/GIF/WEBP (32-2048px)
            </p>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-2">Or choose from gallery:</p>

        {checkingAvatars && (
          <div className="text-center py-4">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Checking available avatars...</p>
          </div>
        )}

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-4">
          {availableAvatars.map((avatar, index) => (
            <button
              key={`${avatar}-${index}`}
              onClick={() => handleSelect(avatar)}
              className={cn(
                'relative aspect-square rounded-full overflow-hidden border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary',
                selectedAvatar === avatar || currentAvatar === avatar
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <img
                src={avatar}
                alt={`Avatar option ${index + 1}`}
                className="w-full h-full object-cover bg-muted"
                onError={() => handleImageError(avatar)}
              />
              {(selectedAvatar === avatar || currentAvatar === avatar) && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
