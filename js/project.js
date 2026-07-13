
        // =========================================================
        // PROJECTS FILTER — vanilla JS thuần, không phụ thuộc
        // plugin tab của Bootstrap nên không bị lỗi giữa các phiên bản.
        // =========================================================
        (function () {
            var filterButtons = document.querySelectorAll('#projectFilter .projects-filter-btn');
            var cards = document.querySelectorAll('#projectsGrid .project-card');
            var emptyState = document.getElementById('projectsEmpty');

            function applyFilter(category, updateUrl) {
                var visibleCount = 0;

                cards.forEach(function (card) {
                    var match = category === 'all' || card.getAttribute('data-category') === category;
                    card.classList.toggle('is-hidden', !match);
                    if (match) visibleCount++;
                });

                emptyState.classList.toggle('is-visible', visibleCount === 0);

                filterButtons.forEach(function (btn) {
                    var isActive = btn.getAttribute('data-filter') === category;
                    btn.classList.toggle('active', isActive);
                    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
                });

                if (updateUrl) {
                    var url = category === 'all'
                        ? window.location.pathname
                        : window.location.pathname + '?cat=' + category;
                    history.replaceState(null, '', url);
                }
            }

            filterButtons.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    applyFilter(btn.getAttribute('data-filter'), true);
                });
            });

            // Đọc hạng mục từ URL khi tải trang (?cat=can-ho ...), ví dụ khi bấm từ menu điều hướng
            var params = new URLSearchParams(window.location.search);
            var initialCategory = params.get('cat');
            var validCategories = Array.prototype.map.call(filterButtons, function (btn) {
                return btn.getAttribute('data-filter');
            });

            if (initialCategory && validCategories.indexOf(initialCategory) !== -1) {
                applyFilter(initialCategory, false);
            }
        })();
