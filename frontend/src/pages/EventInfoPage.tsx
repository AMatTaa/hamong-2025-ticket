import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

function EventInfoPage() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)  // Add this state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`hamong-background min-h-screen overflow-hidden
      [background-image:linear-gradient(to_right,#A5A696_1px,transparent_1px),linear-gradient(to_bottom,#A5A696_1px,transparent_1px)]
      sm:[background-size:5vw_5vw]
      md:[background-size:4vw_4vw]
      lg:[background-size:3vw_3vw]
      [background-size:6vw_6vw]`}>
      <Header />
      <Card className={`w-5/6 max-w-2xl mx-auto transition-all border-3 border-[#061122] rounded-none duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
      }`}>
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
      <Footer />
    </div>
  )
}

export default EventInfoPage