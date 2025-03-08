// Modern Effects JavaScript for SuuKool Productions 2025 Refresh

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize 3D Tilt Effect for cards
    initTiltEffect();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize fade-in animations on scroll
    initScrollAnimations();
    
    // Add shadow classes to elements
    addShadowClasses();
    
    // Initialize parallax effects
    initParallax();
    
    // Add scroll progress indicator
    addScrollProgressIndicator();
    
    // Add click event to scroll indicator
    const scrollIndicator = document.querySelector('.header-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Add shadow classes to appropriate elements
function addShadowClasses() {
    // Add shadow-soft to portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.classList.add('shadow-soft');
    });
    
    // Add shadow-strong to team members
    document.querySelectorAll('.team-member img').forEach(img => {
        img.classList.add('shadow-strong');
    });
    
    // Add tilt effect to service icons
    document.querySelectorAll('.fa-stack').forEach(icon => {
        icon.classList.add('tilt-effect');
        // Create inner div for 3D effect if not already wrapped
        if (!icon.querySelector('.tilt-inner')) {
            const children = Array.from(icon.childNodes);
            const tiltInner = document.createElement('div');
            tiltInner.className = 'tilt-inner';
            children.forEach(child => tiltInner.appendChild(child.cloneNode(true)));
            icon.innerHTML = '';
            icon.appendChild(tiltInner);
        }
    });
}

// 3D Tilt Effect
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', tiltEffect);
        element.addEventListener('mouseout', resetTilt);
    });
    
    function tiltEffect(e) {
        const element = this;
        const elementRect = element.getBoundingClientRect();
        const elementWidth = elementRect.width;
        const elementHeight = elementRect.height;
        
        // Calculate mouse position relative to element
        const mouseX = e.clientX - elementRect.left;
        const mouseY = e.clientY - elementRect.top;
        
        // Calculate rotation based on mouse position
        const rotateY = (0.5 - (mouseX / elementWidth)) * 10; // -5 to 5 degrees
        const rotateX = ((mouseY / elementHeight) - 0.5) * 10; // -5 to 5 degrees
        
        // Apply transform to element
        element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    function resetTilt() {
        this.style.transform = 'rotateX(0) rotateY(0)';
    }
}

// Custom Cursor
function initCustomCursor() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const follower = document.createElement('div');
    follower.className = 'custom-cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);
    
    // Cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add smooth follow effect with setTimeout
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 70); // Slight delay for follower
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-link, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.backgroundColor = 'rgba(254, 209, 54, 0.8)';
            
            follower.style.width = '50px';
            follower.style.height = '50px';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(254, 209, 54, 0.5)';
            
            follower.style.width = '40px';
            follower.style.height = '40px';
        });
    });
}

// Fade-in animations on scroll
function initScrollAnimations() {
    // Create IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    // Elements to observe
    const elementsToAnimate = document.querySelectorAll('.section-heading, .section-subheading, .service-heading, .team-member, .portfolio-item, .col-md-4, p.large');
    
    // Add fade-in class and observe
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Add the fade-in CSS rules dynamically
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Parallax effects
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for header
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundPositionY = scrollPosition * 0.4 + 'px';
        }
        
        // Reverse parallax for section headings
        document.querySelectorAll('.section-heading').forEach(heading => {
            const headingPosition = heading.getBoundingClientRect().top + window.pageYOffset;
            const offset = (scrollPosition - headingPosition) * 0.1;
            heading.style.transform = `translateY(${offset}px)`;
        });
    });
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple-effect {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add Scroll Progress Indicator
function addScrollProgressIndicator() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    
    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), #ff9e2c);
            z-index: 9999;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Add shadow when scrolled
        if (scrolled > 0) {
            progressBar.style.boxShadow = '0 0 10px rgba(254, 209, 54, 0.5)';
        } else {
            progressBar.style.boxShadow = 'none';
        }
    });
} 