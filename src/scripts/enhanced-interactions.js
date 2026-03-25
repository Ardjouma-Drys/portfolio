// Enhanced Interactive Features
class EnhancedPortfolio {
  constructor() {
    this.initCursor();
    this.initProgressBar();
    this.initScrollIndicator();
    this.initMouseTrail();
    this.initParallax();
    this.initScrollEffects();
    this.initKeyboardNavigation();
    this.initSearch();
    this.initThemeToggle();
  }

  // Custom Cursor
  initCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      followerX += (mouseX - followerX) * 0.05;
      followerY += (mouseY - followerY) * 0.05;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .btn-hero');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  // Progress Bar
  initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
  }

  // Scroll Indicator
  initScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
    document.body.appendChild(indicator);

    const updateIndicator = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 100) {
        indicator.style.opacity = '0';
        indicator.style.pointerEvents = 'none';
      } else {
        indicator.style.opacity = '0.7';
        indicator.style.pointerEvents = 'auto';
      }
    };

    window.addEventListener('scroll', updateIndicator);
    indicator.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mouse Trail Effect
  initMouseTrail() {
    let trailEnabled = true;
    let lastTrailTime = 0;

    document.addEventListener('mousemove', (e) => {
      if (!trailEnabled) return;
      
      const now = Date.now();
      if (now - lastTrailTime < 50) return; // Limit trail frequency
      lastTrailTime = now;

      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 1000);
    });
  }

  // Parallax Effect
  initParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .particles');
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', updateParallax);
  }

  // Scroll Effects
  initScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  }

  // Keyboard Navigation
  initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Press '/' to focus search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.getElementById('searchInput')?.focus();
      }
      
      // Press 'Escape' to close modals
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
      
      // Press 'h' to go home
      if (e.key === 'h' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
        window.location.href = '#home';
      }
      
      // Press 'p' to go to projects
      if (e.key === 'p' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
        window.location.href = '#projects';
      }
      
      // Press 'c' to go to contact
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
        window.location.href = '#contact';
      }
    });
  }

  // Search Functionality
  initSearch() {
    // Create search UI
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Rechercher..." />
        <button class="search-btn"><i class="fas fa-search"></i></button>
      </div>
      <div class="search-results" id="searchResults"></div>
    `;
    
    document.querySelector('.navbar').appendChild(searchContainer);

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.toLowerCase();
      
      if (query.length < 2) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        return;
      }

      searchTimeout = setTimeout(() => {
        this.performSearch(query);
      }, 300);
    });

    // Close search on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        searchInput.blur();
      }
    });
  }

  performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const searchableContent = [
      { type: 'project', title: 'Application de Gestion des Audiences', section: '#projects' },
      { type: 'project', title: 'Scanner de Vulnérabilités', section: '#projects' },
      { type: 'project', title: 'Mobile Banking', section: '#projects' },
      { type: 'project', title: 'API USSD', section: '#projects' },
      { type: 'skill', title: 'JavaScript', section: '#about' },
      { type: 'skill', title: 'Python', section: '#about' },
      { type: 'skill', title: 'Angular', section: '#about' },
      { type: 'skill', title: 'React', section: '#about' },
      { type: 'service', title: 'Développement Web', section: '#services' },
      { type: 'service', title: 'Sécurité', section: '#services' }
    ];

    const results = searchableContent.filter(item => 
      item.title.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">Aucun résultat trouvé</div>';
    } else {
      searchResults.innerHTML = results.map(result => `
        <div class="search-result" data-section="${result.section}">
          <span class="search-result-type">${result.type}</span>
          <span class="search-result-title">${result.title}</span>
        </div>
      `).join('');

      // Add click handlers
      searchResults.querySelectorAll('.search-result').forEach(result => {
        result.addEventListener('click', () => {
          window.location.href = result.dataset.section;
          searchInput.value = '';
          searchResults.innerHTML = '';
          searchResults.style.display = 'none';
        });
      });
    }

    searchResults.style.display = 'block';
  }

  // Theme Toggle
  initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Changer le thème';
    
    document.querySelector('.navbar').appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      
      // Save preference
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  closeAllModals() {
    // Close any open modals or dropdowns
    document.querySelectorAll('.modal.show, .dropdown.show').forEach(element => {
      element.classList.remove('show');
    });
    
    // Clear search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = '';
      searchInput.blur();
    }
    
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new EnhancedPortfolio();
});

// Add CSS for new features
const enhancedStyles = `
  .search-container {
    position: relative;
    margin-left: auto;
    margin-right: 20px;
  }

  .search-box {
    display: flex;
    align-items: center;
    background: var(--bg-glass);
    border: 1px solid var(--border-color);
    border-radius: 25px;
    padding: 8px 15px;
    backdrop-filter: blur(10px);
  }

  .search-input {
    background: transparent;
    border: none;
    color: var(--text-primary);
    outline: none;
    width: 200px;
    font-size: 0.9rem;
  }

  .search-input::placeholder {
    color: var(--text-muted);
  }

  .search-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 5px;
    transition: color var(--transition-base);
  }

  .search-btn:hover {
    color: var(--accent-primary);
  }

  .search-results {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--bg-glass);
    border: 1px solid var(--border-color);
    border-radius: 15px;
    backdrop-filter: blur(20px);
    min-width: 250px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
    box-shadow: var(--shadow-lg);
  }

  .search-result {
    padding: 12px 15px;
    cursor: pointer;
    transition: background var(--transition-base);
    border-bottom: 1px solid var(--border-color);
  }

  .search-result:last-child {
    border-bottom: none;
  }

  .search-result:hover {
    background: rgba(102, 126, 234, 0.1);
  }

  .search-result-type {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-right: 10px;
  }

  .search-result-title {
    color: var(--text-primary);
    font-weight: 500;
  }

  .search-no-results {
    padding: 20px;
    text-align: center;
    color: var(--text-muted);
  }

  .theme-toggle {
    background: var(--bg-glass);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-base);
    margin-left: 15px;
    backdrop-filter: blur(10px);
  }

  .theme-toggle:hover {
    background: var(--accent-primary);
    transform: scale(1.1);
  }

  .animate-in {
    animation: slideInUp 0.6s ease forwards;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Light theme styles */
  .light-theme {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-tertiary: #e9ecef;
    --bg-card: rgba(0, 0, 0, 0.05);
    --bg-glass: rgba(255, 255, 255, 0.8);
    --text-primary: #212529;
    --text-secondary: #495057;
    --text-muted: #6c757d;
    --border-color: rgba(0, 0, 0, 0.1);
  }

  .light-theme .cursor,
  .light-theme .cursor-follower {
    border-color: var(--accent-primary);
    background: var(--accent-primary);
  }

  .light-theme .mouse-trail {
    background: var(--accent-primary);
  }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);
