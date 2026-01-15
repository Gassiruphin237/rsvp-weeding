// api/images.js
let images = []; 

export default function handler(req, res) {
  // Optionnel : Configurer les headers CORS si besoin
  if (req.method === "GET") {
    return res.status(200).json(images);
  } 

  if (req.method === "POST") {
    const { secure_url } = req.body;

    if (!secure_url) {
      return res.status(400).json({ success: false, message: "URL manquante" });
    }

    const newImage = { secure_url, id: Date.now() };
    images.unshift(newImage);

    return res.status(200).json({ success: true, ...newImage });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}