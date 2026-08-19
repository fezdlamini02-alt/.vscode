Fahrenheit Seafood and Grill — Local static site

What I changed:
- Added responsive meta and `styles.css` to all pages.
- Created `styles.css` with layout, gallery, and form styles.
- Replaced gallery placeholders with local SVG images in `images/`.
- Added `scripts.js` to handle the contact form. It uses Formspree when you set `FORM_ENDPOINT`, otherwise falls back to opening the user's mail client via `mailto:`.

How to enable live form submissions (Formspree):
1. Create a form at https://formspree.io and copy your form ID (e.g. `abcd1234`).
2. Open `ST10506754/scripts.js` and set `FORM_ENDPOINT` to `https://formspree.io/f/your-id` (replace `your-id`).

How to use your own images:
- Put your images in `ST10506754/images/` and update `gallery.html` `img` `src` attributes accordingly.

View locally:
- Open `ST10506754/index.html` in your browser.

Next suggestions:
- Replace SVG placeholders with real photos.
- Add favicons and meta/social tags.
- Deploy to GitHub Pages or any static host for public access.
