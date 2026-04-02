import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, MapPin, Clock, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lot, slot, startTime, endTime, total, transactionId } = (location.state || {}) as any;

  if (!lot) {
    return <Layout><p className="text-center py-20 text-muted-foreground">No booking data.</p></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slot-available/10">
            <CheckCircle2 className="h-12 w-12 text-slot-available" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-2xl font-bold text-foreground mb-1">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-6">Your parking slot has been reserved successfully</p>

          <Card className="shadow-card border-0 text-left">
            <CardContent className="p-6 space-y-3 text-sm">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-muted-foreground">Booking ID</span>
                <span className="font-mono font-medium text-foreground">BK{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between"><span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Location</span><span className="font-medium text-foreground">{lot.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Slot</span><span className="font-medium text-foreground">{slot.slotNumber}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Start</span><span className="font-medium text-foreground">{new Date(startTime).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> End</span><span className="font-medium text-foreground">{new Date(endTime).toLocaleString()}</span></div>
              <div className="flex justify-between pt-3 border-t"><span className="text-muted-foreground flex items-center gap-1"><CreditCard className="h-3.5 w-3.5" /> Amount Paid</span><span className="text-lg font-bold text-primary">${total}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Transaction ID</span><span className="font-mono text-xs text-muted-foreground">{transactionId}</span></div>
            </CardContent>
          </Card>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => {}}>
              <Download className="h-4 w-4 mr-2" /> Download Receipt
            </Button>
            <Button className="flex-1 gradient-hero text-primary-foreground border-0 hover:opacity-90" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
