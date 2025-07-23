const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message'); // corrigido aqui
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    let isValid = true;
    if (nameInput.value.trim() === '') {
        displayError(nameError, 'Por favor, digite seu nome.');
        isValid = false;
    } else {
        clearError(nameError);
    }
    if (emailInput.value.trim() === '') {
        displayError(emailError, 'Por favor, digite seu e-mail.');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        displayError(emailError, 'Por favor, digite um e-mail válido.');
        isValid = false;
    } else {
        clearError(emailError);
    }
    if (messageInput.value.trim() === '') {
        displayError(messageError, 'Por favor, digite sua mensagem.');
        isValid = false;
    } else {
        clearError(messageError);
    }
    if (isValid) {
        displayMessage('Mensagem enviada com sucesso!', 'success');
        contactForm.reset();
    } else {
        displayMessage('Por favor, corrija os erros no formulário.', 'error');
    }
}

function displayError(element, message) {
    element.textContent = message;
}

function clearError(element) {
    element.textContent = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}
