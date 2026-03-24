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
    navbar.style.background = "";
  }
});

// Active nav link
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

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

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
        return;
      }
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, pause);
        return;
      }
    }

    setTimeout(type, isDeleting ? speed / 2 : speed);
  }

  type();
}

// Initialize typewriter effects
setTimeout(() => {
  const heroName = document.getElementById("heroName");
  const heroTitle = document.getElementById("heroTitle");

  typeWriter(heroName, "Ardjouma Drissa OUEDRAOGO", 100);

  setTimeout(() => {
    const titles = ["Développeur Full Stack", "Pentesteur", "AI Enthusiast"];
    typeWriterRotating(heroTitle, titles, 100, 2000);
  }, 2500);
}, 1500);

// Profile image upload - Hero only
document
  .getElementById("heroProfileUpload")
  .addEventListener("click", function () {
    document.getElementById("heroProfileInput").click();
  });

document
  .getElementById("heroProfileInput")
  .addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("heroProfileImage").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

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
  const offset = currentSlide * 100;
  carousel.style.transform = `translateX(-${offset}%)`;

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
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

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => goToSlide(index));
});

// Auto-rotate carousel
setInterval(nextSlide, 5000);

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

  // Here you would normally send the data to a server
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

// Typing effect for hero title
const heroTitle = document.querySelector(".hero-title");
const originalText = heroTitle.textContent;
heroTitle.textContent = "";
let charIndex = 0;

function typeWriter() {
  if (charIndex < originalText.length) {
    heroTitle.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  }
}

setTimeout(typeWriter, 1500);

// Parallax effect
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-image i");
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
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
