// Build script to create config.js from Vercel environment variables
// This runs during Vercel's build process

const fs = require('fs');
const path = require('path');

// Read environment variables (Vercel provides these during build)
// Debug: Log all environment variables (masked for security)
console.log('🔍 Environment variables check:');
console.log('   GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
console.log('   GROQ_API_KEY length:', process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.length : 0);
console.log('   AI_SERVICE:', process.env.AI_SERVICE || '(not set)');
console.log('   All env vars starting with GROQ:', Object.keys(process.env).filter(k => k.includes('GROQ')).join(', ') || 'none');

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

// Verify the file was written correctly
const writtenContent = fs.readFileSync(outputPath, 'utf8');
const hasApiKey = writtenContent.includes(`GROQ_API_KEY: '${groqApiKey}'`);

console.log('✅ config.js generated successfully for Vercel');
console.log(`   Output path: ${outputPath}`);
console.log(`   File written: ${fs.existsSync(outputPath)}`);
console.log(`   Contains API key: ${hasApiKey}`);
console.log(`   AI Service: ${aiService}`);
console.log(`   Groq API Key: ${groqApiKey ? '***' + groqApiKey.slice(-4) + ' (length: ' + groqApiKey.length + ')' : '(not set - EMPTY!)'}`);
console.log(`   Hugging Face API Key: ${huggingfaceKey ? '***' + huggingfaceKey.slice(-4) : '(not set)'}`);
console.log(`   Gemini API Key: ${geminiKey ? '***' + geminiKey.slice(-4) : '(not set)'}`);
console.log(`   OpenAI API Key: ${openaiKey ? '***' + openaiKey.slice(-4) : '(not set)'}`);

if (!groqApiKey || groqApiKey.trim() === '') {
    console.error('⚠️  WARNING: GROQ_API_KEY is empty!');
    console.error('   Make sure GROQ_API_KEY is set in Vercel Dashboard → Settings → Environment Variables');
    console.error('   And that it\'s set for the correct environment (Production, Preview, or Development)');
}

