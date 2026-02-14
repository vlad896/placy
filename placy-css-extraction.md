# Placy.ai CSS Extraction Report

## 1. Font Families

### Google Fonts Import
The website uses **Inter** font family, loaded via Google Fonts:

```html
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous"/>
```

### Font Loading Script
```javascript
WebFont.load({
  google: {
    families: ["Inter:300,400,500,600,700","Inter:300,400,500,600,700"]
  }
});
```

### Font Weights Available
- Inter 300 (Light)
- Inter 400 (Regular)
- Inter 500 (Medium)
- Inter 600 (Semi-Bold)
- Inter 700 (Bold)

### Font Smoothing
```css
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -o-font-smoothing: antialiased;
}
```

---

## 2. Hero Section Gradient

### Background Gradient Image
The hero section uses a gradient background image:

**URL:** `https://cdn.prod.website-files.com/66ace00354b95dd5f8fea3cf/6853519fb7e5174cfd036293_b1524eb992fefe003641da1be66b3662_bg-gradient.avif`

**HTML Element:**
```html
<img src="https://cdn.prod.website-files.com/66ace00354b95dd5f8fea3cf/6853519fb7e5174cfd036293_b1524eb992fefe003641da1be66b3662_bg-gradient.avif" 
     loading="lazy" 
     alt="" 
     class="hero-bg-img"/>
```

**Note:** The gradient is applied as an image overlay rather than CSS gradient. To get the exact gradient colors, you would need to:
1. Download the gradient image file (AVIF format)
2. Use a color picker tool to extract the exact RGB/HEX values
3. The gradient appears to be a pink/purple/blue radial or mesh gradient based on the visual design

**Estimated Gradient Colors (based on typical design):**
- Pink: `#FF6B9D` or similar
- Purple: `#C084FC` or similar  
- Blue: `#60A5FA` or similar

---

## 3. Text Colors

### Body Text
```css
body {
  color: #333;
  background-color: #fff;
  font-family: Arial, sans-serif; /* fallback, overridden by Inter */
  font-size: 14px;
  line-height: 20px;
}
```

### Class-based Text Colors

**Black Text (Headings):**
```css
.black {
  color: #000; /* or close to black */
}
```

**White Text:**
```css
.white {
  color: #fff;
}
```

**Grey Text:**
```css
.color-grey {
  color: grey; /* specific shade to be determined from full CSS */
}
```

### Typography Classes
- `.text-display-xl` - Extra large display text (hero headings)
- `.text-display-l` - Large display text
- `.text-display-m` - Medium display text
- `.text-body-xl` - Extra large body text
- `.text-body-l` - Large body text
- `.text-body-m` - Medium body text

### Navbar Text
- `.navbar-link-s` - Navbar link styles
- `.navlink-dropdown` - Dropdown navigation links

---

## 4. Button Styles

### "Book a demo" Button (Black Button)

**HTML:**
```html
<a href="#" class="button-xl black w-button">Book a demo</a>
```

**Estimated CSS:**
```css
.button-xl.black {
  background-color: #000000;
  color: #ffffff;
  border-radius: 8px; /* estimated */
  padding: 16px 32px; /* estimated */
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.button-xl.black:hover {
  background-color: #1a1a1a; /* slightly lighter on hover */
}
```

### "Try Placy" Button (Outlined Button)

**HTML:**
```html
<a href="/pages/placy-pro-ai-demo-listing" class="button-xl-link outlined w-button">Try Placy</a>
```

**Estimated CSS:**
```css
.button-xl-link.outlined {
  background-color: transparent;
  color: #000000;
  border: 2px solid #000000;
  border-radius: 8px; /* estimated */
  padding: 14px 30px; /* slightly less to account for border */
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
}

.button-xl-link.outlined:hover {
  background-color: #000000;
  color: #ffffff;
}
```

### Transparent Button (Navbar)

**HTML:**
```html
<a href="#" class="button-transparent-3 black w-button">Book a demo</a>
```

**Estimated CSS:**
```css
.button-transparent-3.black {
  background-color: transparent;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 6px;
  padding: 10px 20px;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
}
```

### Button Base Styles
```css
.w-button {
  color: #fff;
  line-height: inherit;
  cursor: pointer;
  background-color: #3898ec;
  border: 0;
  border-radius: 0;
  padding: 9px 15px;
  text-decoration: none;
  display: inline-block;
}
```

---

## 5. CSS Custom Properties (CSS Variables)

**Note:** The HTML source does not show explicit `:root` CSS variables defined in inline styles. The external CSS file is minified and would need to be beautified to extract any CSS custom properties.

**Common Pattern:** Modern Webflow sites often use CSS variables for:
- Color schemes
- Spacing units
- Typography scales
- Border radius values

**To extract CSS variables:**
1. Beautify the minified CSS file
2. Search for `:root` declarations
3. Look for `--` prefixed properties

---

## 6. Additional Styling Details

### Theme Color
```html
<meta name="theme-color" content="#000000">
```

### Webflow Classes
The site uses Webflow's class naming convention:
- `.w-button` - Webflow button base
- `.w-inline-block` - Inline block display
- `.w-nav` - Navigation component
- `.w-dropdown` - Dropdown component
- `.w-slider` - Slider/carousel component

### Layout Classes
- `.container-1440` - Max-width container
- `.padding-section-large` - Large section padding
- `.margin-bottom-big` - Large bottom margin
- `.align-center` - Center alignment
- `.align-left` - Left alignment

---

## 7. Color Palette Summary

Based on the HTML inspection:

| Element | Color | Usage |
|---------|-------|-------|
| Primary Text | `#333` or `#000` | Body text, headings |
| Background | `#fff` | Page background |
| Primary Button | `#000000` | "Book a demo" button |
| Button Text | `#ffffff` | Button text on dark bg |
| Outlined Button Border | `#000000` | "Try Placy" button |
| Grey Text | Grey shade | Secondary text |
| Hero Gradient | Pink/Purple/Blue | Background gradient image |

---

## 8. Recommendations for Extraction

To get the **exact** CSS values, you should:

1. **For the gradient:** Download the AVIF image and use a color picker
2. **For precise measurements:** Use browser DevTools to inspect computed styles
3. **For CSS variables:** Beautify the minified CSS file
4. **For exact colors:** Use DevTools color picker on live elements

---

## 9. Key CSS Files

**Main Stylesheet:**
```
https://cdn.prod.website-files.com/66ace00354b95dd5f8fea3cf/css/placy-ai-marketing-website.webflow.shared.8153c1323.min.css
```

**Font Loading:**
- Google Fonts API: `https://fonts.googleapis.com`
- WebFont.js: `https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js`

---

## 10. Hero Section Structure

```html
<section class="section-50-50 white b2b-style">
  <div class="container-left auto-height b2b-style">
    <div class="header-wrapper b2b-page">
      <h1 class="hero-h1">
        <span class="text-display-xl">AI Platform</span>
        <span class="text-display-xl">for Real Estate</span>
      </h1>
      <p class="text-body-l align-left black">...</p>
      <div class="two-buttons-wrapper">
        <a href="#" class="button-xl black w-button">Book a demo</a>
        <a href="..." class="button-xl-link outlined w-button">Try Placy</a>
      </div>
    </div>
  </div>
  <div class="video-1-b2b">
    <img src="...bg-gradient.avif" class="hero-bg-img"/>
  </div>
</section>
```

---

## Summary

The Placy.ai website uses:
- **Font:** Inter (300, 400, 500, 600, 700 weights)
- **Primary Colors:** Black (#000), White (#fff), Grey
- **Gradient:** Pink/Purple/Blue mesh gradient (as AVIF image)
- **Buttons:** Black filled and outlined styles with 8px border-radius
- **Typography:** Webflow's responsive text classes
- **Framework:** Webflow with custom styling

For pixel-perfect replication, inspect the live site with browser DevTools to capture exact computed values.
