(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var menuToggle = document.querySelector('.mobile-menu-toggle');
        var headerNav = document.querySelector('.header-nav');
        var headerInner = document.querySelector('.header-inner');

        if (!menuToggle || !headerNav || !headerInner || menuToggle.dataset.mobileMenuBound === 'true') {
            return;
        }

        var navLinks = headerNav.querySelectorAll('.nav-menu > li > a');

        function isMobileView() {
            return window.innerWidth <= 768;
        }

        function closeMenu() {
            menuToggle.classList.remove('active');
            headerNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');

            var activeSubMenus = headerNav.querySelectorAll('.sub-menu.active');
            activeSubMenus.forEach(function (subMenu) {
                subMenu.classList.remove('active');
            });
        }

        menuToggle.dataset.mobileMenuBound = 'true';
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Mở menu điều hướng');

        menuToggle.addEventListener('click', function (event) {
            event.preventDefault();

            var isOpen = headerNav.classList.toggle('active');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                var subMenu = link.nextElementSibling;
                var hasSubMenu = subMenu && subMenu.classList.contains('sub-menu');

                if (!isMobileView()) {
                    return;
                }

                if (hasSubMenu) {
                    event.preventDefault();

                    var isOpening = !subMenu.classList.contains('active');
                    headerNav.querySelectorAll('.sub-menu.active').forEach(function (openSubMenu) {
                        if (openSubMenu !== subMenu) {
                            openSubMenu.classList.remove('active');
                        }
                    });
                    subMenu.classList.toggle('active', isOpening);
                    return;
                }

                closeMenu();
            });
        });

        document.addEventListener('click', function (event) {
            if (!headerInner.contains(event.target) && headerNav.classList.contains('active')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (!isMobileView()) {
                closeMenu();
            }
        });
    });
})();
