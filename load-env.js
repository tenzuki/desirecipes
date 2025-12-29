// Simple script to load .env file and generate config.js for local development
// This is only used for local development
// For Railway, config.js is generated during Docker build

const fs = require('fs');
const path = require('path');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
    // Read .env file
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = {};
    
    // Parse .env file (simple parser)
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                envVars[key.trim()] = valueParts.join('=').trim();
            }
        }
    });
    
    // Generate config.js
    const configContent = `// Configuration file for API keys
// Generated from .env file for local development

const CONFIG = {
    AI_SERVICE: '${envVars.AI_SERVICE || 'groq'}',
    GROQ_API_KEY: '${envVars.GROQ_API_KEY || ''}',
    HUGGINGFACE_API_KEY: '${envVars.HUGGINGFACE_API_KEY || ''}',
    GEMINI_API_KEY: '${envVars.GEMINI_API_KEY || ''}',
    OPENAI_API_KEY: '${envVars.OPENAI_API_KEY || ''}',
    OPENAI_MODEL: 'gpt-3.5-turbo'
};
`;
    
    fs.writeFileSync(path.join(__dirname, 'config.js'), configContent, 'utf8');
    console.log('✅ config.js generated from .env file');
} else {
    console.log('⚠️  .env file not found. Using default config.js');
}

