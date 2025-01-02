import { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import Background from '@/components/common/background';
// import { api } from '@/services/api'
import { RsvpData } from '@/libs/types'
import CustomSwal, { Toast } from '@/utils/sweetalert-config'
import { ArrowLeft } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
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
  // const [showPayments, setShowPayments] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<'phone' | 'name' | 'guests' | 'payment'>('phone')
  const [isMobile, setIsMobile] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  // Add refs for input fields
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const guestsInputRef = useRef<HTMLInputElement>(null);

  // Add useEffect for autofocus
  useEffect(() => {
    if (currentStep === 'phone') {
      phoneInputRef.current?.focus();
    } else if (currentStep === 'name') {
      nameInputRef.current?.focus();
    } else if (currentStep === 'guests') {
      guestsInputRef.current?.focus();
    }
  }, [currentStep]);

  // Validate phone number format
  const isValidPhone = (phone: string) => {
    return /^\d{11}$/.test(phone)  // Changed regex to exactly 11 digits
  }

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const digitsOnly = value.replace(/\D/g, '')
    setPhone(digitsOnly)
    setShowName(isValidPhone(digitsOnly))
    if (!isValidPhone(digitsOnly)) {
      setShowGuests(false)
      setName('')
      setGuests('')
    }
  }

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value);
    
    if (value === '') {
      setGuests('');
    } else if (!isNaN(numValue)) {
      // Clamp the value between 1 and 10
      const clampedValue = Math.min(Math.max(numValue, 1), 10);
      setGuests(clampedValue.toString());
    }
  }

  // Handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    setShowGuests(value.length >= 2)
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

  // Add useEffect for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    const rsvpData: RsvpData = {
      phone: phone.toString(),
      name: name,
      guests: parseInt(guests)
    };

    try {
      const result = await CustomSwal.fire({
        title: '정보 확인',
        html: `
          <div class="space-y-4">
            <p class="text-sm text-[#061222] mb-4">이대로 확정할까요?</p>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center border-b border-[#061222] pb-2">
              <div class="text-sm font-medium text-[#061222]">연락처</div>
              <div class="text-sm text-[#061222] font-bold">${rsvpData.phone}</div>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center border-b border-[#061222] pb-2">
              <div class="text-sm font-medium text-[#061222]">이름</div>
              <div class="text-sm text-[#061222] font-bold">${rsvpData.name}</div>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center border-b border-[#061222] pb-2">
              <div class="text-sm font-medium text-[#061222]">추가 인원</div>
              <div class="text-sm text-[#061222] font-bold">${rsvpData.guests}명</div>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center border-b border-[#061222] pb-2">
              <div class="text-sm font-medium text-[#061222]">총 인원</div>
              <div class="text-sm text-[#061222] font-bold">${rsvpData.guests + 1}명</div>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 items-center pb-2">
              <div class="text-sm font-medium text-[#061222]">총 금액</div>
              <div class="text-sm text-[#061222] font-bold">${(rsvpData.guests + 1) * 5000}원</div>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: '네!',
        cancelButtonText: '고칠게 있어요!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        width: '90%',
        padding: '2rem',
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/send_rsvp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(rsvpData),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
          }

          await Toast.fire({
            title: '등록 완료!',
            text: '공연날에 뵈어요:)',
            icon: 'success',
          });
          navigate('/');
        } catch (error) {
          console.error('Error details:', error);
          const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
          await Toast.fire({
            title: 'RSVP 등록 실패',
            text: errorMessage,
            icon: 'error',
          });
          setError('RSVP 등록에 실패했습니다. 다시 시도해 주세요.');
        }
      }
    } catch (error) {
      console.error('SweetAlert error:', error);
      setError('처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      isValidPhone(phone) && 
      name.length >= 2 && 
      guests.length > 0 && 
      parseInt(guests) > 0 &&
      paymentConfirmed
    )
  }

  // Add back button handler
  const handleBack = (step: 'phone' | 'name' | 'guests' | 'payment') => {
    setCurrentStep(step)
    setError(null)
    
    if (step === 'phone') {
      setName('')
      setGuests('')
      setShowGuests(false)
      setShowSubmit(false)
      setPaymentConfirmed(false)
    } else if (step === 'name') {
      setGuests('')
      setShowSubmit(false)
      setPaymentConfirmed(false)
    } else if (step === 'guests') {
      setPaymentConfirmed(false)
    }
  }

  // Add confirm handlers for each step
  const handlePhoneConfirm = () => {
    if (isValidPhone(phone)) {
      setCurrentStep('name')
    }
  }

  const handleNameConfirm = () => {
    if (name.length >= 2) {
      setCurrentStep('guests')
    }
  }

  const handleGuestsConfirm = () => {
    if (guests.length > 0 && parseInt(guests) > 0) {
      setCurrentStep('payment')
    }
  }

  const copyToClipboard = async (text: string, e?: React.MouseEvent | React.TouchEvent) => {
    // Stop any event propagation first
    e?.stopPropagation();
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        
        if (navigator.userAgent.match(/ipad|iphone/i)) {
          // iOS specific handling
          const range = document.createRange();
          range.selectNodeContents(tempInput);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
          tempInput.setSelectionRange(0, 999999);
        } else {
          tempInput.select();
        }
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }

    await Toast.fire({
      title: '복사 완료!',
      text: '계좌번호가 클립보드에 복사되었습니다.',
      icon: 'success',
    });
  };

  return (
    <Background>
      <div className="flex justify-center items-center h-full">
        <Card className={`max-w-2xl mx-auto transition-all border-3 border-[#061122] rounded-none duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
        }`}>
          <CardHeader>
            <CardTitle>등록하기</CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden relative lg:space-y-6"> {/* Added overflow-hidden and increased space */}
            <div className={`space-y-2 transition-all duration-500 ease-out ${
              isMobile && currentStep !== 'phone' ? 'hidden' : ''
            }`}>
              <Label htmlFor="phone">연락처</Label>
              <Input
                id="phone"
                ref={phoneInputRef}
                type="tel"
                placeholder="- 없이 적어주세요"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={11}
                className="transition-all duration-300"
                autoComplete="off"
              />
              {isMobile && (
                <div className="flex justify-end mt-4">
                  <Button 
                    className="w-1/2 transition-opacity duration-500"
                    onClick={handlePhoneConfirm}
                    disabled={!isValidPhone(phone)}
                  >
                    확인
                  </Button>
                </div>
              )}
            </div>

            <div className={`space-y-2 transition-all duration-500 ease-out ${
              !showName ? 'hidden' : ''
            } ${isMobile && currentStep !== 'name' ? 'hidden' : ''}`}>
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                ref={nameInputRef}
                placeholder="이름을 적어주세요"
                value={name}
                onChange={handleNameChange}
                className="transition-all duration-300"
                autoComplete="off"
              />
              {isMobile && (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBack('phone')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    뒤로
                  </Button>
                  <Button 
                    className="w-1/2 transition-opacity duration-500"
                    onClick={handleNameConfirm}
                    disabled={name.length < 2}
                  >
                    확인
                  </Button>
                </div>
              )}
            </div>

            <div className={`space-y-2 transition-all duration-500 ease-out ${
              !showGuests ? 'hidden' : ''
            } ${isMobile && currentStep !== 'guests' ? 'hidden' : ''}`}>
              <Label htmlFor="guests">다른 분도 오시나요?</Label>
              <Input
                id="guests"
                ref={guestsInputRef}
                type={isMobile ? "tel" : "number"}
                inputMode={isMobile ? "numeric" : undefined}
                min="0"
                max="10"
                placeholder="등록자를 제외한 인원 (0-10명)"
                value={guests}
                onChange={handleGuestsChange}
                className="transition-all duration-300"
                autoComplete="off"
              />
              {isMobile && (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBack('name')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    뒤로
                  </Button>
                  <Button 
                    className="w-1/2"
                    onClick={handleGuestsConfirm}
                    disabled={!guests || parseInt(guests) < 1}
                  >
                    다음
                  </Button>
                </div>
              )}
            </div>

            <div className={`space-y-4 transition-all duration-500 ease-out ${
              !showGuests ? 'hidden' : ''
            } ${isMobile && currentStep !== 'payment' ? 'hidden' : ''}`}>
              <div className="space-y-4">
                <h3 className="font-semibold">티켓 가격 안내</h3>
                <p className="text-sm text-gray-600">1인당 4,000원</p>
                <p className="text-sm text-gray-600">총 인원: <span className="font-bold">{parseInt(guests) + 1}명</span></p>
                <p className="text-sm text-gray-600">총 금액: <span className="font-bold">{(parseInt(guests) + 1) * 4000}원</span></p>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">입금 계좌</h4>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyToClipboard('토스뱅크 1000-7968-9090');
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyToClipboard('토스뱅크 1000-7968-9090');
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer flex items-center space-x-2 active:opacity-70 p-2 -m-2 select-none"
                  >
                    <span className="font-bold underline">토스뱅크 1000-7968-9090 (김하람)</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="opacity-50"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="payment-confirmed"
                    checked={paymentConfirmed}
                    onCheckedChange={(checked) => setPaymentConfirmed(checked as boolean)}
                  />
                  <label 
                    htmlFor="payment-confirmed" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    입금할게요!
                  </label>
                </div>
              </div>

              {isMobile && (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBack('guests')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    뒤로
                  </Button>
                  <Button 
                    className="w-1/2"
                    onClick={handleSubmit}
                    disabled={isLoading || !isFormValid()}
                  >
                    {isLoading ? "처리 중..." : "등록하기"}
                  </Button>
                </div>
              )}
            </div>

            {!isMobile && (
              <div className={`transform transition-all duration-500 ease-out ${
                showSubmit
                  ? 'translate-y-0 opacity-100 h-auto mt-8 mb-6' 
                  : '-translate-y-8 opacity-0 h-0 mt-0'
              }`}>
                <Button 
                  className="w-1/2 bg-[#061122] text-white hover:bg-[#162133] transition-colors"
                  onClick={handleSubmit}
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? "처리 중..." : "등록하기"}
                </Button>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Background>
  )
}

export default RsvpPage