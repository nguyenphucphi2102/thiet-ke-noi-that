document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const headerNav = document.querySelector(".header-nav");
  const navItems = document.querySelectorAll(".nav-menu > li > a");

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("active");
      headerNav.classList.toggle("active");
    });
  }

  // Handle submenu toggles on mobile
  navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      const subMenu = this.nextElementSibling;
      if (subMenu && subMenu.classList.contains("sub-menu")) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          subMenu.classList.toggle("active");
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".header-inner") &&
      headerNav.classList.contains("active")
    ) {
      menuToggle.classList.remove("active");
      headerNav.classList.remove("active");
    }
  });

  // ========== Hero Carousel ==========
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const carouselDots = document.querySelectorAll(".carousel-dot");
  const carouselPrevBtn = document.querySelector(".carousel-prev");
  const carouselNextBtn = document.querySelector(".carousel-next");

  let currentSlide = 0;
  const totalSlides = carouselSlides.length;
  let autoPlayInterval;

  function updateCarousel() {
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;

    // Update dots
    carouselDots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoPlay();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Event listeners for carousel
  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  carouselDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-slide"));
      goToSlide(index);
    });
  });

  // Start auto play on page load
  startAutoPlay();
});
