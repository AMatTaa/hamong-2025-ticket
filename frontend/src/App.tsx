import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RsvpPage from './pages/RsvpPage'
import EventInfoPage from './pages/EventInfoPage'

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rsvp" element={<RsvpPage />} />
        <Route path="/info" element={<EventInfoPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
