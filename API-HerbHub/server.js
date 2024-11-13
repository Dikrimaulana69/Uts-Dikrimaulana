const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let plants = [
  {
    id: 1,
    name: "Daun Mint",
    category: "Tanaman Obat",
    description: "Daun mint digunakan untuk meredakan gangguan pencernaan dan nyeri otot.",
    image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/06/09055811/Mitos-atau-Fakta-Daun-Mint-Bisa-Menurunkan-Kesuburan-Pria.jpg.webp",
  },
  {
    id: 2,
    name: "Kunyit",
    category: "Rempah-rempah",
    description: "Kunyit digunakan sebagai anti-inflamasi dan antioksidan.",
    image: "https://res.cloudinary.com/dk0z4ums3/image/upload/v1683291053/attached_image/7-manfaat-kunyit-untuk-kulit-yang-jarang-diketahui.jpg",
  },
  {
    id: 3,
    name: "Serai",
    category: "Tanaman Aromatik",
    description: "Serai dapat membantu mengurangi stres dan memiliki aroma yang menyegarkan.",
    image: "https://www.masjidalakbar.or.id/wp-content/uploads/2020/01/daun-serai-1.jpg",
  },
];

let favorites = [];

app.get("/plants", (req, res) => {
  res.json(plants);
});

app.get("/plants/:id", (req, res) => {
  const plantId = parseInt(req.params.id);
  const plant = plants.find((p) => p.id === plantId);
  if (plant) {
    res.json(plant);
  } else {
    res.status(404).json({ message: "Tanaman tidak ditemukan" });
  }
});

app.post("/plants", (req, res) => {
  const { name, category, description, image } = req.body;
  const newPlant = {
    id: plants.length + 1,
    name,
    category,
    description,
    image,
  };
  plants.push(newPlant);
  res.status(201).json(newPlant);
});

app.delete("/plants/:id", (req, res) => {
  const plantId = parseInt(req.params.id);
  const plantIndex = plants.findIndex((p) => p.id === plantId);
  if (plantIndex !== -1) {
    plants.splice(plantIndex, 1);
    res.json({ message: "Tanaman berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Tanaman tidak ditemukan" });
  }
});

app.put("/plants/:id", (req, res) => {
  const plantId = parseInt(req.params.id);
  const { name, category, description, image } = req.body;
  const plantIndex = plants.findIndex((p) => p.id === plantId);

  if (plantIndex !== -1) {
    plants[plantIndex] = {
      id: plantId,
      name: name || plants[plantIndex].name,
      category: category || plants[plantIndex].category,
      description: description || plants[plantIndex].description,
      image: image || plants[plantIndex].image,
    };
    res.json(plants[plantIndex]);
  } else {
    res.status(404).json({ message: "Tanaman tidak ditemukan" });
  }
});

app.get("/favorites", (req, res) => {
  const favoritePlants = plants.filter((plant) => favorites.includes(plant.id));
  res.json(favoritePlants);
});

app.post("/favorites/:id", (req, res) => {
  const plantId = parseInt(req.params.id);
  if (!favorites.includes(plantId)) {
    favorites.push(plantId);
    res.json({ message: "Tanaman ditambahkan ke favorit" });
  } else {
    res.status(400).json({ message: "Tanaman sudah ada di favorit" });
  }
});

app.delete("/favorites/:id", (req, res) => {
  const plantId = parseInt(req.params.id);
  const index = favorites.indexOf(plantId);
  if (index !== -1) {
    favorites.splice(index, 1);
    res.json({ message: "Tanaman dihapus dari favorit" });
  } else {
    res.status(404).json({ message: "Tanaman tidak ditemukan di favorit" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
