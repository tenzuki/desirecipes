// Configuration file for API keys
// IMPORTANT: For production use, never commit this file with real API keys
// Use environment variables or a secure backend instead

const CONFIG = {
    // AI Service Configuration
    // Options: 'free', 'groq', 'huggingface', 'openai', 'gemini'
    AI_SERVICE: 'groq', // Default to Groq (free and fast!)
    
    // Groq API (FREE - Fast & Generous Free Tier)
    // Get API key from: https://console.groq.com/keys
    // Free tier: Very generous, fast responses
    // For Vercel: Add GROQ_API_KEY as environment variable in Vercel dashboard
    GROQ_API_KEY: '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', // Your API key (will work on Vercel too)
    
    // Hugging Face (FREE - No API key needed for some models!)
    // Works without API key for basic models
    HUGGINGFACE_API_KEY: '', // Optional - get from https://huggingface.co/settings/tokens
    
    // Google Gemini (FREE Tier Available)
    // Get API key from: https://makersuite.google.com/app/apikey
    GEMINI_API_KEY: '', // Add your Gemini API key here
    
    // OpenAI API (Paid, but has free tier)
    OPENAI_API_KEY: '', // Add your OpenAI API key here
    OPENAI_MODEL: 'gpt-3.5-turbo'
};

// FREE AI Services Guide:
// 
// 1. GROQ (Recommended - Fastest & Easiest)
//    - Get free API key: https://console.groq.com/keys
//    - Very generous free tier
//    - Set AI_SERVICE: 'groq' and add GROQ_API_KEY
//
// 2. HUGGING FACE (Works without API key!)
//    - Can work without API key (limited)
//    - Better with API key: https://huggingface.co/settings/tokens
//    - Set AI_SERVICE: 'huggingface'
//
// 3. GEMINI (Google - Free Tier)
//    - Get free API key: https://makersuite.google.com/app/apikey
//    - Generous free tier
//    - Set AI_SERVICE: 'gemini' and add GEMINI_API_KEY
//
// 4. FREE MODE (Current - No setup needed)
//    - Works immediately, no API key
//    - Set AI_SERVICE: 'free'

