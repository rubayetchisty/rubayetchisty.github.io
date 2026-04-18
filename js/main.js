/**
 * Rezume Template - Main JavaScript
 * Bootstrap 5.3.8 + Vanilla JS
 */

// ========================================
// Initialize AOS immediately (script at body bottom)
// ========================================
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

window.addEventListener('load', function() {
  AOS.refresh();
});

// ========================================
// Main Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  initDarkMode();
  initSmoothScroll();
  initNavbarState();
  initPortfolioFilter();
  initLightbox();
  initMobileMenuClose();
});

// ========================================
// Smooth Scroll Navigation
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerOffset = 80;
        var elementPosition = target.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash
        history.pushState(null, null, targetId);
      }
    });
  });
}

// ========================================
// Navbar State (sticky on scroll)
// ========================================
function initNavbarState() {
  var navbar = document.querySelector('.site-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 200) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled', 'awake');
    }
  });
}

// ========================================
// Portfolio Filter (Isotope)
// ========================================
function initPortfolioFilter() {
  var grid = document.querySelector('.grid');
  if (!grid || typeof Isotope === 'undefined') return;

  // Wait for images to load
  imagesLoaded(grid, function() {
    var iso = new Isotope(grid, {
      itemSelector: '.all',
      percentPosition: true,
      masonry: {
        columnWidth: '.all'
      }
    });

    // Filter buttons
    var filterButtons = document.querySelectorAll('.filters ul li');
    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Update active state
        filterButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
        this.classList.add('active');

        // Apply filter
        var filterValue = this.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
      });
    });
  });
}

// ========================================
// Lightbox (GLightbox)
// ========================================
function initLightbox() {
  if (typeof GLightbox === 'undefined') return;

  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true
  });

  // Make clicking anywhere on portfolio item open lightbox
  document.querySelectorAll('.single-portfolio .p-inner').forEach(function(inner) {
    inner.addEventListener('click', function() {
      var link = this.closest('.single-portfolio').querySelector('.glightbox');
      if (link) link.click();
    });
  });
}

// ========================================
// Mobile Menu Close on Link Click
// ========================================
function initMobileMenuClose() {
  var navToggler = document.querySelector('.navbar-toggler');
  var navCollapse = document.querySelector('.navbar-collapse');

  if (!navToggler || !navCollapse) return;

  // Close menu when clicking nav links
  document.querySelectorAll('.navbar-nav a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (navCollapse.classList.contains('show')) {
        navToggler.click();
      }
    });
  });
}

// ========================================
// Dark Mode Toggle
// ========================================
function initDarkMode() {
  var toggle = document.getElementById('darkModeToggle');
  var html = document.documentElement;

  // Check saved preference or system preference
  var savedTheme = localStorage.getItem('theme');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    html.setAttribute('data-bs-theme', savedTheme);
    updateIcon(savedTheme === 'dark');
  } else if (systemDark) {
    html.setAttribute('data-bs-theme', 'dark');
    updateIcon(true);
  }

  function updateIcon(isDark) {
    // CSS handles icon swap via [data-bs-theme] attribute
  }

  if (toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      var currentTheme = html.getAttribute('data-bs-theme');
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme === 'dark');
    });
  }
}
