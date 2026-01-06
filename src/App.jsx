import React from 'react'
import Guest from './components/pages/Guest'
import { Toaster } from "@/components/ui/sonner"
function App() {
  return (
     <>
      <Guest />
      <Toaster richColors position="top-center" />
    </>
  )
}

export default App
