import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Pre-defined avatar options using DiceBear API with different styles
const AVATAR_OPTIONS = [
  // Adventurer style avatars
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Bailey',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Diana',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Eden',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Fiona',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=George',
  // Avataaars style
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oscar',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Trader',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Investor',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Analyst',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Broker',
  // Bottts style (robot avatars)
  'https://api.dicebear.com/7.x/bottts/svg?seed=Bot1',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Bot2',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Bot3',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Bot4',
  // Lorelei style
  'https://api.dicebear.com/7.x/lorelei/svg?seed=Luna',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=Nova',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=Aria',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=Stella',
  // Fun emoji style
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Happy',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cool',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Smart',
  'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Rich',
  // Notionists style
  'https://api.dicebear.com/7.x/notionists/svg?seed=Pro',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Expert',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Master',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Guru',
  // Personas style
  'https://api.dicebear.com/7.x/personas/svg?seed=Alex',
  'https://api.dicebear.com/7.x/personas/svg?seed=Sam',
  'https://api.dicebear.com/7.x/personas/svg?seed=Jordan',
  'https://api.dicebear.com/7.x/personas/svg?seed=Taylor',
];

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
