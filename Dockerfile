# Use nginx to serve static files
FROM nginx:alpine

# Install Node.js to run build script
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Copy build script
COPY build-config.js ./

# Copy all files to nginx html directory
COPY index.html styles.css app.js indian-kerala-recipes.js vercel.json /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build config.js from environment variables
# Railway will provide these as environment variables during build
# For local development: use .env file (see ENV_SETUP.md)
ENV GROQ_API_KEY=${GROQ_API_KEY:-}
ENV AI_SERVICE=${AI_SERVICE:-groq}
ENV HUGGINGFACE_API_KEY=${HUGGINGFACE_API_KEY:-}
ENV GEMINI_API_KEY=${GEMINI_API_KEY:-}
ENV OPENAI_API_KEY=${OPENAI_API_KEY:-}

# Generate config.js using build script
RUN node build-config.js

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

