/* =====================================================
   RoboWiz Inventors - Interactive JavaScript
   Features: Particle Background, Scroll Animations,
            Form Validation, EmailJS Integration
   ===================================================== */

// ==================== PARTICLE BACKGROUND ANIMATION ====================
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.particleCount = window.innerWidth < 768 ? 30 : 60; // Fewer particles on mobile

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();
        this.setupEventListeners();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                baseOpacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(108, 99, 255, ${particle.opacity})`;
        this.ctx.fill();
    }

    drawLine(p1, p2, distance) {
        const opacity = (1 - distance / 150) * 0.3;

        // Check if line is near cursor for highlighting
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        const dxMouse = this.mousePosition.x - midX;
        const dyMouse = (this.mousePosition.y - window.scrollY) - midY;
        const distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        let finalOpacity = opacity;
        let lineColor = '108, 99, 255';

        if (distToMouse < 200) {
            finalOpacity = opacity + 0.3;
            lineColor = '78, 205, 196'; // Secondary color for nearby lines
        }

        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(${lineColor}, ${finalOpacity})`;
        this.ctx.lineWidth = distToMouse < 200 ? 1 : 0.5;
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }

    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary collision
        if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

        // Enhanced mouse interaction
        const dx = this.mousePosition.x - particle.x;
        const dy = this.mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
            // Push particles away from cursor
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            particle.x -= Math.cos(angle) * force * 2;
            particle.y -= Math.sin(angle) * force * 2;

            // Increase opacity when near cursor
            particle.opacity = particle.baseOpacity + force * 0.5;
        } else {
            // Fade back to base opacity
            particle.opacity = particle.baseOpacity;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.drawLine(this.particles[i], this.particles[j], distance);
                }
            }
        }

        // Draw cursor interaction circle
        if (this.mousePosition.x && this.mousePosition.y) {
            this.ctx.beginPath();
            this.ctx.arc(this.mousePosition.x, this.mousePosition.y - window.scrollY, 200, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(108, 99, 255, 0.1)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }

        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        // Mouse move tracking
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY + window.scrollY;
        });

        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resize();
                this.particleCount = window.innerWidth < 768 ? 30 : 60;
                this.createParticles();
            }, 250);
        });

        // Update canvas height on scroll
        window.addEventListener('scroll', () => {
            if (this.canvas.height < document.documentElement.scrollHeight) {
                this.resize();
            }
        });
    }
}

// ==================== NAVIGATION FUNCTIONALITY ====================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScroll();
    }

    setupScrollEffect() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Add scrolled class for styling
            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==================== SCROLL REVEAL ANIMATIONS ====================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        this.init();
    }

    init() {
        // Initial check
        this.checkElements();

        // Check on scroll with throttle
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    this.checkElements();
                    scrollTimeout = null;
                }, 50);
            }
        });

        // Also check on resize
        window.addEventListener('resize', () => {
            this.checkElements();
        });
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Trigger animation when element enters viewport (with some buffer)
        // Element must be at least partially visible
        return (
            rect.top <= windowHeight * 0.85 &&
            rect.bottom >= windowHeight * 0.15
        );
    }

    checkElements() {
        this.elements.forEach(element => {
            // Add revealed class when in viewport, remove when out of viewport
            if (this.isElementInViewport(element)) {
                element.classList.add('revealed');
            } else {
                element.classList.remove('revealed');
            }
        });
    }
}

// ==================== FORM VALIDATION & SUBMISSION ====================
class SignUpForm {
    constructor() {
        this.form = document.getElementById('signupForm');
        this.successMessage = document.getElementById('successMessage');
        this.errorMessage = document.getElementById('errorMessage');

        // EmailJS Configuration
        // IMPORTANT: Replace these with your actual EmailJS credentials
        this.emailJSConfig = {
            serviceID: 'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
            templateID: 'YOUR_TEMPLATE_ID',    // Replace with your EmailJS Template ID
            publicKey: 'YOUR_PUBLIC_KEY'       // Replace with your EmailJS Public Key
        };

        this.init();
    }

    init() {
        if (!this.form) return;

        // Initialize EmailJS
        emailjs.init(this.emailJSConfig.publicKey);

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMsg = '';

        // Clear previous error
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');

        // Validation rules
        switch (fieldName) {
            case 'studentName':
            case 'parentName':
                if (value.length < 2) {
                    isValid = false;
                    errorMsg = 'Please enter a valid name (at least 2 characters)';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMsg = 'Please enter a valid email address';
                }
                break;

            case 'age':
                const age = parseInt(value);
                if (isNaN(age) || age < 7 || age > 12) {
                    isValid = false;
                    errorMsg = 'Age must be between 7 and 12';
                }
                break;
        }

        // Show error if invalid
        if (!isValid && field.hasAttribute('required')) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMsg;
            }
        }

        return isValid;
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Hide any previous messages
        this.successMessage.classList.remove('show');
        this.errorMessage.classList.remove('show');

        // Validate form
        if (!this.validateForm()) {
            this.showError('Please correct the errors in the form');
            return;
        }

        // Get form data
        const formData = {
            studentName: this.form.studentName.value.trim(),
            parentName: this.form.parentName.value.trim(),
            email: this.form.email.value.trim(),
            age: this.form.age.value.trim(),
            message: this.form.message.value.trim() || 'No additional information provided'
        };

        // Disable submit button
        const submitBtn = this.form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                this.emailJSConfig.serviceID,
                this.emailJSConfig.templateID,
                formData
            );

            if (response.status === 200) {
                this.showSuccess();
                this.form.reset();
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            this.showError('Unable to send your registration. Please try again or contact us directly.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.classList.add('show');

        // Scroll to message
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Reset form display after 5 seconds
        setTimeout(() => {
            this.form.style.display = 'flex';
            this.successMessage.classList.remove('show');
        }, 5000);
    }

    showError(message) {
        this.errorMessage.querySelector('p').textContent = message;
        this.errorMessage.classList.add('show');

        // Scroll to message
        this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide after 5 seconds
        setTimeout(() => {
            this.errorMessage.classList.remove('show');
        }, 5000);
    }
}

// ==================== PARALLAX EFFECT ====================
// DISABLED: This was causing overlapping sections
// Keeping class for future implementation if needed
class ParallaxEffect {
    constructor() {
        // Parallax effect disabled to prevent overlapping
        console.log('Parallax effect disabled');
    }
}

// ==================== IMAGE LAZY LOADING ====================
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            this.images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// ==================== PERFORMANCE MONITORING ====================
class PerformanceMonitor {
    constructor() {
        this.logPerformance();
    }

    logPerformance() {
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`🚀 Page loaded in ${pageLoadTime}ms`);
            }
        });
    }
}

// ==================== INITIALIZE ALL MODULES ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 RoboWiz Inventors Website Initialized');

    // Initialize all modules
    new ParticleBackground();
    new Navigation();
    new ScrollReveal();
    new SignUpForm();
    new ParallaxEffect();
    new LazyLoader();
    new PerformanceMonitor();

    // Log initialization success
    console.log('✅ All modules loaded successfully');
});

// ==================== UTILITY FUNCTIONS ====================

// Smooth scroll to top button (optional feature)
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6c63ff, #4ecdc4);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    `;

    document.body.appendChild(button);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 6px 20px rgba(108, 99, 255, 0.5)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🤖 RoboWiz Inventors', 'font-size: 20px; font-weight: bold; color: #6c63ff;');
console.log('%cBuilt with ❤️ for young innovators', 'font-size: 12px; color: #4ecdc4;');
