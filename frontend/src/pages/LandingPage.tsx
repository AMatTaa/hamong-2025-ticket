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
    <div className="hamong-background soft-grid-background">
      <Header />
      <Card className={`transition-all border-3 border-[#061122] rounded-none duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-extrabold">무모한 공연 2025</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <Button  className='text-[#E8EAEA] bg-[#061122] border-2 border-[#E8EAEA] rounded-none' onClick={() => navigate('/rsvp')}>
              등록하기
            </Button>
            <Button variant="outline" className='text-[#061122] border-2 border-[#061122] rounded-none' onClick={() => navigate('/info')}>
              공연 셋리스트
            </Button>
          </div>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
}

export default LandingPage;