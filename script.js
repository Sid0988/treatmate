document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu drawer toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile drawer when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      if (hamburgerBtn && navMenu) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  /* ==========================================
     CREATIVE EXTRA: Paw Print Trail Effect
     Leaves small paw prints on button hover!
     ========================================== */
  const ctaButtons = document.querySelectorAll('.btn-treats');

  ctaButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      // Throttle paw creation rate
      if (Math.random() > 0.4) return;

      const paw = document.createElement('span');
      paw.classList.add('paw-particle');
      paw.innerText = '🐾';
      
      paw.style.left = `${e.clientX - 8}px`;
      paw.style.top = `${e.clientY - 8}px`;

      document.body.appendChild(paw);

      setTimeout(() => {
        paw.remove();
      }, 800);
    });
  });
});

/* ==========================================
   INTERACTIVE FLAVOR SWITCHER LOGIC
   ========================================== */
const flavorData = {
  strawberry: {
    badge: "100% Gluten-Free Treat",
    highlightText: "Strawberry Yak Cheese",
    highlightColor: "#E64A19",
    desc: "Light, crunchy, and irresistibly delicious! Made from premium Himalayan-style yak milk, providing over 60% protein with less than 1% fat for a guilt-free reward.",
    pills: ["🧀 60%+ Protein", "🍓 Less than 1% Fat", "🦷 Healthy Teeth & Gums"],
    glowColor: "rgba(255, 107, 74, 0.3)",
    emoji: "🍓",
    productTitle: "Strawberry Yak Cheese Puffs",
    tag1: "⚡ Over 60% Protein",
    tag2: "🍓 Real Strawberry"
  },
  berry: {
    badge: "Nature's Goodness Mix",
    highlightText: "Goat Milk & Berry",
    highlightColor: "#6B3FA0",
    desc: "Blends wholesome goat milk with natural Blueberries, Carrots, Pumpkin, and Sweet Potato to support daily digestion and collagen health.",
    pills: ["🐐 Premium Goat Milk", "🫐 Blueberries & Pumpkin", "🌾 Digest Support"],
    glowColor: "rgba(107, 63, 160, 0.3)",
    emoji: "🫐",
    productTitle: "Roots & Berry Mix",
    tag1: "✨ Rich Collagen",
    tag2: "🎃 Pumpkin & Carrot"
  },
  seaweed: {
    badge: "Dual-Flavour Health Chew",
    highlightText: "Milk Calcium & Seaweed",
    highlightColor: "#2E7D32",
    desc: "Combines essential milk calcium with nutrient-rich seaweed to support strong bones and healthy teeth while encouraging healthy chewing habits.",
    pills: ["🦴 Strong Bones & Teeth", "🌿 Essential Minerals", "🐾 All Dog Sizes"],
    glowColor: "rgba(46, 125, 50, 0.3)",
    emoji: "🦴",
    productTitle: "Milk & Seaweed Stick Mix",
    tag1: "🦷 Dental Care",
    tag2: "🌊 Seaweed Minerals"
  }
};

const flavorButtons = document.querySelectorAll('.flavor-btn');
const heroBadgeText = document.getElementById('hero-badge-text');
const heroTitleHighlight = document.getElementById('hero-title-highlight');
const heroDesc = document.getElementById('hero-desc');
const valuePillsContainer = document.getElementById('value-pills');
const productGlow = document.getElementById('product-glow');
const flavorIconDisplay = document.getElementById('flavor-icon-display');
const productBadgeDisplay = document.getElementById('product-badge-display');
const floatTag1 = document.getElementById('float-tag-1');
const floatTag2 = document.getElementById('float-tag-2');

flavorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const flavorKey = btn.getAttribute('data-flavor');
    const data = flavorData[flavorKey];

    if (!data) return;

    // Toggle active state on buttons
    flavorButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update Content dynamically
    if (heroBadgeText) heroBadgeText.innerText = data.badge;
    if (heroTitleHighlight) {
      heroTitleHighlight.innerText = data.highlightText;
      heroTitleHighlight.style.color = data.highlightColor;
    }
    if (heroDesc) heroDesc.innerText = data.desc;

    // Update Pills
    if (valuePillsContainer) {
      valuePillsContainer.innerHTML = data.pills
        .map(pillText => `<span class="pill">${pillText}</span>`)
        .join('');
    }

    // Update Right Visual Stage
    if (productGlow) productGlow.style.background = data.glowColor;
    if (flavorIconDisplay) flavorIconDisplay.innerText = data.emoji;
    if (productBadgeDisplay) productBadgeDisplay.innerText = data.productTitle;
    
    if (floatTag1) floatTag1.querySelector('.tag-text').innerText = data.tag1;
    if (floatTag2) floatTag2.querySelector('.tag-text').innerText = data.tag2;
  });
});

/* ==========================================
   PRODUCTS QUICK VIEW MODAL & CART LOGIC
   ========================================== */
const nutritionData = {
  puffs: {
    title: "Strawberry Yak Cheese Puffs",
    icon: "🍓",
    tagline: "High Protein Himalayan Crunch",
    details: [
      "Over 60% Protein with less than 1% Fat[cite: 1]",
      "100% Gluten-Free & No Added Preservatives[cite: 1]",
      "Supports Healthy Teeth & Gums by reducing plaque & tartar[cite: 1]",
      "Rich in Calcium, Vitamin D, A, B1, C, E & K[cite: 1]",
      "Soft, crunchy texture gentle on teeth for all life stages[cite: 1]"
    ]
  },
  berry: {
    title: "Goat Milk – Roots & Berry Mix",
    icon: "🫐",
    tagline: "Digestive Care & Natural Health",
    details: [
      "Premium Goat Milk base for easy digestion[cite: 1]",
      "Real Blueberries, Carrots, Pumpkin, and Sweet Potato[cite: 1]",
      "Rich source of Protein & Collagen for joint health[cite: 1]",
      "Supports daily immune function & gut health[cite: 1]",
      "Suitable for dogs of all breeds and ages[cite: 1]"
    ]
  },
  seaweed: {
    title: "Milk Calcium & Seaweed Stick Mix",
    icon: "🦴",
    tagline: "Bone Strength & Dental Wellness",
    details: [
      "Dual-flavour chew combining milk calcium and seaweed[cite: 1]",
      "Rich in essential deep-sea minerals[cite: 1]",
      "Encourages healthy, constructive chewing habits[cite: 1]",
      "Supports strong bones and healthy teeth structure[cite: 1]",
      "Everyday rewarding snack for all sizes[cite: 1]"
    ]
  }
};

const modal = document.getElementById('nutrition-modal');
const modalBody = document.getElementById('modal-body-content');
const modalClose = document.getElementById('modal-close-btn');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');

quickViewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const productKey = btn.getAttribute('data-product');
    const info = nutritionData[productKey];

    if (!info) return;

    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="font-size: 4rem;">${info.icon}</span>
        <h3 style="font-family: 'Fredoka', sans-serif; font-size: 1.8rem; color: var(--brand-green); margin-top: 8px;">${info.title}</h3>
        <p style="color: var(--brand-gold-hover); font-weight: 700; font-size: 0.9rem;">${info.tagline}</p>
      </div>
      <div style="background: var(--bg-cream); padding: 20px; border-radius: 20px; margin-bottom: 20px;">
        <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--brand-green); margin-bottom: 12px; letter-spacing: 0.5px;">Nutritional Benefits:</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
          ${info.details.map(item => `<li style="font-size: 0.88rem; color: var(--text-muted);">🐾 ${item}</li>`).join('')}
        </ul>
      </div>
      <button style="width: 100%; background: var(--brand-green); color: white; border: none; padding: 14px; border-radius: 50px; font-weight: 800; cursor: pointer;" onclick="document.getElementById('nutrition-modal').classList.remove('active')">Close Nutrition View</button>
    `;

    modal.classList.add('active');
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => modal.classList.remove('active'));
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

// Add to Cart Interactive Bounce
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span>Added!</span> 🎉`;
    btn.style.background = `var(--brand-gold)`;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = `var(--brand-green)`;
    }, 1800);
  });
});

/* ==========================================
   WHATSAPP ORDER MODAL LOGIC
   ========================================== */
// Replace with TreatMate's actual WhatsApp phone number (with country code, no + or spaces)
const PHONE_NUMBER = "919967411046"; 

const waModal = document.getElementById('whatsapp-modal');
const waCloseBtn = document.getElementById('wa-modal-close');
const waForm = document.getElementById('whatsapp-order-form');
const waProductName = document.getElementById('wa-product-name');

// Target all "Shop This Flavor" & "Add to Bowl" buttons across the site
document.addEventListener('click', (e) => {
  const shopBtn = e.target.closest('.btn-primary-hero, .add-to-cart-btn');
  
  if (shopBtn) {
    e.preventDefault();
    
    // Determine product title depending on where the button was clicked
    let selectedFlavor = "Strawberry Yak Cheese Puffs"; // default
    
    const productCard = shopBtn.closest('.product-card');
    if (productCard) {
      const nameEl = productCard.querySelector('.product-name');
      if (nameEl) selectedFlavor = nameEl.innerText;
    } else {
      const activeFlavorBtn = document.querySelector('.flavor-btn.active strong');
      if (activeFlavorBtn) selectedFlavor = activeFlavorBtn.innerText;
    }

    if (waProductName) waProductName.value = selectedFlavor;
    if (waModal) waModal.classList.add('active');
  }
});

// Close Modal Events
if (waCloseBtn) {
  waCloseBtn.addEventListener('click', () => waModal.classList.remove('active'));
}

if (waModal) {
  waModal.addEventListener('click', (e) => {
    if (e.target === waModal) waModal.classList.remove('active');
  });
}

// Handle Form Submission -> Build & Open WhatsApp Link
if (waForm) {
  waForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('wa-user-name').value;
    const pet = document.getElementById('wa-pet-info').value || 'N/A';
    const address = document.getElementById('wa-address').value;
    const quantity = document.getElementById('wa-quantity').value;
    const product = waProductName.value;

    // Create custom WhatsApp message
    const message = `Hello TreatMate team! 🐾\n\nI would like to place an order via website:\n\n*Product:* ${product}\n*Quantity:* ${quantity}\n\n*Customer Details:*\n• *Name:* ${name}\n• *Dog Breed/Name:* ${pet}\n• *Delivery Address:* ${address}\n\nPlease confirm availability and payment options. Thanks!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');

    // Reset and close modal
    waModal.classList.remove('active');
    waForm.reset();
  });
}