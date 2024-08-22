const scriptURL = 'https://script.google.com/macros/s/AKfycbxZWzb6-f7I62t0-YbpB6XrO7auRRTY0-E6-7rjHO4r0KqcWyQACOvKt2PBBUuL8-78GQ/exec';
const form = document.forms['contact-form'];

document.addEventListener('DOMContentLoaded', function() {
  const nameField = document.getElementById('contact-name');
  const emailField = document.getElementById('contact-email');
  const phoneField = document.getElementById('contact-phone');
  const messageField = document.getElementById('contact-message');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Validate Name
    if (nameField.value.trim() === '') {
      isValid = false;
      showError(nameField, 'Name is required.');
    }

    // Validate Email
    if (emailField.value.trim() === '') {
      isValid = false;
      showError(emailField, 'Email is required.');
    } else if (!validateEmail(emailField.value.trim())) {
      isValid = false;
      showError(emailField, 'Enter a valid email address.');
    }

    // Validate Phone Number
    if (phoneField.value.trim() === '') {
      isValid = false;
      showError(phoneField, 'Phone number is required.');
    } else if (isNaN(phoneField.value.trim())) {
      isValid = false;
      showError(phoneField, 'Phone number should contain only digits.');
    }

    // Validate Message
    if (messageField.value.trim() === '') {
      isValid = false;
      showError(messageField, 'Message is required.');
    }

    if (isValid) {
      const formData = new FormData(form);

      fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => alert("Thank you! Your form is submitted successfully."))
        .then(() => { form.reset(); }) // Clear the form after submission
        .catch(error => console.error('Error!', error.message));
    }
  });

  function showError(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message text-danger';
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }
});
