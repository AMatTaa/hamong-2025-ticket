// frontend/src/pages/LandingPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import Background from '@/components/common/background';

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
    <Background>
      <div className="flex w-full h-full flex-col md:flex-row items-center justify-center lg:justify-evenly p-4">

        {/* Card - full width on mobile, half width on larger screens */}
        <div className="mx-8 my-2">
          <Card className={`transition-all sm:w-[300px] border-3 max-w-[500px] border-[#061222] rounded-none duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
          }`}>
            <CardHeader>
              <div className="flex flex-col items-center gap-4">
                <CardDescription className="text-center text-xl lg:text-2xl font-bold">"무모한 공연"</CardDescription>
                <CardTitle className="text-center text-2xl lg:text-3xl font-extrabold">하몽 2025 정기공연</CardTitle>
              </div>
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
                  Information
                </Button>
                <Button variant="outline" 
                        className='text-[#061122] border-2 font-semibold border-[#061122] rounded-none' 
                        onClick={() => navigate('/setlist')}>
                  Setlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Poster Image - properly hidden on mobile */}
        <div className="h-auto mx-8 my-2 md:w-[45%] lg:w-[27%] md:block sm:w-1/7">
          <div className={`border-2 border-[#061222] rounded-none transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
          }`}>
            <img 
              src="/poster.jpg" 
              alt="Concert Poster" 
              className="w-full h-auto object-contain max-w-full max-h-full"
            />
          </div>
        </div>
      </div>
    </Background>


  );
}

export default LandingPage;