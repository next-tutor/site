document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  const successPanel = document.getElementById('contact-success');
  const btnSendAnother = document.getElementById('btn-send-another');

  if (!form) return;

  // Custom email pattern validator
  const validateEmail = (input) => {
    if (input.type === 'email') {
      // Standard email regex format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!input.value) {
        input.setCustomValidity(''); // Let browser constraint validation handle 'required' checking
      } else if (!emailRegex.test(input.value)) {
        input.setCustomValidity('Please enter a valid email address.');
      } else {
        input.setCustomValidity('');
      }
    }
  };

  // Sync aria-invalid with the CSS :user-invalid state
  const syncAria = (el) => {
    if (!el) return;
    el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false');
  };

  // Update on blur (to show error after user interacts) and input (to clear it)
  form.addEventListener('blur', (e) => {
    if (e.target.matches('input, textarea')) {
      validateEmail(e.target);
      syncAria(e.target);
    }
  }, true);

  form.addEventListener('input', (e) => {
    if (e.target.matches('input, textarea')) {
      validateEmail(e.target);
      if (e.target.hasAttribute('aria-invalid')) {
        // Small timeout to let :user-invalid state update before we query it
        setTimeout(() => syncAria(e.target), 0);
      }
    }
  });

  // Handle form reset/send another button
  if (btnSendAnother) {
    btnSendAnother.addEventListener('click', () => {
      if (successPanel) successPanel.style.display = 'none';
      form.style.display = 'block';
      form.reset();
      if (statusMsg) {
        statusMsg.style.display = 'none';
        statusMsg.className = 'form-status-msg';
      }
    });
  }

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check validity of all fields
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(validateEmail); // Force custom validation on submit
    
    let isFormValid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isFormValid = false;
        // Trigger user-invalid visual styles by marking touched/dirty
        input.setAttribute('aria-invalid', 'true');
      }
    });

    if (!isFormValid) {
      // Focus the first invalid element
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // If form is valid, send action via Web3Forms (or simulated fallback if key is not configured)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    if (statusMsg) {
      statusMsg.className = 'form-status-msg';
      statusMsg.style.display = 'none';
    }

    // REPLACE THIS with your actual access key from https://web3forms.com/
    const WEB3FORMS_ACCESS_KEY = 'e92a03b3-328b-4e65-8db6-ce50f255016e';

    const handleSuccess = (isSimulated = false) => {
      form.reset();
      inputs.forEach(input => input.removeAttribute('aria-invalid'));
      form.style.display = 'none';
      if (successPanel) {
        successPanel.style.display = 'flex';
      }
      if (statusMsg) {
        statusMsg.textContent = isSimulated 
          ? 'Thank you! Your message has been sent successfully (Simulated).'
          : 'Thank you! Your message has been sent successfully.';
        statusMsg.className = 'form-status-msg success';
      }
    };

    if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      // Friendly simulated fallback to test visual states locally
      console.warn('Web3Forms Access Key is not configured. Simulating successful send...');
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        handleSuccess(true);
      }, 1200);
      return;
    }

    console.log('Submitting form to Web3Forms...');
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New Contact Form Submission - Next Tutor');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
      .then(async (response) => {
        const json = await response.json();
        console.log('Web3Forms response status:', response.status, response.statusText);

        if (response.ok) {
          console.log('Form submission successful:', json);
          handleSuccess(false);
        } else {
          console.error('Form submission failed by API:', json);
          if (statusMsg) {
            statusMsg.textContent = json.message || 'Something went wrong. Please try again.';
            statusMsg.className = 'form-status-msg error';
          }
        }
      })
      .catch((error) => {
        console.error('Form submission network error:', error);
        if (statusMsg) {
          statusMsg.textContent = 'Network error. Please check your connection and try again.';
          statusMsg.className = 'form-status-msg error';
        }
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
  });
});
