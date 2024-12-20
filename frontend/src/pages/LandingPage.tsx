import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Welcome to Our Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground">
            We're excited to celebrate with you! Please RSVP to let us know if you can make it.
          </p>
          <div className="flex flex-col gap-4">
            <Button size="lg" onClick={() => navigate('/rsvp')}>
              RSVP Now
            </Button>
            <Button variant="outline" onClick={() => navigate('/info')}>
              Event Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LandingPage