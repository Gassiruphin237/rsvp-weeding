import { Routes, Route, Navigate } from "react-router-dom"
import Guest from "./components/pages/Guest"
import ListGuests from "./components/pages/ListGuest"
import { Toaster } from "@/components/ui/sonner"
import SavetheDate from "./components/pages/SavetheDate"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SavetheDate />} />
        <Route path="/reservation" element={<Guest />} />
        <Route path="/admin" element={<ListGuests />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  )
}

export default App
