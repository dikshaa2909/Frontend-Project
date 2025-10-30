document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone nav links and buttons
                const navLinks = document.querySelector('.nav-links').cloneNode(true);
                const navButtons = document.querySelector('.nav-buttons').cloneNode(true);
                
                mobileMenu.appendChild(navLinks);
                mobileMenu.appendChild(navButtons);
                
                body.appendChild(mobileMenu);
                
                // Add event listeners to mobile menu links
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                        body.classList.remove('no-scroll');
                    });
                });
                
                // Add event listeners to login and signup buttons
                const loginBtn = mobileMenu.querySelector('.login-btn');
                const signupBtn = mobileMenu.querySelector('.signup-btn');
                
                if (loginBtn) {
                    loginBtn.addEventListener('click', function() {
                        openModal('login-modal');
                    });
                }
                
                if (signupBtn) {
                    signupBtn.addEventListener('click', function() {
                        openModal('signup-modal');
                    });
                }
            }
            
            // Toggle mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
            
            // Prevent scrolling when mobile menu is active
            body.classList.toggle('no-scroll');
        });
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add box shadow when scrolled
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Hardware Slider
    const slides = document.querySelectorAll('.hardware-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide
        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.hardware-showcase');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Pricing Toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const pricingAmounts = document.querySelectorAll('.pricing-card .amount');
    const pricingPeriods = document.querySelectorAll('.pricing-card .period');
    
    if (pricingToggle) {
        const monthlyPrices = ['9.99', '19.99', '29.99'];
        const yearlyPrices = ['99.99', '199.99', '299.99'];
        
        pricingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            
            pricingAmounts.forEach((amount, index) => {
                amount.textContent = isYearly ? yearlyPrices[index] : monthlyPrices[index];
            });
            
            pricingPeriods.forEach(period => {
                period.textContent = isYearly ? '/year' : '/month';
            });
        });
    }
    
    // Modal Functionality
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const watchBtn = document.querySelector('.watch-btn');
    const closeButtons = document.querySelectorAll('.close-modal');
    const loginLink = document.querySelector('.login-link');
    const signupLink = document.querySelector('.signup-link');
    const modals = document.querySelectorAll('.modal');
    
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            body.classList.add('no-scroll');
            
            // If it's a video modal, set the iframe src
            if (modalId === 'video-modal') {
                const iframe = modal.querySelector('iframe');
                if (iframe && iframe.getAttribute('src') === 'about:blank') {
                    iframe.setAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
                }
            }
        }
    }
    
    function closeModal() {
        modals.forEach(modal => {
            modal.style.display = 'none';
            
            // If it's a video modal, reset the iframe src
            if (modal.id === 'video-modal') {
                const iframe = modal.querySelector('iframe');
                if (iframe) {
                    iframe.setAttribute('src', 'about:blank');
                }
            }
        });
        
        body.classList.remove('no-scroll');
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openModal('login-modal');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            openModal('signup-modal');
        });
    }
    
    if (watchBtn) {
        watchBtn.addEventListener('click', function() {
            openModal('video-modal');
        });
    }
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
            openModal('login-modal');
        });
    }
    
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
            openModal('signup-modal');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.hero, .features, .games, .hardware, .pricing, .community');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const elementPosition = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            if (scrollPosition > elementPosition - viewportHeight && 
                scrollPosition < elementPosition + elementHeight) {
                const speed = element.dataset.speed || 0.1;
                const yPos = (scrollPosition - elementPosition) * speed;
                
                element.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    body.classList.remove('no-scroll');
                }
            }
        });
    });
    
    // Add CSS for no-scroll
    const style = document.createElement('style');
    style.textContent = `
        .no-scroll {
            overflow: hidden;
        }
        
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(5, 5, 16, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 999;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .mobile-menu.active {
            transform: translateX(0);
        }
        
        .mobile-menu .nav-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            margin-bottom: 3rem;
        }
        
        .mobile-menu .nav-links a {
            font-size: 1.5rem;
        }
        
        .mobile-menu .nav-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .hamburger.active .line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 6px);
        }
        
        .hamburger.active .line:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .line:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -6px);
        }
        
        header.scrolled {
            background-color: rgba(5, 5, 16, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
    `;
    
    document.head.appendChild(style);
    
    // Initialize the first slide
    showSlide(currentSlide);
    
    // Form validation
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate login success
            alert('Login successful! Redirecting to dashboard...');
            closeModal();
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate password match
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Simulate signup success
            alert('Account created successfully! Welcome to NeoVerse!');
            closeModal();
        });
    }
});