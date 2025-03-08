// Particles Animation for SuuKool Productions 2025 Refresh

class ParticleNetwork {
    constructor(canvas, options) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.particleOptions = options.particles || {};
        this.connectOptions = options.connect || {};
        this.interactive = options.interactive || false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        
        this.resize();
        this.init();
        
        if (this.interactive) {
            this.bindEvents();
        }
        
        window.requestAnimationFrame(this.update.bind(this));
    }
    
    init() {
        this.particles = [];
        const count = this.particleOptions.count || 100;
        
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this));
        }
    }
    
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        if (this.connectOptions.enabled !== false) {
            this.connectParticles();
        }
        
        if (this.interactive && this.connectOptions.mouseRadius) {
            this.handleMouseConnections();
        }
        
        window.requestAnimationFrame(this.update.bind(this));
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', this.resize.bind(this));
        
        window.addEventListener('mousemove', e => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
    }
    
    connectParticles() {
        const maxDistance = this.connectOptions.maxDistance || 120;
        const opacity = this.connectOptions.opacity || 0.6;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    // Calculate opacity based on distance
                    const lineOpacity = opacity * (1 - distance / maxDistance);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(254, 209, 54, ${lineOpacity})`;
                    this.ctx.lineWidth = this.connectOptions.lineWidth || 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    handleMouseConnections() {
        const radius = this.connectOptions.mouseRadius;
        
        this.particles.forEach(particle => {
            const dx = particle.x - this.mousePosition.x;
            const dy = particle.y - this.mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < radius) {
                // Calculate opacity based on distance
                const lineOpacity = (1 - distance / radius) * (this.connectOptions.opacity || 0.6);
                
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
                this.ctx.strokeStyle = `rgba(254, 209, 54, ${lineOpacity})`;
                this.ctx.lineWidth = this.connectOptions.lineWidth || 0.5;
                this.ctx.stroke();
                
                // Apply force to the particle
                const force = (radius - distance) / radius;
                const angle = Math.atan2(dy, dx);
                
                particle.vx -= Math.cos(angle) * force * 0.5;
                particle.vy -= Math.sin(angle) * force * 0.5;
            }
        });
    }
}

class Particle {
    constructor(parent) {
        this.network = parent;
        this.options = this.network.particleOptions;
        
        this.x = Math.random() * this.network.canvas.width;
        this.y = Math.random() * this.network.canvas.height;
        
        // Random velocity
        this.vx = (Math.random() - 0.5) * (this.options.speed || 1);
        this.vy = (Math.random() - 0.5) * (this.options.speed || 1);
        
        // Size
        this.radius = this.options.size || Math.random() * 2 + 1;
        
        // Color
        this.color = this.options.color || 'rgba(254, 209, 54, 0.6)';
    }
    
    update() {
        // Move the particle
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > this.network.canvas.width) {
            this.vx = -this.vx;
        }
        
        if (this.y < 0 || this.y > this.network.canvas.height) {
            this.vy = -this.vy;
        }
    }
    
    draw() {
        this.network.ctx.beginPath();
        this.network.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.network.ctx.fillStyle = this.color;
        this.network.ctx.fill();
    }
}

// Initialize particles when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-network';
    
    // Add CSS for canvas
    const style = document.createElement('style');
    style.textContent = `
        .particle-network {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    // Add canvas to body
    document.body.appendChild(canvas);
    
    // Initialize particle network
    new ParticleNetwork(canvas, {
        particles: {
            count: 80,
            size: 2,
            color: 'rgba(254, 209, 54, 0.4)',
            speed: 0.5
        },
        connect: {
            enabled: true,
            maxDistance: 160,
            opacity: 0.4,
            lineWidth: 0.8,
            mouseRadius: 150
        },
        interactive: true
    });
}); 