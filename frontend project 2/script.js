document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone nav links and CTA buttons
                const navLinksClone = navLinks.cloneNode(true);
                const ctaButtonsClone = ctaButtons.cloneNode(true);
                
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(ctaButtonsClone);
                
                document.body.appendChild(mobileMenu);
                
                // Add event listeners to mobile menu links
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    });
                });
            }
            
            // Toggle mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
            
            // Prevent scrolling when mobile menu is active
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
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
    
    // Playlist Carousel
    const carousel = document.querySelector('.playlist-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (carousel && prevBtn && nextBtn) {
        const cardWidth = 250 + 32; // Card width + gap
        
        prevBtn.addEventListener('click', function() {
            carousel.scrollBy({
                left: -cardWidth * 2,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            carousel.scrollBy({
                left: cardWidth * 2,
                behavior: 'smooth'
            });
        });
    }
    
    // Pricing Toggle
    const billingToggle = document.getElementById('billing-toggle');
    const pricingAmounts = document.querySelectorAll('.amount');
    const monthlyPrices = ['0', '9.99', '14.99'];
    const yearlyPrices = ['0', '99.99', '149.99'];
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            const prices = isYearly ? yearlyPrices : monthlyPrices;
            const period = isYearly ? '/year' : '/month';
            
            pricingAmounts.forEach((amount, index) => {
                amount.textContent = prices[index];
                amount.nextElementSibling.textContent = period;
            });
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.feature-card, .playlist-card, .artist-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: var(--dark-color);
            z-index: 999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
            margin-bottom: 2rem;
        }
        
        .mobile-menu .nav-links a {
            color: white;
            font-size: 1.5rem;
            margin: 1rem 0;
        }
        
        .mobile-menu .cta-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .hamburger.active .line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active .line:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .line:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        header.scrolled {
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    
    document.head.appendChild(style);
    
    // Music player functionality
    const playButton = document.querySelector('.play-button');
    const pauseButton = document.querySelector('.player-controls .fa-pause');
    const progressBar = document.querySelector('.progress');
    
    if (playButton && pauseButton && progressBar) {
        let isPlaying = false;
        
        playButton.addEventListener('click', togglePlay);
        pauseButton.addEventListener('click', togglePlay);
        
        function togglePlay() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                // Simulate playing music
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
                pauseButton.classList.remove('fa-pause');
                pauseButton.classList.add('fa-play');
                
                // Animate progress bar
                let width = 35;
                const interval = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(interval);
                        isPlaying = false;
                        playButton.innerHTML = '<i class="fas fa-play"></i>';
                        pauseButton.classList.remove('fa-play');
                        pauseButton.classList.add('fa-pause');
                    } else {
                        width++;
                        progressBar.style.width = width + '%';
                    }
                }, 300);
            } else {
                // Pause music
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                pauseButton.classList.remove('fa-play');
                pauseButton.classList.add('fa-pause');
            }
        }
    }
});