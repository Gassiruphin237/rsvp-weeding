import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export default function ImportGuestsModal({
  open,
  onClose,
  guests,
  onToggle,
  onImport,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importer des invités</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          {guests.map(g => (
            <Card
              key={g.id}
              className={`p-4 space-y-2 ${
                g.duplicate ? "border-red-500" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <Checkbox
                  checked={g.checked}
                  onCheckedChange={() => onToggle(g.id)}
                />

                {g.duplicate && (
                  <Badge variant="destructive">Doublon</Badge>
                )}
              </div>

              <div>
                <p className="font-medium">{g.name}</p>
                <p className="text-sm text-muted-foreground">
                  {g.phone}
                </p>
                <p className="text-sm">
                  Personnes : {g.guests_count}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onImport}>
            Importer la sélection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
