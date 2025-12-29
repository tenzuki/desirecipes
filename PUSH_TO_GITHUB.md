# 📤 Push to GitHub - Quick Steps

You've created the repository `desirecipes`. Now let's push your code!

## 🚀 Quick Commands

Run these in PowerShell (in your project folder):

```powershell
# Step 1: Initialize Git (if not done)
git init

# Step 2: Add all files
git add .

# Step 3: Check what will be committed (VERIFY config.js is NOT listed!)
git status

# Step 4: If config.js shows up, it's not ignored - check .gitignore file
# If config.js is NOT listed, proceed to next step

# Step 5: Create commit
git commit -m "Initial commit - Desi Recipies app"

# Step 6: Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/desirecipes.git

# Step 7: Rename branch to main
git branch -M main

# Step 8: Push to GitHub
git push -u origin main
```

## ⚠️ Important: Check Before Pushing

Before Step 8, make sure `config.js` is NOT in the commit:

```powershell
git status
```

If you see `config.js` listed, it means it's not being ignored. Check that `.gitignore` contains:
```
config.js
```

## ✅ After Successful Push

Once pushed successfully, you can deploy to Vercel!

