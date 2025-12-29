// Build script to create config.js from Vercel environment variables
// This runs during Vercel's build process

const fs = require('fs');
const path = require('path');

// Read environment variables (Vercel provides these during build)
const groqApiKey = process.env.GROQ_API_KEY || '';
const aiService = process.env.AI_SERVICE || 'groq';
const huggingfaceKey = process.env.HUGGINGFACE_API_KEY || '';
const geminiKey = process.env.GEMINI_API_KEY || '';
const openaiKey = process.env.OPENAI_API_KEY || '';
const openaiModel = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

// Create config.js content
const configContent = `// Configuration file for API keys
// Generated from Vercel environment variables during build

const CONFIG = {
    AI_SERVICE: '${aiService}',
    GROQ_API_KEY: '${groqApiKey}',
    HUGGINGFACE_API_KEY: '${huggingfaceKey}',
    GEMINI_API_KEY: '${geminiKey}',
    OPENAI_API_KEY: '${openaiKey}',
    OPENAI_MODEL: '${openaiModel}'
};
`;

// Write config.js to the root directory
const outputPath = path.join(__dirname, 'config.js');
fs.writeFileSync(outputPath, configContent, 'utf8');

console.log('✅ config.js generated successfully for Vercel');
console.log(`   AI Service: ${aiService}`);
console.log(`   Groq API Key: ${groqApiKey ? '***' + groqApiKey.slice(-4) : '(not set)'}`);
console.log(`   Hugging Face API Key: ${huggingfaceKey ? '***' + huggingfaceKey.slice(-4) : '(not set)'}`);
console.log(`   Gemini API Key: ${geminiKey ? '***' + geminiKey.slice(-4) : '(not set)'}`);
console.log(`   OpenAI API Key: ${openaiKey ? '***' + openaiKey.slice(-4) : '(not set)'}`);

