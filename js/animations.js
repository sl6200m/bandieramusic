// Additional animation effects
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for label image
    const labelImage = document.querySelector('.label-image');
    
    if (labelImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            labelImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        });
    }
    
    // Hover effect for release cards
    document.querySelectorAll('.release-card').forEach(card => {
        const cover = card.querySelector('.release-cover');
        const info = card.querySelector('.release-info');
        
        card.addEventListener('mouseenter', () => {
            cover.style.transform = 'scale(1.05)';
            info.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        });
        
        card.addEventListener('mouseleave', () => {
            cover.style.transform = 'scale(1)';
            info.style.backgroundColor = 'transparent';
        });
    });
    
    // Audio player simulation for releases
    document.querySelectorAll('.release-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                // In a real implementation, this would play the track
                console.log('Playing release:', this.querySelector('.release-title').textContent);
                
                // Visual feedback
                this.classList.add('playing');
                setTimeout(() => {
                    this.classList.remove('playing');
                }, 300);
            }
        });
    });
    
    // Dynamic background for header on scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(5px)';
        } else {
            header.style.backgroundColor = 'var(--secondary-color)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        }
    });
    
    // Animated underline for navigation links
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        const underline = document.createElement('span');
        underline.className = 'nav-underline';
        underline.style.display = 'block';
        underline.style.height = '2px';
        underline.style.width = '0';
        underline.style.backgroundColor = 'var(--accent-color)';
        underline.style.position = 'absolute';
        underline.style.bottom = '0';
        underline.style.left = '0';
        underline.style.transition = 'width 0.3s ease';
        
        link.style.position = 'relative';
        link.appendChild(underline);
        
        link.addEventListener('mouseenter', () => {
            underline.style.width = '100%';
        });
        
        link.addEventListener('mouseleave', () => {
            underline.style.width = '0';
        });
    });
});