# How to Delete the github-pages Environment

## Why Delete It?

The `github-pages` environment has protection rules blocking your `main` branch. The easiest fix is to **delete the environment** - it will be automatically recreated without restrictions.

## Step-by-Step Instructions

### Step 1: Go to Environments

1. Open this link in your browser:
   
   **https://github.com/MShayanNazeer/personal_site-github-pages/settings/environments**

2. You should see a list of environments. Look for `github-pages`

### Step 2: Open the Environment

1. Click on **`github-pages`**

2. You'll see the environment configuration page with sections like:
   - Environment secrets
   - Deployment branches and tags
   - Environment protection rules

### Step 3: Delete the Environment

1. **Scroll all the way to the bottom** of the page

2. Look for a red section that says **"Danger Zone"** or similar

3. Find the button that says **"Delete environment"**

4. Click **"Delete environment"**

5. Confirm when prompted (type the environment name if asked)

### Step 4: Re-run the Workflow

1. Go to Actions: **https://github.com/MShayanNazeer/personal_site-github-pages/actions**

2. Click on the most recent failed workflow

3. Click **"Re-run all jobs"** button (top right)

4. Wait 1-2 minutes

5. The workflow should succeed and create a new `github-pages` environment automatically (without protection rules)

---

## What If I Can't Find the Delete Button?

If you don't see a delete button, try these alternatives:

### Alternative 1: Modify Protection Rules

On the environment page, look for **"Deployment branches and tags"**:

1. Find the dropdown that says something like "Selected branches"
2. Click it and change to **"All branches"**
3. Click **"Save protection rules"** at the bottom

### Alternative 2: Add Main Branch as Allowed

On the environment page, under **"Deployment branches and tags"**:

1. Click **"Add deployment branch or tag rule"**
2. In the pattern field, type: `main`
3. Click **"Add rule"**
4. Click **"Save protection rules"**

---

## Visual Guide

When you're on the environment page, scroll down past these sections:
```
Environment secrets
↓
Deployment branches and tags    ← Fix here if you see it
↓
Environment protection rules
↓
Reviewers
↓
Wait timer
↓
[DANGER ZONE]                    ← Delete button is here
└─ Delete environment
```

---

## After Deleting

Once you delete the environment and re-run the workflow:

1. ✅ Workflow creates a new `github-pages` environment automatically
2. ✅ New environment has no branch restrictions
3. ✅ Deployments will work from `main` branch
4. ✅ Your site goes live!

---

## Need the Simpler Way?

If this seems complicated, just use **branch deployment instead**:

1. Go to: https://github.com/MShayanNazeer/personal_site-github-pages/settings/pages
2. Change Source from "GitHub Actions" to **"Deploy from a branch"**
3. Select `main` branch and `/ (root)` folder
4. Save

This completely avoids the environment issue!

