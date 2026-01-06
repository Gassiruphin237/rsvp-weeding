import { useEffect, useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, MessageCircle, RefreshCw, FileText } from "lucide-react"
import { toast } from "sonner"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function ListGuests() {
  const [guests, setGuests] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const fetchGuests = async () => {
    try {
      setLoading(true)
      const res = await fetch("https://weeding-backend-85v1.onrender.com/api/guests")
      const data = await res.json()
      setGuests(data.data || [])
    } catch (err) {
      toast.error("Erreur", {
        description: "Impossible de charger la liste des invités",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuests()
  }, [])

  const filteredGuests = useMemo(() => {
    return guests.filter(g => {
      const matchSearch =
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.phone.includes(search)

      const matchFilter =
        filter === "all" ||
        (filter === "yes" && g.is_attending) ||
        (filter === "no" && !g.is_attending)

      return matchSearch && matchFilter
    })
  }, [guests, search, filter])

  const exportPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text(
      "Liste des invités (Michelle & Patrick)",
      105,
      20,
      { align: "center" }
    )

    doc.setFontSize(12)
    doc.text(
      `Total : ${filteredGuests.length} invité(s)`,
      105,
      28,
      { align: "center" }
    )

    const tableData = filteredGuests.map(g => [
      g.name,
      g.phone,
      g.is_attending ? "Présent" : "Absent",
      g.guests_count,
      new Date(g.created_at).toLocaleDateString(),
    ])

    autoTable(doc, {
      startY: 35,
      head: [["Nom", "Téléphone", "Présence", "Personnes", "Date"]],
      body: tableData,
      styles: { halign: "center" },
      headStyles: { fillColor: [22, 163, 74] }, 
    })

    doc.save("liste-invites-michelle-patrick.pdf")
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-10 px-4">
      {/* TITRE */}
      <h1 className="text-4xl font-serif font-semibold text-gray-900 mb-2 text-center">
        Liste des invités
      </h1>
      <p className="text-lg text-gray-500 mb-8 text-center">
        Michelle & Patrick
      </p>

      {/* CARD */}
      <Card className="w-full max-w-6xl p-6 space-y-6 shadow-xl">
        {/* HEADER ACTIONS */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={fetchGuests}
              disabled={loading}
              className="flex gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Rafraîchir
            </Button>

            <Button
              onClick={exportPDF}
              className="flex gap-2"
              disabled={filteredGuests.length === 0}
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Total affiché : {filteredGuests.length}
          </div>
        </div>

        {/* FILTRES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Rechercher par nom ou téléphone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="yes">Présents</SelectItem>
              <SelectItem value="no">Absents</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* TABLE */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Présence</TableHead>
                <TableHead>Personnes</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredGuests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Aucun invité trouvé
                  </TableCell>
                </TableRow>
              )}

              {filteredGuests.map(guest => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">
                    {guest.name}
                  </TableCell>
                  <TableCell>{guest.phone}</TableCell>

                  <TableCell>
                    {guest.is_attending ? (
                      <Badge className="bg-green-600">Présent</Badge>
                    ) : (
                      <Badge variant="destructive">Absent</Badge>
                    )}
                  </TableCell>

                  <TableCell>{guest.guests_count}</TableCell>

                  <TableCell>
                    {new Date(guest.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    {guest.message && (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          toast.info("Message", {
                            description: guest.message,
                          })
                        }
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    )}

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() =>
                        toast.warning("erreur", {
                          description:
                            "quelque chose n'a pas fonctionné",
                        })
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
