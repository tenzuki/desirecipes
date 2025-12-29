# 🤖 Free AI Integration Guide

Your Desi Recipies app now supports **multiple FREE AI services**! Choose the one that works best for you.

## 🎯 Recommended: Groq (Fastest & Easiest)

**Why Groq?**
- ✅ **Completely FREE** with generous limits
- ✅ **Super fast** responses (faster than OpenAI!)
- ✅ **Easy setup** - just get an API key
- ✅ **No credit card** required

### Setup Steps:

1. **Get Free API Key:**
   - Go to https://console.groq.com/keys
   - Sign up (free, no credit card)
   - Create a new API key
   - Copy the key

2. **Configure:**
   - Open `config.js`
   - Set `AI_SERVICE: 'groq'`
   - Add your key: `GROQ_API_KEY: 'your-key-here'`

3. **Done!** Your AI Chef will now use Groq's powerful AI.

---

## 🆓 Option 2: Hugging Face (Works Without API Key!)

**Why Hugging Face?**
- ✅ **Works immediately** - no API key needed!
- ✅ **Completely free** for basic use
- ✅ **No signup required** for basic models

### Setup Steps:

1. **No Setup Needed!**
   - Just set `AI_SERVICE: 'huggingface'` in `config.js`
   - Works immediately!

2. **Optional - Better Performance:**
   - Get free API key: https://huggingface.co/settings/tokens
   - Add to `config.js`: `HUGGINGFACE_API_KEY: 'your-key'`
   - Better rate limits and faster responses

---

## 🆓 Option 3: Google Gemini (Free Tier)

**Why Gemini?**
- ✅ **Generous free tier**
- ✅ **High quality** responses
- ✅ **Google's AI** technology

### Setup Steps:

1. **Get Free API Key:**
   - Go to https://makersuite.google.com/app/apikey
   - Sign in with Google account
   - Create API key (free)
   - Copy the key

2. **Configure:**
   - Open `config.js`
   - Set `AI_SERVICE: 'gemini'`
   - Add your key: `GEMINI_API_KEY: 'your-key-here'`

---

## 📊 Comparison

| Service | Speed | Free Tier | Setup Difficulty | Quality |
|---------|-------|-----------|------------------|---------|
| **Groq** | ⚡⚡⚡ Very Fast | Generous | Easy | High |
| **Hugging Face** | ⚡⚡ Fast | Unlimited (basic) | Easiest | Good |
| **Gemini** | ⚡⚡ Fast | Generous | Easy | High |
| **Free Mode** | ⚡ Instant | Unlimited | None | Basic |

---

## 🚀 Quick Start (Recommended)

**Use Groq - it's the best free option:**

1. Get key: https://console.groq.com/keys
2. Update `config.js`:
   ```javascript
   AI_SERVICE: 'groq',
   GROQ_API_KEY: 'gsk_your_key_here'
   ```
3. Save and reload!

---

## 💡 Current Setup

Your app is currently set to use **Groq** by default (if you add an API key), or falls back to **Free Mode** (keyword-based) if no key is provided.

**To change AI service**, edit `config.js`:
```javascript
AI_SERVICE: 'groq',        // or 'huggingface', 'gemini', 'openai', 'free'
```

---

## ⚠️ Important Notes

- **Never commit API keys** to Git
- **Free tiers have limits** but are generous for personal use
- **All services fallback** to free mode if API fails
- **No credit card needed** for any of these free options!

---

## 🎉 Enjoy Your Free AI!

Your AI Chef is now powered by real AI - completely free! 🍳✨

