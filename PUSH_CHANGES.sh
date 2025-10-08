#!/bin/bash

# Script to push pending changes to GitHub

echo "🚀 Pushing Changes to GitHub"
echo "============================"
echo ""

cd /home/shayan/personal_site-github-pages

# Show current status
echo "📋 Current changes:"
git status --short
echo ""

# Add all changes
echo "📦 Adding all changes..."
git add .

# Commit
echo "💾 Committing..."
git commit -m "Fix deployment workflow and update configuration"

# Push
echo "🚀 Pushing to GitHub..."
echo ""
echo "⚠️  You may be prompted for GitHub credentials:"
echo "   Username: MShayanNazeer"
echo "   Password: Use your GitHub Personal Access Token"
echo ""
echo "   Don't have a token? Create one at:"
echo "   https://github.com/settings/tokens"
echo ""

git push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to: https://github.com/MShayanNazeer/personal_site-github-pages/settings/environments"
    echo "2. Delete or modify the 'github-pages' environment protection"
    echo "3. Go to: https://github.com/MShayanNazeer/personal_site-github-pages/actions"
    echo "4. Re-run the failed workflow or wait for new deployment"
    echo ""
    echo "📖 See TROUBLESHOOTING_DEPLOYMENT.md for detailed instructions"
    echo ""
    echo "🌐 Your site will be at:"
    echo "   https://MShayanNazeer.github.io/personal_site-github-pages/"
else
    echo ""
    echo "❌ Push failed. Check TROUBLESHOOTING_DEPLOYMENT.md for help."
    echo ""
    echo "💡 Tip: If prompted for password, use a Personal Access Token from:"
    echo "   https://github.com/settings/tokens"
fi
