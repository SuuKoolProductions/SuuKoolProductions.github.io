// Typewriter Effect for SuuKool Productions 2025 Refresh

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element with cursor effect
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span><span class="cursor">|</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Text to cycle through
    const words = [
        'Pioneering the Future of Digital Marketing for 10+ Years',
        'Crafting Immersive VR Experiences Since 2016',
        'Designing Beautiful Web Experiences for a Decade',
        'Building Digital Solutions That Elevate Brands'
    ];
    
    // Find the element that should have the typewriter effect
    const textElement = document.querySelector('.intro-lead-in');
    
    if (textElement) {
        // Create TypeWriter instance
        new TypeWriter(textElement, words, 3000);
        
        // Add CSS styles for cursor blink animation
        const style = document.createElement('style');
        style.textContent = `
            .cursor {
                animation: blink 1s infinite;
                font-weight: 300;
                color: #fff;
            }
            
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            
            .intro-lead-in {
                min-height: 80px;
                display: inline-block;
                text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
}); 