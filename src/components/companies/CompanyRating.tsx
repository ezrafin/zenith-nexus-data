import { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useFollowingList } from '@/hooks/useFollowingList';

interface CompanyRatingProps {
  companySlug: string;
  className?: string;
}

interface Evaluation {
  id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles?: {
    display_name: string | null;
    avatar_url: string | null;
  };
}

export function CompanyRating({ companySlug, className }: CompanyRatingProps) {
  const { user } = useUser();
  const { followingIds } = useFollowingList();
  const { t } = useTranslation({ namespace: 'ui' });
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [userComment, setUserComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [existingEvaluation, setExistingEvaluation] = useState<Evaluation | null>(null);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    loadEvaluations();
  }, [companySlug, user, followingIds]);

  const loadEvaluations = async () => {
    try {
      // Fetch all evaluations for this company
      const { data: evals, error } = await supabase
        .from('company_evaluations')
        .select('*')
        .eq('company_slug', companySlug)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles for evaluations
      if (evals && evals.length > 0) {
        const userIds = [...new Set(evals.map(e => e.user_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .in('id', userIds);
        
        const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
        
        let evalsWithProfiles = evals.map(e => ({
          ...e,
          profiles: profileMap.get(e.user_id) || null
        }));

        // If user has following, prioritize evaluations from followed users
        if (user && followingIds.length > 0) {
          evalsWithProfiles.sort((a, b) => {
            const aIsFollowed = followingIds.includes(a.user_id);
            const bIsFollowed = followingIds.includes(b.user_id);
            
            if (aIsFollowed && !bIsFollowed) return -1;
            if (!aIsFollowed && bIsFollowed) return 1;
            
            // If both are followed or both are not, sort by date
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
        }
        
        setEvaluations(evalsWithProfiles as any);
        
        // Calculate average rating
        const avg = evals.reduce((sum, e) => sum + e.rating, 0) / evals.length;
        setAverageRating(Math.round(avg * 10) / 10);
      } else {
        setEvaluations([]);
      }
      
      setRatingCount(evals?.length || 0);

      // Check if current user has an evaluation
      if (user && evals) {
        const userEval = evals.find(e => e.user_id === user.id);
        if (userEval) {
          setExistingEvaluation(userEval as any);
          setUserRating(userEval.rating);
          setUserComment(userEval.comment || '');
        }
      }
    } catch (error) {
      console.error('Error loading evaluations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t('toast.pleaseSignInToRate', { ns: 'ui' }));
      return;
    }

    if (userRating === 0) {
      toast.error(t('toast.pleaseSelectRating', { ns: 'ui' }));
      return;
    }

    setSubmitting(true);
    try {
      if (existingEvaluation) {
        // Update existing evaluation
        const { error } = await supabase
          .from('company_evaluations')
          .update({
            rating: userRating,
            comment: userComment.trim() || null,
          })
          .eq('id', existingEvaluation.id);

        if (error) throw error;
        toast.success(t('toast.evaluationUpdated', { ns: 'ui' }));
      } else {
        // Create new evaluation - requires moderation if has comment
        const hasComment = userComment.trim().length > 0;
        const { error } = await supabase
          .from('company_evaluations')
          .insert({
            user_id: user.id,
            company_slug: companySlug,
            rating: userRating,
            comment: userComment.trim() || null,
            is_approved: !hasComment, // Auto-approve if no comment, otherwise needs moderation
          });

        if (error) throw error;
        toast.success(hasComment ? 'Review submitted for moderation' : t('toast.thankYouForEvaluation', { ns: 'ui' }));
      }

      setShowCommentForm(false);
      loadEvaluations();
    } catch (error: any) {
      toast.error(error.message || t('errors.failedToPost'));
    } finally {
      setSubmitting(false);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 80) return 'text-green-500';
    if (rating >= 60) return 'text-yellow-500';
    if (rating >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <div className={cn('animate-pulse space-y-4', className)}>
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="h-20 bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with Average Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Community Evaluations
        </h3>
        
        {ratingCount > 0 && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border">
              <span className={cn('text-2xl font-bold', getRatingColor(averageRating))}>
                {averageRating}
              </span>
              <span className="text-muted-foreground">/100</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {ratingCount} {ratingCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        )}
      </div>

      {/* User Rating Section */}
      {user ? (
        <div className="p-4 rounded-lg border border-border bg-secondary/30">
          <p className="text-sm text-muted-foreground mb-3">
            {existingEvaluation ? t('toast.updateRating') : t('toast.rateOrganization')}
          </p>
          <div className="space-y-4 mb-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="rating-slider">Rating (0-100)</Label>
                <span className={cn('text-lg font-bold', getRatingColor(userRating))}>
                  {userRating}/100
                </span>
              </div>
              <Slider
                id="rating-slider"
                min={0}
                max={100}
                step={1}
                value={[userRating]}
                onValueChange={(value) => setUserRating(value[0])}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                max={100}
                value={userRating}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setUserRating(Math.max(0, Math.min(100, value)));
                }}
                className="w-20"
                placeholder="0-100"
              />
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
          </div>
          
          {!showCommentForm && userRating > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCommentForm(true)}
            >
              {existingEvaluation ? t('toast.updateComment') : t('toast.addComment')}
            </Button>
          )}

          {showCommentForm && (
            <div className="space-y-3 mt-3">
              <Textarea
                placeholder={t('toast.shareExperience')}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={submitting || userRating === 0}
                >
                  {submitting ? t('editor.submitting', { ns: 'forum' }) : existingEvaluation ? t('buttons.update', { ns: 'ui' }) : t('editor.submit', { ns: 'forum' })}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCommentForm(false)}
                >
                  {t('editor.cancel', { ns: 'forum' })}
                </Button>
              </div>
            </div>
          )}

          {!showCommentForm && userRating > 0 && !existingEvaluation && (
            <Button
              size="sm"
              className="ml-2"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? t('editor.submitting', { ns: 'forum' }) : t('toast.submitRating')}
            </Button>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-lg border border-border bg-secondary/30 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Sign in to rate this organization
          </p>
          <Link to="/auth/login">
            <Button size="sm">Sign In</Button>
          </Link>
        </div>
      )}

      {/* Evaluations List */}
      {evaluations.length > 0 ? (
        <div className="space-y-4">
          {evaluations.slice(0, 10).map((evaluation) => (
            <div
              key={evaluation.id}
              className="p-4 rounded-lg border border-border/50 bg-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {evaluation.profiles?.avatar_url && (
                      <img 
                        src={evaluation.profiles.avatar_url} 
                        alt="" 
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <span className="text-sm font-medium">
                        {evaluation.profiles?.display_name || 'Anonymous'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={cn('text-lg font-bold', getRatingColor(evaluation.rating))}>
                          {evaluation.rating}/100
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(evaluation.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {evaluation.comment && (
                    <p className="text-sm text-foreground mt-2">{evaluation.comment}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {evaluations.length > 10 && (
            <p className="text-sm text-muted-foreground text-center">
              +{evaluations.length - 10} more reviews
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          No evaluations yet. Be the first to rate!
        </p>
      )}
    </div>
  );
}