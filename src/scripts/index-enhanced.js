// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Loader
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").classList.add("hidden");
  }, 1000);
});

// Particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 20 + "s";
    particle.style.animationDuration = 15 + Math.random() * 10 + "s";
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
  }
});

// Hero profile image upload - REMOVED
// document.getElementById("heroProfileUpload").addEventListener("click", function () {
//   document.getElementById("heroProfileInput").click();
// });

// document.getElementById("heroProfileInput").addEventListener("change", function (e) {
//   const file = e.target.files[0];
//   if (file && file.type.startsWith("image/")) {
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       document.getElementById("heroProfileImage").src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   }
// });

// Carousel functionality - Updated for grid layout
const carousel = document.getElementById("projectCarousel");
const slides = carousel.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.querySelectorAll(".carousel-indicator");
let currentSlide = 0;
const slidesPerView = 4;
const totalSlides = Math.ceil(slides.length / slidesPerView);

function updateCarousel() {
  const offset = currentSlide * 25;
  carousel.style.transform = `translateX(-${offset}%)`;

  // Update indicators - create indicators dynamically if needed
  const indicatorsContainer = document.getElementById("carouselIndicators");
  if (indicatorsContainer) {
    // Clear existing indicators
    indicatorsContainer.innerHTML = "";
    
    // Create new indicators
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("div");
      indicator.className = "carousel-indicator";
      if (i === currentSlide) indicator.classList.add("active");
      indicator.addEventListener("click", () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

// Back to top button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Skill bars animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const skillObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillFills = entry.target.querySelectorAll(".skill-fill");
      skillFills.forEach((fill) => {
        const width = fill.style.width;
        fill.style.width = "0%";
        setTimeout(() => {
          fill.style.width = width;
        }, 200);
      });
    }
  });
}, observerOptions);

const aboutSection = document.querySelector(".about-section");
if (aboutSection) {
  skillObserver.observe(aboutSection);
}

// Contact form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Here you would normally send data to a server
  console.log("Form submitted:", formData);

  // Show success message
  const form = this;
  const originalContent = form.innerHTML;
  form.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                    <h3 class="mt-3">Message envoyé!</h3>
                    <p class="text-muted">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
                    <button type="button" class="btn btn-outline-light mt-3" onclick="resetForm()">Envoyer un autre message</button>
                </div>
            `;
});

function resetForm() {
  const form = document.getElementById("contactForm");
  form.reset();
  location.reload(); // Simple reset for demo
}

// Typewriter effect for name and title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Typewriter effect for rotating titles
function typeWriterRotating(element, texts, speed = 100, pause = 2000) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isTyping = false;
  
  function type() {
    if (isTyping) return;
    isTyping = true;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      if (charIndex > 0) {
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(() => {
          isTyping = false;
          type();
        }, speed / 2);
      } else {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(() => {
          isTyping = false;
          type();
        }, 500);
      }
    } else {
      if (charIndex < currentText.length) {
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(() => {
          isTyping = false;
          type();
        }, speed);
      } else {
        isDeleting = true;
        setTimeout(() => {
          isTyping = false;
          type();
        }, pause);
      }
    }
  }
  
  type();
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel
  updateCarousel();
  
  // Set up carousel event listeners
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);
  
  // Auto-rotate carousel
  setInterval(nextSlide, 5000);
  
  // Close mobile dropdown when clicking on nav links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Check if navbar is collapsed (mobile view)
      if (window.innerWidth < 992) {
        // Close the collapsed navbar
        navbarCollapse.classList.remove('show');
        // Remove the 'aria-expanded' attribute
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Initialize typewriter effects
  setTimeout(() => {
    const heroName = document.getElementById("heroName");
    const heroTitle = document.getElementById("heroTitle");
    
    typeWriter(heroName, "Ardjouma Drissa OUEDRAOGO", 100);
    
    setTimeout(() => {
      const titles = ["Développeur Web et Mobile", "Pentesteur", "AI Enthusiast"];
      typeWriterRotating(heroTitle, titles, 100, 2000);
    }, 2500);
  }, 1500);
  
  // Mobile carousel scroll handling
  if (window.innerWidth <= 576) {
    const carouselContainer = document.querySelector('.carousel-container');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (carouselContainer && indicatorsContainer) {
      carouselContainer.addEventListener('scroll', function() {
        const slideWidth = carouselContainer.offsetWidth;
        const scrollLeft = carouselContainer.scrollLeft;
        const currentSlideIndex = Math.round(scrollLeft / slideWidth);
        
        // Update indicators
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentSlideIndex);
        });
      });
    }
  }
});

// Add hover effect to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});
