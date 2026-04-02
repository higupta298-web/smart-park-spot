export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  plateNumber: string;
  type: 'car' | 'motorcycle' | 'suv' | 'truck';
  model: string;
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  city: string;
  totalSlots: number;
  availableSlots: number;
  pricePerHour: number;
  imageUrl?: string;
  rating: number;
  latitude?: number;
  longitude?: number;
}

export interface ParkingSlot {
  id: string;
  lotId: string;
  slotNumber: string;
  floor: number;
  type: 'regular' | 'handicapped' | 'ev' | 'compact';
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
}

export interface Booking {
  id: string;
  userId: string;
  slotId: string;
  vehicleId: string;
  lotName: string;
  slotNumber: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: 'credit_card' | 'debit_card' | 'upi' | 'wallet';
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transactionId: string;
  paidAt: string;
}
