# El viaje de Mandy

**El viaje de Mandy** is the personal website of Mandy—a professional sales closer and passionate Spanish teacher—sharing her journey, services, and classes. Built with vanilla HTML, CSS, and JavaScript, this static site highlights Mandy's story, portfolio, and offers an easy way to get in touch or book sessions.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customization](#customization)
- [Python Utilities](#python-utilities)
- [License](#license)

## Features

- Hero section with animated roles and strategic CTAs
- **Mi Tribu** community showcase and testimonials
- **Sky & Sea** inspirational quote overlay
- About, Skills, Portfolio, and Contact sections
- Responsive, mobile-first design with accessible resets
- Calendly integration for booking classes
- Image optimization with WebP fallbacks and Python scripts
- Floating-panels and parallax wave effects

## Project Structure

```
MandySite/
├── index.html               # Main landing page
├── README.md                # Project documentation
├── ExportMandyPage.py       # Python script: export or bundle pages
├── assets/
│   ├── css/
│   │   ├── reset.css        # Reset and base styles
│   │   ├── main.css         # Theme and layout styles
│   │   └── responsive.css   # Media queries and responsive tweaks
│   ├── js/
│   │   ├── main.js          # Core navigation, animations, and integrations
│   │   ├── contact.js       # Enhanced contact form logic and validation
│   │   ├── portfolio.js     # Portfolio/case-studies data loader
│   │   └── blog.js          # Blog posts module (future expansion)
│   └── images/              # JPEG, PNG, and WebP assets
│       ├── *.jpg            # Original images
│       └── *.webp           # Optimized images
└── assets/fonts/            # Optional custom fonts
```

## Getting Started

Follow these steps to run the site locally:

1. **Clone the repository**
   ```cmd
   git clone <repository-url>
   cd MandySite
   ```
2. **Install Python dependencies** (for utility scripts)
   ```cmd
   pip install pillow
   ```
3. **Start a local server**
   ```cmd
   python -m http.server 8000
   ```
4. **Open** [http://localhost:8000](http://localhost:8000) in your browser.

> **VS Code Task**: Use **Start Local Server** to run `python -m http.server 8000` in the background.

## Customization

- **Content**: Edit `index.html` to update text, images, section order, and add new sections.
- **Styles**: Modify CSS variables and classes in `assets/css/main.css` and media queries in `responsive.css`.
- **Scripts**:
  - `main.js`: Controls navigation, parallax, animations, and Calendly integration.
  - `contact.js`: Manages contact form validation, messaging, and analytics.
  - `portfolio.js`: Loads and displays case-study and portfolio data.
  - `blog.js`: Prepares blog module for future content.

## Python Utilities

Two Python scripts help manage and optimize assets:

- **TurnToWebP.py**: Batch-converts images in `assets/images/` to WebP format using Pillow.
- **ExportMandyPage.py**: Exports or bundles the site into a distributable folder or archive.

Usage example:
```cmd
python TurnToWebP.py
python ExportMandyPage.py --output dist/
```

## License

This project is open-sourced under the MIT License. Feel free to use and adapt it for your own professional portfolio.

---
*¡Buen viaje y feliz codificación!*
