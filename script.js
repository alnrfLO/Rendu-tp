document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");

    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const value = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll(".tp-card");

            cards.forEach(card => {
                const keywords = card.dataset.name;
                card.style.display = keywords.includes(value) ? "block" : "none";
            });
        });
    }

    // Modal preview when clicking a TP card
    const modal = document.getElementById('tp-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalOpen = document.getElementById('modal-open');
    const modalClose = modal && modal.querySelector('.modal-close');

    const openModalFor = (card, href) => {
        if (!modal) return;
        modalTitle.textContent = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
        // Prefer a dedicated data-comment attribute; fall back to the <p> content
        modalDesc.textContent = card.dataset.comment || (card.querySelector('p') ? card.querySelector('p').textContent : '');
        modalOpen.setAttribute('href', href || (card.querySelector('a') ? card.querySelector('a').getAttribute('href') : '#'));
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }; 

    const closeModal = () => {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.tp-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Find href from inner link if available
            const link = card.querySelector('a');
            const href = link ? link.getAttribute('href') : '#';
            openModalFor(card, href);
        });

        // Prevent inner link from navigating immediately; show modal instead
        const innerLink = card.querySelector('a');
        if (innerLink) {
            innerLink.addEventListener('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                openModalFor(card, innerLink.getAttribute('href'));
            });
        }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Close with Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});



    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    }));

    function animateStars() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0ff";
      ctx.globalAlpha = 0.8 + 0.2 * Math.sin(Date.now() / 300);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0 || s.x > width) s.dx *= -1;
        if (s.y < 0 || s.y > height) s.dy *= -1;
      });
      requestAnimationFrame(animateStars);
    }

    animateStars();

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });