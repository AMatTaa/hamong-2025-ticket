import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Music } from "lucide-react"
import Background from '@/components/common/background';

function SetlistPage() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  // Sample setlist data - you can move this to a separate data file later
  const setlist = [
    { id: 1, title: "사건의 지평선", artist: "윤하" },
    { id: 2, title: "Champagne Supernova", artist: "백예린 (Oasis Cover)" },
    { id: 3, title: "Odoriko", artist: "Vaundy" },
    { id: 4, title: "This love", artist: "Maroon 5" },
    { id: 5, title: "이름에게", artist: "아이유" },
    { id: 6, title: "사랑한다는 말로도 위로가 되지 않는", artist: "유다빈 밴드 (브로콜리 너마저 Cover)" },
    { id: 7, title: "꿈나라 별나라", artist: "잔나비" },
    { id: 8, title: "Shut up and Dance", artist: "Walk the Moon" },
    { id: 9, title: "Rewrite the Stars", artist: "Zac Effron, Zendaya" },
    { id: 10, title: "우리의 밤", artist: "유다빈 밴드 (feat. 유승우)" }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Background>
      <div className="flex justify-center items-center my-5">
        <Card className={`w-5/6 max-w-2xl mx-auto transition-all border-3 border-[#061122] rounded-none duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
        }`}>
          <CardHeader>
            <CardTitle className="text-center text-3xl">Setlist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Setlist */}
            <div className="space-y-6">
              {setlist.map((song) => (
                <div key={song.id} className="flex items-start gap-4">
                  <Music className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">{song.title}</h3>
                    <p className="text-muted-foreground">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/')}
              >
                메인으로
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Background>
  )
}

export default SetlistPage 