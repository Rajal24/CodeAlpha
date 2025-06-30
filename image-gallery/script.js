// FILTER FUNCTIONALITY 
let galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filters button");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const itemsArray = Array.from(galleryItems);
  shuffleArray(itemsArray);
  gallery.innerHTML = "";
  itemsArray.forEach(item => gallery.appendChild(item));
  galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      openLightbox(item);
    });
  });
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    galleryItems.forEach(item => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// LIGHTBOX FUNCTIONALITY
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxCaption = document.querySelector(".lightbox-caption");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;
let visibleItems = [];

function openLightbox(item) {
  visibleItems = Array.from(document.querySelectorAll(".gallery-item")).filter(
    item => item.style.display !== "none"
  );
  currentIndex = visibleItems.indexOf(item);
  if (currentIndex === -1) return;
  const img = visibleItems[currentIndex].querySelector("img");
  const caption = visibleItems[currentIndex].querySelector(".caption").innerHTML;
  lightboxImg.src = img.src;
  lightboxCaption.innerHTML = caption;
  lightbox.classList.remove("hidden");
}

function showNext() {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  updateLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  updateLightbox();
}

function updateLightbox() {
  const img = visibleItems[currentIndex].querySelector("img");
  const caption = visibleItems[currentIndex].querySelector(".caption").innerHTML;
  lightboxImg.src = img.src;
  lightboxCaption.innerHTML = caption;
}

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

closeBtn.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("hidden")) {
    if (e.key === "Escape") {
      lightbox.classList.add("hidden");
    } else if (e.key === "ArrowRight") {
      showNext();
    } else if (e.key === "ArrowLeft") {
      showPrev();
    }
  }
});