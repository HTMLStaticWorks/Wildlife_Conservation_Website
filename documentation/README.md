# Documentation - Wildlife Conservation Template

## 1. Installation & Setup
1. Download or clone this repository to your local directory.
2. Ensure you have a modern web browser installed (Chrome, Firefox, Safari, Edge).
3. To view the website locally, open `pages/index.html` directly in your browser.
4. For production deployment, upload the entire root folder to your web server (e.g., Apache, Nginx, or Netlify/Vercel).

## 2. Customization Guide
- **Logo**: Replace `assets/images/favicon.png` with your organization's logo.
- **Brand Colors**: Open `assets/css/style.css` and navigate to the `:root` section. Change `--primary-color`, `--secondary-color`, and `--accent-color`.
- **Fonts**: We use 'Outfit' and 'Inter' from Google Fonts. To change them, update the `@import` URL in `style.css` and the corresponding `--font-heading`/`--font-body` variables.
- **Content**: All text content is found within the HTML files in the `pages/` directory. Each section is commented (e.g., `<!-- Hero Section -->`).

## 3. Page Structure
- `/assets/`: Shared resources (CSS, JS, Images, Fonts).
- `/pages/`: Individual template pages.
- `/documentation/`: This guide.
- `robots.txt` & `sitemap.xml`: SEO metadata.

## 4. Technical Specifications
- **HTML5 Semantic Markup**: Ensures better accessibility and SEO ranking.
- **CSS Flexbox & Grid**: Used for responsive layouts and card alignments.
- **JS ES6+ Modular structure**: Located in `assets/js/main.js` and `dashboard.js`.
- **Performance**: Images should be compressed; CSS/JS are minified or compact for production.
- **Accessibility**: Follows WCAG 2.1 AA standards; keyboard navigable.

## 5. Credits & License
- **Framework**: Vanilla HTML/CSS/JS.
- **Icons**: Font Awesome 6.0.0.
- **Fonts**: Google Fonts.
- **License**: MIT License.

## 6. Support
For technical support or customization inquiries, contact `support@wildlife.org`.
