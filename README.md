# 🤖 RoboWiz Inventors - Website Documentation

A modern, professional website for RoboWiz Inventors robotics club featuring interactive particle animations, smooth scroll effects, and a custom sign-up form.

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [EmailJS Setup](#emailjs-setup)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Browser Support](#browser-support)

---

## ✨ Features

### Design & Animations
- ✅ **Dark-mode friendly** with modern muted color palette
- ✅ **Interactive particle background** that reacts to mouse movement
- ✅ **Animated hover borders** with spinning gradient effects
- ✅ **Scroll-triggered reveal animations** for content sections
- ✅ **Parallax depth effects** for engaging scrolling experience
- ✅ **Smooth navigation** with mobile-responsive hamburger menu
- ✅ **Premium polished look** across all devices

### Pages & Sections
- ✅ **Home Page** - Hero section, mission, current competitions, future plans, features grid
- ✅ **Coaches Page** - Grid layout with photos, bios, and hover animations
- ✅ **Sign-Up Page** - Custom form with validation and EmailJS integration

### Technical Features
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Form validation with real-time feedback
- ✅ Email submissions via EmailJS
- ✅ Performance optimized
- ✅ Accessibility features
- ✅ Well-commented, organized code

---

## 🚀 Quick Start

### 1. File Structure
Your website consists of 4 files:
```
C:\Website\
├── index.html     (Main HTML file - all pages in one)
├── styles.css     (All styling and animations)
├── script.js      (Interactive features and form handling)
└── README.md      (This file)
```

### 2. Open the Website
Simply open `index.html` in your web browser to view the website locally. No server required for testing!

**Important:** To enable form submissions, you'll need to set up EmailJS (see next section).

---

## 📧 EmailJS Setup (Required for Form Submissions)

The sign-up form uses EmailJS to send submissions to your email. Follow these steps:

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Set Up Email Service
1. In your EmailJS dashboard, click "Add New Service"
2. Choose your email provider (Gmail recommended)
3. Follow the connection steps
4. Click "Create Service" and note your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:

**Template Name:** RoboWiz Registration

**Subject:** New Registration: {{studentName}}

**Content:**
```
New student registration for RoboWiz Inventors!

Student Information:
- Student Name: {{studentName}}
- Age: {{age}}

Parent/Guardian Information:
- Name: {{parentName}}
- Email: {{email}}

Additional Information:
{{message}}

---
This registration was submitted through the RoboWiz Inventors website.
```

4. Click "Save" and note your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (also called User ID)

### Step 5: Update Your Website
Open `script.js` and find this section (around line 217):

```javascript
this.emailJSConfig = {
    serviceID: 'YOUR_SERVICE_ID',      // Replace with your Service ID
    templateID: 'YOUR_TEMPLATE_ID',    // Replace with your Template ID
    publicKey: 'YOUR_PUBLIC_KEY'       // Replace with your Public Key
};
```

Replace the placeholder values with your actual EmailJS credentials.

**Example:**
```javascript
this.emailJSConfig = {
    serviceID: 'service_abc1234',
    templateID: 'template_xyz5678',
    publicKey: 'AbCdEfGhIjKlMnOp'
};
```

### Step 6: Test the Form
1. Open your website
2. Navigate to the Sign Up section
3. Fill out and submit the test form
4. Check your email for the submission

---

## 🎨 Customization Guide

### Replacing Images

#### Method 1: Using Image URLs
Find these placeholder images in `index.html` and replace the URLs:

```html
<!-- Team Photo (Home page, line ~72) -->
<img src="https://via.placeholder.com/600x400/1a1a2e/6c63ff?text=Team+Photo" alt="RoboWiz Team">
<!-- Replace with: -->
<img src="path/to/your/team-photo.jpg" alt="RoboWiz Team">

<!-- Sumobot Photo (Home page, line ~103) -->
<img src="https://via.placeholder.com/600x400/1a1a2e/ff6b6b?text=Sumobot+Action" alt="Sumobot Competition">
<!-- Replace with: -->
<img src="path/to/your/sumobot-photo.jpg" alt="Sumobot Competition">

<!-- Future Programs Photo (Home page, line ~134) -->
<img src="https://via.placeholder.com/600x400/1a1a2e/4ecdc4?text=FLL+Future" alt="Future Programs">
<!-- Replace with: -->
<img src="path/to/your/fll-photo.jpg" alt="Future Programs">

<!-- Coach Photos (Coaches page, lines ~197, ~217, ~237) -->
<img src="https://via.placeholder.com/400x400/1a1a2e/6c63ff?text=Coach+1" alt="Coach Name" class="coach-image">
<!-- Replace with: -->
<img src="path/to/coach1-photo.jpg" alt="Coach Name" class="coach-image">
```

#### Method 2: Using Local Files
1. Create an `images` folder in `C:\Website\`
2. Add your photos to this folder
3. Reference them like this:
```html
<img src="images/team-photo.jpg" alt="RoboWiz Team">
```

**Recommended Image Sizes:**
- Team/Competition photos: 1200×800 pixels
- Coach photos: 800×800 pixels (square)
- Format: JPG or PNG
- Keep file sizes under 500KB for fast loading

---

### Editing Text Content

All text can be edited directly in `index.html`. Here are the key sections:

#### 1. Program Details (Sign-Up Page)
Find around **line 301**:
```html
<div class="info-item">
    <i class="fas fa-dollar-sign"></i>
    <div>
        <strong>Pricing</strong>
        <!-- EDIT: Update pricing information below -->
        <p>$150/month or $500/semester</p>
        <p class="small-text">Includes all materials and competition fees</p>
    </div>
</div>
```

#### 2. Location Details (Sign-Up Page)
Find around **line 312**:
```html
<div class="info-item">
    <i class="fas fa-map-marker-alt"></i>
    <div>
        <strong>Location</strong>
        <!-- EDIT: Update location information below -->
        <p>Community Center - Room 101</p>
        <p class="small-text">123 Innovation Street</p>
    </div>
</div>
```

#### 3. Coach Information (Coaches Page)
Find around **line 197** and update each coach card:
```html
<div class="coach-info">
    <h3 class="coach-name">Coach Name</h3>
    <p class="coach-title">Head Coach</p>
    <p class="coach-bio">Your coach bio here...</p>
</div>
```

#### 4. Contact Information (Footer)
Find around **line 397**:
```html
<div class="footer-section">
    <h4>Contact</h4>
    <!-- EDIT: Update contact information below -->
    <p><i class="fas fa-envelope"></i> info@robowizinventors.com</p>
    <p><i class="fas fa-phone"></i> (555) 123-4567</p>
</div>
```

---

### Adding More Coaches

To add additional coaches to the Coaches page:

1. Find the coaches grid section in `index.html` (around line 190)
2. Copy an entire `coach-card` div:

```html
<!-- Coach Card Template -->
<div class="coach-card animated-border reveal-up" style="animation-delay: 0.4s;">
    <div class="coach-image-wrapper">
        <img src="path/to/coach-photo.jpg" alt="Coach Name" class="coach-image">
        <div class="coach-overlay">
            <div class="coach-social">
                <a href="mailto:coach@email.com" class="social-icon"><i class="fas fa-envelope"></i></a>
                <a href="https://linkedin.com/in/coach" class="social-icon"><i class="fab fa-linkedin"></i></a>
            </div>
        </div>
    </div>
    <div class="coach-info">
        <h3 class="coach-name">New Coach Name</h3>
        <p class="coach-title">Position Title</p>
        <p class="coach-bio">Coach biography and experience...</p>
    </div>
</div>
```

3. Paste it after the last coach card
4. Update the `animation-delay` value (increment by 0.1s for each new coach)
5. Update all coach information and links

---

### Changing Colors

All colors are defined in `styles.css` at the top (lines 8-31). Edit these CSS variables:

```css
:root {
    /* Primary brand color (purple) */
    --primary-color: #6c63ff;

    /* Secondary brand color (teal) */
    --secondary-color: #4ecdc4;

    /* Accent color (red) */
    --accent-color: #ff6b6b;

    /* Background colors */
    --bg-primary: #0f0f1e;
    --bg-secondary: #1a1a2e;

    /* Text colors */
    --text-primary: #e4e4e7;
    --text-secondary: #a1a1aa;
}
```

**Color Palette Suggestions:**
- **Blue Theme:** `#4a90e2` (primary), `#50c9ce` (secondary)
- **Green Theme:** `#2ecc71` (primary), `#1abc9c` (secondary)
- **Orange Theme:** `#e67e22` (primary), `#f39c12` (secondary)

---

### Adjusting Animations

#### Disable Particles (for performance)
In `script.js`, line 10, change:
```javascript
this.particleCount = window.innerWidth < 768 ? 0 : 0; // Disables all particles
```

#### Adjust Animation Speed
In `styles.css`, find (line 52):
```css
:root {
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```
Increase or decrease these values as needed.

#### Disable Parallax Effect
In `script.js`, comment out line 415:
```javascript
// new ParallaxEffect(); // Disabled
```

---

## 🌐 Deployment

### Option 1: Netlify (Recommended - Free & Easy)

1. **Prepare Your Files**
   - Make sure all files are in one folder
   - Ensure EmailJS is configured

2. **Sign Up for Netlify**
   - Go to [netlify.com](https://www.netlify.com/)
   - Create a free account

3. **Deploy**
   - Drag and drop your website folder onto the Netlify dashboard
   - Your site will be live in seconds!
   - You'll get a URL like: `yoursite.netlify.app`

4. **Custom Domain (Optional)**
   - Purchase a domain (e.g., robowizinventors.com)
   - Follow Netlify's guide to connect it

### Option 2: GitHub Pages (Free)

1. **Create GitHub Account**
   - Go to [github.com](https://github.com/)
   - Sign up for free

2. **Create Repository**
   - Click "New Repository"
   - Name it: `robowiz-website`
   - Make it public

3. **Upload Files**
   - Upload `index.html`, `styles.css`, `script.js`
   - Commit changes

4. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Select main branch as source
   - Your site will be at: `username.github.io/robowiz-website`

### Option 3: Vercel (Free)

1. Go to [vercel.com](https://vercel.com/)
2. Sign up with GitHub
3. Import your project
4. Deploy with one click

### Option 4: Traditional Web Hosting

Upload files via FTP to any web hosting provider:
- Bluehost
- HostGator
- GoDaddy
- SiteGround

---

## 🔧 Troubleshooting

### Form Not Sending Emails

**Problem:** Form submits but no email received

**Solutions:**
1. Verify EmailJS credentials in `script.js` are correct
2. Check your EmailJS dashboard for failed sends
3. Verify email template variable names match the form fields
4. Check your spam folder
5. Make sure your EmailJS service is connected and active

### Images Not Loading

**Problem:** Placeholder images or broken images

**Solutions:**
1. Check image file paths are correct
2. Ensure images are in the correct folder
3. Verify image file extensions (jpg, jpeg, png)
4. Use online image URLs as temporary solution
5. Check browser console for 404 errors

### Navigation Not Working on Mobile

**Problem:** Menu doesn't open on mobile devices

**Solutions:**
1. Clear browser cache
2. Make sure `script.js` is loaded (check browser console)
3. Verify the hamburger icon is visible
4. Test in different mobile browsers

### Slow Performance

**Problem:** Website loads slowly or lags

**Solutions:**
1. Reduce number of particles (edit `script.js` line 10)
2. Compress images (use [tinypng.com](https://tinypng.com/))
3. Disable parallax effect on mobile
4. Remove unused fonts or external resources

### Animations Not Working

**Problem:** Scroll animations or hover effects not appearing

**Solutions:**
1. Check if `script.js` is properly loaded
2. Verify browser supports modern JavaScript
3. Disable browser extensions that might block animations
4. Test in a different browser
5. Check browser console for JavaScript errors

### Styling Issues

**Problem:** Layout broken or colors wrong

**Solutions:**
1. Verify `styles.css` is loaded correctly
2. Check for CSS syntax errors
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try different browser
5. Validate HTML at [validator.w3.org](https://validator.w3.org/)

---

## 🌍 Browser Support

### Fully Supported Browsers
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Opera 76+

### Mobile Support
✅ iOS Safari 14+
✅ Chrome for Android
✅ Samsung Internet

### Features with Fallbacks
- Particle animations (graceful degradation)
- Advanced CSS effects (simplified on older browsers)
- Form validation (basic HTML5 validation fallback)

---

## 📱 Testing Checklist

Before going live, test these:

- [ ] All navigation links work
- [ ] Form submits and sends email
- [ ] All images load correctly
- [ ] Mobile menu opens and closes
- [ ] Website responsive on mobile
- [ ] Website responsive on tablet
- [ ] All animations play smoothly
- [ ] Contact information is correct
- [ ] Coach information is updated
- [ ] Pricing and schedule are correct
- [ ] No console errors in browser
- [ ] Site loads in under 3 seconds
- [ ] Tested on multiple browsers

---

## 🎓 Additional Resources

### Learning Resources
- **HTML/CSS:** [MDN Web Docs](https://developer.mozilla.org/)
- **JavaScript:** [JavaScript.info](https://javascript.info/)
- **EmailJS:** [EmailJS Documentation](https://www.emailjs.com/docs/)

### Tools Used
- **Fonts:** Google Fonts (Inter)
- **Icons:** Font Awesome 6
- **Email:** EmailJS
- **Colors:** Custom muted palette

### Getting Help
- Check browser console for errors (F12 → Console)
- Search error messages online
- Visit Stack Overflow for coding questions
- Consult EmailJS support for email issues

---

## 📄 File Descriptions

| File | Purpose | Lines | Edit Frequency |
|------|---------|-------|----------------|
| `index.html` | Main structure and content | 415 | Often (text/images) |
| `styles.css` | All styling and animations | 800+ | Rarely (colors/fonts) |
| `script.js` | Interactive features | 500+ | Rarely (EmailJS only) |
| `README.md` | Documentation | This file | Never |

---

## 🔐 Security Notes

- Never commit EmailJS credentials to public repositories
- Use environment variables for sensitive data in production
- Validate all form inputs on both client and server
- Keep EmailJS dashboard password secure
- Monitor email submissions for spam

---

## 🎉 You're All Set!

Your RoboWiz Inventors website is ready to inspire the next generation of robotics innovators!

**Need help?** Review the troubleshooting section or check browser console for errors.

**Ready to launch?** Follow the deployment guide to get your site online.

---

**Built with ❤️ for RoboWiz Inventors**

*Last updated: December 2024*
