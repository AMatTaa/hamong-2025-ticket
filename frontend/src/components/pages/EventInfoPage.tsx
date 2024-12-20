import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { CalendarDays, Clock, MapPin } from "lucide-react"

function EventInfoPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Event Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CalendarDays className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Date</h3>
                <p className="text-muted-foreground">Saturday, December 31, 2024</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Time</h3>
                <p className="text-muted-foreground">6:00 PM - 11:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-muted-foreground">Grand Ballroom</p>
                <p className="text-muted-foreground">123 Event Street</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Additional Information</h3>
            <p className="text-muted-foreground">
              Join us for an evening of celebration! Dress code is formal. 
              Dinner and refreshments will be served.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="flex-1" onClick={() => navigate('/rsvp')}>
              RSVP Now
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EventInfoPage