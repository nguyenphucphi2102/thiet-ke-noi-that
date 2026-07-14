
(function () {
    var searchToggleBtn = document.getElementById('searchToggleBtn');
    var searchOverlay = document.getElementById('searchOverlay');
    var searchCloseBtn = document.getElementById('searchCloseBtn');
    var searchInput = document.getElementById('searchInput');
    var searchForm = document.getElementById('searchForm');

    if (!searchToggleBtn || !searchOverlay) return;

    // Mở overlay khi bấm kính lú p
    searchToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        document.body.classList.add('search-overlay-open');
        setTimeout(function () { if (searchInput) searchInput.focus(); }, 300);
    });

    // Đóng khi bấm nút X
    if (searchCloseBtn) {
        searchCloseBtn.addEventListener('click', function () {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('search-overlay-open');
            if (searchInput) searchInput.value = '';
        });
    }

    // Đóng khi bấm phím ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('search-overlay-open');
            if (searchInput) searchInput.value = '';
        }
    });

    // Đóng khi bấm vùng nền tối bên ngoài
    searchOverlay.addEventListener('click', function (e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('search-overlay-open');
            if (searchInput) searchInput.value = '';
        }
    });

    // Xử lý submit
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var keyword = searchInput ? searchInput.value.trim() : '';
            if (keyword) {
                window.location.href = 'search.html?q=' + encodeURIComponent(keyword);
            }
        });
    }
})();

(function () {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    // Hiện/ẩn nút theo vị trí cuộn
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    // Click để cuộn lên đầu trang
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
