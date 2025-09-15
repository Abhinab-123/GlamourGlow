import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Booking submission endpoint
  app.post("/api/bookings", async (req, res) => {
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
      
      res.status(201).json({ 
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
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  // Get all bookings (for admin purposes)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Get bookings by phone number
  app.get("/api/bookings/phone/:phone", async (req, res) => {
    try {
      const { phone } = req.params;
      if (!phone) {
        return res.status(400).json({ message: "Phone number is required" });
      }
      
      const bookings = await storage.getBookingsByPhone(phone);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings by phone:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
