import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import { api } from '@/services/api'
import { RsvpData } from '@/libs/types'
import Swal from 'sweetalert2'
// import type { HTTPError } from 'ky';  // Add this import

function RsvpPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showGuests, setShowGuests] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [error, setError] = useState<string | null>(null)


  // Validate phone number format
  const isValidPhone = (phone: string) => {
    return /^\d{11}$/.test(phone)  // Changed regex to exactly 11 digits
  }

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only keep digits
    const digitsOnly = value.replace(/\D/g, '');
    
    setPhone(digitsOnly);
    setShowName(isValidPhone(digitsOnly));
    if (!isValidPhone(digitsOnly)) {
      setShowGuests(false);
      setName('');
      setGuests('');
    }
  }

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGuests(value)
    setShowSubmit(value.length > 0) // Show submit button when guests field has a value
  }

  // Handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    setShowGuests(value.length >= 2) // Show guests field if name is at least 2 characters
    if (!value) {
      setGuests('')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    const rsvpData: RsvpData = {
      phone: phone.toString(),
      name: name,
      guests: parseInt(guests)
    };
    
    setIsLoading(true);
    try {
      setError(null);
      await api.submitRsvp(rsvpData);
      Swal.fire({
        title: '등록 완료!',
        text: '공연날에 뵈어요:)',
        showConfirmButton: false,
        scrollbarPadding: false,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {navigate('/')}
      });
    } catch (error) {
      console.error('Error details:', error);
      setError('RSVP 등록에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  const isFormValid = () => {
    return (
      isValidPhone(phone) && 
      name.length >= 2 && 
      guests.length > 0 && 
      parseInt(guests) > 0
    )
  }

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
          <CardTitle>등록하기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 overflow-hidden"> {/* Added overflow-hidden and increased space */}
          <div className="space-y-2 transition-all duration-500 ease-out">
            <Label htmlFor="phone">연락처</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="핸드폰 번호를 적어주세요"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={11}
              className="transition-all duration-300"
              autoComplete="off"
            />
          </div>

          <div className={`transform transition-all duration-500 ease-out ${
            showName 
              ? 'translate-y-0 opacity-100 h-auto mb-6' 
              : '-translate-y-8 opacity-0 h-0 mb-0'
          }`}>
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                placeholder="이름을 적어주세요"
                value={name}
                onChange={handleNameChange}
                className="transition-all duration-300"
                autoComplete="off"
              />
            </div>
          </div>

          <div className={`transform transition-all duration-500 ease-out ${
            showGuests 
              ? 'translate-y-0 opacity-100 h-auto' 
              : '-translate-y-8 opacity-0 h-0'
          }`}>
            <div className="space-y-2">
              <Label htmlFor="guests">플러스 원</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                placeholder="총 인원"
                value={guests}
                onChange={handleGuestsChange}
                className="transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className={`transform transition-all duration-500 ease-out ${
            showSubmit
              ? 'translate-y-0 opacity-100 h-auto mt-8 mb-6' 
              : '-translate-y-8 opacity-0 h-0 mt-0'
          }`}>
            <Button 
              className="w-full bg-[#061122] text-white hover:bg-[#162133] transition-colors"
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? "처리 중..." : "등록하기"}
            </Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
      <Footer />
    </div>
  )
}

export default RsvpPage