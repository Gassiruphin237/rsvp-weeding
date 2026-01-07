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
import {
  Trash2,
  MessageCircle,
  RefreshCw,
  FileText,
  Upload,
} from "lucide-react"
import { toast } from "sonner"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

import ImportGuestsModal from "@/components/ImportGuestsModal"

export default function ListGuests() {
  const [guests, setGuests] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // IMPORT XLS
  const [importOpen, setImportOpen] = useState(false)
  const [importGuests, setImportGuests] = useState([])

  // ================= FETCH =================
  const fetchGuests = async () => {
    try {
      setLoading(true)
      const res = await fetch("https://weeding-backend.vercel.app/api/guests")
      const data = await res.json()
      setGuests(data.data || [])
    } catch {
      toast.error("Erreur", {
        description: "Impossible de charger les invités",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGuests()
  }, [])

  // ================= FILTER =================
  const filteredGuests = useMemo(() => {
    return guests.filter(g => {
      const matchSearch =
        (g.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (g.phone || "").includes(search)

      const matchFilter =
        filter === "all" ||
        (filter === "yes" && g.is_attending) ||
        (filter === "no" && !g.is_attending)

      return matchSearch && matchFilter
    })
  }, [guests, search, filter])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filter, rowsPerPage])

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredGuests.length / rowsPerPage)

  const paginatedGuests = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage
    return filteredGuests.slice(start, start + rowsPerPage)
  }, [filteredGuests, currentPage, rowsPerPage])

  // ================= EXPORT PDF =================
  const exportPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Liste des invités (Michelle & Patrick)", 105, 20, {
      align: "center",
    })

    autoTable(doc, {
      startY: 30,
      head: [["Nom", "Téléphone", "Présence", "Personnes", "Date"]],
      body: filteredGuests.map(g => [
        g.name,
        g.phone,
        g.is_attending ? "Présent" : "Absent",
        g.guests_count,
        new Date(g.created_at).toLocaleDateString(),
      ]),
    })

    doc.save("liste-invites.pdf")
  }

  // ================= IMPORT XLS =================
  const handleXlsFile = e => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = evt => {
      const data = new Uint8Array(evt.target.result)
      const workbook = XLSX.read(data, { type: "array" })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const json = XLSX.utils.sheet_to_json(sheet)

      const parsed = json.map((row, index) => ({
        id: index,
        name: row.Nom || "",
        phone: String(row.Telephone || ""),
        guests_count: Number(row.Personnes || 1),
        is_attending: true,
        checked: true,
        duplicate: guests.some(
          g =>
            g.phone === String(row.Telephone || "") ||
            g.name?.toLowerCase() ===
              String(row.Nom || "").toLowerCase()
        ),
      }))

      setImportGuests(parsed)
      setImportOpen(true)
    }

    reader.readAsArrayBuffer(file)
  }

  const toggleImportGuest = id => {
    setImportGuests(prev =>
      prev.map(g =>
        g.id === id ? { ...g, checked: !g.checked } : g
      )
    )
  }

  const importSelectedGuests = async () => {
    const selected = importGuests.filter(
      g => g.checked && !g.duplicate
    )

    if (selected.length === 0) {
      toast.warning("Aucun invité valide à importer")
      return
    }

    await fetch("https://weeding-backend.vercel.app/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    })

    toast.success(`${selected.length} invités importés`)
    setImportOpen(false)
    fetchGuests()
  }

  // ================= RENDER =================
  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center py-10 px-4">
      <Card className="w-full max-w-6xl p-6 space-y-6 shadow-xl">
        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-4xl font-serif font-semibold">
            Liste des invités
          </h1>
          <p className="text-gray-500">Michelle & Patrick</p>
        </div>

        {/* ACTIONS EXISTANTES */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={fetchGuests}
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Rafraîchir
            </Button>

            <Button
              onClick={exportPDF}
              disabled={filteredGuests.length === 0}
            >
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>

          <span className="text-sm text-muted-foreground">
            Total affiché : {filteredGuests.length}
          </span>
        </div>

        {/* FILTRES + IMPORT XLS */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              className="sm:w-72"
              placeholder="Rechercher par nom ou téléphone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            {/* BOUTON IMPORT XLS */}
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("xls-import").click()
              }
            >
              <Upload className="w-4 h-4 mr-2" />
              Importer le fichier xls
            </Button>

            {/* INPUT FILE CACHÉ */}
            <input
              type="file"
              accept=".xls,.xlsx"
              hidden
              id="xls-import"
              onChange={handleXlsFile}
            />
          </div>

          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Présence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="yes">Présents</SelectItem>
                <SelectItem value="no">Absents</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={String(rowsPerPage)}
              onValueChange={v => setRowsPerPage(Number(v))}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Lignes / page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 / page</SelectItem>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* TABLEAU */}
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
              {paginatedGuests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    Aucun invité trouvé
                  </TableCell>
                </TableRow>
              )}

              {paginatedGuests.map(g => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">{g.name}</TableCell>
                  <TableCell>{g.phone}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        g.is_attending ? "bg-green-600" : "bg-red-600"
                      }
                    >
                      {g.is_attending ? "Présent" : "Absent"}
                    </Badge>
                  </TableCell>
                  <TableCell>{g.guests_count}</TableCell>
                  <TableCell>
                    {new Date(g.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {g.message && (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          toast.info("Message", { description: g.message })
                        }
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="icon" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages || 1}
          </span>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Précédent
            </Button>

            <Button
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Suivant
            </Button>
          </div>
        </div>
      </Card>

      {/* MODAL IMPORT XLS */}
      <ImportGuestsModal
        open={importOpen}
        guests={importGuests}
        onClose={() => setImportOpen(false)}
        onToggle={toggleImportGuest}
        onImport={importSelectedGuests}
      />
    </div>
  )
}
