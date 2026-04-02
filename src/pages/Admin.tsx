import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockParkingLots, mockBookings } from '@/lib/mock-data';
import { Users, Car, Calendar, TrendingUp, Plus, Search, BarChart3, DollarSign, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 4200 }, { month: 'Feb', revenue: 5100 }, { month: 'Mar', revenue: 6300 },
  { month: 'Apr', revenue: 4800 }, { month: 'May', revenue: 7200 }, { month: 'Jun', revenue: 8100 },
];

const slotData = [
  { name: 'Available', value: 556, color: 'hsl(145, 60%, 45%)' },
  { name: 'Occupied', value: 504, color: 'hsl(0, 75%, 55%)' },
  { name: 'Reserved', value: 150, color: 'hsl(38, 90%, 55%)' },
  { name: 'Maintenance', value: 50, color: 'hsl(220, 10%, 45%)' },
];

export default function Admin() {
  const [search, setSearch] = useState('');

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%', color: 'text-primary' },
    { icon: Car, label: 'Parking Lots', value: '6', change: '+1', color: 'text-secondary' },
    { icon: Calendar, label: 'Active Bookings', value: '89', change: '+5%', color: 'text-accent' },
    { icon: DollarSign, label: 'Revenue (MTD)', value: '$8,100', change: '+18%', color: 'text-slot-available' },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-foreground mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="shadow-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <Badge variant="outline" className="text-slot-available border-slot-available/30 text-xs">{stat.change}</Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="overview"><BarChart3 className="h-4 w-4 mr-1" /> Overview</TabsTrigger>
          <TabsTrigger value="lots"><MapPin className="h-4 w-4 mr-1" /> Parking Lots</TabsTrigger>
          <TabsTrigger value="bookings"><Calendar className="h-4 w-4 mr-1" /> Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card border-0">
              <CardHeader><CardTitle className="text-base">Monthly Revenue</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader><CardTitle className="text-base">Slot Distribution</CardTitle></CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={slotData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                      {slotData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <div className="flex flex-wrap justify-center gap-3 pb-4 text-xs">
                {slotData.map(s => (
                  <span key={s.name} className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    {s.name} ({s.value})
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lots">
          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Manage Parking Lots</CardTitle>
                <Button size="sm" className="gradient-hero text-primary-foreground border-0"><Plus className="h-4 w-4 mr-1" /> Add Lot</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-muted-foreground text-left">
                    <th className="pb-3 font-medium">Name</th><th className="pb-3 font-medium">City</th>
                    <th className="pb-3 font-medium">Total</th><th className="pb-3 font-medium">Available</th>
                    <th className="pb-3 font-medium">Rate</th><th className="pb-3 font-medium">Rating</th>
                  </tr></thead>
                  <tbody>
                    {mockParkingLots.map(lot => (
                      <tr key={lot.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 font-medium text-foreground">{lot.name}</td>
                        <td className="py-3 text-muted-foreground">{lot.city}</td>
                        <td className="py-3">{lot.totalSlots}</td>
                        <td className="py-3"><Badge variant="outline" className="text-slot-available border-slot-available/30">{lot.availableSlots}</Badge></td>
                        <td className="py-3">${lot.pricePerHour}/hr</td>
                        <td className="py-3">{lot.rating} ⭐</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">All Bookings</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-muted-foreground text-left">
                    <th className="pb-3 font-medium">ID</th><th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Slot</th><th className="pb-3 font-medium">Duration</th>
                    <th className="pb-3 font-medium">Amount</th><th className="pb-3 font-medium">Status</th>
                  </tr></thead>
                  <tbody>
                    {mockBookings.filter(b => b.lotName.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())).map(b => (
                      <tr key={b.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-3 font-mono text-foreground">{b.id}</td>
                        <td className="py-3 text-foreground">{b.lotName}</td>
                        <td className="py-3">{b.slotNumber}</td>
                        <td className="py-3">{b.duration}h</td>
                        <td className="py-3 font-medium">${b.totalAmount}</td>
                        <td className="py-3"><Badge variant="outline" className="capitalize">{b.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
