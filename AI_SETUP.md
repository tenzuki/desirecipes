# 🤖 AI Assistant Setup Guide

The Recipe Generator now includes an AI Cooking Assistant that can help with:
- Recipe suggestions and modifications
- Cooking tips and techniques
- Ingredient substitutions
- Answering cooking questions
- Meal planning ideas

## 🆓 Free Mode (Default)

The app comes with a **free AI assistant** that works immediately - no setup required! It uses a smart keyword-based system to provide helpful cooking advice.

**Features:**
- ✅ Works immediately, no API key needed
- ✅ Answers common cooking questions
- ✅ Provides substitution suggestions
- ✅ Offers cooking tips and advice
- ✅ Helps with recipe ideas

## 🔑 OpenAI Integration (Optional)

For more advanced AI responses, you can integrate OpenAI's API:

### Setup Steps:

1. **Get an OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Sign up or log in
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Configure the App:**
   - Open `config.js`
   - Paste your API key in `OPENAI_API_KEY`
   - Change `AI_SERVICE` from `'free'` to `'openai'`

   ```javascript
   const CONFIG = {
       OPENAI_API_KEY: 'sk-your-api-key-here',
       AI_SERVICE: 'openai', // Change to 'openai'
       OPENAI_MODEL: 'gpt-3.5-turbo'
   };
   ```

3. **Save and Reload:**
   - Save `config.js`
   - Reload the app in your browser
   - The AI will now use OpenAI for responses

### Important Notes:

⚠️ **API Costs:** OpenAI charges based on usage. Check their pricing at https://openai.com/pricing

⚠️ **Security:** Never commit your API key to version control. For production, use environment variables or a backend server.

⚠️ **Rate Limits:** OpenAI has rate limits. The free tier has usage restrictions.

## 🎯 Using the AI Assistant

1. **Click the "AI Chef" tab** in the navigation
2. **Type your question** in the input field
3. **Press Enter** or click the send button
4. **Get instant help** with cooking questions!

### Example Questions:

- "What are some easy dinner recipes?"
- "How do I substitute eggs in baking?"
- "What are healthy cooking tips?"
- "How do I make my pasta taste better?"
- "What can I make with chicken and tomatoes?"

### Quick Suggestions:

Click the suggestion chips for quick common questions!

## 🔧 Troubleshooting

### AI not responding?
- Check your internet connection
- If using OpenAI, verify your API key is correct
- Check browser console for errors (F12)

### OpenAI API errors?
- Verify your API key is valid
- Check your OpenAI account has credits
- Ensure CORS is enabled (OpenAI API supports CORS)

### Want to switch back to free mode?
- Set `AI_SERVICE: 'free'` in `config.js`
- Or remove/comment out your API key

## 💡 Tips

- The free mode works great for most common questions
- OpenAI provides more detailed and contextual responses
- You can switch between modes anytime by editing `config.js`
- The AI learns from your questions to provide better answers

Enjoy your AI cooking assistant! 🍳✨

