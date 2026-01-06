import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import PhoneInput from "react-phone-input-2"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function Guest() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "yes",
    guestsCount: 1,
    message: "",
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsModalOpen(true)
    }
  }, [])

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    if (isLoading) return

    setIsLoading(true)

    const dataToSend = {
      name: formData.name,
      phone: formData.phone,
      is_attending: formData.attending === "yes",
      guests_count: formData.guestsCount,
      message: formData.message,
    }

    try {
      const res = await fetch("https://weeding-backend-85v1.onrender.com/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      const result = await res.json()

      if (res.status === 409) {
        toast.warning("Déjà confirmé", {
          description: result.message,
        })
        return
      }

      if (!res.ok) throw new Error()

      toast.success("Réponse envoyée", {
        description: "Merci pour votre confirmation",
      })

      setFormData({
        name: "",
        phone: "",
        attending: "yes",
        guestsCount: 1,
        message: "",
      })
    } catch (error) {
      toast.error("Erreur", {
        description:
          "Impossible d'envoyer votre réponse, probablement un souci lié à nos serveurs.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-3">
      <Card className="w-full py-0 max-w-5xl rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT */}
          <div className="p-10 md:p-14 bg-white">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Confirmation de présence
            </h1>
            <p className="text-gray-500 mb-8">
              Merci de nous confirmer votre présence à notre événement.
            </p>

            <div className="space-y-6">
              <div>
                <Label>Nom complet</Label>
                <input
                  disabled={isLoading}
                  type="text"
                  value={formData.name}
                  onChange={e => handleChange("name", e.target.value)}
                  placeholder="Ex: Michelle & Patrick"
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2 disabled:opacity-60"
                />
              </div>

              <div>
                <Label>Numéro de téléphone</Label>
                <PhoneInput
                  country={"ca"}
                  value={formData.phone}
                  onChange={phone => handleChange("phone", phone)}
                  disabled={isLoading}
                  inputStyle={{
                    width: "100%",
                    height: "2.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #D1D5DB",
                    paddingLeft: "3.5rem",
                    fontSize: "1rem",
                    opacity: isLoading ? 0.6 : 1,
                  }}
                  buttonStyle={{
                    borderRadius: "0.5rem 0 0 0.5rem",
                    border: "1px solid #D1D5DB",
                    height: "2.75rem",
                  }}
                  containerStyle={{ marginTop: "0.5rem" }}
                />
              </div>

              <div>
                <Label>Participerez-vous ?</Label>
                <RadioGroup
                  disabled={isLoading}
                  value={formData.attending}
                  onValueChange={v => handleChange("attending", v)}
                  className="mt-3 flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Oui, je serai présent(e)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Non, je ne pourrai pas</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Nombre de personnes</Label>
                <input
                  disabled={isLoading}
                  type="number"
                  min="1"
                  value={formData.guestsCount}
                  onChange={e =>
                    handleChange("guestsCount", Number(e.target.value))
                  }
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2 disabled:opacity-60"
                />
              </div>

              <div>
                <Label>Message (optionnel)</Label>
                <Textarea
                  disabled={isLoading}
                  value={formData.message}
                  onChange={e => handleChange("message", e.target.value)}
                  placeholder="Un petit mot pour Michelle & Patrick ..."
                  className="mt-2 disabled:opacity-60"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-11 text-base rounded-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  "Confirmer ma réponse"
                )}
              </Button>

              <Button
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
                className="w-full h-11 text-base rounded-lg md:hidden mt-3"
              >
                Voir l'image
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:block relative">
            <img
              src="/save.jpg"
              alt="Événement"
              className="h-full w-full object-cover"
            />
          </div>

        </div>
      </Card>

      {/* MODAL MOBILE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
          <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/save.jpg"
              alt="Événement"
              className="w-full h-full object-cover"
            />
            <Button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 bg-red-500 text-white hover:bg-red-600"
            >
              Fermer
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
