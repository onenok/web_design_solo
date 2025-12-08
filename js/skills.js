// Extracted scripts from skills.html

console.log('skills page script loaded.');

(function () {
console.log('skills page script loaded Double Check.');

const filterBar = document.querySelector('.skills-filter');
    const grid = document.querySelector('.skills-grid');
    if (!grid || !filterBar) return;

    const buttons = Array.from(filterBar.querySelectorAll('button'));
    const cards = Array.from(grid.querySelectorAll('.skill-card'));

    function applyFilter(category) {
        cards.forEach(card => {
            const cat = card.getAttribute('data-skill') || 'all';
            if ((category === 'all' && cat !== '???') || cat === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // set up filter buttons
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            applyFilter(category);
        });
    });

    // set up expand/collapse on cards (toggle)
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            cards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('expanded');
                    c.removeAttribute('tabindex');
                }
            });
            card.classList.toggle('expanded');
            // ensure expanded card is focused for accessibility
            if (card.classList.contains('expanded')) {
                card.setAttribute('tabindex', '-1');
                card.focus();
            } else {
                card.removeAttribute('tabindex');
            }
        });
    });

    window.addEventListener('click', (e) => {
        // collapse cards if clicking outside
        if (!e.target.closest('.skill-card')) {
            cards.forEach(card => {
                card.classList.remove('expanded');
                card.removeAttribute('tabindex');
            });
        }
    });

    // initial state: show all
    applyFilter('all');

})();
