# QuickNotes

A fast, modern, and responsive web-based note-taking application designed for capturing, organizing, and managing day-to-day thoughts efficiently. Built with pure HTML5, vanilla CSS, and modern JavaScript, QuickNotes enables users to categorize notes into Personal, Work, and Study with distinct visual themes, real-time input validation, responsive card layouts, dynamic client-side search filtering, a dark and light mode, and persistent data storage through the browser's `localStorage` API.

---

## Features

- **Semantic HTML5 Architecture**: Structured with `<header>`, `<main>`, `<section>`, and `<footer>` elements, complete with accessible form controls and ARIA attributes.
- **Responsive Flexbox Design**: Adaptive layout optimized for both mobile devices and desktops with a `@media (max-width: 600px)` breakpoint that stacks form controls vertically on narrow viewports.
- **Color-Coded Categories**: Distinct visual cues and left borders for different note categories:
  - **Personal**: Teal accent (`.category-personal`)
  - **Work**: Dark red accent (`.category-work`)
  - **Study**: Blue accent (`.category-study`)
- **Robust Input Validation**: Immediate user feedback preventing blank submissions ("Please type a note first.") or entries over 200 characters ("Notes must be 200 characters or fewer.").
- **Secure DOM Rendering**: Rebuilds note cards safely using `document.createElement` and `textContent`—never injecting user-supplied text with `innerHTML` to protect against cross-site scripting (XSS).
- **Live Search Filtering**: Non-case-sensitive keyword search filtering notes on the fly as you type in `#search-input`, with a helpful fallback message ("No notes match your search.") when no matches are found.
- **Persistent Storage**: Automatically synchronizes all note operations (add, delete, clear) to browser `localStorage` using `JSON.stringify` and `JSON.parse` so your notes persist across sessions.
- **Accurate Note Counter**: Dynamically updates note counts with proper grammar: `"You have no notes yet."`, `"You have 1 note."`, and `"You have N notes."`.
- **Bonus Feature — "Clear All" with Confirmation**: Includes a bulk delete button that confirms with `confirm("Delete all notes?")` before safely wiping saved notes.

---

## How to Run the Project Locally

No build tools, bundlers, or dependencies are required. You can run the application directly in any modern web browser:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/justolise/quicknotes-app.git
   cd quicknotes-app
   ```

2. **Open the application:**
   - **Option A (Direct File)**: Double-click `index.html` or open it directly in your web browser.
   - **Option B (Python HTTP Server)**:
     ```bash
     python3 -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your browser.
   - **Option C (VS Code Live Server)**: Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## What I Learned

1. **Semantic Structure & Accessibility Standards**:
   Building a robust HTML5 foundation using semantic milestones (`<header>`, `<main>`, `<section>`, `<footer>`) and ensuring every form control has an explicit, accessible `<label>` connected via `for` and `id`. Incorporating ARIA live regions (`role="alert"`, `aria-live="polite"`) makes real-time validation errors immediately noticeable to assistive technologies.

2. **Responsive CSS Layouts & Custom Properties**:
   Crafting modular, maintainable stylesheets using CSS custom properties (variables) for consistent color palettes, typography, and card shadows. Using Flexbox for form alignment and employing `@media (max-width: 600px)` media queries guarantees an intuitive, touch-friendly mobile layout where inputs and buttons stack cleanly.

3. **Secure DOM Manipulation & LocalStorage Persistence**:
   Building dynamic user interfaces safely by relying strictly on `document.createElement()` and `textContent` rather than `innerHTML` to prevent user-generated input from introducing script injection vulnerabilities. In addition, implementing resilient client-side state handling with `localStorage` (including JSON parsing safety and fallback defaults) taught me how to keep application state in sync with the DOM seamlessly.
