// frontend/src/pages/LandingPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set the card to be visible after the component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400); // Delay for a smoother effect

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className={`hamong-background h-[calc(100vh-64px)] overflow-hidden
      [background-image:linear-gradient(to_right,#A5A696_1px,transparent_1px),linear-gradient(to_bottom,#A5A696_1px,transparent_1px)]
      sm:[background-size:5vw_5vw]
      md:[background-size:4vw_4vw]
      lg:[background-size:3vw_3vw]
      [background-size:6vw_6vw]`}>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:justify-around md:gap-8">
          {/* Poster Image - properly hidden on mobile */}
          <div className="w-full md:w-1/2 hidden md:block max-h-[600px] max-w-[400px]">
            <div className={`border-2 border-[#061222] rounded-none max-h-[600px] max-w-[400px] transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
            }`}>            
              <img 
                src="/poster.jpg" 
                alt="Concert Poster" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Card - full width on mobile, half width on larger screens */}
          <div className="md:w-1/2 max-w-[400px]">
            <Card className={`transition-all max-w-[400px] border-3 border-[#061222] rounded-none duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
            }`}>
              <CardHeader>
                <CardTitle className="text-center text-4xl font-extrabold">무모한 공연 2025</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4">
                  <Button className='text-[#E8EAEA] bg-[#061222] border-2 rounded-none font-semibold' 
                          onClick={() => navigate('/rsvp')}>
                    등록하기
                  </Button>
                  <Button variant="outline" 
                          className='text-[#061122] border-2 font-semibold border-[#061122] rounded-none' 
                          onClick={() => navigate('/info')}>
                    공연 셋리스트
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;