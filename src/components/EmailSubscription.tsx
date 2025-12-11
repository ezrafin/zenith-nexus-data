import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Check } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

export function EmailSubscription() {
  const { user } = useUser();
  const [email, setEmail] = useState(user?.email || '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Check if email is already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscriptions')
        .select('id, is_active')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (existing) {
        if (existing.is_active) {
          toast.info('You are already subscribed to our newsletter');
          setIsSubmitted(true);
          setIsLoading(false);
          return;
        } else {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from('newsletter_subscriptions')
            .update({
              is_active: true,
              unsubscribed_at: null,
              user_id: user?.id || null,
            })
            .eq('id', existing.id);

          if (updateError) throw updateError;
        }
      } else {
        // Create new subscription
        const { error: insertError } = await supabase
          .from('newsletter_subscriptions')
          .insert({
            email: email.toLowerCase().trim(),
            user_id: user?.id || null,
            is_active: true,
            source: 'website',
          });

        if (insertError) throw insertError;
      }

      setIsSubmitted(true);
      toast.success("You're now subscribed to INVESTOPATRONUS newsletter");
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      
      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Mail className="h-4 w-4" />
            Newsletter
          </div>
          
          <h2 className="heading-lg mb-4">
            Stay Informed
          </h2>
          
          <p className="body-lg mb-8">
            Get daily curated financial news and market analytics delivered to your inbox
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-positive/10 text-positive"
            >
              <Check className="h-5 w-5" />
              <span className="font-medium">Successfully subscribed!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary whitespace-nowrap disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}