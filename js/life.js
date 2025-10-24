// Load life.json and dynamically populate the page
document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('data/life.json');
    const data = await response.json();

    // Update intro text
    const introElement = document.querySelector('.life-intro');
    if (introElement && data.intro) {
      introElement.textContent = data.intro;
    }

    // Populate photography gallery
    const photoGallery = document.querySelector('.photo-gallery');
    if (photoGallery && data.photography) {
      photoGallery.innerHTML = '';
      data.photography.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
          <img src="${photo.imagePath}" alt="${photo.alt}">
          <p class="photo-caption">${photo.caption}</p>
        `;
        photoGallery.appendChild(photoItem);
      });
    }

    // Populate reading list
    const readingList = document.querySelector('.reading-list');
    if (readingList && data.reading) {
      readingList.innerHTML = '';
      data.reading.forEach(book => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${book.title}</strong> by ${book.author} - ${book.description}`;
        readingList.appendChild(listItem);
      });
    }

  } catch (error) {
    console.error('Error loading life data:', error);
  }
});

