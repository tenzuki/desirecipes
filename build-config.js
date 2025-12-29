// Build script to create config.js from environment variables
// Used during Docker build for Railway deployment
// For local development, use load-env.js instead

const fs = require('fs');
const path = require('path');

// Read environment variables (Railway will provide these)
const groqApiKey = process.env.GROQ_API_KEY || '';
const aiService = process.env.AI_SERVICE || 'groq';
const huggingfaceKey = process.env.HUGGINGFACE_API_KEY || '';
const geminiKey = process.env.GEMINI_API_KEY || '';
const openaiKey = process.env.OPENAI_API_KEY || '';

// Create config.js content
const configContent = `// Configuration file for API keys
// Generated from environment variables during Docker build

const CONFIG = {
    AI_SERVICE: '${aiService}',
    GROQ_API_KEY: '${groqApiKey}',
    HUGGINGFACE_API_KEY: '${huggingfaceKey}',
    GEMINI_API_KEY: '${geminiKey}',
    OPENAI_API_KEY: '${openaiKey}',
    OPENAI_MODEL: 'gpt-3.5-turbo'
};
`;

// Determine output path (Docker runtime vs local)
// In Docker, write to nginx html directory
// Locally, write to current directory
const isDocker = fs.existsSync('/usr/share/nginx/html');
const outputPath = isDocker ? '/usr/share/nginx/html/config.js' : path.join(__dirname, 'config.js');

// Log what we're doing
console.log(`Environment variables:`);
console.log(`- AI_SERVICE: ${aiService}`);
console.log(`- GROQ_API_KEY: ${groqApiKey ? '***' + groqApiKey.slice(-4) : '(empty)'}`);

fs.writeFileSync(outputPath, configContent, 'utf8');
console.log(`✅ config.js created at: ${outputPath}`);

