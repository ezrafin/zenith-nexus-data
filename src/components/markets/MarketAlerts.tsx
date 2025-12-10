import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Bell, Trash2, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MarketAlert {
  id: string;
  symbol: string;
  market_type: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies';
  alert_type: 'price_above' | 'price_below' | 'percent_change_up' | 'percent_change_down';
  target_value: number | null;
  target_percent: number | null;
  is_active: boolean;
  triggered_at: string | null;
  created_at: string;
}

export function MarketAlerts() {
  const { user } = useUser();
  const [alerts, setAlerts] = useState<MarketAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      loadAlerts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadAlerts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('market_alerts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error loading alerts:', error);
      toast.error('Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      const { error } = await supabase
        .from('market_alerts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAlerts(alerts.filter((a) => a.id !== id));
      toast.success('Alert deleted');
    } catch (error) {
      toast.error('Failed to delete alert');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Alerts ({alerts.filter(a => a.is_active).length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Market Alerts</DialogTitle>
          <DialogDescription>
            Get notified when your watched instruments reach target prices or percentage changes
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading alerts...</p>
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No alerts yet</h3>
            <p className="text-muted-foreground mb-6">
              Create alerts to get notified about price movements
            </p>
            <CreateAlertForm onSuccess={() => {
              loadAlerts();
              setOpen(false);
            }} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <CreateAlertForm onSuccess={loadAlerts} />
            </div>
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-lg border border-border bg-card flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-medium">{alert.symbol}</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {alert.market_type}
                      </span>
                      {alert.is_active ? (
                        <span className="badge-primary text-xs">Active</span>
                      ) : (
                        <span className="badge-secondary text-xs">Inactive</span>
                      )}
                      {alert.triggered_at && (
                        <span className="badge-secondary text-xs">Triggered</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {alert.alert_type === 'price_above' && `Alert when price > $${alert.target_value}`}
                      {alert.alert_type === 'price_below' && `Alert when price < $${alert.target_value}`}
                      {alert.alert_type === 'percent_change_up' && `Alert when price increases by ${alert.target_percent}%`}
                      {alert.alert_type === 'percent_change_down' && `Alert when price decreases by ${alert.target_percent}%`}
                    </div>
                    {alert.triggered_at && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Triggered: {new Date(alert.triggered_at).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteAlert(alert.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CreateAlertForm({ onSuccess }: { onSuccess: () => void }) {
  const { user } = useUser();
  const [symbol, setSymbol] = useState('');
  const [marketType, setMarketType] = useState<'indices' | 'stocks' | 'crypto' | 'commodities' | 'currencies'>('stocks');
  const [alertType, setAlertType] = useState<'price_above' | 'price_below' | 'percent_change_up' | 'percent_change_down'>('price_above');
  const [targetValue, setTargetValue] = useState('');
  const [targetPercent, setTargetPercent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !symbol.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('market_alerts').insert({
        user_id: user.id,
        symbol: symbol.toUpperCase().trim(),
        market_type: marketType,
        alert_type: alertType,
        target_value: alertType.includes('price') ? parseFloat(targetValue) : null,
        target_percent: alertType.includes('percent') ? parseFloat(targetPercent) : null,
      });

      if (error) throw error;

      toast.success('Alert created');
      setOpen(false);
      setSymbol('');
      setTargetValue('');
      setTargetPercent('');
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create alert');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Market Alert</DialogTitle>
          <DialogDescription>
            Set up an alert to get notified when a market instrument reaches your target
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="AAPL, BTC, SPX..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="market-type">Market Type</Label>
            <Select value={marketType} onValueChange={(value: typeof marketType) => setMarketType(value)}>
              <SelectTrigger id="market-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="indices">Indices</SelectItem>
                <SelectItem value="commodities">Commodities</SelectItem>
                <SelectItem value="currencies">Currencies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alert-type">Alert Type</Label>
            <Select value={alertType} onValueChange={(value: typeof alertType) => setAlertType(value)}>
              <SelectTrigger id="alert-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_above">Price Above</SelectItem>
                <SelectItem value="price_below">Price Below</SelectItem>
                <SelectItem value="percent_change_up">Percent Increase</SelectItem>
                <SelectItem value="percent_change_down">Percent Decrease</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {alertType.includes('price') ? (
            <div className="space-y-2">
              <Label htmlFor="target-value">Target Price ($)</Label>
              <Input
                id="target-value"
                type="number"
                step="0.01"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="150.00"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="target-percent">Target Percentage (%)</Label>
              <Input
                id="target-percent"
                type="number"
                step="0.1"
                value={targetPercent}
                onChange={(e) => setTargetPercent(e.target.value)}
                placeholder="5.0"
                required
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Alert'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

