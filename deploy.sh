#!/bin/bash
set -e

cd new-portfolio
ng build --base-href ./
cd ..
cp -r new-portfolio/dist/new-portfolio/browser/. .
cp index.html 404.html
git add .
git commit -m "deploy: update portfolio"
git push
echo "✅ Deployed to levijcdf.com"