// Contador de días
function updateCountdown() {
    const weddingDate = new Date('November 29, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    
    document.getElementById('countdown-days').textContent = days;
}

// Control de música
const musicToggle = document.getElementById('music-toggle');
const weddingMusic = document.getElementById('wedding-music');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        weddingMusic.pause();
        musicToggle.textContent = '🎵 Reproducir música';
    } else {
        weddingMusic.play();
        musicToggle.textContent = '❌ Detener música';
    }
    isMusicPlaying = !isMusicPlaying;
});

// RSVP Original (sin cambios)
const attendingBtns = document.querySelectorAll('.attending-btn');
const attendingInput = document.getElementById('attending');
    
attendingBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        attendingBtns.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        attendingInput.value = this.dataset.value;
    });
});

document.getElementById('sendWhatsApp').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const attending = document.getElementById('attending').value;
    const message = document.getElementById('message').value;
    
    if (!name || !attending) {
        alert('Por favor completa los campos obligatorios');
        return;
    }
    
    const confirmation = attending === 'si' ? 'asistiré' : 'no podré asistir';
    let whatsappMessage = `Hola Emily y Miguel, soy ${name}. Les confirmo que ${confirmation} a su boda.`;
    
    if (message) {
        whatsappMessage += `\n\nMi mensaje: ${message}`;
    }
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/523328657192?text=${encodedMessage}`, '_blank');
    
    document.getElementById('rsvpForm').style.display = 'none';
    document.getElementById('confirmationMessage').style.display = 'block';
    document.getElementById('confirmationMessage').scrollIntoView({ behavior: 'smooth' });

    sessionStorage.setItem('rsvpSubmitted', 'true');
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 86400000); // Actualizar cada día

    if (sessionStorage.getItem('rsvpSubmitted') === 'true') {
        document.getElementById('rsvpForm').style.display = 'none';
        document.getElementById('confirmationMessage').style.display = 'block';
    }

    // Animación de fotos
    const photos = document.querySelectorAll('.photo-gallery img');
    photos.forEach((photo, index) => {
        photo.style.opacity = '0';
        photo.style.transform = 'translateY(20px)';
        photo.style.transition = `opacity 0.5s ${index * 0.1}s ease, transform 0.5s ${index * 0.1}s ease`;
        
        setTimeout(() => {
            photo.style.opacity = '1';
            photo.style.transform = 'translateY(0)';
        }, 100);
    });
});