// Zozoworld static site data + interactivity
const CATEGORY_IMAGES = {
  "Food": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop",
  "Fashion": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&auto=format&fit=crop",
  "Accessories": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&auto=format&fit=crop",
  "Cakes & Treats": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&auto=format&fit=crop",
  "Perfume & Skincare": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80&auto=format&fit=crop",
  "Beauty Services": "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80&auto=format&fit=crop",
};

const CATEGORIES = [
  { name: "Food", icon: "🍲", description: "Hot meals & snacks on campus" },
  { name: "Fashion", icon: "👗", description: "Trendy outfits for students" },
  { name: "Accessories", icon: "👜", description: "Bags, watches & extras" },
  { name: "Cakes & Treats", icon: "🍰", description: "Birthday cakes & desserts" },
  { name: "Perfume & Skincare", icon: "🌸", description: "Smell good, glow up" },
  { name: "Beauty Services", icon: "💅", description: "Hair, nails & makeup" },
];

const VENDORS = [
  { id:"1", name:"Tife's Delicacy", category:"Food", description:"Home-style hot meals, small chops & student combos served fresh on campus.", whatsapp:"2348000000001", rating:4.9 },
  { id:"2", name:"MixvilleByNaf", category:"Cakes & Treats", description:"Custom cakes, parfaits, cupcakes & birthday surprise boxes.", whatsapp:"2348000000002", rating:4.9 },
  { id:"3", name:"Slimbite", category:"Cakes & Treats", description:"Mini bites, dessert cups & sweet treats — perfectly portioned.", whatsapp:"2348000000003", rating:4.8 },
  { id:"4", name:"Chocolate Planet", category:"Cakes & Treats", description:"Chocolate-loaded cakes, brownies, strawberries & gift boxes.", whatsapp:"2348000000004", rating:5.0 },
  { id:"5", name:"Kehy Luxe", category:"Beauty Services", description:"Pedicure, manicure & luxury nail art bookings on campus.", whatsapp:"2348000000005", rating:4.9 },
  { id:"6", name:"Fols Luxe", category:"Accessories", description:"Curated bags, jewelry & statement accessories for every look.", whatsapp:"2348000000006", rating:4.8 },
  { id:"7", name:"Aurella Scent & Radiance", category:"Perfume & Skincare", description:"Designer-inspired perfume oils, body mists & glow skincare.", whatsapp:"2348000000007", rating:4.9 },
  { id:"8", name:"Kikzz Organic", category:"Perfume & Skincare", description:"Organic skincare — soaps, butters & glow serums made fresh.", whatsapp:"2348000000008", rating:4.8 },
  { id:"9", name:"4lahstitches", category:"Fashion", description:"Custom tailoring & ready-to-wear modest fashion for students.", whatsapp:"2348000000009", rating:4.8 },
  { id:"10", name:"Leenahs Luxe", category:"Fashion", description:"Luxe abayas, kaftans & elegant occasion wear.", whatsapp:"2348000000010", rating:4.9 },
  { id:"11", name:"Siraj Hilal", category:"Fashion", description:"Modest menswear, kaftans & thobes tailored to fit.", whatsapp:"2348000000011", rating:4.8 },
];

function reviewCount(id){
  let h = 0;
  for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return 8 + (h % 40);
}

function renderCategories(){
  const el = document.getElementById("categoryGrid");
  el.innerHTML = CATEGORIES.map(c => `
    <a class="category" href="#vendors" data-cat="${c.name}">
      <div class="category-icon">${c.icon}</div>
      <div class="category-name">${c.name}</div>
      <div class="category-desc">${c.description}</div>
    </a>
  `).join("");
  el.querySelectorAll(".category").forEach(a => {
    a.addEventListener("click", e => {
      const cat = a.getAttribute("data-cat");
      setFilter(cat);
    });
  });
}

let activeFilter = "All";

function renderFilters(){
  const cats = ["All", ...CATEGORIES.map(c => c.name)];
  const el = document.getElementById("filters");
  el.innerHTML = cats.map(c => `<button class="filter-chip${c===activeFilter?' active':''}" data-cat="${c}">${c}</button>`).join("");
  el.querySelectorAll(".filter-chip").forEach(b => {
    b.addEventListener("click", () => setFilter(b.getAttribute("data-cat")));
  });
}

function setFilter(cat){
  activeFilter = cat;
  renderFilters();
  renderVendors();
}

function renderVendors(){
  const list = activeFilter === "All" ? VENDORS : VENDORS.filter(v => v.category === activeFilter);
  const el = document.getElementById("vendorGrid");
  el.innerHTML = list.map(v => `
    <article class="vendor">
      <img class="vendor-img" src="${CATEGORY_IMAGES[v.category]}" alt="${v.category}" loading="lazy" />
      <div class="vendor-body">
        <span class="vendor-cat">${v.category}</span>
        <h3 class="vendor-name">${v.name}</h3>
        <p class="vendor-desc">${v.description}</p>
        <div class="vendor-rating"><strong>${v.rating.toFixed(1)}</strong> ⭐ <span>(${reviewCount(v.id)} reviews)</span></div>
        <a class="btn btn-wa" href="https://wa.me/${v.whatsapp}?text=${encodeURIComponent('Hi '+v.name+', I found you on Zozoworld!')}" target="_blank" rel="noopener">💬 Chat on WhatsApp</a>
      </div>
    </article>
  `).join("");
}

document.getElementById("year").textContent = new Date().getFullYear();
renderCategories();
renderFilters();
renderVendors();
