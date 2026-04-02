import { ParkingLot, ParkingSlot, Booking } from './types';

export const mockParkingLots: ParkingLot[] = [
  { id: '1', name: 'City Center Parking', address: '123 Main St', city: 'Downtown', totalSlots: 120, availableSlots: 34, pricePerHour: 5, rating: 4.5 },
  { id: '2', name: 'Mall Parking Complex', address: '456 Commerce Ave', city: 'Midtown', totalSlots: 200, availableSlots: 89, pricePerHour: 3, rating: 4.2 },
  { id: '3', name: 'Airport Long Stay', address: '789 Airport Rd', city: 'Airport Zone', totalSlots: 500, availableSlots: 156, pricePerHour: 8, rating: 4.7 },
  { id: '4', name: 'Tech Park Garage', address: '321 Innovation Dr', city: 'Tech District', totalSlots: 80, availableSlots: 12, pricePerHour: 4, rating: 4.0 },
  { id: '5', name: 'Stadium Parking', address: '654 Sports Blvd', city: 'Sports Complex', totalSlots: 300, availableSlots: 220, pricePerHour: 10, rating: 3.8 },
  { id: '6', name: 'Riverside Lot', address: '111 River Walk', city: 'Riverside', totalSlots: 60, availableSlots: 45, pricePerHour: 2, rating: 4.3 },
];

export function generateSlots(lotId: string, total: number): ParkingSlot[] {
  const types: ParkingSlot['type'][] = ['regular', 'regular', 'regular', 'compact', 'ev', 'handicapped'];
  const statuses: ParkingSlot['status'][] = ['available', 'occupied', 'available', 'reserved', 'available', 'occupied'];
  return Array.from({ length: total }, (_, i) => ({
    id: `${lotId}-${i + 1}`,
    lotId,
    slotNumber: `${String.fromCharCode(65 + Math.floor(i / 10))}${(i % 10) + 1}`,
    floor: Math.floor(i / 30) + 1,
    type: types[i % types.length],
    status: statuses[i % statuses.length],
  }));
}

export const mockBookings: Booking[] = [
  { id: 'B001', userId: '1', slotId: '1-5', vehicleId: 'V1', lotName: 'City Center Parking', slotNumber: 'A5', startTime: '2026-04-02T10:00', endTime: '2026-04-02T14:00', duration: 4, totalAmount: 20, status: 'completed', createdAt: '2026-04-01T08:00' },
  { id: 'B002', userId: '1', slotId: '2-12', vehicleId: 'V1', lotName: 'Mall Parking Complex', slotNumber: 'B2', startTime: '2026-04-03T09:00', endTime: '2026-04-03T12:00', duration: 3, totalAmount: 9, status: 'confirmed', createdAt: '2026-04-02T15:00' },
  { id: 'B003', userId: '1', slotId: '3-8', vehicleId: 'V2', lotName: 'Airport Long Stay', slotNumber: 'A8', startTime: '2026-04-05T06:00', endTime: '2026-04-07T18:00', duration: 60, totalAmount: 480, status: 'pending', createdAt: '2026-04-02T20:00' },
];
