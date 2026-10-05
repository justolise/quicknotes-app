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

// 2. Notes stored as an array of objects
let notes = [];

// 3. Render function - rebuilds the list from the array
function render() {
  notesList.replaceChildren();

  notes.forEach((note) => {
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

    li.appendChild(mainDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });

  // Count message
  const count = notes.length;
  if (count === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (count === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// 4. Add note on form submit (with category and createdAt)
function handleFormSubmit(event) {
  event.preventDefault();

  const trimmedText = noteInput.value.trim();

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
  noteInput.value = '';
  noteInput.focus();
  render();
}

noteForm.addEventListener('submit', handleFormSubmit);

render();
