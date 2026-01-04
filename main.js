document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const navbar = document.querySelector('.navbar');

    mobileMenuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = mobileMenuIcon.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = mobileMenuIcon.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Header scroll background effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Smooth Scroll for anchor links (fallback for browsers that don't support scroll-behavior: smooth in CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // AJAX Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const action = contactForm.getAttribute('action');
            const formData = new FormData(contactForm);

            // Change button text to indicate loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Success
                        formMessage.style.display = 'block';
                        formMessage.className = 'success-message';
                        formMessage.innerText = 'Mensagem enviada com sucesso!';
                        contactForm.reset();

                        // Hide message after 5 seconds
                        setTimeout(() => {
                            formMessage.style.display = 'none';
                        }, 5000);
                    } else {
                        // Error
                        return response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                throw new Error(data.errors.map(error => error.message).join(", "));
                            } else {
                                throw new Error('Ocorreu um erro ao enviar.');
                            }
                        });
                    }
                })
                .catch(error => {
                    formMessage.style.display = 'block';
                    formMessage.className = 'error-message';
                    formMessage.innerText = 'Erro: ' + error.message;
                })
                .finally(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
