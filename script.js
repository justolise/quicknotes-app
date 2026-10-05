// QuickNotes - Application Logic

// 1. Element Selection with querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const clearAllBtn = document.querySelector('#clear-all-btn');
const themeToggleBtn = document.querySelector('#theme-toggle');

// 2. Notes stored as an array of objects: { id, text, category, createdAt }
const STORAGE_KEY = 'quicknotes_app_notes';
const THEME_KEY = 'quicknotes_theme';
let notes = [];

// 3. LocalStorage: load saved notes
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      notes = Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Error parsing saved notes:', err);
      notes = [];
    }
  } else {
    notes = [];
  }
}

// 4. LocalStorage: persist notes on every change
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// 5. Update note count message (zero / one / many)
function updateNoteCount() {
  const count = notes.length;
  if (count === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (count === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }

  if (clearAllBtn) {
    clearAllBtn.style.display = count === 0 ? 'none' : 'inline-block';
  }
}

// 6. Render function - rebuilds the list from the array using createElement and textContent
function render() {
  notesList.replaceChildren();

  // Search filtering (not case-sensitive)
  const searchQuery = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery)
  );

  // Show "no match" message if search returns nothing
  if (searchQuery !== '' && filteredNotes.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-notes-message';
    emptyItem.textContent = 'No notes match your search.';
    notesList.appendChild(emptyItem);
    updateNoteCount();
    return;
  }

  filteredNotes.forEach((note) => {
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;
    li.dataset.id = note.id;

    const mainDiv = document.createElement('div');
    mainDiv.className = 'note-main';

    const textP = document.createElement('p');
    textP.className = 'note-text';
    textP.textContent = note.text;

    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';

    const badgeSpan = document.createElement('span');
    badgeSpan.className = 'note-badge';
    badgeSpan.textContent = note.category;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'note-date';
    dateSpan.textContent = note.createdAt;

    metaDiv.appendChild(badgeSpan);
    metaDiv.appendChild(dateSpan);
    mainDiv.appendChild(textP);
    mainDiv.appendChild(metaDiv);

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete note: ${note.text.slice(0, 20)}`);

    deleteBtn.addEventListener('click', () => {
      deleteNote(note.id);
    });

    li.appendChild(mainDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });

  updateNoteCount();
}

// 7. Delete a note by id
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// 8. Add note with validation
function handleFormSubmit(event) {
  event.preventDefault();

  const trimmedText = noteInput.value.trim();

  // Validation: empty note
  if (trimmedText === '') {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }

  // Validation: over 200 characters
  if (trimmedText.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  // Clear error on valid submission
  errorMessage.textContent = '';

  const now = new Date();
  const formattedDate = now.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const newNote = {
    id: Date.now().toString(),
    text: trimmedText,
    category: noteCategory.value,
    createdAt: formattedDate
  };

  notes.unshift(newNote);
  saveNotes();
  noteInput.value = '';
  noteInput.focus();
  render();
}

// 9. Clear error message as user corrects input
noteInput.addEventListener('input', () => {
  if (errorMessage.textContent) {
    const trimmed = noteInput.value.trim();
    if (trimmed.length > 0 && trimmed.length <= 200) {
      errorMessage.textContent = '';
    }
  }
});

// 10. Live search on keypress
searchInput.addEventListener('input', () => {
  render();
});

noteForm.addEventListener('submit', handleFormSubmit);

// 11. Bonus: Clear all notes with confirmation
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    if (notes.length === 0) return;
    if (confirm('Delete all notes?')) {
      notes = [];
      saveNotes();
      render();
    }
  });
}

// 12. Initial load from localStorage
loadNotes();
render();

// 13. Dark mode: apply saved theme preference on page load
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }
}

const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
applyTheme(savedTheme);

// 14. Dark mode: toggle on button click
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  });
}

