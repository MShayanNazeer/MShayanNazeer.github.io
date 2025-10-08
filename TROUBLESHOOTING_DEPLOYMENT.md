# GitHub Pages Deployment Troubleshooting

## Current Issue: Environment Configuration

You're seeing one of these errors:

**Error 1:**
```
Branch "main" is not allowed to deploy to github-pages due to environment protection rules.
```

**Error 2:**
```
Missing environment. Ensure your workflow's deployment job has an environment.
```

The `deploy-pages` action **requires** the `github-pages` environment, but the environment must be configured to allow deployments from the `main` branch.

## Solutions (Try in Order)

### Solution 1: Configure Environment to Allow Main Branch (Recommended)

1. **Go to your repository on GitHub**
   - Visit: https://github.com/MShayanNazeer/personal_site-github-pages

2. **Check Environments Settings**
   - Click **Settings** tab
   - Click **Environments** in the left sidebar
   - If you see `github-pages` environment, click on it

3. **Configure Environment Protection**
   
   You have two options:
   
   **Option A: Allow All Branches (Simplest)**
   - Under "Deployment branches" section
   - Click the dropdown (might say "Selected branches")
   - Select **"All branches"**
   - Click "Save protection rules"
   
   **Option B: Allow Only Main Branch (More Secure)**
   - Under "Deployment branches" section  
   - Make sure it says "Selected branches"
   - Click "Add deployment branch or tag rule"
   - Enter: `main` (or use `*` for all branches)
   - Click "Add rule"
   - Click "Save protection rules"
   
   **Option C: Delete and Recreate (If Above Fails)**
   - Click "Delete environment" button at bottom
   - Confirm deletion
   - The environment will be auto-created on next deployment with no restrictions

4. **Verify Pages Settings**
   - Go to **Settings** → **Pages**
   - Under "Build and deployment"
   - Source should be: **GitHub Actions**
   - Save if needed

5. **Trigger Deployment**
   - Go to **Actions** tab
   - Click on the failed workflow
   - Click "Re-run all jobs"

### Solution 2: Use the Simplified Workflow

I've created an alternative workflow file: `.github/workflows/deploy-simple.yml`

To use it:

1. **Delete the old workflow**
   ```bash
   cd /home/shayan/personal_site-github-pages
   rm .github/workflows/deploy.yml
   mv .github/workflows/deploy-simple.yml .github/workflows/deploy.yml
   ```

2. **Commit and push**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Use simplified deployment workflow"
   git push
   ```

3. **Check if it deploys**
   - Go to Actions tab on GitHub
   - Watch the new workflow run

### Solution 3: Manual Pages Configuration

If automated deployment keeps failing, you can deploy manually:

1. **Go to Settings → Pages**

2. **Change Source to "Deploy from a branch"**
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Click Save

3. **Wait 1-2 minutes**
   - GitHub will build and deploy your site
   - You'll see a green success message with your URL

This bypasses the workflow entirely and GitHub Pages builds directly from your files.

## Common Issues and Fixes

### Issue: "Username" prompt when pushing

**Solution:** Use a Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it "Deploy Website"
4. Select scope: `repo` (full control of private repositories)
5. Generate and copy the token
6. When git prompts for password, paste the token

### Issue: Workflow runs but site doesn't update

**Check these:**

1. ✅ Go to Settings → Pages
2. ✅ Verify the URL shown there
3. ✅ Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. ✅ Wait 5 minutes (GitHub Pages can be slow)
5. ✅ Check Actions tab for errors

### Issue: 404 errors on the site

**Possible causes:**

1. **Wrong URL** - Make sure you're using the correct GitHub Pages URL:
   - Should be: `https://MShayanNazeer.github.io/personal_site-github-pages/`
   - NOT: `https://MShayanNazeer.github.io/`

2. **Links broken** - All links should use `.html` extensions
   - ✅ Good: `news.html`
   - ❌ Bad: `/news`

3. **Case sensitivity** - GitHub Pages is case-sensitive
   - File: `News.html` → URL must be `/News.html` (not `/news.html`)

### Issue: CSS/Images not loading

**Check these:**

1. Files are in correct location:
   ```
   /css/style.css
   /images/logo.png
   /js/interactive-world-map.js
   ```

2. HTML files reference them correctly:
   - ✅ `<link rel="stylesheet" href="css/style.css">`
   - ❌ `<link rel="stylesheet" href="/css/style.css">` (leading slash can cause issues)

3. Check browser console (F12) for 404 errors

## Verification Checklist

After fixing, verify these work:

- [ ] Homepage loads: https://MShayanNazeer.github.io/personal_site-github-pages/
- [ ] Navigation links work
- [ ] CSS styling appears correctly
- [ ] Images load
- [ ] News page: https://MShayanNazeer.github.io/personal_site-github-pages/news.html
- [ ] Research page with images
- [ ] Publications page
- [ ] Life page with interactive map
- [ ] CV PDF opens: https://MShayanNazeer.github.io/personal_site-github-pages/documents/resume.pdf

## Getting Help

If you're still stuck:

1. **Check the Actions tab**
   - https://github.com/MShayanNazeer/personal_site-github-pages/actions
   - Click on the failed workflow
   - Read the error messages

2. **Check GitHub Status**
   - https://www.githubstatus.com/
   - Verify GitHub Pages is operational

3. **Share the Error**
   - Copy the full error message from Actions tab
   - Include the workflow file contents
   - Note which solution you tried

## Quick Commands Reference

```bash
# Navigate to project
cd /home/shayan/personal_site-github-pages

# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Fix deployment"

# Push to GitHub (will prompt for credentials)
git push

# Test locally
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

## Next Steps After Successful Deployment

1. ✅ Visit your live site and test all pages
2. ✅ Update social media links in HTML files
3. ✅ Add your real email address
4. ✅ Update any placeholder content
5. ✅ Consider setting up a custom domain

---

**Your site URL:** https://MShayanNazeer.github.io/personal_site-github-pages/

Good luck! 🚀
