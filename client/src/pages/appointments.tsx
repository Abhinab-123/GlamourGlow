import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, Calendar, Clock, User, Scissors } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { SERVICES } from "@/lib/constants";
import type { Booking } from "@shared/schema";

export default function AppointmentsPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const { data: bookings, isLoading, error } = useQuery<Booking[]>({
    queryKey: ['/api/bookings/phone', searchPhone],
    enabled: !!searchPhone,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setSearchPhone(phoneNumber.trim());
    }
  };

  const getServiceTitle = (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId);
    return service ? service.title : serviceId;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return "Not specified";
    return timeString;
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4" data-testid="appointments-title">
            My Appointments
          </h1>
          <p className="text-xl text-muted-foreground" data-testid="appointments-description">
            Enter your phone number to view your grooming appointments
          </p>
        </div>

        <Card className="bg-card p-8 rounded-lg shadow-lg mb-8">
          <CardContent className="p-0">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="text-primary h-5 w-5" />
                <span className="font-semibold">Find Your Appointments</span>
              </div>
              <div className="flex gap-4">
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                  data-testid="input-phone-search"
                />
                <Button 
                  type="submit"
                  className="bg-primary text-primary-foreground px-6 hover:bg-primary/90 transition-colors"
                  data-testid="button-search-appointments"
                >
                  Search
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="bg-card p-8 rounded-lg shadow-lg">
            <CardContent className="p-0 text-center">
              <p data-testid="loading-text">Searching for your appointments...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="bg-card p-8 rounded-lg shadow-lg">
            <CardContent className="p-0 text-center">
              <p className="text-destructive" data-testid="error-text">
                Failed to load appointments. Please try again.
              </p>
            </CardContent>
          </Card>
        )}

        {bookings && bookings.length === 0 && searchPhone && (
          <Card className="bg-card p-8 rounded-lg shadow-lg">
            <CardContent className="p-0 text-center">
              <p data-testid="no-appointments-text">
                No appointments found for phone number: {searchPhone}
              </p>
            </CardContent>
          </Card>
        )}

        {bookings && bookings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-4" data-testid="appointments-list-title">
              Your Appointments ({bookings.length})
            </h2>
            {bookings.map((booking) => (
              <Card key={booking.id} className="bg-card rounded-lg shadow-lg" data-testid={`appointment-card-${booking.id}`}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3" data-testid={`appointment-name-${booking.id}`}>
                        <User className="text-primary h-5 w-5" />
                        <span className="font-semibold">{booking.name}</span>
                      </div>
                      <div className="flex items-center space-x-3" data-testid={`appointment-phone-${booking.id}`}>
                        <Phone className="text-primary h-5 w-5" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3" data-testid={`appointment-service-${booking.id}`}>
                        <Scissors className="text-primary h-5 w-5" />
                        <span>{getServiceTitle(booking.service)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3" data-testid={`appointment-date-${booking.id}`}>
                        <Calendar className="text-primary h-5 w-5" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center space-x-3" data-testid={`appointment-time-${booking.id}`}>
                        <Clock className="text-primary h-5 w-5" />
                        <span>{formatTime(booking.time)}</span>
                      </div>
                      {booking.createdAt && (
                        <div className="text-sm text-muted-foreground" data-testid={`appointment-created-${booking.id}`}>
                          Booked: {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}