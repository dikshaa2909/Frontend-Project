document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Animated Stats Counter
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = +stat.innerText;
            const increment = target / 100;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 30);
            } else {
                stat.innerText = target;
            }
        });
    }
    
    // Start animation when stats are in viewport
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (stats.length > 0) {
        observer.observe(document.querySelector('.hero-stats'));
    }
    
    // Before-After Slider
    const slider = document.getElementById('before-after-slider');
    const afterImage = document.querySelector('.after-image');
    const sliderHandle = document.querySelector('.slider-handle');
    
    if (slider && afterImage && sliderHandle) {
        slider.addEventListener('input', function() {
            const sliderValue = this.value;
            afterImage.style.width = `${sliderValue}%`;
            sliderHandle.style.left = `${sliderValue}%`;
        });
        
        // Allow dragging on the slider handle
        let isDragging = false;
        
        sliderHandle.addEventListener('mousedown', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                const sliderWrapper = document.querySelector('.slider-wrapper');
                const rect = sliderWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                let percent = (x / rect.width) * 100;
                
                // Constrain to 0-100%
                percent = Math.max(0, Math.min(100, percent));
                
                afterImage.style.width = `${percent}%`;
                sliderHandle.style.left = `${percent}%`;
                slider.value = percent;
            }
        });
    }
    
    // Carbon Footprint Calculator
    const calculatorForm = document.getElementById('carbon-calculator');
    const calculatorResult = document.getElementById('calculator-result');
    const carbonResult = document.getElementById('carbon-result');
    const comparisonFill = document.getElementById('comparison-fill');
    const ecoTips = document.getElementById('eco-tips');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const transportation = parseFloat(document.getElementById('transportation').value) || 0;
            const energy = parseFloat(document.getElementById('energy').value) || 0;
            const diet = document.getElementById('diet').value;
            const flights = parseFloat(document.getElementById('flights').value) || 0;
            
            // Calculate carbon footprint (simplified calculation)
            let carbonFootprint = 0;
            
            // Transportation: 0.2 kg CO2 per km
            carbonFootprint += transportation * 0.2 * 52; // weekly to yearly
            
            // Energy: 105 kg CO2 per $100 spent
            carbonFootprint += (energy / 100) * 105 * 12; // monthly to yearly
            
            // Diet factors
            const dietFactors = {
                meat: 2.5,
                average: 1.7,
                vegetarian: 1.3,
                vegan: 1.0
            };
            carbonFootprint += dietFactors[diet] * 1000;
            
            // Flights: 200 kg CO2 per flight (average)
            carbonFootprint += flights * 200;
            
            // Convert to tons
            const carbonTons = (carbonFootprint / 1000).toFixed(1);
            
            // Display result
            carbonResult.textContent = carbonTons;
            
            // Update comparison bar (max 10 tons)
            const percentage = Math.min((carbonTons / 10) * 100, 100);
            comparisonFill.style.width = `${percentage}%`;
            
            // Change color based on result
            if (carbonTons < 2) {
                comparisonFill.style.backgroundColor = '#4CAF50'; // Green
            } else if (carbonTons < 4) {
                comparisonFill.style.backgroundColor = '#FFC107'; // Yellow
            } else {
                comparisonFill.style.backgroundColor = '#F44336'; // Red
            }
            
            // Generate tips based on results
            ecoTips.innerHTML = '';
            
            if (transportation > 100) {
                addTip('Consider carpooling, public transport, or cycling for daily commutes.');
            }
            
            if (energy > 150) {
                addTip('Switch to energy-efficient appliances and LED lighting to reduce electricity consumption.');
            }
            
            if (diet === 'meat') {
                addTip('Try incorporating more plant-based meals into your diet to reduce your carbon footprint.');
            }
            
            if (flights > 3) {
                addTip('Consider combining trips or using video conferencing instead of frequent flying.');
            }
            
            // Add general tips
            addTip('Plant trees or support reforestation projects to offset your carbon emissions.');
            
            // Show result
            calculatorResult.style.display = 'block';
            
            // Scroll to result
            calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        
        function addTip(text) {
            const li = document.createElement('li');
            li.textContent = text;
            ecoTips.appendChild(li);
        }
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterSuccess = document.getElementById('newsletter-success');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            newsletterForm.style.display = 'none';
            newsletterSuccess.style.display = 'block';
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Initialize
    highlightNavigation();
});