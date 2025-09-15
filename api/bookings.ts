import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/db-storage';
import { insertBookingSchema } from '../shared/schema';
import { fromZodError } from 'zod-validation-error';

export default async function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method === 'POST') {
    try {
      const validation = insertBookingSchema.safeParse(req.body);
      
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ 
          message: "Invalid booking data", 
          error: validationError.message 
        });
      }

      const booking = await storage.createBooking(validation.data);
      
      return res.status(201).json({ 
        message: "Booking created successfully", 
        booking: {
          id: booking.id,
          name: booking.name,
          service: booking.service,
          date: booking.date,
          time: booking.time
        }
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Failed to create booking" });
    }
  }

  if (req.method === 'GET') {
    try {
      const bookings = await storage.getAllBookings();
      return res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ message: "Failed to fetch bookings" });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}