import { useEffect, useState } from "react";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Guest from "./components/pages/Guest";
import SavetheDate from "./components/pages/SavetheDate";
import ListGuests from "./components/pages/ListGuest";
import UploadMenu from "./components/pages/UploadMenu";
import Gallery from "./components/pages/Gallery";
import { Toaster, toast } from "sonner";

function PhotoGalleryPage({ items, onUpload }) {
  return (
    <div className="flex flex-col gap-8 p-4">
      <UploadMenu onUpload={onUpload} />
      <Gallery items={items} />
    </div>
  );
}

function App() {
  const [items, setItems] = useState([]);

  // Charger les images depuis notre serveur 
  useEffect(() => {
    // const fetchImages = async () => {
    //   try {
    //     const res = await fetch("https://weeding-backend.vercel.app/api/images");
    //     const data = await res.json();
    //     setItems(data);
    //   } catch (err) {
    //     console.error("Erreur chargement images :", err);
    //     toast.error("Impossible de charger les images");
    //   }
    // };
    const fetchImages = async () => {
  try {
    // On ajoute ?t= + le temps actuel pour forcer la mise à jour
    const res = await fetch(`https://weeding-backend.vercel.app/api/images?t=${new Date().getTime()}`);
    const data = await res.json();
    setItems(data);
  } catch (err) {
    console.error("Erreur :", err);
  }
};

    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // On crée la promesse pour l'upload
    const uploadPromise = new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mariage_upload");

        // 1. Upload vers Cloudinary
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dlrnpdtmc/auto/upload",
          { method: "POST", body: formData }
        );
        const data = await res.json();

        if (!data.secure_url) throw new Error("Erreur Cloudinary");

        // 2. Sauvegarde sur le backend
        const saveRes = await fetch("https://weeding-backend.vercel.app/api/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secure_url: data.secure_url }),
        });

        const saveData = await saveRes.json();

        if (saveData.success) {
          // Mettre à jour la galerie localement
          setItems((prev) => [{ secure_url: data.secure_url }, ...prev]);
          resolve(saveData);
        } else {
          reject(new Error("Erreur backend"));
        }
      } catch (err) {
        reject(err);
      }
    });

    // Affichage du toast avec loader automatique
    toast.promise(uploadPromise, {
      loading: "Envoi de votre photo en cours...",
      success: "Félicitations ! Votre photo est en ligne",
      error: "Oups, l'envoi a échoué. Réessayez !",
    });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<SavetheDate />} />
        <Route path="/reservation" element={<Guest />} />
        <Route path="/admin" element={<ListGuests />} />
        <Route
          path="/gallery"
          element={<PhotoGalleryPage items={items} onUpload={handleUpload} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;