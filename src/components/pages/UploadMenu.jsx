import { Plus, Image, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRef } from "react"

export default function UploadMenu({ onUpload }) {
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  return (
    <>
      {/* Inputs cachés */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={onUpload}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={onUpload}
      />

      {/* Bouton flottant */}
      <div className="fixed bottom-6 right-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-full shadow-lg">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => cameraInputRef.current.click()}
            >
              <Camera className="mr-2 h-4 w-4" />
              Prendre une photo
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => fileInputRef.current.click()}
            >
              <Image className="mr-2 h-4 w-4" />
              Choisir un fichier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
