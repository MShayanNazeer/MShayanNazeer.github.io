#!/bin/bash

# GitHub Pages Deployment Script
# This script helps you deploy your site to GitHub Pages

echo "🚀 GitHub Pages Deployment Helper"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

echo ""
echo "📝 Please provide the following information:"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " github_username

# Get repository name (default to current directory name)
current_dir=$(basename "$PWD")
read -p "Enter repository name [$current_dir]: " repo_name
repo_name=${repo_name:-$current_dir}

echo ""
echo "📋 Configuration:"
echo "   Username: $github_username"
echo "   Repository: $repo_name"
echo "   URL: https://github.com/$github_username/$repo_name"
echo ""

read -p "Is this correct? (y/n): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Update sitemap.xml with actual username
echo ""
echo "🔧 Updating sitemap.xml with your GitHub username..."
sed -i "s/YOUR-USERNAME/$github_username/g" sitemap.xml
echo "✅ Sitemap updated"

# Add all files
echo ""
echo "📦 Adding files to git..."
git add .

# Commit
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages"

# Set remote
echo "🔗 Setting up remote repository..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$github_username/$repo_name.git"

# Set branch to main
echo "🌿 Setting branch to main..."
git branch -M main

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
echo ""
read -p "Ready to push? This will upload your site to GitHub. (y/n): " push_confirm

if [ "$push_confirm" != "y" ] && [ "$push_confirm" != "Y" ]; then
    echo ""
    echo "⏸️  Push cancelled. You can manually push later with:"
    echo "   git push -u origin main"
    exit 0
fi

git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📌 Next steps:"
echo "1. Go to https://github.com/$github_username/$repo_name/settings/pages"
echo "2. Under 'Source', select 'GitHub Actions'"
echo "3. Wait 1-2 minutes for the deployment to complete"
echo "4. Visit your site at: https://$github_username.github.io/$repo_name/"
echo ""
echo "📚 For more details, see DEPLOYMENT_GUIDE.md"
echo ""
