/* ============================================
   CANEM ARCA | SCRIPT
   Built by OTM Web Design
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Active nav state ---------- */
  const currentPage = document.body.getAttribute('data-page');
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-nav') === currentPage) {
      link.classList.add('is-active');
    }
  });

  /* ---------- Nav scroll shadow ---------- */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const onScroll = () => {
      if (window.pageYOffset > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Hamburger ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Programs carousel ---------- */
  const track = document.getElementById('programsTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && prevBtn && nextBtn && dotsContainer) {
    const cards = track.querySelectorAll('.program-card');
    let current = 0;
    let visible = 3;
    let autoTimer;

    function getVisible() {
      const width = window.innerWidth;
      if (width <= 900) return 1;
      if (width <= 1100) return 2;
      return 3;
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      const total = cards.length;
      const maxIndex = Math.max(0, total - visible);
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      const total = cards.length;
      const maxIndex = Math.max(0, total - visible);
      current = Math.max(0, Math.min(index, maxIndex));
      const cardStyle = getComputedStyle(cards[0]);
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const cardWidth = cards[0].offsetWidth + gap;
      track.style.transform = `translateX(-${current * cardWidth}px)`;
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function next() {
      const maxIndex = Math.max(0, cards.length - visible);
      goTo(current >= maxIndex ? 0 : current + 1);
    }

    function prev() {
      const maxIndex = Math.max(0, cards.length - visible);
      goTo(current <= 0 ? maxIndex : current - 1);
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, 5000);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    prevBtn.addEventListener('click', () => { prev(); startAuto(); });
    nextBtn.addEventListener('click', () => { next(); startAuto(); });

    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);

    // Touch support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
      startAuto();
    });

    // Resize handling
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newVisible = getVisible();
        if (newVisible !== visible) {
          visible = newVisible;
          current = 0;
          buildDots();
          goTo(0);
        } else {
          goTo(current);
        }
      }, 150);
    });

    // Init
    visible = getVisible();
    buildDots();
    startAuto();
  }

  /* ---------- Form validation & UX ---------- */
  const bookForm = document.getElementById('consultation-form');
  if (bookForm) {
    bookForm.addEventListener('submit', function (e) {
      const required = bookForm.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#8b3a1f';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        e.preventDefault();
        const first = bookForm.querySelector('[required]:invalid');
        if (first) {
          first.focus();
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        const submitBtn = bookForm.querySelector('.form-submit');
        if (submitBtn) {
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
        }
      }
    });

    bookForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) input.style.borderColor = '';
      });
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 82;
        const jumpNavHeight = document.querySelector('.jump-nav') ? 60 : 0;
        const offset = navHeight + jumpNavHeight + 12;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

});
