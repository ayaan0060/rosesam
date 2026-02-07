// Background music functionality
let musicPlaying = false;

function playMusic() {
    const audio = document.getElementById('background-music');
    
    if (!musicPlaying) {
        audio.play()
            .then(() => {
                musicPlaying = true;
                console.log('Music started playing');
                
                // Visual feedback for button
                const button = document.querySelector('.forever-button');
                button.innerHTML = 'Playing... 🎵';
                
                setTimeout(() => {
                    button.innerHTML = 'Forever Yours 💘';
                }, 2000);
            })
            .catch(error => {
                console.log('Audio play failed:', error);
                alert('Could not play music. Click again to try.');
            });
    } else {
        audio.pause();
        musicPlaying = false;
        
        const button = document.querySelector('.forever-button');
        button.innerHTML = 'Play Music 💘';
        
        setTimeout(() => {
            button.innerHTML = 'Forever Yours 💘';
        }, 2000);
    }
}

// Additional interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle mouse move effect to love card
    const loveCard = document.querySelector('.love-card');
    
    if (loveCard) {
        loveCard.addEventListener('mousemove', (e) => {
            const rect = loveCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 25;
            const angleX = (centerY - y) / 25;
            
            loveCard.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        });
        
        loveCard.addEventListener('mouseleave', () => {
            loveCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-5px)';
        });
    }
    
    // Add click effect to forever button
    const foreverButton = document.querySelector('.forever-button');
    
    if (foreverButton) {
        foreverButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = foreverButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            const rippleContainer = this.querySelector('.ripple');
            if (rippleContainer) {
                rippleContainer.remove();
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .forever-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some random floating elements periodically
setInterval(() => {
    const container = document.querySelector('.floating-container');
    if (container && Math.random() > 0.7) { // 30% chance every interval
        const newElement = document.createElement('div');
        if (Math.random() > 0.5) {
            newElement.className = 'floating-rose';
            newElement.textContent = '🌹';
        } else {
            newElement.className = 'floating-heart';
            newElement.textContent = '❤️';
        }
        
        newElement.style.left = Math.random() * 100 + '%';
        newElement.style.animationDuration = (Math.random() * 10 + 5) + 's';
        newElement.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        
        container.appendChild(newElement);
        
        // Remove element after animation completes
        setTimeout(() => {
            if (newElement.parentNode) {
                newElement.parentNode.removeChild(newElement);
            }
        }, 10000);
    }
}, 3000);