// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode setup
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateHeaderClass();
    });
    
    // Dark mode toggle
    const darkmodeToggle = document.getElementById('darkmode-toggle');
    darkmodeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        updateHeaderClass();
    });
    
    // Mobile menu toggle - Fixed to work with both hamburger and X button
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // Open menu when clicking hamburger
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.add('menu-open');
        sidebarMenu.classList.add('translate-x-0');
        sidebarOverlay.classList.add('active');
        document.body.classList.add('overflow-hidden');
    });
    
    // Close menu when clicking X button
    sidebarClose.addEventListener('click', function() {
        menuToggle.classList.remove('menu-open');
        sidebarMenu.classList.remove('translate-x-0');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    });
    
    // Close menu when clicking overlay
    sidebarOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('menu-open');
        sidebarMenu.classList.remove('translate-x-0');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    });
    
    // Close menu when clicking a link
    const menuLinks = document.querySelectorAll('#sidebar-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('menu-open');
            sidebarMenu.classList.remove('translate-x-0');
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    });
    
    // Accordion functionality - Improved for smoother transitions
    const accordionHeaders = document.querySelectorAll('.apple-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.parentElement;
            const wasActive = accordion.classList.contains('accordion-active');
            
            // Close all accordions first
            document.querySelectorAll('.apple-accordion').forEach(acc => {
                acc.classList.remove('accordion-active');
            });
            
            // If it wasn't active before, activate it
            if (!wasActive) {
                accordion.classList.add('accordion-active');
            }
        });
    });
    
    // Smooth scroll for "Learn More" button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero slider functionality
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-nav-dot');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        heroDots.forEach(dot => {
            dot.classList.remove('opacity-100');
            dot.classList.add('opacity-50');
        });
        
        // Show the selected slide
        heroSlides[index].classList.add('active');
        
        // Highlight the corresponding dot
        heroDots[index].classList.remove('opacity-50');
        heroDots[index].classList.add('opacity-100');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function to advance to the next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= heroSlides.length) {
            next = 0;
        }
        showSlide(next);
    }
    
    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Add click event to dots
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideshow();
        });
    });
    
    // Initialize the first slide and start slideshow
    if (heroSlides.length > 0) {
        showSlide(0);
        startSlideshow();
    }
    
    // Initialize Swiper carousels - UPDATED for better sizing & centering
    if (typeof Swiper !== 'undefined') {
        // Team carousel - UPDATED
        const teamCarouselElement = document.querySelector('.team-carousel');
        if (teamCarouselElement) {
            const teamCarousel = new Swiper('.team-carousel', {
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: false,
                loop: false,
                pagination: {
                    el: '.team-carousel .swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        centeredSlides: false,
                    },
                    768: {
                        slidesPerView: 3,
                        centeredSlides: false,
                    },
                    1024: {
                        slidesPerView: 4,
                        centeredSlides: false,
                    },
                },
            });
        }
        
        // Album carousel - UPDATED for larger centered images
        const albumCarouselElement = document.querySelector('.album-carousel');
        if (albumCarouselElement) {
            const albumCarousel = new Swiper('.album-carousel', {
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                loopedSlides: 3,
                speed: 800,
                effect: 'slide',
                grabCursor: true,
                pagination: {
                    el: '.album-carousel .swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 'auto',
                    },
                },
            });
        }
        
        // Articles carousel - UPDATED
        const articleCarouselElement = document.querySelector('.article-carousel');
        if (articleCarouselElement) {
            const articleCarousel = new Swiper('.article-carousel', {
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: false,
                loop: false,
                pagination: {
                    el: '.article-carousel .swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        centeredSlides: false,
                    },
                    1024: {
                        slidesPerView: 3,
                        centeredSlides: false,
                    },
                },
            });
        }
    }
    
    // Team member card social buttons toggle
    const teamButtons = document.querySelectorAll('.team-card .team-btn');
    teamButtons.forEach(button => {
        button.addEventListener('click', function() {
            const teamCard = this.closest('.team-card');
            
            // First close all other team cards
            document.querySelectorAll('.team-card.active').forEach(card => {
                if (card !== teamCard) {
                    card.classList.remove('active');
                }
            });
            
            // Then toggle the current team card
            teamCard.classList.toggle('active');
        });
    });
    
    // Close team social buttons when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.team-card')) {
            document.querySelectorAll('.team-card.active').forEach(card => {
                card.classList.remove('active');
            });
        }
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('opacity-0');
            scrollToTopBtn.classList.add('opacity-100');
            scrollToTopBtn.classList.remove('pointer-events-none');
        } else {
            scrollToTopBtn.classList.remove('opacity-100');
            scrollToTopBtn.classList.add('opacity-0');
            scrollToTopBtn.classList.add('pointer-events-none');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update header glass effect class
    function updateHeaderClass() {
        const header = document.querySelector('header');
        if (document.documentElement.classList.contains('dark')) {
            header.classList.remove('light');
            header.classList.add('dark');
        } else {
            header.classList.remove('dark');
            header.classList.add('light');
        }
    }
    
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Fade up animations
        const fadeUpElements = document.querySelectorAll('.fade-up');
        fadeUpElements.forEach(element => {
            gsap.fromTo(element, 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    } else {
        // Fallback for when GSAP isn't available
        document.querySelectorAll('.fade-up, .slide-in-right, .slide-in-left').forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'none';
        });
    }

    // Contact form submission with FormSubmit.co
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    const submitButton = document.getElementById('submit-button');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // If not using formsubmit.co, handle the form manually
            if (!contactForm.getAttribute('action').includes('formsubmit.co')) {
                e.preventDefault();
                
                // Show loading state
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Prepare form data
                const formData = new FormData(contactForm);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Send form data using fetch API
                fetch('https://formsubmit.co/ajax/kkmbemuny@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formObject)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Show success message
                    formSuccess.classList.remove('hidden');
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Show error message
                    formError.classList.remove('hidden');
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        formError.classList.add('hidden');
                    }, 5000);
                })
                .finally(() => {
                    // Reset button state
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
            }
        });
    }
});
