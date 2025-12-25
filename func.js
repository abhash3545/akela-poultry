document.addEventListener('DOMContentLoaded', function () {

    /* ===============================
       MOBILE HAMBURGER MENU
       =============================== */
    const toggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (toggle && mobileMenu) {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (
            mobileMenu &&
            !mobileMenu.contains(e.target) &&
            !toggle.contains(e.target)
        ) {
            mobileMenu.classList.remove('active');
        }
    });

    /* ===============================
       SMOOTH SCROLL + CLOSE MENU
       =============================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function () {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });

    /* ===============================
       READ MORE – MOBILE ONLY
       =============================== */
    window.toggleText = function (id, btn) {
        if (window.innerWidth > 768) return;

        const el = document.getElementById(id);
        if (!el) return;

        el.classList.toggle('expanded');
        btn.innerText = el.classList.contains('expanded')
            ? 'View Less'
            : 'View More';
    };

});


