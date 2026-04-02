import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { mockParkingLots, generateSlots } from '@/lib/mock-data';
import { ParkingSlot } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, DollarSign, Car, Zap, Accessibility, Minimize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const typeIcons: Record<ParkingSlot['type'], typeof Car> = {
  regular: Car, ev: Zap, handicapped: Accessibility, compact: Minimize2,
};

export default function SlotSelection() {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const lot = mockParkingLots.find(l => l.id === lotId);
  const slots = useMemo(() => lot ? generateSlots(lot.id, Math.min(lot.totalSlots, 48)) : [], [lot]);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [floor, setFloor] = useState('all');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  if (!lot) return <Layout><p className="text-center text-muted-foreground py-20">Parking lot not found.</p></Layout>;

  const floors = [...new Set(slots.map(s => s.floor))];
  const filteredSlots = floor === 'all' ? slots : slots.filter(s => s.floor === Number(floor));

  const handleBook = () => {
    if (!selectedSlot) return toast.error('Please select a slot');
    if (!startTime || !endTime) return toast.error('Please select start and end time');
    navigate('/payment', { state: { lot, slot: selectedSlot, startTime, endTime } });
  };

  return (
    <Layout>
      <div className="mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block">&larr; Back to locations</button>
        <h1 className="text-2xl font-bold text-foreground">{lot.name}</h1>
        <p className="text-muted-foreground flex items-center gap-1 text-sm"><MapPin className="h-4 w-4" /> {lot.address}, {lot.city}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Slot Grid */}
        <div className="lg:col-span-2">
          <Card className="shadow-card border-0">
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle className="text-lg">Select a Slot</CardTitle>
                <Select value={floor} onValueChange={setFloor}>
                  <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Floors</SelectItem>
                    {floors.map(f => <SelectItem key={f} value={String(f)}>Floor {f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                {[
                  { label: 'Available', cls: 'slot-available' },
                  { label: 'Occupied', cls: 'slot-occupied' },
                  { label: 'Selected', cls: 'slot-selected' },
                  { label: 'Reserved', cls: 'slot-reserved' },
                ].map(item => (
                  <span key={item.label} className="flex items-center gap-1.5">
                    <span className={`h-3 w-3 rounded-sm ${item.cls}`} /> {item.label}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                {filteredSlots.map((slot, i) => {
                  const Icon = typeIcons[slot.type];
                  const isSelected = selectedSlot?.id === slot.id;
                  const isAvailable = slot.status === 'available';
                  return (
                    <motion.button key={slot.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.01 }}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSlot(isSelected ? null : slot)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all
                        ${isSelected ? 'slot-selected text-primary-foreground ring-2 ring-primary ring-offset-2 scale-105' :
                          isAvailable ? 'slot-available text-primary-foreground hover:opacity-80 cursor-pointer' :
                          slot.status === 'reserved' ? 'slot-reserved text-accent-foreground cursor-not-allowed opacity-70' :
                          'slot-occupied text-destructive-foreground cursor-not-allowed opacity-60'}
                      `}>
                      <Icon className="h-4 w-4 mb-0.5" />
                      <span className="text-[10px]">{slot.slotNumber}</span>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Panel */}
        <div>
          <Card className="shadow-card border-0 sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-3 text-sm">
                <div className="flex justify-between mb-1"><span className="text-muted-foreground">Location</span><span className="font-medium text-foreground">{lot.name}</span></div>
                <div className="flex justify-between mb-1"><span className="text-muted-foreground">Rate</span><span className="font-medium text-foreground flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{lot.pricePerHour}/hr</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Slot</span><span className="font-medium text-foreground">{selectedSlot ? selectedSlot.slotNumber : '—'}</span></div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Start Time</Label>
                  <Input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">End Time</Label>
                  <Input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} className="mt-1" />
                </div>
              </div>

              {startTime && endTime && (
                <div className="rounded-lg bg-muted p-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Duration</span>
                    <span className="font-medium text-foreground">
                      {Math.max(1, Math.ceil((new Date(endTime).getTime() - new Date(startTime).getTime()) / 3600000))} hrs
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">
                      ${Math.max(1, Math.ceil((new Date(endTime).getTime() - new Date(startTime).getTime()) / 3600000)) * lot.pricePerHour}
                    </span>
                  </div>
                </div>
              )}

              <Button onClick={handleBook} className="w-full gradient-hero text-primary-foreground border-0 hover:opacity-90" disabled={!selectedSlot}>
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
