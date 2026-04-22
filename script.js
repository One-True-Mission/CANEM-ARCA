/* ============================================
   CANEM ARCA - SCRIPT
   Built by OTM Web Design
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    /* ============================================
       HAMBURGER MENU
       ============================================ */
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        mobileMenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* ============================================
       NAV SCROLL EFFECT
       ============================================ */
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (nav) {
            if (currentScroll > 50) {
                nav.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.06)';
            } else {
                nav.style.boxShadow = 'none';
            }
        }

        lastScroll = currentScroll;
    });

    /* ============================================
       ACTIVE NAV LINK HIGHLIGHTING
       ============================================ */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu a');

    navLinks.forEach(function(link) {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ============================================
       FORM VALIDATION & UX
       ============================================ */
    const bookForm = document.querySelector('#consultation-form');

    if (bookForm) {
        bookForm.addEventListener('submit', function(e) {
            const requiredFields = bookForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#a84a28';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                e.preventDefault();
                const firstEmpty = bookForm.querySelector('[required]:invalid, [required][value=""]');
                if (firstEmpty) {
                    firstEmpty.focus();
                    firstEmpty.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                // Disable submit button to prevent double-submission
                const submitBtn = bookForm.querySelector('.form-submit');
                if (submitBtn) {
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                }
            }
        });

        // Clear error styling on input
        const formInputs = bookForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                if (input.value.trim()) {
                    input.style.borderColor = '';
                }
            });
        });
    }

    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 90;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
