# 🚀 Deploying Desi Recipies to Vercel

## Quick Deploy (Easiest Method)

### Option 1: Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)** and sign up/login
2. **Click "Add New Project"**
3. **Import your Git repository** (GitHub, GitLab, or Bitbucket)
   - If you don't have a Git repo, create one first:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git remote add origin <your-repo-url>
     git push -u origin main
     ```
4. **Vercel will auto-detect** it's a static site
5. **Click "Deploy"** - that's it!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name? **desi-recipies** (or your choice)
   - Directory? **./** (current directory)

5. **Your site will be live!** 🎉

## Important Notes

### ✅ What Works Out of the Box

- ✅ Static HTML/CSS/JS files
- ✅ TheMealDB API calls (no CORS issues)
- ✅ All features (search, AI chat, recipes)
- ✅ Contact form (opens email client)

### ⚠️ OpenAI API (If Using)

If you want to use OpenAI API in production:

1. **Don't put API keys in `config.js`** - they'll be exposed!
2. **Use Vercel Environment Variables:**
   - Go to your project settings in Vercel
   - Add environment variable: `OPENAI_API_KEY`
   - Update `config.js` to read from environment:
     ```javascript
     const CONFIG = {
         OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
         AI_SERVICE: process.env.OPENAI_API_KEY ? 'openai' : 'free',
         OPENAI_MODEL: 'gpt-3.5-turbo'
     };
     ```
3. **Note:** Since this is client-side, you'll need a backend proxy for security, OR use the free AI mode (which works great!)

### 📁 File Structure

Make sure these files are in your project:
```
desi-recipies/
├── index.html
├── styles.css
├── app.js
├── config.js
├── indian-kerala-recipes.js
├── vercel.json (optional, but included)
└── README.md
```

## Post-Deployment

After deploying:

1. **Your site will have a URL** like: `https://desi-recipies.vercel.app`
2. **You can add a custom domain** in Vercel project settings
3. **All features work** - no backend needed!

## Troubleshooting

### Issue: API calls not working
- **Solution:** TheMealDB API supports CORS, so it should work. Check browser console for errors.

### Issue: AI not responding
- **Solution:** Free AI mode works without any setup. If using OpenAI, check API key configuration.

### Issue: Contact form not working
- **Solution:** The contact form opens the user's email client. This works on all devices.

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

Enjoy your deployed Desi Recipies app! 🍳✨

