/*================================================
*
* Complete Plugin Initialization for SPA Mode
* Handles all plugin initialization for Astro View Transitions
* Replaces the original functions.js with SPA-aware functionality
*
================================================*/
"use strict";

// Initialize page preloader (runs once on initial load)
function initializePreloader() {
  var preloader = document.querySelector(".preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      document.body.classList.add("loaded");
    });
    console.log('Page preloader initialized');
  }
}

// Function to initialize all plugins
function initializePlugins() {
  console.log('Initializing plugins...');
  
  // 1. Initialize GLightbox
  if (typeof GLightbox !== 'undefined') {
    // Destroy existing instance if it exists
    if (window.lightboxInstance) {
      try {
        window.lightboxInstance.destroy();
      } catch (e) {
        console.log('GLightbox destroy error (ignored):', e);
      }
    }
    
    // Create new instance
    window.lightboxInstance = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: false,
      zoomable: true,
      draggable: true,
      openEffect: 'zoom',
      closeEffect: 'zoom'
    });
    console.log('GLightbox initialized');
  }

  // 2. Initialize Swiper instances
  if (typeof Swiper !== 'undefined') {
    // Destroy existing instances
    if (window.swiperInstances) {
      window.swiperInstances.forEach(instance => {
        try {
          instance.destroy(true, true);
        } catch (e) {
          console.log('Swiper destroy error (ignored):', e);
        }
      });
    }
    window.swiperInstances = [];

    // Portfolio Slider
    const portfolioSlider = document.querySelector('.portfolio-slider');
    if (portfolioSlider) {
      const portfolioSwiper = new Swiper('.portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
          640: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
        },
        navigation: {
          nextEl: '.swiper-portfolio-next',
          prevEl: '.swiper-portfolio-prev',
        },
      });
      window.swiperInstances.push(portfolioSwiper);
      console.log('Portfolio Swiper initialized');
    }

    // Blog Slider
    const blogSlider = document.querySelector('.blog-slider');
    if (blogSlider) {
      const blogSwiper = new Swiper('.blog-slider', {
        slidesPerView: 1,
        spaceBetween: 24,
        breakpoints: {
          640: { slidesPerView: 1, spaceBetween: 24 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
        },
        navigation: {
          nextEl: '.swiper-blog-next',
          prevEl: '.swiper-blog-prev',
        },
      });
      window.swiperInstances.push(blogSwiper);
      console.log('Blog Swiper initialized');
    }

    // Clients Slider
    const clientsSlider = document.querySelector('.clients-slider');
    if (clientsSlider) {
      const clientsSwiper = new Swiper('.clients-slider', {
        slidesPerView: 2,
        spaceBetween: 24,
        grabCursor: true,
        breakpoints: {
          640: { slidesPerView: 3, spaceBetween: 24 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 5, spaceBetween: 50 },
        },
      });
      window.swiperInstances.push(clientsSwiper);
      console.log('Clients Swiper initialized');
    }

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
      const testimonialSwiper = new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 40,
        pagination: {
          el: '.swiper-testimonial-pagination',
          type: 'progressbar',
        },
      });
      window.swiperInstances.push(testimonialSwiper);
      console.log('Testimonial Swiper initialized');
    }
  }

  // 3. Initialize Header Nav Menu
  const headerNav = document.querySelector('.nav-box');
  if (headerNav) {
    const toggleBtn = document.getElementById('nav-toggle');
    
    // Remove existing event listeners by cloning the element
    if (toggleBtn) {
      const newToggleBtn = toggleBtn.cloneNode(true);
      toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
      
      // Menu Toggle
      newToggleBtn.addEventListener('click', function() {
        if (headerNav.classList.contains('show')) {
          headerNav.classList.remove('show');
        } else {
          headerNav.classList.add('show');
        }
      });
    }

    // Close Menu on outside click
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-box, #nav-toggle')) {
        if (headerNav.classList.contains('show')) {
          headerNav.classList.remove('show');
        }
      }
    });
    console.log('Header nav initialized');
  }

  // 4. Initialize Scroll To Top
  const scrollTopBtn = document.querySelector('.scrolltotop');
  if (scrollTopBtn) {
    // Remove existing event listeners
    const newScrollBtn = scrollTopBtn.cloneNode(true);
    scrollTopBtn.parentNode.replaceChild(newScrollBtn, scrollTopBtn);

    // Show/Hide on scroll
    const handleScroll = function() {
      if (window.pageYOffset > 700) {
        newScrollBtn.classList.add('show');
      } else {
        newScrollBtn.classList.remove('show');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // On click scroll to top
    newScrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
    console.log('Scroll to top initialized');
  }

  // 5. Initialize Contact Form
  const contactForm = document.getElementById('contactform');
  if (contactForm) {
    // Remove existing event listeners
    const newContactForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newContactForm, contactForm);

    newContactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      var formData = new FormData(this);
      
      fetch('/assets/php/contact-form.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const successEl = document.getElementById('success');
          if (successEl) successEl.classList.add('show-result');
          newContactForm.reset();
        } else {
          const errorEl = document.getElementById('error');
          if (errorEl) errorEl.classList.add('show-result');
        }
      })
      .catch(error => {
        const errorEl = document.getElementById('error');
        if (errorEl) errorEl.classList.add('show-result');
        console.error('Contact form error:', error);
      });
    });
    console.log('Contact form initialized');
  }

  // 6. Initialize Custom Cursor (if enabled)
  const customCursor = document.getElementById('cursor');
  if (customCursor) {
    document.addEventListener('mousemove', function(e) {
      customCursor.style.left = e.pageX + 'px';
      customCursor.style.top = e.pageY + 'px';
    });

    const mouseElms = document.querySelectorAll('a, button, input, textarea, .cursor-link');
    mouseElms.forEach(function(mouseElm) {
      mouseElm.addEventListener('mouseenter', function() {
        customCursor.classList.add('scale-[5]', 'opacity-15');
      });
      mouseElm.addEventListener('mouseleave', function() {
        customCursor.classList.remove('scale-[5]', 'opacity-15');
      });
    });
    console.log('Custom cursor initialized');
  }
}

// Initialize plugins on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize preloader only once on initial load
  initializePreloader();
  // Initialize other plugins
  setTimeout(initializePlugins, 100);
});

// Reinitialize plugins after view transitions
document.addEventListener('astro:after-swap', function() {
  console.log('Page swapped, reinitializing plugins...');
  setTimeout(initializePlugins, 100);
});

// Also handle the page load event for initial load
document.addEventListener('astro:page-load', function() {
  console.log('Page loaded, reinitializing plugins...');
  setTimeout(initializePlugins, 100);
});
