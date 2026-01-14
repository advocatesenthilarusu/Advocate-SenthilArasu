
const WHATSAPP_NUMBER = '919942333282';
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const consultationForm = document.getElementById('consultationForm');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const counters = document.querySelectorAll('.counter');

window.addEventListener('scroll', () => {
    // Add scrolled class to navbar when scrolling
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});


if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Unobserve after animation to improve performance
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-card');
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});



const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

// Observe counters for animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});


let currentTestimonial = 0;
const totalTestimonials = testimonialCards.length;

// Function to show specific testimonial
const showTestimonial = (index) => {
    // Remove active class from all cards and dots
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current card and dot
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    
    currentTestimonial = index;
};

// Auto-slide testimonials
const autoSlideTestimonials = () => {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        showTestimonial(currentTestimonial);
    }, 5000); // Change every 5 seconds
};

// Initialize testimonial slider
if (testimonialCards.length > 0) {
    showTestimonial(0);
    autoSlideTestimonials();
}

// Dot navigation for testimonials
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});
function initPdfCards() {
  const pdfCards = document.querySelectorAll(".pdf-card");

  pdfCards.forEach((card) => {
    const viewBtn = card.querySelector(".view-pdf-btn");
    const pdfFileName = card.getAttribute("data-pdf");

    if (!viewBtn || !pdfFileName) return;

    viewBtn.addEventListener("click", () => {
      const pdfUrl = PDF_BASE_PATH + pdfFileName;
      window.open(pdfUrl, "_blank", "noopener");
    });
  });
}
// Validate mobile number format (10 digits)
const validateMobileNumber = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
};

// Validate full name (at least 2 characters)
const validateFullName = (name) => {
    return name.trim().length >= 2;
};

// Clear error messages
const clearErrors = () => {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
};

// Show error message
const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
};

// Real-time validation for mobile number
const mobileInput = document.getElementById('mobileNumber');
if (mobileInput) {
    mobileInput.addEventListener('input', (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        e.target.value = value;
        
        if (value.length > 0 && !validateMobileNumber(value)) {
            showError('mobileError', 'Please enter a valid 10-digit mobile number');
        } else {
            showError('mobileError', '');
        }
    });
}

// Real-time validation for full name
const nameInput = document.getElementById('fullName');
if (nameInput) {
    nameInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        
        if (value.length > 0 && !validateFullName(value)) {
            showError('nameError', 'Please enter your full name (at least 2 characters)');
        } else {
            showError('nameError', '');
        }
    });
}

// Form submission handler
if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const mobileNumber = document.getElementById('mobileNumber').value.trim();
        const caseType = document.getElementById('caseType').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation flags
        let isValid = true;
        
        // Validate full name
        if (!validateFullName(fullName)) {
            showError('nameError', 'Please enter your full name');
            isValid = false;
        }
        
        // Validate mobile number
        if (!mobileNumber) {
            showError('mobileError', 'Please enter your mobile number');
            isValid = false;
        } else if (!validateMobileNumber(mobileNumber)) {
            showError('mobileError', 'Please enter a valid 10-digit mobile number');
            isValid = false;
        }
        
        // Validate case type
        if (!caseType) {
            showError('caseError', 'Please select a case type');
            isValid = false;
        }
        
        // If validation passes, redirect to WhatsApp
        if (isValid) {
            // Build WhatsApp message
            let whatsappMessage = `Hello Sir, I need legal consultation.\n\n`;
            whatsappMessage += `Name: ${fullName}\n`;
            whatsappMessage += `Mobile: ${mobileNumber}\n`;
            whatsappMessage += `Case Type: ${caseType}\n`;
            
            if (message) {
                whatsappMessage += `Message: ${message}`;
            }
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Build WhatsApp URL
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab/window
            window.open(whatsappURL, '_blank');
            
            // Optional: Show success message (you can customize this)
            const submitBtn = consultationForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
            submitBtn.style.background = '#4caf50';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                // Optionally reset form
                // consultationForm.reset();
            }, 2000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                const formGroup = firstError.closest('.form-group');
                if (formGroup) {
                    formGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    });
}

const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavigation);


if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}


const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            if (!iframe.src.includes('embed')) {
                // Map is already loaded in HTML, but you can add lazy loading logic here if needed
            }
            mapObserver.unobserve(iframe);
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const mapIframe = document.querySelector('.contact-map iframe');
    if (mapIframe) {
        // Map is loaded immediately in this implementation
        // For true lazy loading, remove src from HTML and set it here
        mapObserver.observe(mapIframe);
    }
});

if (!('scrollBehavior' in document.documentElement.style)) {
    // Polyfill for smooth scrolling in older browsers
    const smoothScrollPolyfill = () => {
        const smoothScrollTo = (element, target, duration) => {
            target = Math.round(target);
            duration = Math.round(duration);
            
            if (duration < 0) {
                return Promise.reject("bad duration");
            }
            
            if (duration === 0) {
                element.scrollTop = target;
                return Promise.resolve();
            }
            
            const start_time = Date.now();
            const start = element.scrollTop;
            const distance = target - start;
            
            const smooth_step = (start, end, point) => {
                if (point <= start) return 0;
                if (point >= end) return 1;
                const x = (point - start) / (end - start);
                return x * x * (3 - 2 * x);
            };
            
            return new Promise((resolve) => {
                const previous_top = element.scrollTop;
                
                const scroll_frame = () => {
                    if (element.scrollTop !== previous_top) {
                        resolve();
                        return;
                    }
                    
                    const now = Date.now();
                    const point = smooth_step(start_time, start_time + duration, now);
                    const frame = Math.round(start + (distance * point));
                    
                    element.scrollTop = frame;
                    
                    if (now >= start_time + duration) {
                        resolve();
                        return;
                    }
                    
                    setTimeout(scroll_frame, 0);
                };
                
                scroll_frame();
            });
        };
        
        // Override smooth scroll behavior
        Element.prototype.scrollTo = function(options) {
            if (options.behavior === 'smooth') {
                smoothScrollTo(this, options.top, 300);
            } else {
                this.scrollTop = options.top;
            }
        };
    };
    
    smoothScrollPolyfill();
}


console.log('%c⚖️ Premium Advocate Website', 'font-size: 20px; font-weight: bold; color: #1a237e;');
console.log('%cDeveloped with attention to detail and professionalism', 'font-size: 12px; color: #757575;');
console.log(`%cWhatsApp Number: ${WHATSAPP_NUMBER}`, 'font-size: 11px; color: #283593;');


document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    console.log('Website initialized successfully');
    
    // Add fade-in animation to hero on load
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    // Close mobile menu on resize if it's open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

