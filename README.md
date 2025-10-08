# Personal Academic Website

A professional personal website designed for academics and researchers to showcase their work, publications, and research interests.

**🚀 Now deployed on GitHub Pages!** This site has been converted from an Express.js application to a static website optimized for GitHub Pages.

## Live Demo

View the site at: `https://YOUR-USERNAME.github.io/personal_site-github-pages/`

## Quick Start - GitHub Pages Deployment

This repository is ready for immediate deployment to GitHub Pages:

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under "Source", select **GitHub Actions**
   
3. **Done!** Your site will be live in 1-2 minutes.

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

## Table of Contents

1. [Features](#features)
2. [GitHub Pages Deployment](#github-pages-deployment)
3. [Project Structure](#project-structure)
4. [Local Development](#local-development)
5. [Content Management](#content-management)
6. [Technical Details](#technical-details)
7. [Troubleshooting](#troubleshooting)
8. [Customization](#customization)

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Academic-focused Content Sections**:
  - Homepage with profile introduction and latest news
  - Comprehensive News section
  - Research projects showcase
  - Publications list
  - CV/Resume section with PDF viewer
  - Life Beyond Research section for personal interests

## GitHub Pages Deployment

This site is configured for automatic deployment via GitHub Actions. The workflow automatically builds and deploys your site when you push to the `main` branch.

**Files for GitHub Pages:**
- `.github/workflows/deploy.yml` - Automated deployment workflow
- `.nojekyll` - Allows GitHub Pages to serve all files
- `*.html` - Static HTML pages (converted from EJS templates)

## Project Structure

### Active Files (GitHub Pages)
```
personal_site-github-pages/
│
├── index.html            # Homepage (static)
├── news.html             # News page (static)
├── research.html         # Research page (static)
├── publications.html     # Publications page (static)
├── life.html             # Life page (static)
│
├── css/                  # Stylesheets
├── js/                   # JavaScript files
├── images/               # Image assets
├── documents/            # PDF files (CV, etc.)
├── data/                 # JSON data files
│
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions deployment
│
├── .nojekyll            # GitHub Pages configuration
├── sitemap.xml          # SEO sitemap
└── DEPLOYMENT_GUIDE.md  # Detailed deployment instructions
```

### Legacy Files (Optional - Not Required for GitHub Pages)
```
├── app.js               # Old Express.js server (not needed)
├── views/               # Old EJS templates (not needed)
├── public/              # Old structure (contents moved to root)
├── package.json         # Old Node.js dependencies (not needed)
└── node_modules/        # Can be deleted
```

## Local Development

### Testing Locally (No Installation Required)

Since this is now a static site, you don't need Node.js or npm. Simply open the HTML files in a browser, or use any static file server:

**Option 1: Python (Recommended)**
```bash
python3 -m http.server 8000
```

**Option 2: Node.js http-server**
```bash
npx http-server -p 8000
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

Then visit `http://localhost:8000` in your browser.

### Legacy Express.js Server (Optional)

If you still want to run the old Express.js server locally:

1. Install dependencies: `npm install`
2. Start server: `npm start`
3. Visit `http://localhost:3000`

**Note:** The Express.js server is no longer needed for GitHub Pages deployment.

## Main Website

### Pages Overview

1. **Home (/)**: 
   - Profile information
   - Latest news items (top 4)
   - Research highlights

2. **News (/news)**:
   - Complete listing of all news items
   - Chronologically ordered

3. **Research (/research)**:
   - Research projects
   - Research interests
   - Current work

4. **Publications (/publications)**:
   - Academic publications
   - Papers, journal articles, etc.
   - Links to external resources

5. **CV (/cv)**:
   - Professional information
   - Links to view and download CV in PDF format

6. **Life (/life)**:
   - Personal interests
   - Photos and travel experiences
   - Reading recommendations

### Navigation

The site has a responsive navigation bar that collapses on smaller screens. Links to all main sections are available in the header.

## Content Management

To update the content on the website, you need to modify the JSON files in the `data` directory:

### Managing News

News items are stored in `data/news.json`. The format is:
```json
[
  {
    "date": "Feb 28, 2025",
    "content": "Lightning talk on human in-the-loop for secure digital transactions accepted at the UMass Graduate Research Symposium."
  },
  ...
]
```

The 4 most recent news items appear on the homepage, and all items appear on the News page.

### Managing Research Projects

Research projects are stored in `data/research.json`. The format for each research project is:
```json
{
  "title": "Project Title",
  "description": "Detailed description of the research project.",
  "keyFindings": [
    "First key finding or achievement",
    "Second key finding or achievement",
    "Additional findings..."
  ],
  "collaborators": "Collaborating institutions or researchers",
  "imagePath": "/images/research/project-image.jpg"
}
```

To add a new research project with an image:
1. Place your image in the `public/images/research/` directory
2. Add a new entry to the `research.json` file with the appropriate path to your image
3. The image will be displayed alongside your research description

### Managing Publications

Publications are stored in `data/publications.json`. Add your publications in the format:
```json
{
  "type": "Conference Abbreviation Year",
  "category": "conference",
  "title": "Publication Title",
  "authors": "Author1, Author2, ...",
  "venue": "Conference/Journal Name, Year",
  "links": [
    { "name": "PDF", "url": "link-to-pdf" },
    { "name": "CODE", "url": "link-to-code" }
  ]
}
```

The `category` field can be one of: `conference`, `journal`, `preprint`, or `under-review`. This affects the styling of the publication tag.

### Managing Life Updates

Life content is stored in `data/life.json` with the following structure:
```json
{
  "intro": "Introductory text for the Life page",
  "photography": [
    {
      "imagePath": "/images/photo-filename.jpg",
      "caption": "Caption describing the photo",
      "alt": "Alt text for accessibility"
    }
  ],
  "travel": [
    {
      "location": "Location (Time Period)",
      "description": "Description of travel experience"
    }
  ],
  "reading": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "description": "Brief review or impression of the book"
    }
  ]
}
```

### Interactive World Map

The Life page features an interactive world map that highlights visited countries, U.S. states, and Canadian provinces. The map uses Leaflet.js with authoritative GeoJSON data from Natural Earth and Statistics Canada.

#### Map Features

- **Countries Visited** (Blue): Displays countries you've visited
- **U.S. States Visited** (Red): Shows visited U.S. states  
- **Canadian Provinces Visited** (Green): Highlights visited Canadian provinces
- **Interactive Elements**: Hover effects, clickable popups, zoom controls

#### Adding New Visits

To add new visited locations, open the browser console on the Life page and use these commands:

```javascript
// Add a new visited country
addVisitedCountry('AU', 'Australia')

// Add a new visited U.S. state  
addVisitedUSState('CO', 'Colorado')

// Add a new visited Canadian province
addVisitedCanadianProvince('SK', 'Saskatchewan')
```

#### Map Data Sources

- **World Countries**: Natural Earth Admin 0 boundaries
- **U.S. States**: Natural Earth Admin 1 boundaries
- **Canadian Provinces**: Statistics Canada cartographic boundaries

#### Customization

The visited locations are defined in `public/js/interactive-world-map.js`:
- `visitedCountries` array for country codes
- `visitedUSStates` array for U.S. state abbreviations  
- `visitedCanadianProvinces` array for Canadian province codes

Update these arrays to reflect your travel history.

To add photos to the Life page:
1. Place images in the `public/images/` directory
2. Update the `photography` array in `life.json` with the image paths and captions

### CV Management

To update your CV, replace the file at `public/documents/resume.pdf`.

## Technical Details

### Technology Stack

- **Backend**: Node.js with Express
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Templating**: EJS (Embedded JavaScript)
- **Data Storage**: JSON files

### Performance

The website is designed to be lightweight and fast-loading. Static assets are served efficiently, and the templating system minimizes processing time.

## Troubleshooting

### Common Issues

1. **Website not starting**: Check that you have the correct Node.js version and all dependencies are installed.
2. **Missing content**: Ensure that the data files in the `data` directory are properly formatted JSON.
3. **Styling issues**: Verify that all CSS files are being loaded correctly.

## Customization

### Styling

To customize the appearance of the website:
1. Modify the CSS files in the `public/css` directory
2. Update the Bootstrap theme variables

### Adding New Sections

To add new sections to the website:
1. Create a new template in the `views` directory
2. Add a route in `app.js`
3. Create a data file in the `data` directory if needed
4. Add a link to the navigation in `views/layout.ejs`