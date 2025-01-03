import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { CalendarDays, MapPin, Banknote } from "lucide-react"
// import { ics } from "calendar-link";
import Background from '@/components/common/background';
// import { Toast } from '@/utils/sweetalert-config';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

declare global {
  interface Window {
    naver: any;
  }
}

function EventInfoPage() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const mapElement = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const initializeMap = () => {
      if (!mapElement.current || !window.naver) return;

      const location = new window.naver.maps.LatLng(37.5428311, 127.0545912);
      const mapOptions = {
        center: location,
        zoom: 17,
      };

      const map = new window.naver.maps.Map(mapElement.current, mapOptions);
      
      new window.naver.maps.Marker({
        position: location,
        map: map
      });
    };

    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_CLIENT_ID}`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Card className={`w-5/6 max-w-2xl mx-auto transition-all mt-6 border-3 border-[#061122] rounded-none duration-1000 transform ${
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
                  <p className="text-muted-foreground">1월 18일 토요일, 오후 5시 50분</p>
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
                  <p className="text-muted-foreground font-bold">1인당 4,000원</p>
                  <p className="text-muted-foreground text-sm">* 현장 구매 시 1인당 5,000원</p>
                </div>
              </div>
            </div>

            {/* Naver Map */}
            <div 
              ref={mapElement} 
              className="w-full h-[300px] border-2 border-[#061222]"
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 rounded-none border-2 border-[#061222]" onClick={() => navigate('/rsvp')}>
                등록하기
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 rounded-none border-2 border-[#061222]"
                onClick={() => navigate('/')}
              >
                메인으로
              </Button>

              <AddToCalendarButton
                name="하몽 2025 정기공연"
                options={['Apple','Google']}
                location="성우레더스테이지"
                useUserTZ={true}
                startDate="2025-01-18"
                endDate="2025-01-18"
                startTime="17:50"
                endTime="18:50"
                size='2|2|2'
                hideBackground={true}
                hideCheckmark={true}
                buttonStyle='flat'
                styleLight="--btn-padding-x: 10.7vh; --btn-background: #ffffff; --btn-text: #000000; --font: Noto Sans Korean; --btn-font-weight:700; --btn-active-shadow:none; --btn-shadow:none;"
                styleDark="--btn-padding-x: 10.7vh; --btn-background: #ffffff; --btn-text: #000000; --font: Noto Sans Korean; --btn-font-weight:700; --btn-active-shadow:none; --btn-shadow:none;"
                timeZone="Asia/Seoul">
              </AddToCalendarButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </Background>
  )
}

export default EventInfoPage