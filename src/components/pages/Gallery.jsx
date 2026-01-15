import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Gallery({ items }) {
    const [loaded, setLoaded] = useState({}); // suivi du chargement par URL
    const [selectedImage, setSelectedImage] = useState(null);

    const handleLoad = (url) => {
        setLoaded((prev) => ({ ...prev, [url]: true }));
    };

    return (
        <>
         <h3 className="text-2xl text-emerald-900">Photos Mariage Claude Michelle & Patrick Orsel</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
               
                {items.map((item) => {
                    const url = item.secure_url;
                    const isLoaded = loaded[url];

                    return (
                        <div
                            key={item.public_id}
                            className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100"
                        >
                            {!isLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                    <div className="w-8 h-8 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {item.resource_type === "video" ? (
                                <video
                                    src={url}
                                    controls
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
                            {isLoaded && item.resource_type !== "video" && (
                                <div className="absolute bottom-2 left-2 right-2 flex justify-between px-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                Visualiser
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-full max-w-md md:max-w-lg p-4 rounded-xl bg-white shadow-lg">
                                            <DialogHeader>
                                                <DialogTitle className="text-lg md:text-xl font-semibold">
                                                    Visualisation
                                                </DialogTitle>
                                            </DialogHeader>
                                            <img
                                                src={url}
                                                alt=""
                                                className="w-full h-auto rounded-lg object-contain"
                                            />
                                        </DialogContent>

                                    </Dialog>
{/* 
                                    <a
                                        href={url}
                                        download
                                        className="btn btn-sm btn-outline" // ou Button ShadCN
                                    >
                                        Télécharger
                                    </a> */}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
