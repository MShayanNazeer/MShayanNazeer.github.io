# Fix GitHub Pages Deployment - Quick Guide

## The Problem

The `deploy-pages` action needs a `github-pages` environment, but your environment is blocking the `main` branch from deploying.

## The Solution (5 Minutes)

### Step 1: Push the Updated Workflow ✅

The workflow has been fixed. You just need to push it:

```bash
cd /home/shayan/personal_site-github-pages
git commit -m "Fix workflow - add required environment"
git push
```

**Note:** If prompted for password, use your GitHub Personal Access Token (not your regular password).

Don't have a token? Get one here: https://github.com/settings/tokens

---

### Step 2: Fix Environment Settings ⚙️

This is the KEY step that will make it work:

1. **Go to your repository's environment settings:**
   
   👉 **Direct Link:** https://github.com/MShayanNazeer/personal_site-github-pages/settings/environments

2. **Click on the `github-pages` environment**

3. **Find the "Deployment branches" section** (it's in the middle of the page)

4. **Change the setting** - Choose ONE option:

   **EASIEST (Recommended):**
   - Click the dropdown next to "Deployment branches"
   - Select **"All branches"**
   - Scroll down and click **"Save protection rules"**
   
   **OR Alternative:**
   - If it says "Selected branches", click **"Add deployment branch or tag rule"**
   - Type: `main`
   - Click **"Add rule"**
   - Scroll down and click **"Save protection rules"**

5. **Done!** Now GitHub will allow deployments from your main branch.

---

### Step 3: Trigger Deployment 🚀

Now that the environment is configured:

1. **Go to Actions tab:**
   
   👉 https://github.com/MShayanNazeer/personal_site-github-pages/actions

2. **You'll see a new workflow run** (from your push in Step 1)

3. **Wait for it to complete** (takes 1-2 minutes)

4. **Check the result:**
   - ✅ Green checkmark = Success! 
   - ❌ Red X = See "If It Still Fails" below

---

## Visit Your Live Site

Once the workflow succeeds, your site will be live at:

**🌐 https://MShayanNazeer.github.io/personal_site-github-pages/**

It may take an additional 1-2 minutes for DNS to propagate.

---

## If It Still Fails

### Option A: Delete the Environment

If changing the deployment branches doesn't work:

1. Go back to: https://github.com/MShayanNazeer/personal_site-github-pages/settings/environments
2. Click on `github-pages`
3. Scroll to bottom
4. Click **"Delete environment"**
5. Confirm deletion
6. Go to Actions and re-run the workflow

GitHub will automatically create a new `github-pages` environment with no restrictions.

### Option B: Use Branch Deployment (No Workflow)

Skip GitHub Actions entirely:

1. Go to: https://github.com/MShayanNazeer/personal_site-github-pages/settings/pages
2. Under "Source", change from **"GitHub Actions"** to **"Deploy from a branch"**
3. Select:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **Save**

This deploys directly from your files without using workflows.

---

## Quick Reference Links

| What | Link |
|------|------|
| Repository | https://github.com/MShayanNazeer/personal_site-github-pages |
| Environment Settings | https://github.com/MShayanNazeer/personal_site-github-pages/settings/environments |
| Pages Settings | https://github.com/MShayanNazeer/personal_site-github-pages/settings/pages |
| Actions/Workflows | https://github.com/MShayanNazeer/personal_site-github-pages/actions |
| Your Live Site | https://MShayanNazeer.github.io/personal_site-github-pages/ |
| Get GitHub Token | https://github.com/settings/tokens |

---

## Visual Guide - What to Look For

When you go to the Environment settings page, you should see something like this:

```
Deployment branches and tags
────────────────────────────────────
○ All branches
● Selected branches (you want to change this!)

[Dropdown showing: No branch or tag rule added]

[+ Add deployment branch or tag rule]
```

**Change it to:**

```
Deployment branches and tags
────────────────────────────────────
● All branches          ← Select this!
○ Selected branches

                        [Save protection rules]
```

---

## Commands to Run

```bash
# 1. Commit and push the fix
git commit -m "Fix workflow - add required environment"
git push

# 2. Check git status
git status

# 3. View recent commits
git log --oneline -5

# 4. Test site locally
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

---

## Still Stuck?

1. **Check the exact error message** in the Actions tab
2. **Screenshot the Environment settings page** to verify the configuration
3. **Try Option B** (branch deployment) - it's simpler and always works
4. **Read** `TROUBLESHOOTING_DEPLOYMENT.md` for more detailed solutions

---

## Success Checklist

- [ ] Pushed the updated workflow
- [ ] Changed environment to "All branches" OR added `main` branch rule
- [ ] Saved protection rules
- [ ] Workflow ran successfully (green checkmark in Actions)
- [ ] Site loads at https://MShayanNazeer.github.io/personal_site-github-pages/
- [ ] All pages work (home, news, research, publications, life)
- [ ] CSS and images load correctly
- [ ] Interactive map works on Life page

---

**You've got this! 🚀**

The fix is simple: just allow the `main` branch to deploy in the environment settings.
