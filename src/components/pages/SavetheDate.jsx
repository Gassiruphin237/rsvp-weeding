import React, { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
function SavetheDate() {

  const [formData, setFormData] = useState({
  fullName: "",
  phone: "",
  message: ""
});

const handleChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.fullName.trim()) {
    toast.error("Veuillez saisir votre nom complet");
    return;
  }

  if (!formData.phone || formData.phone.length < 8) {
    toast.error("Veuillez saisir un numéro de téléphone valide");
    return;
  }

  if (!formData.message.trim()) {
    toast.error("Veuillez écrire un message aux mariés");
    return;
  }

  try {
    console.log("Form submitted:", formData);

    toast.success("Merci pour votre message ", {
      description: "Vos vœux ont bien été envoyés aux mariés."
    });

    setFormData({
      fullName: "",
      phone: "",
      message: ""
    });
  } catch (error) {
    toast.error("Une erreur est survenue", {
      description: "Veuillez réessayer plus tard."
    });
  }
};
    const qrLink = "https://votre-lien-de-partage.com"
    const targetDate = new Date("2026-01-31T00:00:00");

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = new Date();
        const difference = targetDate - now;

        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor(
            (difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
        );
        const days = Math.floor(
            (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { years, months, days, hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <section className="min-h-screen w-full bg-white">
                <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col items-center justify-center bg-emerald-900/80 text-white px-6 text-center py-16">
                        <div className="max-w-md mb-8">
                            <h2 className="mb-6 font-serif text-3xl">Ils se disent OUI</h2>
                            <p className="font-serif text-lg">Montréal, CANADA</p>
                        </div>
                        <div className="flex space-x-6 text-center">
                            <div>
                                <span className="block text-2xl font-bold">{timeLeft.years}</span>
                                <span className="text-sm">Années</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold">{timeLeft.months}</span>
                                <span className="text-sm">Mois</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold">{timeLeft.days}</span>
                                <span className="text-sm">Jours</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold">{timeLeft.hours}</span>
                                <span className="text-sm">Heures</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold">{timeLeft.minutes}</span>
                                <span className="text-sm">Minutes</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold">{timeLeft.seconds}</span>
                                <span className="text-sm">Secondes</span>
                            </div>
                        </div>
                    </div>

                    {/*  IMAGE */}
                    <div className="relative">
                        <img
                            src="/image0.jpeg"
                            alt="Bon Enfant & Alexis Lionel"
                            className="h-full w-full object-cover grayscale "
                        />
                        <div className="absolute top-19 left-16 text-emerald-900 text-xl font-serif">
                            <h1 className="text-4xl  font-fancy tracking-wide">
                                Michelle & Patrick
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-white py-10">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="mb-12 inline-block bg-emerald-900 px-4 py-2 text-2xl font-bold tracking-wide text-white">
                        Programme
                    </h2>

                    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
                        <div className="order-1 md:order-1">
                            <img
                                src="/image1.jpeg"
                                alt="Mariage"
                                className="w-full max-w-xl object-cover"
                            />
                        </div>
                        <div className="order-2 md:order-2 text-center md:text-left">
                            <h3 className="mb-8 text-3xl font-light tracking-[0.3em] text-emerald-900">
                                UNION CIVILE
                            </h3>

                            <p className="mb-6 text-xl">31 Janvier 2026</p>
                            <p className="mb-6 text-lg">11:00</p>

                            <p className="mb-8 max-w-md text-sm leading-relaxed text-emerald-900">
                                10 Rue Saint-Antoine E, Montréal, QC H2Y 1B5, Canada
                            </p>

                            <div className="flex flex-col gap-3 text-sm text-emerald-900">
                                <a href="#" className="hover:underline">
                                    Ajouter au calendrier
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="w-full bg-white py-10">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
                        <div className="order-1 md:order-2">
                            <img
                                src="/image7.jpeg"
                                alt="Réception"
                                className="w-full max-w-xl object-cover"
                            />
                        </div>
                        <div className="order-2 md:order-1 text-center md:text-left">
                            <h3 className="mb-8 text-3xl font-light tracking-[0.3em] text-emerald-900">
                                RECEPTION
                            </h3>

                            <p className="mb-6 text-xl">01 Janvier 2026</p>
                            <p className="mb-6 text-lg">19:00 - 03:00</p>

                            <p className="mb-8 max-w-md text-sm leading-relaxed text-emerald-900">
                                10 Rue Saint-Antoine E, Montréal, QC H2Y 1B5, Canada
                            </p>

                            <div className="flex flex-col gap-3 text-sm text-emerald-900">
                                <a href="#" className="hover:underline">
                                    Ajouter au calendrier
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="w-full bg-white py-10">
                <div className="flex flex-col items-center justify-center py-16 bg-white px-6">
                    <h3 className="mb-8 text-3xl text-center font-light tracking-[0.3em] text-emerald-900">
                        Nos Couleurs de Mariage
                    </h3>

                    <p className="text-center text-gray-700 mb-12 max-w-lg">
                        Chaque couleur reflète un morceau de notre histoire et de notre amour.
                        Le vert émeraude symbolise l’élégance, l’harmonie et la sérénité. C’est la couleur de la nature, du renouveau et de l’espoir, reflétant la profondeur de notre amour et la promesse d’un futur lumineux et serein ensemble
                    </p>

                    <div className="flex space-x-6">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-emerald-600 shadow-lg"></div>
                            <span className="mt-4 text-sm font-medium text-emerald-700">Vert Émeraude</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="mb-12 inline-block bg-emerald-900 px-4 py-2 text-2xl font-bold tracking-wide text-white">
                    Notre Histoire
                </h2>
            </div>
            <section className="w-full bg-gray-50 px-4 py-10">

                <div className="max-w-3xl mx-auto text-center">

                    {/* Image en cercle */}
                    <div className="flex justify-center mb-8">
                        <img
                            src="/image5.jpeg"
                            alt="Notre rencontre"
                            className="w-42 h-42 rounded-full object-cover border-3 border-emerald-900 shadow-lg"
                        />
                    </div>
                    <p className="text-gray-700 mb-12 text-lg text-italic leading-relaxed">
                        Découvrez comment tout a commencé, le premier sourire et les moments inoubliables qui ont marqué notre histoire.
                    </p>
                    <Accordion type="single" collapsible className="w-full text-left" defaultValue="premier-regard">
                        <AccordionItem value="premier-regard">
                            <AccordionTrigger>Le Premier Regard</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-gray-700">
                                <p>
                                    C'était un jour ensoleillé, et nos chemins se sont croisés par hasard.
                                </p>
                                <p>
                                    Un sourire, un échange de regards, et nous savions que quelque chose de spécial venait de commencer.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="premier-rendezvous">
                            <AccordionTrigger>Le Premier Rendez-vous</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-gray-700">
                                <p>
                                    Après quelques échanges, nous avons décidé de nous revoir.
                                </p>
                                <p>
                                    Ce premier rendez-vous était rempli de rires, de conversations profondes et de complicité instantanée.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="premiers-souvenirs">
                            <AccordionTrigger>Les Premiers Souvenirs</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-gray-700">
                                <p>
                                    Ensemble, nous avons partagé nos premiers voyages, nos premiers projets et chaque moment nous rapprochait davantage, jusqu’à aujourd’hui.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>
            </section>
            <section className="w-full bg-white py-16 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">

                    <div className="md:w-1/2 text-center md:text-left">
                        <h3 className="text-3xl font-serif mb-4 text-emerald-900">
                            Partagez vos photos de mariage ici !
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Utilisez ce code QR pour partager vos photos du mariage avec les mariés.
                            Scannez-le avec votre téléphone et envoyez vos souvenirs en un instant !
                        </p>
                    </div>

                    <div className="relative md:w-1/2 flex justify-center">
                        <img
                            src="/images.png"
                            alt="QR Code Mariage"
                            className="w-84 h-84 object-cover rounded-lg shadow-lg"
                        />
                        <a
                            href={qrLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center rounded-lg"
                        >
                            <button className="flex items-center space-x-2 px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-lg">
                                <ExternalLink size={20} />
                                <span>Ouvrir le lien</span>
                            </button>
                        </a>
                    </div>

                </div>
            </section>
            <section className="w-full bg-gray-50 py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12">

                    {/* Left - Support / Cadeau */}
                    <Card className="lg:w-1/3 bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle>Soutenir les mariés</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-gray-700">
                            <p>
                                Vous pouvez participer au cadeau des mariés ou leur apporter votre soutien financier pour les aider à commencer leur nouvelle vie ensemble.
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Virement bancaire : 000-111-222</li>
                                <li>Paypal : mariés@exemple.com</li>
                                <li>Autres contributions : contactez-nous</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <img
                        src="/save.jpg"
                        alt="Photo des mariés"
                        className="lg:w-1/3 w-full bg-white shadow-lg flex justify-center items-center p-6  "
                    />
                    <Card className="lg:w-1/3 w-full bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle>Laissez un message aux mariés</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Nom complet</Label>
                                    <Input
                                        id="fullName"
                                        placeholder=""
                                        value={formData.fullName}
                                        onChange={(e) => handleChange("fullName", e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Numéro de téléphone</Label>
                                    <PhoneInput
                                        country={"ca"}
                                        value={formData.phone}
                                        onChange={(value) => handleChange("phone", value)}
                                        inputProps={{
                                            id: "phone",
                                            name: "phone",
                                            required: true,
                                            className:
                                                "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder=""
                                        value={formData.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Envoyer
                                </Button>
                            </form>

                        </CardContent>
                    </Card>
                </div>

            </section>

        </>
    )
}

export default SavetheDate
