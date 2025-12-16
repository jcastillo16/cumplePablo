// ============================================
// INVITACIÓN SONIC - ANIMACIONES SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Configurar Intersection Observer para animaciones al scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                entry.target.classList.add('visible');
                animateElement(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementsToAnimate = document.querySelectorAll(
        '.sonic-section, .event-details, .location-zone, .final-blast'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));

    // Animar anillos dorados al hacer click
    setupRingClicks();
});

function animateElement(element) {
    if (element.classList.contains('sonic-section')) {
        anime({
            targets: element,
            opacity: [0, 1],
            scale: [0.8, 1],
            rotate: [0, 360],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        });
    } 
    else if (element.classList.contains('event-details')) {
        anime({
            targets: element.querySelectorAll('.detail-card'),
            opacity: [0, 1],
            translateX: function(el, i) {
                return [i % 2 === 0 ? -100 : 100, 0];
            },
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutExpo'
        });
        element.style.opacity = '1';
    }
    else if (element.classList.contains('location-zone')) {
        anime({
            targets: element,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: 'easeOutQuad'
        });
    }
    else if (element.classList.contains('final-blast')) {
        anime({
            targets: element,
            opacity: [0, 1],
            scale: [0.5, 1],
            rotate: [-5, 0],
            duration: 800,
            easing: 'easeOutBack'
        });
    }
}

function setupRingClicks() {
    const rings = document.querySelectorAll('.golden-ring');
    
    rings.forEach((ring, index) => {
        ring.style.cursor = 'pointer';
        ring.style.pointerEvents = 'all';
        
        ring.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Animación de recolección
            anime({
                targets: ring,
                scale: [1, 2.5],
                opacity: [1, 0],
                rotate: '+=720deg',
                duration: 600,
                easing: 'easeInBack',
                complete: () => {
                    // Resetear después de 1 segundo
                    setTimeout(() => {
                        ring.style.opacity = '1';
                        ring.style.transform = '';
                    }, 1000);
                }
            });

            // Crear partículas
            createSparkles(e.pageX, e.pageY);
            
            // Vibración
            if (navigator.vibrate) {
                navigator.vibrate([50, 30, 50]);
            }

            // Mostrar "+1 RING" flotante
            showRingCollected(e.pageX, e.pageY);
        });
    });
}

function createSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #ffd700, #ffed4e);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px #ffd700;
        `;
        document.body.appendChild(sparkle);

        const angle = (Math.PI * 2 * i) / 10;
        const distance = 60 + Math.random() * 40;
        
        anime({
            targets: sparkle,
            translateX: Math.cos(angle) * distance,
            translateY: Math.sin(angle) * distance,
            scale: [1, 0],
            opacity: [1, 0],
            duration: 800,
            easing: 'easeOutCubic',
            complete: () => sparkle.remove()
        });
    }
}

function showRingCollected(x, y) {
    const message = document.createElement('div');
    message.textContent = '+1 RING';
    message.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        font-family: 'Bangers', cursive;
        font-size: 2rem;
        color: #ffd700;
        text-shadow: 
            2px 2px 0 #000,
            0 0 20px #ffd700;
        pointer-events: none;
        z-index: 10000;
    `;
    document.body.appendChild(message);

    anime({
        targets: message,
        translateY: [0, -80],
        opacity: [1, 0],
        scale: [0.5, 1.5],
        duration: 1200,
        easing: 'easeOutCubic',
        complete: () => message.remove()
    });
}
