export interface MockProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  imageUrls: string[];
  materials: string[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  stock: number;
  badge?: string;
}

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "1",
    name: "Aurum Cuff Bracelet",
    price: 12500,
    originalPrice: 15000,
    description:
      "Handcrafted 22kt gold cuff with intricate filigree detailing inspired by Mughal architecture. A statement piece that effortlessly bridges tradition and contemporary elegance.",
    category: "bracelets",
    imageUrls: ["/assets/generated/product-bracelet-1.dim_600x600.jpg"],
    materials: ["22kt Gold", "Diamond accents"],
    rating: 4.9,
    reviewCount: 128,
    isFeatured: true,
    isBestSeller: true,
    stock: 15,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Celestial Bangle Set",
    price: 8900,
    description:
      "A set of three delicate gold bangles etched with celestial motifs — stars, moons, and suns. Wear together for maximum impact or individually for subtle elegance.",
    category: "bracelets",
    imageUrls: ["/assets/generated/product-bracelet-1.dim_600x600.jpg"],
    materials: ["18kt Gold", "Enamel"],
    rating: 4.8,
    reviewCount: 94,
    isFeatured: true,
    isBestSeller: false,
    stock: 22,
  },
  {
    id: "3",
    name: "Lotus Charm Bracelet",
    price: 6500,
    originalPrice: 7800,
    description:
      "Inspired by the sacred lotus, this lightweight gold bracelet features a blooming lotus charm with pearl accents. Symbolises purity and new beginnings.",
    category: "bracelets",
    imageUrls: ["/assets/generated/product-bracelet-1.dim_600x600.jpg"],
    materials: ["18kt Gold", "Freshwater Pearls"],
    rating: 4.7,
    reviewCount: 76,
    isFeatured: false,
    isBestSeller: true,
    stock: 30,
    badge: "Sale",
  },
  {
    id: "4",
    name: "Empress Pendant Necklace",
    price: 18500,
    description:
      "A regal pendant featuring a polki diamond centre stone surrounded by 22kt gold petals. This heirloom-quality necklace is designed to be passed down through generations.",
    category: "necklaces",
    imageUrls: ["/assets/generated/product-necklace-1.dim_600x600.jpg"],
    materials: ["22kt Gold", "Polki Diamonds", "Ruby accents"],
    rating: 5.0,
    reviewCount: 57,
    isFeatured: true,
    isBestSeller: true,
    stock: 8,
    badge: "Exclusive",
  },
  {
    id: "5",
    name: "Golden Cascade Necklace",
    price: 14200,
    originalPrice: 16000,
    description:
      "A waterfall of golden drops that catches light beautifully with every movement. Layered gold chain design creates a luxurious cascading effect.",
    category: "necklaces",
    imageUrls: ["/assets/generated/product-necklace-1.dim_600x600.jpg"],
    materials: ["18kt Gold", "Diamond drops"],
    rating: 4.8,
    reviewCount: 83,
    isFeatured: true,
    isBestSeller: false,
    stock: 12,
  },
  {
    id: "6",
    name: "Temple Collar Necklace",
    price: 22000,
    description:
      "A bold temple-style collar necklace featuring intricate hand-carved gold work with emerald inlay. Perfect for bridal occasions and festive celebrations.",
    category: "necklaces",
    imageUrls: ["/assets/generated/product-necklace-1.dim_600x600.jpg"],
    materials: ["22kt Gold", "Emerald", "Enamel"],
    rating: 4.9,
    reviewCount: 41,
    isFeatured: false,
    isBestSeller: true,
    stock: 5,
    badge: "Bridal",
  },
  {
    id: "7",
    name: "Solitaire Diamond Ring",
    price: 32000,
    description:
      "The quintessential statement of love. A brilliant-cut diamond solitaire set in a slender 18kt gold band. Timeless, pure, and perfect for engagements.",
    category: "rings",
    imageUrls: ["/assets/generated/product-ring-1.dim_600x600.jpg"],
    materials: ["18kt Gold", "VVS Diamond"],
    rating: 5.0,
    reviewCount: 112,
    isFeatured: true,
    isBestSeller: true,
    stock: 10,
    badge: "Best Seller",
  },
  {
    id: "8",
    name: "Floral Cluster Ring",
    price: 11500,
    originalPrice: 13500,
    description:
      "Seven diamonds bloom together in this delicate floral cluster ring. A romantic and whimsical design that celebrates the beauty of nature in precious metal.",
    category: "rings",
    imageUrls: ["/assets/generated/product-ring-1.dim_600x600.jpg"],
    materials: ["18kt Gold", "SI Diamonds"],
    rating: 4.7,
    reviewCount: 68,
    isFeatured: false,
    isBestSeller: false,
    stock: 18,
    badge: "Sale",
  },
  {
    id: "9",
    name: "Royal Signet Ring",
    price: 9800,
    description:
      "A modern reinterpretation of the classic signet ring with a geometric gold face and engraved X motif — the JEWEL X signature. Bold, architectural, unforgettable.",
    category: "rings",
    imageUrls: ["/assets/generated/product-ring-1.dim_600x600.jpg"],
    materials: ["22kt Gold"],
    rating: 4.6,
    reviewCount: 49,
    isFeatured: false,
    isBestSeller: false,
    stock: 25,
  },
  {
    id: "10",
    name: "Pearl Drop Earrings",
    price: 7500,
    description:
      "South Sea freshwater pearls suspended from delicate gold hooks. These understated earrings embody quiet luxury and refined taste.",
    category: "earrings",
    imageUrls: ["/assets/generated/product-earrings-1.dim_600x600.jpg"],
    materials: ["18kt Gold", "South Sea Pearls"],
    rating: 4.9,
    reviewCount: 88,
    isFeatured: true,
    isBestSeller: true,
    stock: 20,
    badge: "New",
  },
  {
    id: "11",
    name: "Jhumka Chandelier Earrings",
    price: 13500,
    description:
      "Traditional Jhumka earrings reimagined with a modern silhouette. Cascading gold beads and a central bell create a mesmerising movement. An Indian classic, elevated.",
    category: "earrings",
    imageUrls: ["/assets/generated/product-earrings-1.dim_600x600.jpg"],
    materials: ["22kt Gold", "Ruby beads"],
    rating: 4.8,
    reviewCount: 63,
    isFeatured: true,
    isBestSeller: false,
    stock: 14,
  },
  {
    id: "12",
    name: "Diamond Hoop Earrings",
    price: 19500,
    originalPrice: 22000,
    description:
      "Classic gold hoops embellished with pavé-set diamonds all around. These hoops catch and reflect light from every angle, making them the perfect everyday luxury.",
    category: "earrings",
    imageUrls: ["/assets/generated/product-earrings-1.dim_600x600.jpg"],
    materials: ["18kt Gold", "Pavé Diamonds"],
    rating: 4.9,
    reviewCount: 102,
    isFeatured: false,
    isBestSeller: true,
    stock: 9,
  },
];

export const MOCK_CATEGORIES = [
  {
    id: "bracelets",
    name: "Bracelets",
    slug: "bracelets",
    description: "Wrist adornments for every occasion",
    imageUrl: "/assets/generated/category-bracelets.dim_600x400.jpg",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    slug: "necklaces",
    description: "Statement pieces for every neckline",
    imageUrl: "/assets/generated/category-necklaces.dim_600x400.jpg",
  },
  {
    id: "rings",
    name: "Rings",
    slug: "rings",
    description: "Symbols of love and heritage",
    imageUrl: "/assets/generated/category-rings.dim_600x400.jpg",
  },
  {
    id: "earrings",
    name: "Earrings",
    slug: "earrings",
    description: "From subtle studs to chandelier drops",
    imageUrl: "/assets/generated/product-earrings-1.dim_600x600.jpg",
  },
];

export const MOCK_REVIEWS = [
  {
    id: "r1",
    author: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Aurum Cuff is absolutely breathtaking. The craftsmanship is flawless and it arrived in the most beautiful packaging. JEWEL X has become my go-to for gifting and self-indulgence.",
    product: "Aurum Cuff Bracelet",
    avatar: "PS",
  },
  {
    id: "r2",
    author: "Ananya Krishnan",
    location: "Bengaluru",
    rating: 5,
    text: "I wore the Empress Pendant for my wedding and received countless compliments. The quality is truly Cartier-level. I could not be happier with my purchase.",
    product: "Empress Pendant Necklace",
    avatar: "AK",
  },
  {
    id: "r3",
    author: "Meera Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "The packaging is as luxurious as the jewellery itself. My Pearl Drop Earrings arrived in a stunning gift box with a personalised note. Such a premium experience from start to finish.",
    product: "Pearl Drop Earrings",
    avatar: "MP",
  },
  {
    id: "r4",
    author: "Deepika Nair",
    location: "Chennai",
    rating: 5,
    text: "JEWEL X's customer service is exceptional. They helped me choose the perfect ring for my anniversary and even engraved a message. Truly above and beyond.",
    product: "Solitaire Diamond Ring",
    avatar: "DN",
  },
  {
    id: "r5",
    author: "Sunita Agarwal",
    location: "Delhi",
    rating: 5,
    text: "The Temple Collar Necklace exceeded all my expectations. The weight of the gold, the precision of the enamel work — this is genuinely heirloom-quality jewellery.",
    product: "Temple Collar Necklace",
    avatar: "SA",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
