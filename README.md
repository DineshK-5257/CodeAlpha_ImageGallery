# CodeAlpha Image Gallery

> **Responsive Image Gallery & Interactive Photography Showcase**

CodeAlpha Image Gallery is a modern, responsive web-based image gallery developed as part of the CodeAlpha Internship Program. The application provides an interactive way to explore, search, filter, and preview images using a clean and responsive user interface.

The project demonstrates practical frontend development using HTML5, CSS3, and vanilla JavaScript with features such as category filtering, image search, hover animations, favorites, and an interactive lightbox.

---

## 🌟 Key Features

### 1. 🖼️ Responsive Image Gallery

- Modern responsive image-grid layout.
- Supports multiple image categories.
- Responsive across desktop, tablet, and mobile devices.
- Image cards include titles and category information.
- Consistent image sizing using CSS object-fit.

### 2. 🔍 Image Search

- Search images using the navigation search bar.
- Search by image title or category.
- Dynamically filters gallery results.
- Displays a "No images found" message when there are no matching results.

### 3. 🏷️ Category Filtering

Images can be filtered using:

- All
- Nature
- Animals
- Cities
- Technology
- People

The active category is visually highlighted and the gallery updates dynamically using JavaScript.

### 4. 🔎 Interactive Lightbox

Clicking an image opens a large preview using a lightbox interface.

Features include:

- Large image preview
- Previous image navigation
- Next image navigation
- Close button
- Image counter
- Image title
- Smooth opening and closing animations

### 5. ❤️ Favorite Images

- Each image includes a favorite/heart button.
- Users can toggle the favorite state.
- Favorite interaction is handled using JavaScript.
- Heart clicks are separated from image/lightbox interactions.

### 6. ✨ Hover Effects & Animations

The gallery includes smooth visual effects:

- Image zoom on hover
- Card elevation
- Shadow transitions
- Button hover animations
- Lightbox transitions
- Smooth category filter transitions

### 7. 📱 Responsive Design

The interface automatically adapts to different screen sizes.

| Device | Gallery Layout |
|--------|----------------|
| Desktop | Multi-column grid |
| Tablet | 2–3 columns |
| Mobile | Single column |

---

## 🛠️ Technology Stack

- **Frontend**: HTML5
- **Styling**: CSS3
- **Programming**: Vanilla JavaScript
- **Layout**: CSS Grid & Flexbox
- **Icons**: SVG / CSS
- **Storage**: LocalStorage
- **Development Server**: Python HTTP Server

---

## 📁 Project Structure

```text
CodeAlpha_ImageGallery/
│
├── images/
│   ├── nature/
│   ├── animals/
│   ├── cities/
│   ├── technology/
│   └── people/
│
├── index.html
├── style.css
├── script.js
└── README.md
