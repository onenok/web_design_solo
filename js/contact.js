// Extracted scripts from contact.html

console.log('contact page script loaded.');

(function () {
console.log('contact page script loaded Double Check.');

// Simple client-side mailto fallback: open user's mail client with form values
    function doubleCheckAndSave(form) {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email) {
            alert("Please fill in your name and email.");
            return false;
        }

        if (!validator.isEmail(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        const mailtoLink = `mailto:s24214373@mail.sfu.edu.hk?subject=Contact from site: ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;
        return false;
    }
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        doubleCheckAndSave(contactForm);
    });

})();
