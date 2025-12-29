# 🔧 Fix Commit History - Remove Secret

The old commit still has the API key. Here's how to fix it:

## ✅ Solution: Rewrite Commit History

Run these commands **in order**:

```powershell
# Step 1: Check current commit
git log --oneline

# Step 2: Reset to before the commit with the secret (keep your changes)
git reset --soft HEAD~1

# Step 3: Make sure VERCEL_DEPLOY.md is deleted or fixed
# (You already deleted it, so this should be fine)

# Step 4: Re-commit everything WITHOUT the secret
git add .
git commit -m "Initial commit - Desi Recipies app"

# Step 5: Force push (this rewrites history on GitHub)
git push -u origin main --force
```

## ⚠️ Alternative: Use GitHub's Unblock Link

If you don't want to rewrite history:

1. **Click this link** (from your error):
   https://github.com/tenzuki/DesiRecipes/security/secret-scanning/unblock-secret/37WAiPnbC95fQtNLaNGEyzAPVTz

2. **Click "Allow secret"** (one-time exception)

3. **Then push normally:**
   ```powershell
   git push -u origin main
   ```

## 🎯 Recommended: Rewrite History

The first method is better because it completely removes the secret from your Git history.

