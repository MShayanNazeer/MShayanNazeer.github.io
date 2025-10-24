// Load publications.json and dynamically populate the page
document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('data/publications.json');
    const publications = await response.json();

    // Populate publications container
    const publicationsContainer = document.querySelector('.publications-container');
    if (publicationsContainer && publications) {
      publicationsContainer.innerHTML = '';
      publications.forEach(pub => {
        const pubEntry = document.createElement('div');
        pubEntry.className = 'publication-entry';
        
        // Determine tag class based on type
        let tagClass = 'conference';
        if (pub.type.toLowerCase().includes('under review')) {
          tagClass = 'under-review';
        } else if (pub.type.toLowerCase().includes('journal')) {
          tagClass = 'journal';
        } else if (pub.type.toLowerCase().includes('preprint')) {
          tagClass = 'preprint';
        }
        
        pubEntry.innerHTML = `
          <div class="publication-tag ${tagClass}">${pub.type}</div>
          <div class="publication-content">
            <div class="publication-title">"${pub.title}"</div>
            <div class="publication-authors">${pub.authors}</div>
            <div class="publication-venue">${pub.venue}</div>
          </div>
        `;
        publicationsContainer.appendChild(pubEntry);
      });
    }

  } catch (error) {
    console.error('Error loading publications data:', error);
  }
});

