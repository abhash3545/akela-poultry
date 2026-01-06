document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       MOBILE MENU
    =============================== */
    const toggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (toggle && mobileMenu) {
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });

        document.addEventListener('click', e => {
            if (!mobileMenu.contains(e.target) && !toggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    /* ===============================
       MOBILE SLIDER CORE
    =============================== */
    function initMobileSlider({
        container,
        dots,
        interval = 3500,
        withProgress = false
    }) {
        const slider = document.querySelector(container);
        const dotsWrap = document.querySelector(dots);

        if (!slider || !dotsWrap || window.innerWidth > 768) return;

        const slides = [...slider.children];
        let index = 0;
        let autoSlide;

        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');

        /* CREATE DOTS */
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => moveTo(i));
            dotsWrap.appendChild(dot);
        });

        const dotsArr = [...dotsWrap.children];

        function updateUI(i) {
            dotsArr.forEach(d => d.classList.remove('active'));
            dotsArr[i].classList.add('active');

            if (withProgress && progressFill && progressText) {
                const percent = ((i + 1) / slides.length) * 100;
                progressFill.style.width = percent + '%';
                progressText.textContent = `Step ${i + 1} of ${slides.length}`;
            }
        }

        function moveTo(i) {
            index = i;
            slider.scrollTo({
                left: slides[i].offsetLeft,
                behavior: 'smooth'
            });
            updateUI(i);
        }

        function startAutoSlide() {
            autoSlide = setInterval(() => {
                index = (index + 1) % slides.length;
                moveTo(index);
            }, interval);
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        /* SWIPE DETECTION */
        slider.addEventListener('scroll', () => {
            const slideWidth = slides[0].offsetWidth;
            const current = Math.round(slider.scrollLeft / slideWidth);
            if (current !== index) {
                index = current;
                updateUI(index);
            }
        });

        slider.addEventListener('touchstart', stopAutoSlide);
        slider.addEventListener('touchend', startAutoSlide);

        updateUI(0);
        startAutoSlide();
    }

    /* ===============================
       INIT ALL SLIDERS
    =============================== */
    initMobileSlider({
        container: '.gallery-grid',
        dots: '.gallery-dots',
        interval: 3000
    });

    initMobileSlider({
        container: '.reviews-grid',
        dots: '.reviews-dots',
        interval: 4000
    });

    initMobileSlider({
        container: '.process-grid',
        dots: '.process-dots',
        interval: 3500,
        withProgress: true
    });

});
