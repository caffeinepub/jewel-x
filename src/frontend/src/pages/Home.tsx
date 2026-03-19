import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import SectionTitle from "../components/SectionTitle";
import StarRating from "../components/StarRating";
import { MOCK_PRODUCTS, MOCK_REVIEWS } from "../data/mockData";

const HERO_SLIDES = [
  {
    id: "s1",
    img: "//astrotalk.store/cdn/shop/files/Website_B.webp?v=1773638854&width=1920",
    href: "/shop",
    label: "SHOP NOW",
  },
  {
    id: "s2",
    img: "//astrotalk.store/cdn/shop/files/Maha_lakshmi_siddhi_products_banner_web_copy_803061bc-e9bb-42aa-9072-5fe799c7a7de.webp?v=1766725246&width=1920",
    href: "/shop",
    label: "LAKSHMI COLLECTION",
  },
  {
    id: "s3",
    img: "//astrotalk.store/cdn/shop/files/desktop_3.webp?v=1773661995&width=1920",
    href: "/shop",
    label: "VASTU COLLECTION",
  },
  {
    id: "s4",
    img: "//astrotalk.store/cdn/shop/files/desktop_1_2aede91e-2988-451f-a530-5d970abc346c.webp?v=1771389461&width=1920",
    href: "/shop",
    label: "MURTI COLLECTION",
  },
  {
    id: "s5",
    img: "//astrotalk.store/cdn/shop/files/website_5adf83bb-7c50-433a-8b96-189e25f4cb5e.webp?v=1765947237&width=1920",
    href: "/bracelets",
    label: "KARUNGALI",
  },
  {
    id: "s6",
    img: "//astrotalk.store/cdn/shop/files/Gemsstone_banner_web_499_42cdac4f-fa0a-44eb-bf2a-e963ccba7bd8.webp?v=1768987949&width=1920",
    href: "/shop",
    label: "GEMSTONE COLLECTION",
  },
  {
    id: "s7",
    img: "//astrotalk.store/cdn/shop/files/Rudraksha_banner_banner_95cc659e-207f-4351-831f-4d2cdbe6edf8.webp?v=1768987983&width=1920",
    href: "/rudraksha",
    label: "RUDRAKSHA",
  },
  {
    id: "s8",
    img: "//astrotalk.store/cdn/shop/files/Desktop_1.webp?v=1760079221&width=1920",
    href: "/shop",
    label: "ANKLET COLLECTION",
  },
  {
    id: "s9",
    img: "//astrotalk.store/cdn/shop/files/gofting_collection_banner_copy.webp?v=1767525632&width=1920",
    href: "/shop",
    label: "GIFTING",
  },
];

const CATEGORIES = [
  {
    label: "Bracelets",
    img: "//astrotalk.store/cdn/shop/files/bracelet.webp?v=1753344339",
    href: "/bracelets",
  },
  {
    label: "Rudraksha",
    img: "//astrotalk.store/cdn/shop/files/rudraksha_0d0eb3c0-aa23-484c-9b43-a18dc9c64704.webp?v=1753344339",
    href: "/rudraksha",
  },
  {
    label: "Rashi",
    img: "//astrotalk.store/cdn/shop/files/zodiac.webp?v=1753344339",
    href: "/shop",
  },
  {
    label: "Murti",
    img: "//astrotalk.store/cdn/shop/files/murti.webp?v=1753344339",
    href: "/shop",
  },
  {
    label: "Yantras",
    img: "//astrotalk.store/cdn/shop/files/yantra.webp?v=1753344644",
    href: "/shop",
  },
  {
    label: "Anklet",
    img: "//astrotalk.store/cdn/shop/files/anklet_icon_b.png?v=1758798474",
    href: "/shop",
  },
  {
    label: "Frames",
    img: "//astrotalk.store/cdn/shop/files/frames.webp?v=1753344340",
    href: "/shop",
  },
  {
    label: "Karungali",
    img: "//astrotalk.store/cdn/shop/files/karungali.webp?v=1753344339",
    href: "/shop",
  },
  {
    label: "Siddh Rudraksha",
    img: "//astrotalk.store/cdn/shop/files/siddh_rud.webp?v=1753344339",
    href: "/shop",
  },
  {
    label: "Combos",
    img: "//astrotalk.store/cdn/shop/files/combos.webp?v=1753344339",
    href: "/shop",
  },
  {
    label: "Pyrite",
    img: "//astrotalk.store/cdn/shop/files/stones.webp?v=1753344339",
    href: "/shop",
  },
  {
    label: "Kavach",
    img: "//astrotalk.store/cdn/shop/files/kavach_5ee18bcc-83f4-44f1-af5c-53431a142101.webp?v=1753344339",
    href: "/shop",
  },
  {
    label: "Siddh Range",
    img: "//astrotalk.store/cdn/shop/files/siddh_558ce2f0-53f4-4d99-b671-98c58909b686.webp?v=1753344340",
    href: "/shop",
  },
  {
    label: "Gemstones",
    img: "//astrotalk.store/cdn/shop/files/nrwtdcfrgmifb7ebh4tb.webp?v=1762774803",
    href: "/shop",
  },
  {
    label: "Necklaces",
    img: "//astrotalk.store/cdn/shop/files/necklace_ab5b49df-834d-45a0-adeb-57cfd7cca145.png?v=1764910865",
    href: "/shop",
  },
  {
    label: "Pyramids",
    img: "//astrotalk.store/cdn/shop/files/pyramid.webp?v=1753362577",
    href: "/shop",
  },
  {
    label: "Tower & Tumbles",
    img: "//astrotalk.store/cdn/shop/files/tower_tumble_circle.png?v=1754381067",
    href: "/shop",
  },
  {
    label: "Premium Rudraksha",
    img: "//astrotalk.store/cdn/shop/files/icon.png?v=1757053044",
    href: "/shop",
  },
  {
    label: "Women Bracelets",
    img: "//astrotalk.store/cdn/shop/files/bracelet_women_1.png?v=1757668660",
    href: "/bracelets",
  },
  {
    label: "Evil Eye",
    img: "//astrotalk.store/cdn/shop/files/evil_eye_1b546b3c-704c-4d55-bca5-b6d858daeade.webp?v=1758798777",
    href: "/shop",
  },
  {
    label: "Gifting",
    img: "//astrotalk.store/cdn/shop/files/gift_box.webp?v=1762262433",
    href: "/shop",
  },
  {
    label: "Crystal Dome Trees",
    img: "//astrotalk.store/cdn/shop/files/tree_b50cc001-0af9-46d6-b3e7-ff70fcaa43e7.png?v=1764913678",
    href: "/shop",
  },
];

const QUICK_LINKS = [
  {
    img: "//astrotalk.store/cdn/shop/files/rudraksha_recommender_icon_e30c5508-758b-42a5-8711-a101452b90e1_large.webp?v=1756104994",
    href: "/shop",
    label: "Rudraksha Recommender",
  },
  {
    img: "//astrotalk.store/cdn/shop/files/new_launch_1_large.webp?v=1751371348",
    href: "/shop",
    label: "New Launch",
  },
  {
    img: "//astrotalk.store/cdn/shop/files/siddh_large.webp?v=1751371347",
    href: "/shop",
    label: "Siddh Collection",
  },
];

const BEST_SELLERS = [
  {
    id: "hbs1",
    name: "Dhan Yog Bracelet (Lab Certified)",
    img: "//astrotalk.store/cdn/shop/files/new_dhanyog_copy_large.webp?v=1771411837",
    reviews: 1596,
    price: 699,
    originalPrice: 1999,
  },
  {
    id: "hbs2",
    name: "7 Horses on Raw Pyrite Frame",
    img: "//astrotalk.store/cdn/shop/files/1_10_9cc6c998-232f-4461-a803-ed88ef258b31_large.webp?v=1770616953",
    reviews: 786,
    price: 999,
    originalPrice: 2900,
  },
  {
    id: "hbs3",
    name: "Vastu Pyrite Tortoise (Kachhua)",
    img: "//astrotalk.store/cdn/shop/files/1_15_a56f33fe-a506-4f96-b300-5532597ba579_large.jpg?v=1770268007",
    reviews: 205,
    price: 699,
    originalPrice: 1700,
  },
  {
    id: "hbs4",
    name: "Pisces Zodiac Citrine & Tiger Eye Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Pisces_302b3fe6-2959-4c1c-ae65-63337281bbf3_large.webp?v=1770708649",
    reviews: 504,
    price: 799,
    originalPrice: 2800,
    badge: "Trending",
  },
  {
    id: "hbs5",
    name: "Raw Pyrite Anklet",
    img: "//astrotalk.store/cdn/shop/files/1_4_a57df62b-2bd3-4075-8fc3-d3f7bc3597e4_large.webp?v=1768931260",
    reviews: 290,
    price: 899,
    originalPrice: 1400,
  },
  {
    id: "hbs6",
    name: "Divya Raksha Rudraksha & Karungali Mala with Silver Capping",
    img: "//astrotalk.store/cdn/shop/files/1_4_bf1d5a54-47c8-404d-a525-34e1a7cfc6c2_large.webp?v=1769098532",
    reviews: 148,
    price: 799,
    originalPrice: 1400,
  },
];

const PURPOSES = [
  {
    label: "Money",
    img: "//astrotalk.store/cdn/shop/collections/money.jpg?v=1737036502",
  },
  {
    label: "Love",
    img: "//astrotalk.store/cdn/shop/collections/Love.jpg?v=1737036522",
  },
  {
    label: "Protection",
    img: "//astrotalk.store/cdn/shop/collections/Protection_copy_1.webp?v=1766468404",
  },
  {
    label: "Career",
    img: "//astrotalk.store/cdn/shop/collections/Career.jpg?v=1737036570",
  },
  {
    label: "Evil Eye",
    img: "//astrotalk.store/cdn/shop/collections/evil_eye.jpg?v=1737036585",
  },
  {
    label: "Health",
    img: "//astrotalk.store/cdn/shop/collections/Health.jpg?v=1737036554",
  },
  {
    label: "Gifting",
    img: "//astrotalk.store/cdn/shop/collections/Gifting.jpg?v=1737036537",
  },
];

const ZODIAC_PRODUCTS = [
  {
    id: "z1",
    name: "Dhan Yog Bracelet with Zodiac Charm",
    img: "//astrotalk.store/cdn/shop/files/Dhan_Yog_bracelet_Aries_copy_large.webp?v=1770638734",
    reviews: 281,
    price: 799,
    originalPrice: 1700,
  },
  {
    id: "z2",
    name: "Capricorn Zodiac Garnet & Milky Quartz Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Capricorn_ad564db1-16fc-424a-988b-7857b19cdd6e_large.webp?v=1770708650",
    reviews: 414,
    price: 799,
    originalPrice: 2800,
  },
  {
    id: "z3",
    name: "Aquarius Zodiac Amethyst & Lapis Lazuli Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Aquarius_3d1b6a32-1db0-439b-b511-67baadd30ec9_large.webp?v=1770708651",
    reviews: 226,
    price: 799,
    originalPrice: 2800,
  },
  {
    id: "z4",
    name: "Pisces Zodiac Citrine & Tiger Eye Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Pisces_302b3fe6-2959-4c1c-ae65-63337281bbf3_large.webp?v=1770708649",
    reviews: 504,
    price: 799,
    originalPrice: 2800,
    badge: "Trending",
  },
  {
    id: "z5",
    name: "Aries Zodiac Red Jasper & Tiger Eye Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Aries_44ace827-6525-474c-ad87-0da23c63d7a5_large.webp?v=1770708652",
    reviews: 109,
    price: 799,
    originalPrice: 2800,
    badge: "Selling Fast",
  },
  {
    id: "z6",
    name: "Taurus Zodiac Sunstone & Carnelian Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Taurus_00eb77a6-bdd3-4102-bcfc-d9b458cac700_large.webp?v=1770708651",
    reviews: 399,
    price: 799,
    originalPrice: 2800,
  },
  {
    id: "z7",
    name: "Gemini Zodiac Green Aventurine & Milky Quartz Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Gemini_c48a62ac-b869-4d70-8b10-cd333c56ce87_large.webp?v=1770708649",
    reviews: 390,
    price: 799,
    originalPrice: 2800,
  },
  {
    id: "z8",
    name: "Cancer Zodiac Howlite & Milky Quartz Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Cancer_44b4c34b-81f8-4f65-b569-eece3fda1c11_large.webp?v=1770708650",
    reviews: 225,
    price: 799,
    originalPrice: 2800,
  },
  {
    id: "z9",
    name: "Leo Zodiac Tiger Eye & Citrine Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Leo_11a82408-5653-458b-aa7b-51380ee09221_large.webp?v=1770708649",
    reviews: 517,
    price: 799,
    originalPrice: 2800,
  },
  {
    id: "z10",
    name: "Virgo Zodiac Carnelian & Milky Quartz Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Virgo_1920c75e-ca6c-453a-84ed-740ebd10b061_large.webp?v=1770708648",
    reviews: 466,
    price: 799,
    originalPrice: 2800,
  },
  {
    id: "z11",
    name: "Libra Zodiac LapisLazuli & Howlite Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Libra_627e4837-878a-448a-92c7-0fb6740034ad_large.webp?v=1770708650",
    reviews: 100,
    price: 799,
    originalPrice: 2800,
  },
  {
    id: "z12",
    name: "Scorpio Zodiac Black Obsidian & Milky Quartz Bracelet",
    img: "//astrotalk.store/cdn/shop/files/Scorpio_ab03028a-37f9-4cc0-9baf-803c438004ff_large.webp?v=1770708652",
    reviews: 211,
    price: 799,
    originalPrice: 2800,
  },
];

const COMBO_DEALS = [
  {
    id: "c1",
    name: "Divya Raksha Mala with Om bead Karungali Mala",
    img: "//astrotalk.store/cdn/shop/files/Divya_Raksha_Mala_with_Om_Bead_Karungali_Mala_large.webp?v=1773052167",
    reviews: 130,
    price: 1499,
    originalPrice: 3100,
  },
  {
    id: "c2",
    name: "Dhan Lakshmi Bracelet with Vastu Pyrite Tortoise",
    img: "//astrotalk.store/cdn/shop/files/DhanLaxmiBraceletwithVastuPyriteTortoise_Kachhua_large.webp?v=1773121565",
    reviews: 120,
    price: 1199,
    originalPrice: 3100,
  },
  {
    id: "c3",
    name: "Dhan Prapti Combo",
    img: "//astrotalk.store/cdn/shop/files/1_9e7893a6-07f7-4f64-87be-5128041337e0_large.webp?v=1773294689",
    reviews: 157,
    price: 999,
    originalPrice: 3299,
  },
  {
    id: "c4",
    name: "Vastu Shakti Combo – 7 Horses on Pyrite Frame with Pyrite Tortoise",
    img: "//astrotalk.store/cdn/shop/files/1_16_23f57bfe-d9c6-482b-9cfa-69819d605180_large.jpg?v=1770267729",
    reviews: 98,
    price: 1499,
    originalPrice: 4600,
  },
  {
    id: "c5",
    name: "Divya Shankh Rudraksha Mala with Om Bead Karungali Mala",
    img: "//astrotalk.store/cdn/shop/files/Divya_Shankh_Rudraksha_Mala_with_om_Bead_Karungali_Mala_large.webp?v=1773053959",
    reviews: 119,
    price: 1799,
    originalPrice: 3400,
  },
];

const RUDRAKSHA_PRODUCTS = [
  {
    id: "r1",
    name: "Divya Raksha Rudraksha & Karungali Mala with Silver Capping",
    img: "//astrotalk.store/cdn/shop/files/1_4_bf1d5a54-47c8-404d-a525-34e1a7cfc6c2_large.webp?v=1769098532",
    reviews: 148,
    price: 799,
    originalPrice: 1400,
  },
  {
    id: "r2",
    name: "Rudraksha Hanuman Gada Pendant",
    img: "//astrotalk.store/cdn/shop/files/1-2026-03-16T145811.364_large.webp?v=1773653505",
    reviews: 118,
    price: 699,
    originalPrice: 1300,
  },
  {
    id: "r3",
    name: "Shiv Rudraksha Mala with Adiyogi Shiv Pendant",
    img: "//astrotalk.store/cdn/shop/files/1_82_8a3ea605-c404-4a49-a192-17d85c012560_large.webp?v=1770293237",
    reviews: 113,
    price: 999,
    originalPrice: 1700,
  },
  {
    id: "r4",
    name: "Adiyogi Shiv 7 Mukhi Rudraksha Pendant",
    img: "//astrotalk.store/cdn/shop/files/1_4_9_fd3a6848-cfd4-4b59-8a65-ee0e910fc899_large.webp?v=1773407658",
    reviews: 140,
    price: 999,
    originalPrice: 1700,
  },
  {
    id: "r5",
    name: "7 Mukhi Rudraksha Bracelet",
    img: "//astrotalk.store/cdn/shop/files/1_a2224045-1ac7-4829-a58c-9b162c7a830f_large.webp?v=1770277501",
    reviews: 630,
    price: 799,
    originalPrice: 2499,
  },
];

const COLLECTIONS_GRID = [
  {
    label: "Men Store",
    img: "//astrotalk.store/cdn/shop/files/zzx.jpg?v=1739965295&width=460",
    href: "/shop",
  },
  {
    label: "Money Store",
    img: "//astrotalk.store/cdn/shop/files/money_collection.png?v=1732011487&width=460",
    href: "/shop",
  },
  {
    label: "Dhan Yog Collection",
    img: "//astrotalk.store/cdn/shop/files/dhan-yog-icon.webp?v=1765174928&width=460",
    href: "/shop",
  },
  {
    label: "Zodiac",
    img: "//astrotalk.store/cdn/shop/files/zodiac_1.png?v=1751629419&width=460",
    href: "/shop",
  },
  {
    label: "Karungali",
    img: "//astrotalk.store/cdn/shop/files/karungali_1.webp?v=1768817468&width=460",
    href: "/shop",
  },
  {
    label: "Rudraksha",
    img: "//astrotalk.store/cdn/shop/files/kumbh_11.png?v=1738925340&width=460",
    href: "/rudraksha",
  },
  {
    label: "Gemstones",
    img: "//astrotalk.store/cdn/shop/files/v4zxvxedmqrjhc4g1ba4.webp?v=1762774982&width=460",
    href: "/shop",
  },
  {
    label: "Gifting",
    img: "//astrotalk.store/cdn/shop/files/Astrotalk_Gift_Box.webp?v=1762316010&width=460",
    href: "/shop",
  },
  {
    label: "Frames",
    img: "//astrotalk.store/cdn/shop/files/frames_1.webp?v=1750226033&width=460",
    href: "/shop",
  },
  {
    label: "Siddh Range",
    img: "//astrotalk.store/cdn/shop/files/Siddhi_3.png?v=1750256200&width=460",
    href: "/shop",
  },
  {
    label: "Pyramids",
    img: "//astrotalk.store/cdn/shop/files/pyramid.png?v=1753360299&width=460",
    href: "/shop",
  },
  {
    label: "Bracelets",
    img: "//astrotalk.store/cdn/shop/files/cscs.jpg?v=1739964723&width=460",
    href: "/bracelets",
  },
  {
    label: "Murtis",
    img: "//astrotalk.store/cdn/shop/files/murti.jpg?v=1744885491&width=460",
    href: "/shop",
  },
  {
    label: "New Launch",
    img: "//astrotalk.store/cdn/shop/files/new_1_f8afb98d-bbbc-46b1-b5e5-d88967c8025f.jpg?v=1741867172&width=460",
    href: "/shop",
  },
  {
    label: "Pendants",
    img: "//astrotalk.store/cdn/shop/files/csac.jpg?v=1739964721&width=460",
    href: "/shop",
  },
  {
    label: "Yantras",
    img: "//astrotalk.store/cdn/shop/files/Untitled-5_5eac524c-12f4-4e53-a236-acd25aa3ba1e.jpg?v=1743102542&width=460",
    href: "/shop",
  },
  {
    label: "Divine Wear",
    img: "//astrotalk.store/cdn/shop/files/spiritual_category_b.png?v=1743266938&width=460",
    href: "/shop",
  },
  {
    label: "Blogs",
    img: "//astrotalk.store/cdn/shop/files/Crystals_and_zodiac_charms_arrangement.png?v=1769145608&width=460",
    href: "/shop",
  },
];

type AstroProduct = {
  id: string;
  name: string;
  img: string;
  reviews: number;
  price: number;
  originalPrice: number;
  badge?: string;
};

function AstroProductCard({ product }: { product: AstroProduct }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="block group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
    >
      <div className="relative aspect-square overflow-hidden">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide">
            {product.badge}
          </span>
        )}
        <span className="absolute top-2 right-2 z-10 bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
          {discount}% OFF
        </span>
        <img
          src={`https:${product.img}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-foreground font-medium line-clamp-2 mb-1 min-h-[2.5rem]">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">
            {product.reviews.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground text-sm">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground text-xs line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="mt-2 w-full bg-foreground text-primary-foreground text-[10px] font-semibold py-2 rounded tracking-wider hover:bg-gold transition-colors"
        >
          ADD TO CART
        </button>
      </div>
    </Link>
  );
}

export default function Home() {
  const bestsellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller);
  const [heroIdx, setHeroIdx] = useState(0);
  const [reviewIdx, setReviewIdx] = useState(0);
  const catScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(
      () => setHeroIdx((v) => (v + 1) % HERO_SLIDES.length),
      4500,
    );
    return () => clearInterval(t);
  }, []);

  const visibleReviews = MOCK_REVIEWS.slice(reviewIdx, reviewIdx + 3);
  const canPrev = reviewIdx > 0;
  const canNext = reviewIdx + 3 < MOCK_REVIEWS.length;

  return (
    <main className="overflow-x-hidden">
      {/* Announcement Bar */}
      <div className="bg-foreground text-primary-foreground py-2 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {["a1", "a2", "a3", "a4"].map((key) => (
            <span
              key={key}
              className="text-[11px] tracking-[0.15em] font-semibold text-gold flex-shrink-0"
            >
              🎁 New Year Sale: Extra 20% OFF Sitewide  •  ✅ 7 Day Return
              Policy  •  🚚 Free Delivery on Orders over ₹299  •  💳 Flat ₹500
              Cashback on Prepaid Orders
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="bg-card border-b border-border py-4">
        <div
          ref={catScrollRef}
          className="flex items-center gap-4 px-4 md:px-10 overflow-x-auto max-w-7xl mx-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((c) => (
            <Link
              key={c.label}
              to={c.href as any}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gold transition-all shadow-sm">
                <img
                  src={`https:${c.img}`}
                  alt={c.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] tracking-wide text-foreground/70 group-hover:text-gold transition-colors font-medium whitespace-nowrap">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hero Slideshow */}
      <section className="relative w-full overflow-hidden" aria-label="Hero">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${heroIdx * 100}%)` }}
        >
          {HERO_SLIDES.map((s) => (
            <Link
              key={s.id}
              to={s.href as any}
              className="relative flex-shrink-0 w-full block"
            >
              <img
                src={`https:${s.img}`}
                alt={s.label}
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </Link>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setHeroIdx(i)}
              className={`rounded-full transition-all ${i === heroIdx ? "w-5 h-2 bg-gold" : "w-2 h-2 bg-white/60"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setHeroIdx((v) => (v - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setHeroIdx((v) => (v + 1) % HERO_SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Quick Links */}
      <section className="py-6 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.label}
              to={q.href as any}
              className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={`https:${q.img}`}
                alt={q.label}
                className="w-full object-cover"
                style={{ maxHeight: "120px" }}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Ticker */}
      <div className="bg-foreground text-primary-foreground py-2 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"].map((key) => (
            <span
              key={key}
              className="text-[11px] tracking-[0.15em] font-semibold text-gold flex-shrink-0"
            >
              100% Natural &amp; Authentic &nbsp;•&nbsp; Energised by Expert
              Astrologers
            </span>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <section className="py-16 md:py-24 bg-[#F8F3EA]" aria-label="Bestsellers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle title="Best Sellers" subtitle="MOST LOVED" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BEST_SELLERS.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <AstroProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop By Purpose */}
      <section className="py-16 md:py-24 bg-white" aria-label="Shop by Purpose">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle
              title="Shop By Purpose"
              subtitle="WHAT DO YOU SEEK?"
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {PURPOSES.map((p, i) => (
              <ScrollReveal key={p.label} delay={i * 50}>
                <Link
                  to="/shop"
                  className="group relative block rounded-lg overflow-hidden aspect-square shadow hover:shadow-lg transition-all"
                >
                  <img
                    src={`https:${p.img}`}
                    alt={p.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-0 left-0 right-0 text-center text-white font-semibold text-xs py-2">
                    {p.label}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Featured Pick */}
      <section className="py-12 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl overflow-hidden shadow-lg relative">
            <img
              src="https://astrotalk.store/cdn/shop/files/11_2198012a-c8ee-49d3-99b3-e593e8aa9a5f.webp?v=1766559451&width=1200"
              alt="Gemstone Consultation"
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-8 md:px-16">
              <span className="text-gold text-[10px] tracking-[0.2em] font-semibold mb-2">
                Only Limited Slots Available!
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3">
                Personalised Gemstone Consultation by Experts
              </h2>
              <p className="text-white/80 text-sm mb-5 max-w-md">
                Get the right gemstone recommendation based on your birth chart,
                career goals, and life challenges.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-gold text-white text-[11px] tracking-[0.15em] font-semibold px-7 py-3 rounded-full hover:bg-white hover:text-foreground transition-colors w-fit"
              >
                Book Consultation @ ₹499 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Zodiac New Launches */}
      <section className="py-16 md:py-24 bg-[#F8F3EA]" aria-label="Zodiac">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle
              title="Zodiac New Launches"
              subtitle="SHOP BY RASHI"
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ZODIAC_PRODUCTS.slice(0, 12).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 40}>
                <AstroProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL ZODIAC <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Combo Deals */}
      <section className="py-16 md:py-24 bg-white" aria-label="Combos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle title="Combo Deals" subtitle="BEST VALUE" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {COMBO_DEALS.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <AstroProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL COMBOS <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="relative overflow-hidden">
        <img
          src="https://astrotalk.store/cdn/shop/files/Karungali_Rudraksha_Mala_1_1.webp?v=1767069413&width=1400"
          alt="Divya Raksha Rudraksha & Karungali Mala"
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-20 bg-gradient-to-r from-black/60 to-transparent">
          <span className="text-gold text-[10px] tracking-[0.2em] font-semibold mb-2">
            Best-Selling
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
            Divya Raksha Rudraksha &amp; Karungali Mala with Silver Capping
          </h2>
          <p className="text-white/80 mb-5 text-sm max-w-md">
            This mala brings peace, protection, and positivity. 5 Mukhi
            Rudraksha calms the mind and improves focus. Karungali protects from
            negativity.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-foreground text-[11px] tracking-[0.15em] font-semibold px-7 py-3 rounded-full hover:bg-gold hover:text-white transition-colors"
          >
            BUY NOW <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Our Top Selling Rudraksha */}
      <section className="py-16 md:py-24 bg-card" aria-label="Rudraksha">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle
              title="Our Top Selling Rudraksha"
              subtitle="SACRED COLLECTION"
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {RUDRAKSHA_PRODUCTS.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <AstroProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/rudraksha"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL RUDRAKSHA <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* JEWEL X Bestsellers from existing products */}
      <section
        className="py-16 md:py-24 bg-[#F8F3EA]"
        aria-label="JEWEL X Bestsellers"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle title="JEWEL X Bestsellers" subtitle="MOST LOVED" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.slice(0, 8).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <ProductCard product={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-[11px] tracking-[0.2em] font-medium rounded-full hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 md:py-24 bg-white" aria-label="Collections">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionTitle title="Shop Our Collections" subtitle="EXPLORE" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COLLECTIONS_GRID.map((c, i) => (
              <ScrollReveal key={c.label} delay={i * 30}>
                <Link
                  to={c.href as any}
                  className="group relative block rounded-lg overflow-hidden aspect-[4/3] shadow hover:shadow-lg transition-all"
                >
                  <img
                    src={`https:${c.img}`}
                    alt={c.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <h3 className="font-semibold text-[11px] text-white text-center">
                      {c.label}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section
        className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        aria-label="Reviews"
      >
        <ScrollReveal>
          <SectionTitle
            title="What Our Customers Say"
            subtitle="TESTIMONIALS"
          />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleReviews.map((review, i) => (
            <ScrollReveal key={review.id} delay={i * 100}>
              <div className="bg-card rounded-lg p-6 shadow border border-border">
                <StarRating rating={review.rating} size="sm" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic">
                  "{review.text}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-gold text-xs font-bold">
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.location}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setReviewIdx((v) => Math.max(0, v - 1))}
            disabled={!canPrev}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {MOCK_REVIEWS.map((review, i) => (
            <button
              type="button"
              key={review.id}
              onClick={() => setReviewIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i >= reviewIdx && i < reviewIdx + 3 ? "bg-gold w-4" : "bg-border"}`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setReviewIdx((v) => Math.min(MOCK_REVIEWS.length - 3, v + 1))
            }
            disabled={!canNext}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
