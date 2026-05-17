export const profileImageUrl =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80";

export const categoryOptions = [
  { id: 1, label: "Brazilian" },
  { id: 2, label: "Italian" },
  { id: 3, label: "Japanese" },
  { id: 4, label: "Desserts" },
];

export const companies = [
  {
    id: 1,
    name: "Casa Aurora",
    category_id: 1,
    image_path:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    summary: "Modern Brazilian comfort food with seasonal ingredients and warm service.",
    description:
      "Casa Aurora blends classic Brazilian flavors with a lighter contemporary approach. The menu changes often, but the focus is always on fresh produce, grilled proteins, and generous desserts.",
    stars: 4.8,
    addressLine1: "Rua das Palmeiras, 245",
    addressLine2: "Sao Paulo, SP",
    phone: "+55 11 4002-1001",
    email: "contato@casaaurora.com",
  },
  {
    id: 2,
    name: "Trattoria Uno",
    category_id: 2,
    image_path:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    summary: "Fresh pasta, slow sauces, and a cozy neighborhood atmosphere.",
    description:
      "Trattoria Uno is built around handmade pasta, wood-fired vegetables, and classic desserts. It is a good fit for lunch, dinner, and a slightly indulgent weekday break.",
    stars: 4.7,
    addressLine1: "Avenida Italia, 88",
    addressLine2: "Sao Paulo, SP",
    phone: "+55 11 4002-1002",
    email: "reservas@trattoriauno.com",
  },
  {
    id: 3,
    name: "Nori House",
    category_id: 3,
    image_path:
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=1200&q=80",
    summary: "Sushi, donburi, and delicate small plates prepared in front of you.",
    description:
      "Nori House focuses on precise cuts, balanced textures, and a quieter dining room. It is especially strong in sashimi platters and warm rice bowls.",
    stars: 4.9,
    addressLine1: "Alameda Sakura, 17",
    addressLine2: "Sao Paulo, SP",
    phone: "+55 11 4002-1003",
    email: "hello@norihouse.com",
  },
  {
    id: 4,
    name: "Doce Atelier",
    category_id: 4,
    image_path:
      "https://images.unsplash.com/photo-1559622214-f8a9850965bb?auto=format&fit=crop&w=1200&q=80",
    summary: "Artisanal pastries, layered cakes, and elegant coffee pairings.",
    description:
      "Doce Atelier is a dessert-first concept with polished presentation and a strong pastry kitchen. Expect seasonal fruit, creams, mousses, and small celebratory cakes.",
    stars: 4.6,
    addressLine1: "Rua do Acucar, 501",
    addressLine2: "Sao Paulo, SP",
    phone: "+55 11 4002-1004",
    email: "oi@doceatelier.com",
  },
];

export const dishes = [
  {
    id: 101,
    company_id: 1,
    name: "Frango Grelhado com Legumes",
    category_name: "Brazilian",
    image_url:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    descript: "Grilled chicken, roasted vegetables, and herb butter.",
    price: 42.9,
    rating: 4.8,
  },
  {
    id: 102,
    company_id: 1,
    name: "Risoto de Cogumelos",
    category_name: "Brazilian",
    image_url:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
    descript: "Creamy mushroom risotto with parmesan and fresh herbs.",
    price: 46.5,
    rating: 4.7,
  },
  {
    id: 201,
    company_id: 2,
    name: "Tagliatelle al Ragu",
    category_name: "Italian",
    image_url:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80",
    descript: "Fresh pasta with a slow-cooked beef ragu and pecorino.",
    price: 54.9,
    rating: 4.9,
  },
  {
    id: 202,
    company_id: 2,
    name: "Gnocchi ao Pomodoro",
    category_name: "Italian",
    image_url:
      "https://images.unsplash.com/photo-1608756687911-aa1599ab0386?auto=format&fit=crop&w=800&q=80",
    descript: "Potato gnocchi with roasted tomato sauce and basil.",
    price: 48.9,
    rating: 4.6,
  },
  {
    id: 301,
    company_id: 3,
    name: "Combinado Nori",
    category_name: "Japanese",
    image_url:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    descript: "Chef selection of nigiri, sashimi, and hosomaki.",
    price: 72.0,
    rating: 5,
  },
  {
    id: 302,
    company_id: 3,
    name: "Donburi de Salmao",
    category_name: "Japanese",
    image_url:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80",
    descript: "Seasoned rice bowl with salmon, avocado, and crispy onions.",
    price: 49.0,
    rating: 4.7,
  },
  {
    id: 401,
    company_id: 4,
    name: "Tartelete de Frutas",
    category_name: "Desserts",
    image_url:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    descript: "Vanilla cream tart with fresh berries and citrus glaze.",
    price: 24.9,
    rating: 4.8,
  },
  {
    id: 402,
    company_id: 4,
    name: "Mil Folhas de Baunilha",
    category_name: "Desserts",
    image_url:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    descript: "Crisp puff pastry layered with vanilla cream.",
    price: 28.9,
    rating: 4.9,
  },
];
