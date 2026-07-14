document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const headerNav = document.querySelector(".header-nav");
  const navItems = document.querySelectorAll(".nav-menu > li > a");
  const siteHeader = document.querySelector(".header.header-clean, header.header");
  const headerInner = document.querySelector(".header-inner");

  function syncHeroViewportHeight() {
    const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
    document.documentElement.style.setProperty(
      "--home-header-height",
      `${headerHeight}px`,
    );
  }

  syncHeroViewportHeight();
  window.addEventListener("resize", syncHeroViewportHeight);

  function isMobileView() {
    return window.innerWidth <= 768;
  }

  function closeMobileMenu() {
    if (!menuToggle || !headerNav) {
      return;
    }

    menuToggle.classList.remove("active");
    headerNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    headerNav.querySelectorAll(".sub-menu.active").forEach((subMenu) => {
      subMenu.classList.remove("active");
    });
  }

  if (menuToggle && headerNav && menuToggle.dataset.mobileMenuBound !== "true") {
    menuToggle.dataset.mobileMenuBound = "true";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở menu điều hướng");

    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      const isOpen = headerNav.classList.toggle("active");
      this.classList.toggle("active", isOpen);
      this.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Handle submenu toggles on mobile
  navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      const subMenu = this.nextElementSibling;
      if (subMenu && subMenu.classList.contains("sub-menu")) {
        if (isMobileView()) {
          e.preventDefault();
          const isOpening = !subMenu.classList.contains("active");
          headerNav.querySelectorAll(".sub-menu.active").forEach((openSubMenu) => {
            if (openSubMenu !== subMenu) {
              openSubMenu.classList.remove("active");
            }
          });
          subMenu.classList.toggle("active", isOpening);
        }
        return;
      }

      if (isMobileView()) {
        closeMobileMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      headerInner &&
      menuToggle &&
      headerNav &&
      !headerInner.contains(e.target) &&
      headerNav.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (!isMobileView()) {
      closeMobileMenu();
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
  if (carouselTrack && carouselSlides.length) {
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
  }
});
// Hero banner 1 ảnh full màn hình với dots + auto slide
(function () {
  const heroBanner = document.querySelector("#homeHeroBanner");
  const bannerSlide = heroBanner?.querySelector(".banner-center-slide");
  const bannerImg = heroBanner?.querySelector(".banner-center-img");
  const dots = heroBanner?.querySelectorAll(".banner-dot");
  const prevArrow = heroBanner?.querySelector(".banner-arrow-prev");
  const nextArrow = heroBanner?.querySelector(".banner-arrow-next");

  if (!heroBanner || !bannerSlide || !bannerImg || !dots || !dots.length) {
    return;
  }

  const slides = [
    {
      src: "/images/banner-main-1.avif",
      alt: "Thiết kế nội thất DanaHome",
    },
    {
      src: "/images/banner-side-1.avif",
      alt: "Không gian nội thất cao cấp",
    },
    {
      src: "/images/banner-main-4.avif",
      alt: "Công trình kiến trúc DanaHome",
    },
  ];

  let current = 0;
  let autoSlideTimer = null;
  let transitionToken = 0;
  let transitionResetTimer = null;
  const transitionImg = document.createElement("img");

  transitionImg.className = "banner-transition-img";
  transitionImg.alt = "";
  transitionImg.setAttribute("aria-hidden", "true");
  bannerImg.insertAdjacentElement("afterend", transitionImg);

  function updateDots() {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === current);
    });
  }

  function preloadSlide(index) {
    const preloadImg = new Image();
    preloadImg.src = slides[(index + slides.length) % slides.length].src;
  }

  function render(index, immediate = false) {
    const nextIndex = (index + slides.length) % slides.length;
    const nextSlideData = slides[nextIndex];

    if (!immediate && nextIndex === current) {
      return;
    }

    current = nextIndex;
    updateDots();

    if (immediate) {
      bannerImg.src = nextSlideData.src;
      bannerImg.alt = nextSlideData.alt;
      preloadSlide(current + 1);
      return;
    }

    const activeToken = ++transitionToken;
    const preloadImg = new Image();
    clearTimeout(transitionResetTimer);
    bannerSlide.classList.remove("is-transitioning");

    function swapImage() {
      if (activeToken !== transitionToken) {
        return;
      }

      transitionImg.src = nextSlideData.src;
      transitionImg.alt = nextSlideData.alt;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (activeToken !== transitionToken) {
            return;
          }

          bannerSlide.classList.add("is-transitioning");
          transitionResetTimer = setTimeout(() => {
            if (activeToken !== transitionToken) {
              return;
            }

            bannerImg.src = nextSlideData.src;
            bannerImg.alt = nextSlideData.alt;
            transitionImg.removeAttribute("src");
            bannerSlide.classList.remove("is-transitioning");
            preloadSlide(current + 1);
          }, 580);
        });
      });
    }

    preloadImg.onload = swapImage;
    preloadImg.onerror = swapImage;
    preloadImg.src = nextSlideData.src;

    if (preloadImg.complete) {
      swapImage();
    }
  }

  function nextSlide() {
    render(current + 1);
  }

  function prevSlide() {
    render(current - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
  }

  prevArrow?.addEventListener("click", function () {
    prevSlide();
    startAutoSlide();
  });

  nextArrow?.addEventListener("click", function () {
    nextSlide();
    startAutoSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      render(index);
      startAutoSlide();
    });
  });

  heroBanner.addEventListener("mouseenter", stopAutoSlide);
  heroBanner.addEventListener("mouseleave", startAutoSlide);

  render(0, true);
  startAutoSlide();
})();
document.addEventListener("DOMContentLoaded", function () {
  // 1. HIỆU ỨNG BẤM CHUYỂN TAB MẪU THIẾT KẾ MƯỢT MÀ (ANIMATION FILTER)
  const tabButtons = document.querySelectorAll(".tab-btn");
  const projectItems = document.querySelectorAll(".project-item");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Đổi active cho button nút bấm
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      projectItems.forEach((item) => {
        // Thêm hiệu ứng fade out trước khi lọc
        item.style.opacity = "0";
        item.style.transform = "scale(0.9)";

        setTimeout(() => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.classList.remove("hide-item");
            // Trả lại hiệu ứng hiển thị mịn màng
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 50);
          } else {
            item.classList.add("hide-item");
          }
        }, 300); // Khớp thời gian css ẩn đi
      });
    });
  });

  // 2. HIỆU ỨNG CUỘN TRANG ĐẾN ĐÂU - HIỆU ỨNG BAY RA ĐẾN ĐÓ (SCROLL REVEAL)
  const revealElements = document.querySelectorAll(
    ".reveal-fade, .reveal-right",
  );

  function checkScrollReveal() {
    const triggerBottom = window.innerHeight * 0.85; // Cuộn đến 85% màn hình là kích hoạt

    revealElements.forEach((el) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add("reveal-active");
      }
    });
  }

  // Hiện nội dung ngay khi tải trang để tránh trường hợp section bị ẩn trắng nếu animation không kịp chạy.
  revealElements.forEach((el) => {
    el.classList.add("reveal-active");
  });

  // Chạy ngay khi tải trang và khi cuộn chuột
  window.addEventListener("scroll", checkScrollReveal);
  checkScrollReveal();
});
// Xử lý nút Back to Top
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", function () {
    // Nếu cuộn xuống quá 400px thì hiển thị nút, ngược lại thì ẩn đi
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Hiệu ứng cuộn mượt lên đầu trang khi bấm
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà thay vì giật thẳng lên luôn
    });
  });
}
