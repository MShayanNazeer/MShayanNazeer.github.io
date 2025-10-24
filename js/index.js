// Load top 4 latest news items for the home page
document.addEventListener('DOMContentLoaded', async function() {
  try {
    const response = await fetch('data/news.json');
    const newsData = await response.json();

    // Get the news table body on the home page
    const newsTableBody = document.querySelector('.news-section .news-table tbody');
    
    if (newsTableBody && newsData) {
      // Clear existing content
      newsTableBody.innerHTML = '';
      
      // Take only the first 4 items (latest news)
      const latestNews = newsData.slice(0, 4);
      
      // Populate the table with latest news
      latestNews.forEach(newsItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <th scope="row">${newsItem.date}</th>
          <td>${newsItem.content}</td>
        `;
        newsTableBody.appendChild(row);
      });
    }

  } catch (error) {
    console.error('Error loading news data for home page:', error);
  }
});

