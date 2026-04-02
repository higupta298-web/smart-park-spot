import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockParkingLots } from '@/lib/mock-data';
import { Search, MapPin, Star, Car, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const filtered = mockParkingLots.filter(lot =>
    lot.name.toLowerCase().includes(search.toLowerCase()) ||
    lot.city.toLowerCase().includes(search.toLowerCase()) ||
    lot.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero Search */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl gradient-hero p-8 mb-8 shadow-elevated">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">Find Your Perfect Parking Spot</h1>
        <p className="text-primary-foreground/70 mb-6">Search from hundreds of locations near you</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search location, city, or parking name..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-10 bg-card border-0 shadow-card h-11" />
          </div>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-card border-0 shadow-card h-11 sm:w-40" />
          <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="bg-card border-0 shadow-card h-11 sm:w-32" />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: MapPin, label: 'Locations', value: '6', color: 'text-primary' },
          { icon: Car, label: 'Total Slots', value: '1,260', color: 'text-secondary' },
          { icon: Clock, label: 'Available Now', value: '556', color: 'text-slot-available' },
          { icon: Star, label: 'Avg Rating', value: '4.3', color: 'text-accent' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="shadow-card border-0 hover:shadow-elevated transition-shadow">
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`rounded-lg bg-muted p-2.5 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Parking Lots Grid */}
      <h2 className="text-xl font-bold text-foreground mb-4">Nearby Parking Locations</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((lot, i) => (
          <motion.div key={lot.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="shadow-card border-0 hover:shadow-elevated transition-all group cursor-pointer overflow-hidden"
              onClick={() => navigate(`/lot/${lot.id}`)}>
              <div className="h-32 gradient-hero relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-12 w-12 text-primary-foreground/30" />
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-xs font-medium">
                  <Star className="h-3 w-3 text-accent fill-accent" /> {lot.rating}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{lot.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                  <MapPin className="h-3.5 w-3.5" /> {lot.address}, {lot.city}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-foreground">${lot.pricePerHour}</span>
                    <span className="text-xs text-muted-foreground">/hr</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-slot-available">{lot.availableSlots}</span>
                    <span className="text-muted-foreground">/{lot.totalSlots} slots</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  View Slots <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
