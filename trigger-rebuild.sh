#!/bin/bash

# Script to trigger a GitHub Pages rebuild by making a tiny change

echo "🔄 Triggering GitHub Pages Rebuild"
echo "==================================="
echo ""

cd /home/shayan/personal_site-github-pages

# Add a comment to index.html to trigger rebuild
echo "<!-- Updated: $(date) -->" >> index.html

echo "✅ Made a small change to index.html"
echo ""

# Commit and push
echo "📦 Committing change..."
git add index.html
git commit -m "Trigger GitHub Pages rebuild"

echo ""
echo "🚀 Pushing to GitHub..."
git push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed!"
    echo ""
    echo "⏰ Wait 2-3 minutes, then check your site:"
    echo "   https://MShayanNazeer.github.io/personal_site-github-pages/"
    echo ""
    echo "💡 Clear your browser cache with: Ctrl+Shift+R (or Cmd+Shift+R on Mac)"
else
    echo ""
    echo "❌ Push failed. Make sure you have GitHub access configured."
fi

