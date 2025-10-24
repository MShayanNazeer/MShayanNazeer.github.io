// Load research.json and dynamically populate the page
document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('data/research.json');
    const researchData = await response.json();

    // Find the container after the intro paragraph
    const container = document.querySelector('main .container');
    if (!container || !researchData) return;

    // Find where to insert research items (after the intro paragraph)
    const introP = container.querySelector('p');
    let insertPoint = introP ? introP.nextElementSibling : container.firstChild;

    // Clear existing research items (if any)
    const existingResearchItems = container.querySelectorAll('.research-item');
    existingResearchItems.forEach(item => item.remove());

    // Create a fragment to hold all research items
    const fragment = document.createDocumentFragment();

    // Populate research items
    researchData.forEach(research => {
      const researchItem = document.createElement('div');
      researchItem.className = 'research-item';
      
      // Build key findings list
      let keyFindingsList = '';
      if (research.keyFindings && research.keyFindings.length > 0) {
        keyFindingsList = '<ul>' + 
          research.keyFindings.map(finding => `<li>${finding}</li>`).join('') +
          '</ul>';
      }
      
      researchItem.innerHTML = `
        <div class="research-image-container">
          <img src="${research.imagePath}" alt="${research.title}" class="research-image">
        </div>
        <h3>${research.title}</h3>
        <p>${research.description}</p>
        <p><strong>Key Findings:</strong></p>
        ${keyFindingsList}
        <p><strong>Collaborators:</strong> ${research.collaborators}</p>
      `;
      
      fragment.appendChild(researchItem);
    });

    // Insert all research items at once
    if (insertPoint) {
      container.insertBefore(fragment, insertPoint);
    } else {
      container.appendChild(fragment);
    }

  } catch (error) {
    console.error('Error loading research data:', error);
  }
});

