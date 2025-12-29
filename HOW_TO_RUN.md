# 🚀 How to Run the Recipe Generator

## Method 1: Direct Open (Simplest) ⚡

1. **Navigate to the project folder** (`E:\receipe generator`)
2. **Double-click `index.html`** - It will open in your default browser
3. **That's it!** Start searching for recipes

> ⚠️ **Note:** Some browsers may have CORS restrictions when opening files directly. If you encounter errors, use Method 2 instead.

---

## Method 2: Using a Local Server (Recommended) 🌐

### Option A: Using Python (Easiest)

1. **Open PowerShell or Command Prompt** in the project folder
2. **Run one of these commands:**

   **For Python 3:**
   ```bash
   python -m http.server 8000
   ```
   
   **Or if you have Python 3 specifically:**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open your browser** and go to: `http://localhost:8000`
4. **To stop the server:** Press `Ctrl+C` in the terminal

### Option B: Using the Batch File (Windows)

1. **Double-click `run-server.bat`** in the project folder
2. **Open your browser** and go to: `http://localhost:8000`
3. **To stop:** Press `Ctrl+C` in the terminal window

### Option C: Using Node.js (if you have it)

1. **Install a simple server globally:**
   ```bash
   npm install -g http-server
   ```

2. **Run the server:**
   ```bash
   http-server -p 8000
   ```

3. **Open your browser** and go to: `http://localhost:8000`

### Option D: Using VS Code Live Server

1. **Install the "Live Server" extension** in VS Code
2. **Right-click on `index.html`**
3. **Select "Open with Live Server"**

---

## ✅ Quick Start Checklist

- [ ] Make sure you have an **internet connection** (required for API calls)
- [ ] Open `index.html` in a modern browser (Chrome, Firefox, Edge, Safari)
- [ ] Try searching for a dish like "Pasta" or "Chicken"
- [ ] Or add ingredients and find matching recipes

---

## 🐛 Troubleshooting

### "Cannot fetch recipes"
- **Solution:** Check your internet connection
- The app needs internet to fetch recipes from TheMealDB API

### "CORS Error" or "Blocked by CORS policy"
- **Solution:** Use Method 2 (local server) instead of opening the file directly
- This happens when opening HTML files directly in some browsers

### "Python not found"
- **Solution:** 
  - Install Python from https://www.python.org/
  - Or use Method 1 (direct open) if your browser allows it
  - Or use VS Code Live Server extension

### Recipes not loading
- **Solution:** 
  - Check internet connection
  - Try a different dish name
  - Check browser console for errors (F12)

---

## 📱 Testing

Once running, try these searches:
- **Dish search:** "Pasta", "Chicken", "Pancakes", "Pizza"
- **Ingredients:** Add "chicken", "tomato", "onion" and find recipes

---

## 🎉 You're All Set!

The app is now running and ready to use. Enjoy discovering new recipes! 🍳

