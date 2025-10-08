# GitHub Pages Deployment Guide

This repository has been converted from an Express.js application to a static website ready for GitHub Pages deployment.

## Changes Made

The website has been converted from a Node.js/Express server-side application to a fully static website:

1. ✅ **Static HTML files** - EJS templates converted to static HTML files
2. ✅ **Updated navigation** - All links now point to `.html` files
3. ✅ **Reorganized structure** - Static assets moved to root directory
4. ✅ **GitHub Actions workflow** - Automated deployment on push
5. ✅ **.nojekyll file** - Allows Jekyll-incompatible filenames

## File Structure

```
/
├── index.html              # Home page
├── news.html               # News page
├── research.html           # Research page
├── publications.html       # Publications page
├── life.html               # Life page
├── css/                    # Stylesheets
├── js/                     # JavaScript files
├── images/                 # Image assets
├── documents/              # PDF and other documents
├── data/                   # JSON data files
├── .nojekyll              # GitHub Pages config
├── .github/
│   └── workflows/
│       └── deploy.yml      # Deployment workflow
└── sitemap.xml            # Site map for SEO
```

## Deployment Steps

### Step 1: Push to GitHub

If you haven't already created a GitHub repository:

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit changes
git commit -m "Convert to GitHub Pages static site"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/personal_site-github-pages.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Source: **GitHub Actions**
   
That's it! The GitHub Actions workflow will automatically deploy your site.

### Step 3: Update Sitemap URLs

Edit `sitemap.xml` and replace `YOUR-USERNAME` with your actual GitHub username:

```xml
<loc>https://YOUR-USERNAME.github.io/personal_site-github-pages/</loc>
```

### Step 4: Access Your Site

Your site will be available at:
```
https://YOUR-USERNAME.github.io/personal_site-github-pages/
```

If you want to use a custom domain (e.g., `yourdomain.com`), follow GitHub's [custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Automated Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically deploys your site when you:
- Push to the `main` branch
- Manually trigger the workflow from the Actions tab

## Updating Your Site

To update your site:

1. Edit the HTML files directly (or update the JSON data files)
2. Commit and push changes:

```bash
git add .
git commit -m "Update content"
git push
```

The site will automatically redeploy in 1-2 minutes.

## Maintaining Data

The `data/` folder contains JSON files that can be used for dynamic content loading via JavaScript if needed. Currently, all content is baked into the HTML files.

## Local Testing

To test locally, you can use any static file server:

### Using Python:
```bash
python3 -m http.server 8000
```

### Using Node.js (http-server):
```bash
npx http-server -p 8000
```

### Using VS Code:
Install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

Then visit `http://localhost:8000` in your browser.

## Optional: Custom Domain

1. Buy a domain from a registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Add a `CNAME` file to the root with your domain:
   ```
   www.yourdomain.com
   ```
3. Configure DNS records with your registrar:
   - Add a `CNAME` record pointing `www` to `YOUR-USERNAME.github.io`
   - Add `A` records for apex domain pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

## Troubleshooting

### Site not loading CSS/images
- Check that paths don't start with `/` (should be relative)
- Verify files are in the correct directories

### 404 errors
- Ensure you're using `.html` extensions in URLs
- Check that GitHub Pages is enabled in repository settings

### Workflow failing
- Check the Actions tab for error messages
- Verify the workflow file syntax is correct
- Ensure repository has Pages write permissions

## Notes

- The old `app.js`, `views/`, and `node_modules/` folders are no longer needed for deployment
- You can delete them if you want to clean up the repository
- The `public/` folder can also be removed as its contents have been copied to the root

## Support

For issues with GitHub Pages, see the [official documentation](https://docs.github.com/en/pages).
