// Load news.json and dynamically populate the page
document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('data/news.json');
    const newsData = await response.json();

    // Populate news table
    const newsTableBody = document.querySelector('.news-table tbody');
    if (newsTableBody && newsData) {
      newsTableBody.innerHTML = '';
      newsData.forEach(newsItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <th scope="row">${newsItem.date}</th>
          <td>${newsItem.content}</td>
        `;
        newsTableBody.appendChild(row);
      });
    }

  } catch (error) {
    console.error('Error loading news data:', error);
  }
});

