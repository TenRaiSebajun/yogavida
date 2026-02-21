/* ============================================================
   YOGAVIDA WELLNESS — Main JavaScript
   Handles: Nav, Mobile Menu, Scroll Reveals, Parallax, Accordion
   ============================================================ */

(function () {
  'use strict';

  // ── Navigation: scroll behavior ──
  const nav = document.querySelector('.nav');
  if (nav) {
    const isTransparent = nav.classList.contains('nav--transparent');

    const handleNavScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    };

    // Only add transparent-to-solid behavior on pages with transparent nav
    if (isTransparent) {
      window.addEventListener('scroll', handleNavScroll, { passive: true });
      handleNavScroll();
    } else {
      nav.classList.add('nav--scrolled');
    }
  }


  // ── Mobile Menu ──
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.contains('nav__toggle--open');
      toggle.classList.toggle('nav__toggle--open');
      mobileMenu.classList.toggle('nav__mobile--open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('nav__toggle--open');
        mobileMenu.classList.remove('nav__mobile--open');
        document.body.style.overflow = '';
      });
    });
  }


  // ── Scroll Reveal (IntersectionObserver) ──
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }


  // ── Parallax on Hero Images ──
  const heroImages = document.querySelectorAll('.hero__bg img, .page-hero .hero__bg img');

  if (heroImages.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;

    const handleParallax = () => {
      heroImages.forEach(img => {
        const section = img.closest('.hero, .page-hero');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const scrolled = -rect.top * 0.2;
        img.style.transform = `translateY(${scrolled}px) scale(1.05)`;
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(handleParallax);
        ticking = true;
      }
    }, { passive: true });
  }


  // ── Accordion / FAQ ──
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    const body = item.querySelector('.accordion__body');

    if (trigger && body) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('accordion__item--open');

        // Close all others
        accordionItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('accordion__item--open');
            const otherBody = other.querySelector('.accordion__body');
            if (otherBody) otherBody.style.maxHeight = '0';
          }
        });

        // Toggle current
        item.classList.toggle('accordion__item--open');
        body.style.maxHeight = isOpen ? '0' : body.scrollHeight + 'px';
      });
    }
  });


  // ── Smooth Anchor Scrolling ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height-scrolled')) || 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── Active Nav Link ──
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link, .nav__dropdown-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = new URL(href, window.location.origin).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('nav__link--active');
    }
  });

})();
