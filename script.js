// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': "Image %1 of %2",
        'fadeDuration': 300
    });

    // Sticky navbar functionality
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // WhatsApp button functionality
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        // Update WhatsApp message based on current section
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll('section');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
            
            let message = "Hello, I'd like to know more about Sea Shine Beach Resort!";
            
            switch(currentSection) {
                case 'design':
                    message = "Hello, I'd like to know more about your resort facilities!";
                    break;
                case 'booking':
                    message = "Hello, I'd like to make a reservation at Sea Shine Beach Resort!";
                    break;
                case 'blog':
                    message = "Hello, I'd like to know more about activities at Sea Shine!";
                    break;
                case 'about':
                    message = "Hello, I'd like to learn more about Sea Shine Beach Resort!";
                    break;
                case 'contact':
                    message = "Hello, I have a question about Sea Shine Beach Resort!";
                    break;
            }
            
            const encodedMessage = encodeURIComponent(message);
            whatsappBtn.href = `https://wa.me/15551234567?text=${encodedMessage}`;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle 'liked' class
            this.classList.toggle('liked');
            
            // Get the count span
            const countSpan = this.querySelector('.like-count');
            if (countSpan) {
                let currentLikes = parseInt(countSpan.textContent);
                
                // If already liked, decrement count, otherwise increment
                if (this.classList.contains('liked')) {
                    currentLikes++;
                    // Change the heart icon to solid
                    const heartIcon = this.querySelector('i');
                    if (heartIcon) {
                        heartIcon.classList.remove('far');
                        heartIcon.classList.add('fas');
                    }
                } else {
                    currentLikes--;
                    // Change back to outline heart
                    const heartIcon = this.querySelector('i');
                    if (heartIcon) {
                        heartIcon.classList.remove('fas');
                        heartIcon.classList.add('far');
                    }
                }
                
                // Update the count text
                countSpan.textContent = currentLikes;
            }
        });
    });

    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const adults = document.getElementById('adults').value;
            const children = document.getElementById('children').value;
            const roomType = document.getElementById('room-type').value;
            const specialRequests = document.getElementById('special-requests').value;
            
            // Validate form (basic validation)
            if (!name || !email || !phone || !checkIn || !checkOut || !roomType) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you, ${name}! Your booking request has been submitted.\n\nWe will confirm your ${roomType} reservation from ${checkIn} to ${checkOut} shortly via email at ${email}.`);
            
            // Reset form
            bookingForm.reset();
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you for your message, ${name}! We will get back to you shortly at ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Search form functionality
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = document.querySelector('.search-input').value.toLowerCase();
            
            // If empty search, alert and return
            if (!searchInput.trim()) {
                alert('Please enter a search term.');
                return;
            }
            
            // Simple search through content sections
            let resultsFound = false;
            const searchableElements = document.querySelectorAll('.blog-text h2, .design-title a, .about-text p');
            
            searchableElements.forEach(element => {
                if (element.textContent.toLowerCase().includes(searchInput)) {
                    resultsFound = true;
                    // Scroll to the first found element
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Highlight the result temporarily
                    const originalBackground = element.style.backgroundColor;
                    element.style.backgroundColor = 'rgba(202, 111, 111, 0.2)';
                    element.style.padding = '5px';
                    element.style.borderRadius = '4px';
                    
                    // Remove highlighting after a delay
                    setTimeout(() => {
                        element.style.backgroundColor = originalBackground;
                        element.style.padding = '';
                        element.style.borderRadius = '';
                    }, 3000);
                    
                    return;
                }
            });
            
            if (!resultsFound) {
                alert('No results found for "' + searchInput + '".');
            }
            
            // Reset the search form
            searchForm.reset();
        });
    }

    // Simulated weather data update
    function updateWeather() {
        const weatherInfo = document.getElementById('weather-info');
        if (weatherInfo) {
            // Simulate weather API call by rotating through some weather conditions
            const weatherConditions = [
                { temp: '28°C', icon: 'fa-sun', desc: 'Sunny' },
                { temp: '26°C', icon: 'fa-cloud-sun', desc: 'Partly Cloudy' },
                { temp: '24°C', icon: 'fa-cloud', desc: 'Cloudy' },
                { temp: '25°C', icon: 'fa-cloud-showers-heavy', desc: 'Light Rain' }
            ];
            
            // Randomly select a weather condition
            const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            
            // Update the DOM
            const tempElement = weatherInfo.querySelector('.temperature');
            const iconElement = weatherInfo.querySelector('.weather-icon i');
            const descElement = weatherInfo.querySelector('.weather-description');
            
            if (tempElement && iconElement && descElement) {
                tempElement.textContent = randomWeather.temp;
                
                // Update icon class
                iconElement.className = '';
                iconElement.classList.add('fas', randomWeather.icon);
                
                descElement.textContent = randomWeather.desc;
            }
        }
    }
    
    // Update weather every 30 seconds for demo purposes
    setInterval(updateWeather, 30000);
    
    // Initialize animations for elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should be animated on scroll
    document.querySelectorAll('.design-item, .blog-item, .testimonial-item, .about-content, .contact-content')
        .forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    
    // Set minimum date for check-in and check-out to today
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput) {
        checkInInput.min = today;
        checkInInput.addEventListener('change', function() {
            if (checkOutInput) {
                // Make sure check-out date is after check-in date
                checkOutInput.min = this.value;
                
                // If check-out date is earlier than check-in, update it
                if (checkOutInput.value && checkOutInput.value < this.value) {
                    checkOutInput.value = this.value;
                }
            }
        });
    }
    
    if (checkOutInput) {
        checkOutInput.min = today;
    }
});
