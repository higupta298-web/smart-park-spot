import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Car, Mail, Lock, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (register(name, email, password, phone)) {
        toast.success('Account created successfully!');
        navigate('/dashboard');
      }
    } else {
      if (login(email, password)) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials. Try user@demo.com / password');
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute rounded-full border border-primary-foreground/20"
              style={{ width: `${60 + i * 40}px`, height: `${60 + i * 40}px`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-md">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
            <Car className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">ParkEase</h1>
          <p className="text-lg text-primary-foreground/80">
            Smart parking made simple. Find, book, and pay for parking slots in seconds.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-primary-foreground/70 text-sm">
            <div className="rounded-xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary-foreground">500+</div>
              Locations
            </div>
            <div className="rounded-xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary-foreground">10K+</div>
              Users
            </div>
            <div className="rounded-xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary-foreground">99%</div>
              Uptime
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-background">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ParkEase</span>
          </div>

          <Card className="shadow-elevated border-0">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">{isRegister ? 'Create Account' : 'Welcome Back'}</CardTitle>
              <CardDescription>{isRegister ? 'Sign up to start booking' : 'Sign in to your account'}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="phone" placeholder="+1234567890" value={phone} onChange={e => setPhone(e.target.value)} className="pl-10" required />
                      </div>
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <Button type="submit" className="w-full gradient-hero text-primary-foreground border-0 hover:opacity-90 transition-opacity">
                  {isRegister ? 'Create Account' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-muted-foreground">
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button onClick={() => setIsRegister(!isRegister)} className="font-medium text-primary hover:underline">
                  {isRegister ? 'Sign In' : 'Sign Up'}
                </button>
              </div>

              {!isRegister && (
                <div className="mt-4 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                  <p className="font-medium mb-1">Demo Credentials:</p>
                  <p>User: user@demo.com / password</p>
                  <p>Admin: admin@demo.com / admin123</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
