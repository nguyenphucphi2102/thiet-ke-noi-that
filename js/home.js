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
// Chọn các phần tử cần thiết
const bannerImg = document.querySelector(".banner-center-img");
const dots = document.querySelectorAll(".banner-dot");

function changeSlide(newImgSrc, activeDotIndex) {
  // 1. Thêm class hiệu ứng để ảnh cũ mờ và thu nhỏ đi
  bannerImg.classList.add("fade-effect");

  // 2. Chờ hiệu ứng mờ hoàn tất (0.3 giây) rồi mới đổi nguồn ảnh
  setTimeout(() => {
    bannerImg.src = newImgSrc;

    // Đổi trạng thái active của chấm tròn (dots)
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[activeDotIndex].classList.add("active");

    // 3. Xóa class hiệu ứng để ảnh mới phóng to và hiện rõ lên mượt mà
    bannerImg.classList.remove("fade-effect");
  }, 300);
}

// Ví dụ bắt sự kiện khi bấm vào các chấm tròn (dots)
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    // Thay bằng đường dẫn ảnh thật của bạn tại đây
    const paths = [
      "/images/banner-main-1.avif",
      "/images/banner-main-2.avif",
      "/images/banner-main-3.avif",
    ];
    changeSlide(paths[index], index);
  });
});
// Banner showcase: xoay vòng đúng 3 ảnh hiện có trong thư mục /images/
(function () {
  var images = [
    "/images/banner-side-1.avif",
    "/images/banner-main-1.avif",
    "/images/banner-side-2.jpg",
  ];
  var current = 1; // ảnh chính ban đầu

  var leftBtn = document.querySelector(".banner-side-left img");
  var mainImg = document.querySelector(".banner-center-img");
  var rightBtn = document.querySelector(".banner-side-right img");
  var dots = document.querySelectorAll(".banner-dot");
  var prevArrow = document.querySelector(".banner-arrow-prev");
  var nextArrow = document.querySelector(".banner-arrow-next");

  function render() {
    const leftIndex = (current - 1 + images.length) % images.length;
    const rightIndex = (current + 1) % images.length;

    leftBtn.style.opacity = 0;
    mainImg.style.opacity = 0;
    rightBtn.style.opacity = 0;

    setTimeout(() => {
      leftBtn.src = images[leftIndex];
      mainImg.src = images[current];
      rightBtn.src = images[rightIndex];

      leftBtn.style.opacity = 1;
      mainImg.style.opacity = 1;
      rightBtn.style.opacity = 1;
    }, 200);

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  function goTo(index) {
    const showcase = document.querySelector(".banner-showcase");

    showcase.classList.add("banner-changing");

    setTimeout(() => {
      current = (index + images.length) % images.length;

      render();

      showcase.classList.remove("banner-changing");
    }, 350);
  }

  if (prevArrow)
    prevArrow.addEventListener("click", function () {
      goTo(current - 1);
    });
  if (nextArrow)
    nextArrow.addEventListener("click", function () {
      goTo(current + 1);
    });
  var leftWrap = document.querySelector(".banner-side-left");
  var rightWrap = document.querySelector(".banner-side-right");
  if (leftWrap)
    leftWrap.addEventListener("click", function () {
      goTo(current - 1);
    });
  if (rightWrap)
    rightWrap.addEventListener("click", function () {
      goTo(current + 1);
    });
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goTo(i);
    });
  });

  render();
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

  // Chạy ngay khi tải trang và khi cuộn chuột
  window.addEventListener("scroll", checkScrollReveal);
  checkScrollReveal();
});
// Xử lý nút Back to Top
const backToTopBtn = document.getElementById("backToTop");

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
