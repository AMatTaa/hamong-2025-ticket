import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'

function RsvpPage() {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showGuests, setShowGuests] = useState(false)

  // Validate phone number format
  const isValidPhone = (phone: string) => {
    return /^\+?1?\d{9,15}$/.test(phone)
  }

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)
    setShowName(isValidPhone(value))
    if (!isValidPhone(value)) {
      setShowGuests(false)
      setName('')
      setGuests('')
    }
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


  return (
    <div className="hamong-background soft-grid-background min-h-screen">
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
              className="transition-all duration-300"
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
                onChange={(e) => setGuests(e.target.value)}
                className="transition-all duration-300"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Footer />
    </div>
  )
}

export default RsvpPage