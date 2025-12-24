
    // Mobile Menu Toggle
        document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
            document.querySelector('.mobile-menu').classList.toggle('active');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                // Close mobile menu after click
                document.querySelector('.mobile-menu').classList.remove('active');
            });
        });

        // Read More Toggle Function
        function toggleText(id, btn) {
            const el = document.getElementById(id);
            el.classList.toggle("expanded");
            btn.innerText = el.classList.contains("expanded") ? "View Less" : "View More";
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const mobileMenu = document.querySelector('.mobile-menu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (!mobileMenu.contains(event.target) && !toggle.contains(event.target)) {
                mobileMenu.classList.remove('active');
            }
        });

