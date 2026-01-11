import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Card className="flex flex-col items-center gap-6 p-8 shadow-xl">
        <Loader2 className="h-12 w-12 animate-spin text-emerald-900" />
        <p className="text-lg font-serif text-emerald-900">
          Un instant ...
        </p>
      </Card>
    </div>
  )
}
