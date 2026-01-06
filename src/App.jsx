import { Routes, Route, Navigate } from "react-router-dom"
import Guest from "./components/pages/Guest"
import ListGuests from "./components/pages/ListGuest"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <Routes>
        {/* Page publique */}
        <Route path="/" element={<Guest />} />


        {/* Page admin */}
        <Route path="/admin" element={<ListGuests />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  )
}

export default App
