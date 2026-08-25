/**
 * PAUL'S SPARK (PS) - Main Interactive Logic & Analytics Data Engine
 * High-performance, lightweight vanilla JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== 1. DEVICE IDENTIFICATION & OPTIMIZATION ====================
  const updateDeviceState = () => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileWidth = window.innerWidth <= 992;
    const isSmallMobile = window.innerWidth <= 480;

    document.documentElement.setAttribute('data-device', isMobileWidth ? 'mobile' : 'desktop');
    document.documentElement.setAttribute('data-touch', isTouch ? 'true' : 'false');
    document.documentElement.setAttribute('data-screen', isSmallMobile ? 'small-mobile' : isMobileWidth ? 'tablet-mobile' : 'desktop');
  };

  updateDeviceState();
  window.addEventListener('resize', updateDeviceState, { passive: true });

  // ==================== 2. NAVBAR SCROLL BEHAVIOR ====================
  const siteHeader = document.getElementById('site-header');
  
  const handleScroll = () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==================== 3. MOBILE NAVIGATION DRAWER ====================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-footer a');

  const toggleMobileMenu = (open) => {
    const shouldOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    if (shouldOpen) {
      hamburgerBtn.classList.add('open');
      mobileDrawer.classList.add('open');
      mobileBackdrop.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      hamburgerBtn.classList.remove('open');
      mobileDrawer.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // ==================== 4. ACTIVE NAV LINK TRACKING (SCROLL SPY) ====================
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

  const updateActiveNavLink = (activeId) => {
    desktopNavLinks.forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    drawerLinks.forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNavLink(entry.target.id);
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => navObserver.observe(section));

  // ==================== 5. INTERACTIVE GROWTH CHART ENGINE ====================
  const chartTabs = document.querySelectorAll('.chart-tab-btn');
  const chartAreaPath = document.getElementById('chart-area-path');
  const chartLinePath = document.getElementById('chart-line-path');
  const chartLineSecondary = document.getElementById('chart-line-secondary');
  const chartLinePurple = document.getElementById('chart-line-purple');

  const CHART_DATA_PRESETS = {
    combined: {
      line: 'M 100 180 C 180 165, 235 140, 370 110 C 505 80, 640 50, 760 30',
      area: 'M 100 180 C 180 165, 235 140, 370 110 C 505 80, 640 50, 760 30 L 760 185 L 100 185 Z',
      secondary: 'M 100 185 C 180 172, 235 150, 370 125 C 505 95, 640 68, 760 45',
      purple: 'M 100 188 C 180 178, 235 160, 370 140 C 505 115, 640 85, 760 60',
      color: '#f5c84b',
      areaGrad: 'url(#goldAreaGrad)'
    },
    quantam: {
      line: 'M 100 185 C 180 155, 235 120, 370 85 C 505 55, 640 32, 760 20',
      area: 'M 100 185 C 180 155, 235 120, 370 85 C 505 55, 640 32, 760 20 L 760 185 L 100 185 Z',
      secondary: 'M 100 188 C 180 170, 235 140, 370 105 C 505 75, 640 48, 760 30',
      purple: 'M 100 190 C 180 182, 235 170, 370 150 C 505 130, 640 105, 760 80',
      color: '#f5c84b',
      areaGrad: 'url(#goldAreaGrad)'
    },
    bluewhale: {
      line: 'M 100 185 C 180 170, 235 145, 370 115 C 505 80, 640 45, 760 25',
      area: 'M 100 185 C 180 170, 235 145, 370 115 C 505 80, 640 45, 760 25 L 760 185 L 100 185 Z',
      secondary: 'M 100 188 C 180 175, 235 155, 370 130 C 505 100, 640 70, 760 48',
      purple: 'M 100 185 C 180 165, 235 135, 370 95 C 505 60, 640 35, 760 18',
      color: '#00d2ff',
      areaGrad: 'url(#cyanAreaGrad)'
    }
  };

  chartTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const presetKey = tab.getAttribute('data-chart');
      const data = CHART_DATA_PRESETS[presetKey];
      if (data && chartAreaPath && chartLinePath) {
        chartLinePath.setAttribute('d', data.line);
        chartLinePath.setAttribute('stroke', data.color);
        chartAreaPath.setAttribute('d', data.area);
        chartAreaPath.setAttribute('fill', data.areaGrad);
        if (chartLineSecondary) {
          chartLineSecondary.setAttribute('d', data.secondary);
        }
        if (chartLinePurple) {
          chartLinePurple.setAttribute('d', data.purple);
        }
      }
    });
  });

  // ==================== 6. DONUT / PIE CHART INTERACTIVITY ====================
  const donutSegments = document.querySelectorAll('.donut-segment');
  const donutCenterNum = document.querySelector('.donut-center-num');
  const donutCenterLabel = document.querySelector('.donut-center-label');
  const donutLegendRows = document.querySelectorAll('.donut-legend-row');

  const DONUT_DATA = [
    { val: '35%', label: 'Social & Viral' },
    { val: '25%', label: 'Brand Strategy' },
    { val: '20%', label: 'Game Launches' },
    { val: '12%', label: 'Influencer PR' },
    { val: '8%', label: 'Retail Funnel' }
  ];

  donutSegments.forEach((segment, idx) => {
    segment.addEventListener('mouseenter', () => {
      if (DONUT_DATA[idx] && donutCenterNum && donutCenterLabel) {
        donutCenterNum.textContent = DONUT_DATA[idx].val;
        donutCenterLabel.textContent = DONUT_DATA[idx].label;
      }
      donutLegendRows.forEach((row, rIdx) => {
        row.style.opacity = rIdx === idx ? '1' : '0.4';
      });
    });

    segment.addEventListener('mouseleave', () => {
      if (donutCenterNum && donutCenterLabel) {
        donutCenterNum.textContent = '100%';
        donutCenterLabel.textContent = 'Optimized';
      }
      donutLegendRows.forEach(row => {
        row.style.opacity = '1';
      });
    });
  });

  // ==================== 7. SCROLL REVEAL ANIMATIONS ====================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==================== 8. INTERACTIVE CAMPAIGN INQUIRY FORM & CHIP SELECTOR ====================
  const inquiryForm = document.getElementById('campaign-inquiry-form');
  const chipButtons = document.querySelectorAll('.chip-select-btn');
  const selectedServiceInput = document.getElementById('selected-service-input');
  const formStatusMsg = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('inquiry-submit-btn');

  // Interactive Chip Selection
  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      chipButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const serviceName = btn.getAttribute('data-service');
      if (selectedServiceInput) {
        selectedServiceInput.value = serviceName;
      }
    });
  });

  // Inquiry Form Submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const emailInput = document.getElementById('client-email');
      const brandInput = document.getElementById('client-brand');
      const messageInput = document.getElementById('client-message');
      const selectedService = selectedServiceInput ? selectedServiceInput.value : 'General Marketing';

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const brand = brandInput ? brandInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Simple validation
      if (!name || !email || !message) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg error';
          formStatusMsg.textContent = 'Please fill out all required fields (Name, Email, and Project Details).';
          formStatusMsg.style.display = 'block';
        }
        return;
      }

      // Basic email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg error';
          formStatusMsg.textContent = 'Please enter a valid email address.';
          formStatusMsg.style.display = 'block';
        }
        return;
      }

      // Animated Submitting State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Processing Inquiry...</span> <span style="animation: spin 1s linear infinite;">⚡</span>';
      }

      setTimeout(() => {
        if (formStatusMsg) {
          formStatusMsg.className = 'form-status-msg success';
          formStatusMsg.innerHTML = `✨ <strong>Thank you, ${name}!</strong> Your inquiry regarding <em>${selectedService}</em> for <em>${brand || 'your brand'}</em> has been dispatched. Pradipta Pal &amp; the Paul's Spark team will reach out at <strong>${email}</strong> within 24 hours.`;
          formStatusMsg.style.display = 'block';
        }

        // Reset form
        inquiryForm.reset();
        chipButtons.forEach((b, i) => {
          if (i === 0) b.classList.add('active');
          else b.classList.remove('active');
        });
        if (selectedServiceInput) selectedServiceInput.value = 'Digital Marketing';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Campaign Inquiry</span> <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
        }

        // Auto-scroll status into view gently if needed
        formStatusMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 700);
    });
  }

  // Keyboard Navigation: Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    }
  });

  // ==================== 9. HERO SPARK & ATMOSPHERIC CANVAS ====================
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isHeroVisible = true;
    let width, height;

    const particles = [];
    const getParticleCount = () => (window.innerWidth < 768 ? 20 : 45);

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    class SparkParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 2 + 0.6;
        this.speedY = Math.random() * 0.6 + 0.25;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.65 + 0.2;
        this.fadeRate = Math.random() * 0.0025 + 0.001;
        this.color = Math.random() > 0.3 ? '#f5c84b' : '#ffffff';
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fadeRate;

        if (this.opacity <= 0 || this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#f5c84b';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      const p = new SparkParticle();
      p.y = Math.random() * height;
      particles.push(p);
    }

    const animateParticles = () => {
      if (!isHeroVisible) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    // Hero Visibility Observer to save resources
    const heroSection = document.getElementById('home');
    if ('IntersectionObserver' in window && heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible) {
            cancelAnimationFrame(animationFrameId);
            animateParticles();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      }, { threshold: 0.05 });

      heroObserver.observe(heroSection);
    } else {
      animateParticles();
    }
  }
});
