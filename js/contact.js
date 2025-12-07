// Extracted scripts from contact.html

console.log('contact page script loaded.');

(function () {
console.log('contact page script loaded Double Check.');

// Simple client-side mailto fallback: open user's mail client with form values
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'c-send') {
        const name = document.getElementById('c-name').value || '匿名';
        const email = document.getElementById('c-email').value || '';
        const msg = document.getElementById('c-message').value || '';
        const subject = encodeURIComponent('網站聯絡：' + name);
        const body = encodeURIComponent(`來自：${name}\n電子郵件：${email}\n\n${msg}`);
        window.location.href = `mailto:s24214373@mail.sfu.edu.hk?subject=${subject}&body=${body}`;
    }
});

})();
