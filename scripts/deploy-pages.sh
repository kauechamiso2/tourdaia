#!/bin/sh
# Publica dist/ na branch gh-pages (GitHub Pages → "Deploy from a branch").
set -e
REMOTE=$(git remote get-url origin)
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git push -q -f "$REMOTE" gh-pages
rm -rf .git
echo "Publicado em gh-pages."
