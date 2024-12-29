import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { CalendarDays, MapPin, Banknote, CalendarPlus } from "lucide-react"
import { ics } from "calendar-link";
import Background from '@/components/common/background';
import { Toast } from '@/utils/sweetalert-config';


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
    <Background>
      <div className="flex justify-center items-center h-full">
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
                <h3 className="font-semibold text-lg">일시</h3>
                <p className="text-muted-foreground">1월 18일 토요일, 늦은 5시</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg">장소</h3>
                <p className="text-muted-foreground font-bold">성우레더스테이지</p>
                <p className="text-muted-foreground">서울 성동구 연무장길 45</p>
                {/* <p className="text-muted-foreground">성우레더 건물 2층</p> */}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Banknote className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg">가격</h3>
                <p className="text-muted-foreground font-bold">5,000원</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="flex-1" onClick={() => navigate('/rsvp')}>
              등록하기
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/')}
            >
              메인으로
            </Button>

            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => {
                try {
                  const event = {
                    title: "성우레더스테이지 공연",
                    start: new Date("2024-01-18T17:00:00+09:00"),
                    end: new Date("2024-01-18T19:30:00+09:00"),
                    location: "서울 성동구 연무장길 45"
                  };

                  // Google Calendar URL (works well on Android)
                  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${event.end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&location=${encodeURIComponent(event.location)}`;
                  
                  // Try ICS first, fallback to Google Calendar
                  try {
                    window.location.href = ics(event);
                  } catch {
                    window.location.href = googleUrl;
                  }
                } catch (error) {
                  Toast.fire({
                    title: "캘린더 추가 실패",
                    text: (error as Error).message,
                    icon: "error",
                  });
                }
              }}
            >
              <CalendarPlus className="w-4 h-4" />
              캘린더에 추가
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </Background>

  )
}

export default EventInfoPage