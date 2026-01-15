import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react"; // Si tu as lucide-react, sinon utilise un SVG

export default function Gallery({ items }) {
    const [loaded, setLoaded] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    const handleLoad = (url) => {
        setLoaded((prev) => ({ ...prev, [url]: true }));
    };

    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-serif text-emerald-900 text-center md:text-left px-4">
                Photos Mariage Claude Michelle & Patrick Orsel
            </h3>

            {/* État Vide : Si aucun item n'est présent */}
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-emerald-100 rounded-2xl bg-emerald-50/30 mx-4">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Camera className="w-10 h-10 text-emerald-700" />
                    </div>
                    <p className="text-xl font-medium text-emerald-900">Pas encore de souvenirs ici...</p>
                    <p className="text-emerald-700/70 text-center max-w-xs mt-2">
                        Soyez le premier à partager un moment précieux de cette journée inoubliable !
                    </p>
                </div>
            ) : (
                /* Grille de la galerie */
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {items.map((item) => {
                        const url = item.secure_url;
                        const isLoaded = loaded[url];

                        return (
                            <div
                                key={item.public_id || url} // Fallback sur url si public_id absent
                                className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {!isLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                                        <div className="w-8 h-8 border-4 border-emerald-900/20 border-t-emerald-900 rounded-full animate-spin"></div>
                                    </div>
                                )}

                                {item.resource_type === "video" ? (
                                    <video
                                        src={url}
                                        className={`w-full h-full object-cover ${isLoaded ? "" : "hidden"}`}
                                        onLoadedData={() => handleLoad(url)}
                                    />
                                ) : (
                                    <img
                                        src={url}
                                        alt=""
                                        className={`w-full h-full object-cover ${isLoaded ? "" : "hidden"}`}
                                        onLoad={() => handleLoad(url)}
                                    />
                                )}

                                {isLoaded && (
                                    <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white text-emerald-900">
                                                    Visualiser
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-3xl border-none bg-transparent shadow-none p-0">
                                                <DialogHeader className="hidden">
                                                    <DialogTitle>Visualisation</DialogTitle>
                                                </DialogHeader>
                                                <div className="flex items-center justify-center h-full">
                                                    <img
                                                        src={url}
                                                        alt="Aperçu"
                                                        className="max-h-[85vh] w-auto rounded-lg shadow-2xl"
                                                    />
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}