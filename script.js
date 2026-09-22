/**
 * PixelGallery - Main JavaScript Application Script
 * Features: Dynamic gallery rendering, category filtering, search, favorite heart toggle, full-screen lightbox modal.
 */

// 1. High-Resolution Gallery Dataset (Local images with reliable fallback URLs)
const imagesData = [
  {
    id: 1,
    title: 'Mountain Bliss',
    category: 'nature',
    src: 'images/mountain-bliss.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Mountain landscape reflection in serene alpine lake'
  },
  {
    id: 2,
    title: 'Happy Paws',
    category: 'animals',
    src: 'images/happy-paws.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Golden Retriever smiling outdoors in grass'
  },
  {
    id: 3,
    title: 'City Lights',
    category: 'cities',
    src: 'images/city-lights.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
    alt: 'City skyline during golden sunset'
  },
  {
    id: 4,
    title: "Nature's Detail",
    category: 'nature',
    src: 'images/natures-detail.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=85',
    alt: 'Fresh dew drop on green leaf macro close-up'
  },
  {
    id: 5,
    title: 'Serene Beach',
    category: 'nature',
    src: 'images/serene-beach.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    alt: 'Sunset over turquoise tropical ocean beach'
  },
  {
    id: 6,
    title: 'Code Life',
    category: 'technology',
    src: 'images/code-life.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Developer workspace with code on laptop display'
  },
  {
    id: 7,
    title: 'Butterfly Beauty',
    category: 'animals',
    src: 'images/butterfly-beauty.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?auto=format&fit=crop&w=1200&q=85',
    alt: 'Monarch butterfly resting on bright flower'
  },
  {
    id: 8,
    title: 'Road to Somewhere',
    category: 'nature',
    src: 'images/road-to-somewhere.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85',
    alt: 'Scenic winding highway through wilderness landscape'
  },
  {
    id: 9,
    title: 'Starry Night',
    category: 'nature',
    src: 'images/starry-night.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85',
    alt: 'Milky way and starry sky above mountain peak'
  },
  {
    id: 10,
    title: 'Coffee Time',
    category: 'people',
    src: 'images/coffee-time.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    alt: 'Freshly brewed coffee cup with latte art'
  },
  {
    id: 11,
    title: "Nature's Wonder",
    category: 'nature',
    src: 'images/natures-wonder.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=85',
    alt: 'Dramatic canyon horseshoe river bend'
  },
  {
    id: 12,
    title: 'Curious Companion',
    category: 'animals',
    src: 'images/curious-companion.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85',
    alt: 'Charming tabby cat portrait with bright green eyes'
  }
];

// 2. Application State Variables
let activeCategory = 'all';
let searchQuery = '';
let filteredImages = [...imagesData];
let currentLightboxIndex = 0;
let likedImageIds = new Set(JSON.parse(localStorage.getItem('pixel_gallery_likes') || '[]'));

// 3. Cache DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const emptyState = document.getElementById('emptyState');
const resetFilterBtn = document.getElementById('resetFilterBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// 4. Filter & Search Logic
function applyFilters() {
  filteredImages = imagesData.filter(img => {
    const matchesCategory = activeCategory === 'all' || img.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = q === '' || 
      img.title.toLowerCase().includes(q) ||
      img.category.toLowerCase().includes(q) ||
      img.alt.toLowerCase().includes(q);
    
    return matchesCategory && matchesSearch;
  });

  renderGallery();
}

// 5. Render Gallery Cards
function renderGallery() {
  galleryGrid.innerHTML = '';

  if (filteredImages.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  filteredImages.forEach((image, index) => {
    const card = document.createElement('article');
    card.className = 'image-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View image ${image.title}`);

    const isLiked = likedImageIds.has(image.id);

    card.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy" onerror="this.src='${image.fallbackSrc}'">
      <div class="card-overlay">
        <h3 class="card-title">${image.title}</h3>
        <button class="favorite-btn ${isLiked ? 'liked' : ''}" aria-label="Favorite image ${image.title}" data-id="${image.id}">
          <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    `;

    // Click card opens Lightbox modal
    card.addEventListener('click', (e) => {
      if (e.target.closest('.favorite-btn')) return;
      openLightbox(index);
    });

    // Keyboard support (Enter or Space key opens Lightbox)
    card.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.favorite-btn')) {
        e.preventDefault();
        openLightbox(index);
      }
    });

    // Heart Favorite click handler
    const favBtn = card.querySelector('.favorite-btn');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLike(image.id, favBtn);
    });

    galleryGrid.appendChild(card);
  });
}

// 6. Favorite Toggle Functionality
function toggleLike(imageId, buttonEl) {
  if (likedImageIds.has(imageId)) {
    likedImageIds.delete(imageId);
    buttonEl.classList.remove('liked');
  } else {
    likedImageIds.add(imageId);
    buttonEl.classList.add('liked');
  }
  localStorage.setItem('pixel_gallery_likes', JSON.stringify(Array.from(likedImageIds)));
}

// 7. Lightbox Modal Control Functions
function openLightbox(index) {
  if (filteredImages.length === 0) return;
  currentLightboxIndex = index;
  updateLightboxContent();
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const image = filteredImages[currentLightboxIndex];
  
  lightboxImage.classList.add('fade-out');

  setTimeout(() => {
    lightboxImage.src = image.src;
    lightboxImage.onerror = () => { lightboxImage.src = image.fallbackSrc; };
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = image.title;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${filteredImages.length}`;
    lightboxImage.classList.remove('fade-out');
  }, 150);
}

function showNextImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
  updateLightboxContent();
}

function showPrevImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
  updateLightboxContent();
}

// 8. Event Listeners Setup
function initEventListeners() {
  // Mobile Hamburger Menu Toggle
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Category Filter Tabs Click Handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // Real-time Search Input Listener
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    clearSearchBtn.style.display = searchQuery !== '' ? 'block' : 'none';
    applyFilters();
  });

  // Clear Search Input Button
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    applyFilters();
  });

  // Reset Filters Button on Empty State
  resetFilterBtn.addEventListener('click', () => {
    activeCategory = 'all';
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    filterBtns[0].classList.add('active');
    filterBtns[0].setAttribute('aria-selected', 'true');
    
    applyFilters();
  });

  // Lightbox Modal Controls
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNextImage);
  lightboxPrev.addEventListener('click', showPrevImage);

  // Keyboard Shortcuts (Esc to close, Arrow keys for navigation)
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });

  // Touch Swipe Navigation for Mobile Lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) showNextImage();
      else showPrevImage();
    }
  }, { passive: true });
}

// 9. Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  applyFilters();
});
