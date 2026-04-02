import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, Wallet, Shield, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lot, slot, startTime, endTime } = (location.state || {}) as any;
  const [method, setMethod] = useState('credit_card');
  const [processing, setProcessing] = useState(false);

  if (!lot || !slot) {
    return <Layout><p className="text-center py-20 text-muted-foreground">No booking data. <button className="text-primary underline" onClick={() => navigate('/dashboard')}>Go to dashboard</button></p></Layout>;
  }

  const hours = Math.max(1, Math.ceil((new Date(endTime).getTime() - new Date(startTime).getTime()) / 3600000));
  const total = hours * lot.pricePerHour;

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast.success('Payment successful!');
      navigate('/confirmation', { state: { lot, slot, startTime, endTime, total, method, transactionId: `TXN${Date.now()}` } });
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">&larr; Back</button>
        <h1 className="text-2xl font-bold text-foreground mb-6">Payment</h1>

        <div className="grid gap-6">
          {/* Order Summary */}
          <Card className="shadow-card border-0">
            <CardHeader><CardTitle className="text-lg">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-medium text-foreground">{lot.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Slot</span><span className="font-medium text-foreground">{slot.slotNumber} (Floor {slot.floor})</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Start</span><span className="font-medium text-foreground">{new Date(startTime).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">End</span><span className="font-medium text-foreground">{new Date(endTime).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium text-foreground">{hours} hr(s)</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Rate</span><span className="font-medium text-foreground">${lot.pricePerHour}/hr</span></div>
              <div className="flex justify-between pt-2 border-t mt-2">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">${total}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="shadow-card border-0">
            <CardHeader><CardTitle className="text-lg">Payment Method</CardTitle></CardHeader>
            <CardContent>
              <RadioGroup value={method} onValueChange={setMethod} className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { value: 'credit_card', label: 'Credit Card', icon: CreditCard },
                  { value: 'debit_card', label: 'Debit Card', icon: CreditCard },
                  { value: 'upi', label: 'UPI', icon: Smartphone },
                  { value: 'wallet', label: 'Wallet', icon: Wallet },
                ].map(m => (
                  <Label key={m.value} htmlFor={m.value}
                    className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                      method === m.value ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
                    }`}>
                    <RadioGroupItem value={m.value} id={m.value} />
                    <m.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{m.label}</span>
                  </Label>
                ))}
              </RadioGroup>

              {(method === 'credit_card' || method === 'debit_card') && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                  <div><Label className="text-xs text-muted-foreground">Card Number</Label><Input placeholder="1234 5678 9012 3456" className="mt-1" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label className="text-xs text-muted-foreground">Expiry</Label><Input placeholder="MM/YY" className="mt-1" /></div>
                    <div><Label className="text-xs text-muted-foreground">CVV</Label><Input placeholder="123" type="password" className="mt-1" /></div>
                  </div>
                </motion.div>
              )}

              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 text-slot-available" />
                Secured with 256-bit SSL encryption
              </div>
            </CardContent>
          </Card>

          <Button onClick={handlePayment} disabled={processing} className="w-full gradient-hero text-primary-foreground border-0 hover:opacity-90 h-12 text-base">
            {processing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : `Pay $${total}`}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
