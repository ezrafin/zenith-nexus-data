import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(currentAvatar);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);
    onOpenChange(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${userId}/${fileName}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      // Update avatar
      setSelectedAvatar(publicUrl);
      onSelect(publicUrl);
      onOpenChange(false);
      toast.success('Avatar uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload avatar');
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
              accept="image/*"
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
              Max 2MB, JPG/PNG/GIF
            </p>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-2">Or choose from gallery:</p>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-4">
          {AVATAR_OPTIONS.map((avatar, index) => (
            <button
              key={index}
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
