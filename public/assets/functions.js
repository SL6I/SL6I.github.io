/*================================================
*
* Template name : Mone - Tailwind Personal Portfolio Template
* Version       : 1.0
* Author        : FlaTheme
* Author URL    : https://themeforest.net/user/flatheme
*
* Table of Contents :
* 1. Page Preloader
* 2. Cursor
* 3. Header Nav Menu
* 4. Scroll To Top
* 5. Sliders
* 6. Lightbox
* 7. Google Maps
* 8. Contact Form
*
================================================*/
"use strict";

/*===============================================
  1. Page Preloader
===============================================*/
var preloader = document.querySelector(".preloader");

if (preloader) {
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });
}


/*===============================================
  2. Cursor
===============================================*/
var customCursor = document.getElementById("cursor");

if (customCursor) {
  var cursor = document.getElementById("cursor");
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
  });

  var mouseElms = document.querySelectorAll("a, button, input, textarea, .cursor-link");

  mouseElms.forEach(function(mouseElm) {
    mouseElm.addEventListener("mouseenter", function() {
      cursor.classList.add("scale-[5]","opacity-15");
    });
    mouseElm.addEventListener("mouseleave", function() {
      cursor.classList.remove("scale-[5]","opacity-15");
    });
  });
}


/*===============================================
  3. Header Nav Menu
===============================================*/
var headerNav = document.querySelector(".nav-box");

if (headerNav) {
  var toggleBtn = document.getElementById("nav-toggle");

  // Menu Toggle
  toggleBtn.addEventListener("click", function() {
    if (headerNav.classList.contains("show")) {
      headerNav.classList.remove("show");
    } else {
      headerNav.classList.add("show");
    }
  });

  // Close Menu
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".nav-box, #nav-toggle")) {
      if (headerNav.classList.contains("show")) {
        headerNav.classList.remove("show");
      }
    }
  });
}


/*===============================================
  4. Scroll To Top
===============================================*/
var scrollTopBtn = document.querySelector(".scrolltotop");

if (scrollTopBtn) {
  // Show, Hide //
  window.addEventListener("scroll", function() {
    if (window.pageYOffset > 700) { // 700px from top
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });
  // on Click
  scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}


/*===============================================
  5. Sliders
===============================================*/
//
// Portfolio Slider //
//
var swiper = new Swiper(".portfolio-slider", {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: ".swiper-portfolio-next",
    prevEl: ".swiper-portfolio-prev",
  },
});

//
// Blog Slider //
//
var swiper = new Swiper(".blog-slider", {
  slidesPerView: 1,
  spaceBetween: 24,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: ".swiper-blog-next",
    prevEl: ".swiper-blog-prev",
  },
});

//
// Clients Slider //
//
var swiper = new Swiper(".clients-slider", {
  slidesPerView: 2,
  spaceBetween: 24,
  grabCursor: true,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});

//
// Testimonial Slider //
//
var swiper = new Swiper(".testimonial-slider", {
  slidesPerView: 1,
  spaceBetween: 40,
  pagination: {
    el: ".swiper-testimonial-pagination",
    type: "progressbar",
  },
});


/*===============================================
  6. Lightbox
===============================================*/
const lightbox = GLightbox();


/*===============================================
  7. Google Maps
===============================================*/
var mapCanvas = document.querySelectorAll(".gmap");

if (mapCanvas.length) {
  var initLatitude, initLongitude, map;

  for (var i = 0; i < mapCanvas.length; i++) {
    var m = mapCanvas[i];

    initLatitude = m.dataset.latitude;
    initLongitude = m.dataset.longitude;

    map = new GMaps({
      el: `#${m.id}`,
      lat: parseFloat(initLatitude),
      lng: parseFloat(initLongitude),
      zoom: 16,
      scrollwheel: false,
      styles: [
        /* style your map at https://snazzymaps.com/editor and paste JSON here */
      ]
    });

    map.addMarker({
      lat: parseFloat(initLatitude),
      lng: parseFloat(initLongitude)
    });
  }
}


/*===============================================
  8. Contact Form
===============================================*/
const contactForm = document.getElementById("contactform");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    fetch("assets/php/contact-form.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success") {
        document.getElementById("success").classList.add("show-result"); // Show Success Message
        contactForm.reset(); // Reset the form
      } else {
        document.getElementById("error").classList.add("show-result"); // Show Error Message
      }
    })
    .catch(error => {
      document.getElementById("error").classList.add("show-result"); // Show Error Message
      console.error("There was a problem with the fetch operation:", error);
    });
  });
}