Set-Location new-portfolio
ng build --base-href ./
Set-Location ..
Copy-Item -Recurse -Force .\new-portfolio\dist\new-portfolio\browser\* .\
Copy-Item .\index.html .\404.html
git add .
git commit -m "deploy: update portfolio"
git push
Write-Host "✅ Deployed to levijcdf.com"