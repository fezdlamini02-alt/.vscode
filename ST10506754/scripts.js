// Client-side form handler for contact form
// Set your Formspree endpoint here, e.g. 'https://formspree.io/f/abcd1234'
const FORM_ENDPOINT = 'https://formspree.io/f/your-id';

function showStatus(message, ok = true) {
  const status = document.getElementById('form-status');
  if (!status) return;
  status.textContent = message;
  status.style.color = ok ? '#0a0' : '#c00';
}

function buildMailto(form) {
  const name = form.querySelector('#name').value || '';
  const email = form.querySelector('#email').value || '';
  const message = form.querySelector('#message').value || '';
  const subject = encodeURIComponent(`Contact from Fahrenheit Seafood - ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:info@fahrenheitseafood.co.za?subject=${subject}&body=${body}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    showStatus('Sending...', true);

    const data = new FormData(form);

    // If Formspree not configured, fallback to mailto
    if (!FORM_ENDPOINT || FORM_ENDPOINT.includes('your-id')) {
      const mailto = buildMailto(form);
      showStatus('Opening mail client as fallback...', true);
      // small delay to show status
      setTimeout(() => { window.location.href = mailto; }, 500);
      btn.disabled = false;
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        showStatus('Thank you — your message has been sent!', true);
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        const err = (json && json.error) ? json.error : 'Submission failed.';
        showStatus(err, false);
      }
    } catch (err) {
      showStatus('Network error. Please try again later.', false);
    }
    btn.disabled = false;
  });
});
