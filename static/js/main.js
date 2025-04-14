document.addEventListener('DOMContentLoaded', function() {
    // Matrix-like background effect
    createMatrixBackground();
    
    // Add glitch effect to important elements
    addGlitchEffect();
    
    // Add hover effects
    addHoverEffects();
    
    // Add floating particles in background
    createParticles();
    
    // Add spotlight effect following cursor
    addSpotlightEffect();
    
    // Add typing effect to headers
    addTypingEffect();
    
    // Animate elements on scroll
    animateOnScroll();
});

/**
 * Creates a subtle matrix-like raining code effect in the background
 */
function createMatrixBackground() {
    // Only create this on larger screens
    if (window.innerWidth < 768) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'matrixBg';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Matrix characters (binary + cybersecurity symbols)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');
    
    // Array with drops - one per column
    const drops = [];
    
    // Initialize drops
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Initialize all drops to start at random position above the screen
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // Draw the matrix
    function draw() {
        // Set semi-transparent black background to fade previous text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text color with gradient from white to red
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
        ctx.fillStyle = gradient;
        ctx.font = fontSize + 'px monospace';
        
        // Draw the characters
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const char = chars[Math.floor(Math.random() * chars.length)];
            
            // Draw the character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Move drop down
            drops[i]++;
            
            // Send it back to the top randomly to create a continuous stream
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
        }
    }
    
    // Run the animation
    setInterval(draw, 40);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newColumns = canvas.width / fontSize;
        
        if (newColumns > drops.length) {
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.random() * -100;
            }
        }
    });
}

/**
 * Adds a subtle glitch effect to important elements
 */
function addGlitchEffect() {
    // Add glitch effect to headings
    const headings = document.querySelectorAll('h1, h5, .navbar-brand');
    
    headings.forEach(heading => {
        // Only add occasionally for subtle effect
        if (Math.random() > 0.5) {
            setInterval(() => {
                // Skip if the element is no longer in the DOM
                if (!document.body.contains(heading)) return;
                
                // Original text
                const originalText = heading.textContent;
                
                // Apply glitch
                heading.style.textShadow = '3px 0 0 rgba(255,0,0,0.7), -3px 0 0 rgba(0,255,255,0.7)';
                heading.style.transform = 'skew(1deg, 1deg)';
                
                // Random character replacement
                if (Math.random() > 0.7 && originalText && originalText.length > 2) {
                    const chars = originalText.split('');
                    const randomIndex = Math.floor(Math.random() * chars.length);
                    const randomChar = '0123456789!@#$%^&*()_+-=[]{}|;:,./<>?'[Math.floor(Math.random() * 40)];
                    chars[randomIndex] = randomChar;
                    heading.textContent = chars.join('');
                }
                
                // Reset after a short time
                setTimeout(() => {
                    if (document.body.contains(heading)) {
                        heading.style.textShadow = '';
                        heading.style.transform = '';
                        heading.textContent = originalText;
                    }
                }, 150);
            }, Math.random() * 4000 + 3000); // Random interval between 3-7 seconds
        }
    });
}

/**
 * Adds hover effects to various elements
 */
function addHoverEffects() {
    // Check if anime.js is available
    if (typeof anime === 'undefined') {
        console.warn('anime.js is not loaded, skipping hover effects');
        return;
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.dashboard-card, .detection-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Create a red glow pulse around the card
            anime({
                targets: card,
                boxShadow: [
                    '0 8px 25px rgba(0, 0, 0, 0.5)',
                    '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 0, 0, 0.7)'
                ],
                scale: 1.03,
                duration: 400,
                easing: 'easeOutQuad'
            });
            
            // Add glow to card header
            const cardHeader = card.querySelector('.card-header');
            if (cardHeader) {
                anime({
                    targets: cardHeader,
                    backgroundColor: 'rgba(255, 0, 0, 0.25)',
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            }
            
            // Add glow to icons
            const icons = card.querySelectorAll('i');
            if (icons.length > 0) {
                anime({
                    targets: icons,
                    textShadow: '0 0 20px rgba(255, 0, 0, 0.8)',
                    scale: 1.1,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
                scale: 1,
                duration: 600,
                easing: 'easeOutQuad'
            });
            
            // Reset card header
            const cardHeader = card.querySelector('.card-header');
            if (cardHeader) {
                anime({
                    targets: cardHeader,
                    backgroundColor: 'rgba(255, 0, 0, 0.15)',
                    duration: 600,
                    easing: 'easeOutQuad'
                });
            }
            
            // Reset icons
            const icons = card.querySelectorAll('i');
            if (icons.length > 0) {
                anime({
                    targets: icons,
                    textShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
                    scale: 1,
                    duration: 600,
                    easing: 'easeOutQuad'
                });
            }
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                boxShadow: '0 12px 25px rgba(255, 0, 0, 0.6)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                boxShadow: '0 8px 20px rgba(255, 0, 0, 0.4)',
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
    });
}

/**
 * Creates floating particles in the background
 */
function createParticles() {
    // Only create this on larger screens
    if (window.innerWidth < 768) return;
    
    // Check if anime.js is available
    if (typeof anime === 'undefined') {
        console.warn('anime.js is not loaded, skipping particle animations');
        return;
    }
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.zIndex = '-1';
    particleContainer.style.pointerEvents = 'none';
    document.body.appendChild(particleContainer);
    
    // Create particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

/**
 * Creates a single floating particle
 */
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // Random size (smaller particles should be more common)
    const size = Math.random() * 5 + 2;
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    
    // Random particle type (circle, square, or triangle)
    const particleType = Math.floor(Math.random() * 3);
    
    if (particleType === 0) {
        // Circle
        particle.style.borderRadius = '50%';
    } else if (particleType === 1) {
        // Square
        particle.style.borderRadius = '0';
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    } else {
        // Triangle
        particle.style.width = '0';
        particle.style.height = '0';
        particle.style.backgroundColor = 'transparent';
        particle.style.borderLeft = `${size/2}px solid transparent`;
        particle.style.borderRight = `${size/2}px solid transparent`;
        particle.style.borderBottom = `${size}px solid rgba(255, 0, 0, 0.3)`;
    }
    
    // Styling
    particle.style.position = 'absolute';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    if (particleType !== 2) { // Not a triangle
        particle.style.backgroundColor = `rgba(255, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${Math.random() * 0.3 + 0.1})`;
    }
    
    particle.style.top = `${posY}px`;
    particle.style.left = `${posX}px`;
    particle.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.3)';
    
    container.appendChild(particle);
    
    // Animate floating
    animateParticle(particle);
}

/**
 * Animates a particle with random floating motion
 */
function animateParticle(particle) {
    // Check if anime.js is available
    if (typeof anime === 'undefined') return;
    
    // Random duration and delay
    const duration = Math.random() * 20000 + 15000;
    const delay = Math.random() * 5000;
    
    // Random movement range
    const moveRange = 80;
    
    // Get current position
    const currentX = parseFloat(particle.style.left);
    const currentY = parseFloat(particle.style.top);
    
    // Random target position
    const targetX = currentX + (Math.random() * moveRange * 2 - moveRange);
    const targetY = currentY + (Math.random() * moveRange * 2 - moveRange);
    
    // Ensure the particle stays within view
    const boundedX = Math.max(0, Math.min(window.innerWidth, targetX));
    const boundedY = Math.max(0, Math.min(window.innerHeight, targetY));
    
    // Animate to new position
    anime({
        targets: particle,
        left: boundedX + 'px',
        top: boundedY + 'px',
        scale: [1, Math.random() * 0.5 + 0.75, 1],
        opacity: [0.2, 0.6, 0.2],
        easing: 'easeInOutQuad',
        duration: duration,
        delay: delay,
        complete: function() {
            // Make sure the particle is still in the DOM
            if (document.body.contains(particle)) {
                animateParticle(particle);
            }
        }
    });
}

/**
 * Adds a spotlight effect that follows the cursor
 */
function addSpotlightEffect() {
    // Only add on larger screens
    if (window.innerWidth < 992) return;
    
    const spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    spotlight.style.position = 'fixed';
    spotlight.style.top = '0';
    spotlight.style.left = '0';
    spotlight.style.width = '300px';
    spotlight.style.height = '300px';
    spotlight.style.borderRadius = '50%';
    spotlight.style.background = 'radial-gradient(circle, rgba(255,0,0,0.15) 0%, rgba(255,0,0,0) 70%)';
    spotlight.style.transform = 'translate(-50%, -50%)';
    spotlight.style.pointerEvents = 'none';
    spotlight.style.zIndex = '-1';
    spotlight.style.opacity = '0';
    document.body.appendChild(spotlight);
    
    // Add mousemove event
    document.addEventListener('mousemove', e => {
        spotlight.style.opacity = '1';
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
    });
    
    // Hide spotlight when mouse leaves window
    document.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });
}

/**
 * Adds typing effect to header texts
 */
function addTypingEffect() {
    const headers = document.querySelectorAll('.dashboard-header h1, .detection-header h1');
    
    headers.forEach(header => {
        // Ensure the header has content
        if (!header || !header.textContent) return;
        
        const text = header.textContent.trim();
        if (!text) return;
        
        header.textContent = '';
        header.style.borderRight = '3px solid #ff0000';
        header.style.paddingRight = '3px';
        
        // Add CSS for the blinking cursor
        if (!document.getElementById('typing-style')) {
            const style = document.createElement('style');
            style.id = 'typing-style';
            style.innerHTML = `
                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: #ff0000 }
                }
                
                .typing-animation {
                    border-right: 3px solid #ff0000;
                    animation: blink-caret 0.75s step-end infinite;
                }
            `;
            document.head.appendChild(style);
        }
        
        header.classList.add('typing-animation');
        
        // Type each character
        let i = 0;
        const typing = setInterval(() => {
            // Check if the header is still in the DOM
            if (!document.body.contains(header)) {
                clearInterval(typing);
                return;
            }
            
            if (i < text.length) {
                header.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                header.classList.remove('typing-animation');
                header.style.borderRight = 'none';
                header.style.paddingRight = '0';
            }
        }, 100);
    });
}

/**
 * Animates elements when they scroll into view
 */
function animateOnScroll() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported, skipping scroll animations');
        return;
    }
    
    // Make sure animate.css classes are available
    if (!document.querySelector('link[href*="animate.css"]')) {
        console.warn('animate.css not loaded, skipping scroll animations');
        return;
    }
    
    const elements = document.querySelectorAll('.dashboard-card, .detection-card, .counter-card, .btn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Apply different animations based on element type
                if (target.classList.contains('dashboard-card') || target.classList.contains('detection-card')) {
                    target.classList.add('animate__animated', 'animate__fadeInUp');
                } else if (target.classList.contains('counter-card')) {
                    target.classList.add('animate__animated', 'animate__zoomIn');
                } else if (target.classList.contains('btn') && !target.closest('form')) {
                    target.classList.add('animate__animated', 'animate__pulse');
                }
                
                // Stop observing after animation
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
} 