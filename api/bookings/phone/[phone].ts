import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {

  if (req.method === 'GET') {
    try {
      const { phone } = req.query;
      
      if (!phone || typeof phone !== 'string') {
        return res.status(400).json({ message: "Phone number is required" });
      }
      
      const bookings = await storage.getBookingsByPhone(phone);
      return res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings by phone:", error);
      return res.status(500).json({ message: "Failed to fetch bookings" });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}