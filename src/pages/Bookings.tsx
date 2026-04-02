import Layout from '@/components/Layout';
import { mockBookings } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const statusColors: Record<string, string> = {
  pending: 'bg-slot-reserved/10 text-slot-reserved border-slot-reserved/30',
  confirmed: 'bg-primary/10 text-primary border-primary/30',
  active: 'bg-slot-available/10 text-slot-available border-slot-available/30',
  completed: 'bg-muted text-muted-foreground border-border',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/30',
};

export default function Bookings() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-foreground mb-6">My Bookings</h1>

      <div className="space-y-4">
        {mockBookings.map((booking, i) => (
          <motion.div key={booking.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="shadow-card border-0 hover:shadow-elevated transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{booking.lotName}</h3>
                      <Badge variant="outline" className={statusColors[booking.status]}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Slot {booking.slotNumber}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(booking.startTime).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {booking.duration}h</span>
                      <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> ${booking.totalAmount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Booking ID</p>
                    <p className="font-mono text-sm text-foreground">{booking.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
