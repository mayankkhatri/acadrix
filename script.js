/**
 * Acadrix Global Landing Page Scripts
 * Premium client-side interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Menu ---
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }

  // --- Dropdown Interactions (for Mobile/Tablet) ---
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    if (link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // --- Header Scroll Effect ---
  const mainHeader = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // --- Stats Counter Animation ---
  const statsSection = document.getElementById('stats-section');
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(easedProgress * target);
      
      // Format number with local separator (commas)
      const formattedValue = currentValue.toLocaleString();
      element.textContent = formattedValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target.toLocaleString() + suffix;
      }
    };

    // Reset stats text to 0 before starting count animation
    element.textContent = "0" + suffix;
    requestAnimationFrame(updateCount);
  };

  if (statsSection && counters.length > 0) {
    const triggerAnimation = () => {
      if (!animated) {
        counters.forEach(counter => countUp(counter));
        animated = true;
      }
    };

    // 1. Intersection Observer Trigger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(statsSection);

    // 2. Fallback check for load & scroll
    const checkVisibility = () => {
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        triggerAnimation();
        window.removeEventListener('scroll', checkVisibility);
        window.removeEventListener('resize', checkVisibility);
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
  }

  // --- University Partners Slider ---
  const partnerSlider = document.querySelector('.partners-slider');
  const btnPrev = document.querySelector('.partners-control.prev');
  const btnNext = document.querySelector('.partners-control.next');

  if (partnerSlider && btnPrev && btnNext) {
    const scrollAmount = 300;
    
    btnPrev.addEventListener('click', () => {
      partnerSlider.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    btnNext.addEventListener('click', () => {
      partnerSlider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });
  }

  // --- Book a Free Counselling Modal ---
  const modal = document.getElementById('counselling-modal');
  const btnOpenModals = document.querySelectorAll('.btn-counselling-trigger');
  const btnCloseModal = document.querySelector('.modal-close');
  const formModal = document.getElementById('counselling-form');

  const openModal = () => {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  btnOpenModals.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  if (formModal) {
    formModal.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple visual success confirmation
      const submitBtn = formModal.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Booked Successfully!';
        submitBtn.style.backgroundColor = '#10B981';
        submitBtn.style.color = '#FFFFFF';
        
        setTimeout(() => {
          closeModal();
          formModal.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
        }, 1500);
      }, 1500);
    });
  }

  // --- Video Testimonials Modal ---
  const videoModal = document.getElementById('video-modal');
  const videoCards = document.querySelectorAll('.video-card-play-trigger');
  const videoModalClose = document.querySelector('.video-modal-close');
  const videoIframe = document.getElementById('video-iframe');

  // Placeholder video list (using premium study abroad / ambient university videos)
  const videoUrls = [
    'https://www.youtube.com/embed/dQw4w9WgXcQ', // Rickroll or placeholder
    'https://www.youtube.com/embed/bip92569H4M',
    'https://www.youtube.com/embed/tgbNymZ7vqY',
    'https://www.youtube.com/embed/ScMzIvxBSi4'
  ];

  if (videoModal && videoIframe && videoModalClose) {
    videoCards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        // Set dynamic URL or use index placeholder
        const videoUrl = card.getAttribute('data-video-url') || videoUrls[index % videoUrls.length];
        videoIframe.setAttribute('src', videoUrl + '?autoplay=1&rel=0');
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeVideoModal = () => {
      videoModal.classList.remove('active');
      videoIframe.setAttribute('src', '');
      document.body.style.overflow = '';
    };

    videoModalClose.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // --- Country Destinations Slider / Carousel Indicators ---
  const destinationGrid = document.querySelector('.destinations-grid');
  const indicators = document.querySelectorAll('.destinations-indicators span');

  if (destinationGrid && indicators.length > 0) {
    destinationGrid.addEventListener('scroll', () => {
      const scrollFraction = destinationGrid.scrollLeft / (destinationGrid.scrollWidth - destinationGrid.clientWidth);
      const activeIndex = Math.min(
        Math.floor(scrollFraction * indicators.length),
        indicators.length - 1
      );
      
      indicators.forEach((ind, index) => {
        if (index === activeIndex) {
          ind.classList.add('active');
        } else {
          ind.classList.remove('active');
        }
      });
    });

    indicators.forEach((ind, index) => {
      ind.addEventListener('click', () => {
        const itemWidth = destinationGrid.scrollWidth / indicators.length;
        destinationGrid.scrollTo({
          left: itemWidth * index,
          behavior: 'smooth'
        });
        indicators.forEach(i => i.classList.remove('active'));
        ind.classList.add('active');
      });
    });
  }

  // --- Newsletter Form Submission ---
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button');
      
      if (input.value.trim() !== "") {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
        
        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fas fa-check"></i>';
          submitBtn.style.backgroundColor = '#10B981';
          input.value = '';
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
          }, 2000);
        }, 1200);
      }
    });
  }
});
