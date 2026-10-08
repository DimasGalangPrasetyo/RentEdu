// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// Mobile Menu Toggle
// ===========================
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===========================
// Active Nav Link on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// ===========================
// Product Filter
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    productCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===========================
// FAQ Accordion
// ===========================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all
    faqItems.forEach(i => i.classList.remove('active'));

    // Open clicked (if wasn't active)
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ===========================
// Contact Form Handler
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Build WhatsApp message
  const waMessage = `Halo RentEdu!%0A%0A` +
    `Nama: ${name}%0A` +
    `No. HP: ${phone}%0A` +
    `Keperluan: ${subject}%0A` +
    `Pesan: ${message}`;

  window.open(`https://wa.me/6285219362314?text=${waMessage}`, '_blank');

  // Show success feedback
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
  btn.style.background = '#10b981';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});

// ===========================
// Back to Top
// ===========================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// Scroll Animations (Intersection Observer)
// ===========================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.feature-card, .product-card, .bundle-card, .step-card, .testimonial-card, .faq-item, .contact-card'
  );

  animatedElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  animatedElements.forEach(el => observer.observe(el));
}

// ===========================
// Counter Animation
// ===========================
function animateCounters() {
  const stats = document.querySelectorAll('.stat-item strong');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const text = target.textContent;
          const match = text.match(/([\d,.]+)/);

          if (match) {
            const finalValue = parseInt(match[1].replace(/[,.]/g, ''));
            const suffix = text.replace(match[1], '').trim();
            const prefix = text.substring(0, text.indexOf(match[1]));
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
              const current = Math.floor(eased * finalValue);

              target.textContent = prefix + current.toLocaleString('id-ID') + suffix;

              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                target.textContent = text;
              }
            }

            requestAnimationFrame(update);
          }

          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(stat => observer.observe(stat));
}

// ===========================
// Fade In Animation Keyframes
// ===========================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ===========================
// Init
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  animateCounters();
});

