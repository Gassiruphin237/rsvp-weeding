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
import PageLoader from "./Loader";
function SavetheDate() {

    const [loading, setLoading] = useState(true);

    const qrLink = "https://app.eventpics.net/9ZbFISBaMfES"
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
  const timeout = setTimeout(() => {
    setLoading(false);
  }, 5000);

  return () => clearTimeout(timeout);
}, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
if (loading) {
  return <PageLoader />;
}

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
                        <div className="absolute top-19 left-19 text-emerald-900 text-xl font-serif text-center">
                            <h1 className="text-4xl  font-fancy tracking-wide">
                                Claude Michelle <br />&<br /> Patrick Orsel
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
                            <p className="mb-6 text-lg">10:00</p>

                            <div className="flex flex-col gap-3 text-sm text-emerald-900">
                                <a
                                    href="/mariage.ics"
                                    download
                                    className="hover:underline cursor-pointer"
                                >
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

                            <p className="mb-6 text-xl">31 Janvier 2026</p>
                            <p className="mb-6 text-lg">18:00 - 03:00</p>

                            <p className="mb-8 max-w-md text-sm leading-relaxed text-emerald-900">
                                Salle de reception  Shapla Venue <br />
                                2222A , Avenue Dollard,LaSalle, QC H8N 1S6
                            </p>

                            <div className="flex flex-col gap-3 text-sm text-emerald-900">
                                <a
                                    href="/mariage.ics"
                                    download
                                    className="hover:underline cursor-pointer"
                                >
                                    Ajouter au calendrier
                                </a>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <section className="w-full bg-white py-10">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="mb-12 inline-block bg-emerald-900 px-4 py-2 text-2xl font-bold tracking-wide text-white">
                        Code vestimentaire
                    </h2>
                    <p className=" text-justify">
                        Votre présence est la chose la plus importante pour nous !
                        Mais nous vous serions très reconnaissants de soutenir le schéma de couleurs de notre mariage !
                    </p>
                </div>
            </section>
            <section className="w-full bg-white py-6">
                <div className="flex flex-col items-center justify-center px-6 text-center">

                    <h3 className="mb-6 text-3xl font-light tracking-[0.35em] text-emerald-900">
                        Nos Couleurs de Mariage
                    </h3>

                    <p className="mb-12 max-w-2xl text-gray-700  text-justify leading-relaxed">
                        Chaque couleur choisie raconte une partie de notre histoire.
                        Le <span className="font-medium text-emerald-900">vert émeraude</span> incarne l’élégance,
                        l’harmonie et l’espoir d’un amour qui grandit chaque jour.
                        L’<span className="font-medium text-orange-500">orange</span> symbolise la joie,
                        la chaleur et l’énergie qui illuminent notre union.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-10">

                        {/* Vert Émeraude */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-emerald-900 shadow-xl ring-4 ring-emerald-800"></div>
                            <span className="mt-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Vert Émeraude
                            </span>
                        </div>

                        {/* Orange */}
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-orange-500 shadow-xl ring-4 ring-orange-200"></div>
                            <span className="mt-4 text-sm font-semibold uppercase tracking-wide text-orange-600">
                                Orange
                            </span>
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
                        Découvrez comment tout a commencé, C’est une rencontre devenue un lien , un lien devenu une promesse.
                        Voici l’histoire de deux âmes qui ont choisi de marcher ensemble, aujourd’hui et pour toujours.
                    </p>
                    <Accordion type="single" collapsible className="w-full text-left" defaultValue="premier-regard">
                        <AccordionItem value="premier-regard">
                            <AccordionTrigger className="text-xl">Notre Histoire</AccordionTrigger>
                            <AccordionContent className="flex flex-col  gap-4 text-gray-700">
                                <p className="text-justify text-xl">
                                    Tout remonte il y’a 12 années aujourd’hui, la première rencontre s’est faite en Décembre 2014. Michelle arrivait à l’université de Dschang pour ses études supérieures à la Faculté d’agronomie et des sciences agricoles (FASA). C’était le début d’une vie nouvelle, loin de sa famille, il fallait apprendre à être responsable, vivre seule et surtout réussir ses études. À cette époque là, Patrick, était déjà à l’université de Dschang quelques années avant Michelle. Tous les deux vivaient dans la même cité nommée &laquo; MANDELA CITY &raquo;, même corridor, chambre voisine. Michelle était encore jeune, et voulait pleinement profiter de son adolescence; Patrick, très posé, discret, intelligent, avait déjà ciblé la femme avec qui il souhaitait partager sa vie. Tous les deux complices, aucune relation ne s’est créé en ce moment là; ils s’étaient limités aux relations de bons voisinage; mais notons que, quelques fois, Patrick cuisinait de bon repas et invitait Michelle à dîner avec lui dans sa chambre d’étudiant. Quelques années plus tard, Michelle et Patrick quittaient la ville de Dschang, tous les deux couronnés d’un diplôme d’ingénieur. C’est ainsi que Patrick poursuit ses études en Belgique. À chaque fois qu’il changeait de numéro de téléphone, il contactait Michelle pour passer son nouveau cellulaire. Chacun d’eux prenaient les nouvelles de l’autre au quotidien.  En Décembre 2022, Patrick demande à connaître davantage Michelle avec pour objectif de construire une vie commune : C’est le début d’une belle histoire d’amour. Avec la grâce de Dieu, Michelle Rejoind Patrick en Belgique en 2023; c’est le moment pour eux de se connaître davantage et se projetter pour l’avenir.  Une fois en Belgique, Michelle est appelée à des nouvelles opportunités de vie, du côté du Canada; une nouvelle distance qui se crée; mais rien ne s’éteint parceque ce qui leur unis est plus fort. Le Seigneur accomplit de grande chose, Patrick obtient à son tour le visa pour le Canada, c’est donc le moment pour les deux, de consolider leur union. Ce que nous gardons du couple aujourd’hui, c’est que la vie nous réserve beaucoup de surprises, la distance ne sépare pas des personnes  qui s’aiment. <br /><br />

                                    Ce 31 Janvier 2026, ils se diront OUI pour la vie❤️
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
                            src="/qrcode.png"
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
                                <li>
                                    Virement Intérac : <br />
                                    Michelle (dépôt direct){" "}
                                    <a
                                        href="tel:+14385351569"
                                        className="underline text-emerald-900 hover:text-blue-800"
                                    >
                                        438-535-1569
                                    </a>
                                    <br />
                                    Patrick{" "}
                                    <a
                                        href="mailto:Patrickouonkap@yahoo.com"
                                        className="underline text-emerald-900 hover:text-blue-800"
                                    >
                                        Patrickouonkap@yahoo.com
                                    </a>
                                </li>

                                <li>
                                    Virement Orange Money :{" "}
                                    <a
                                        href="tel:+237699337378"
                                        className="underline text-emerald-900 hover:text-blue-800"
                                    ><br />
                                        (+237) 699 337 378
                                    </a>
                                </li>

                                <li>
                                    Autres contributions :{" "}
                                    <a
                                        href="mailto:Patrickouonkap@yahoo.com"
                                        className="underline text-emerald-900 hover:text-blue-800"
                                    >
                                        contactez-nous
                                    </a>
                                </li>
                            </ul>

                        </CardContent>
                    </Card>
                </div>

            </section>

        </>
    )
}

export default SavetheDate
