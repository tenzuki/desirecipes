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

# Copy build script (will be used at runtime)
COPY build-config.js /usr/share/nginx/html/

# Railway uses dynamic PORT and environment variables at runtime
# Create startup script that generates config.js and starts nginx
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'set -e' >> /start.sh && \
    echo 'PORT=${PORT:-80}' >> /start.sh && \
    echo 'echo "Generating config.js from environment variables..."' >> /start.sh && \
    echo 'node /usr/share/nginx/html/build-config.js' >> /start.sh && \
    echo 'echo "Updating nginx to listen on port $PORT..."' >> /start.sh && \
    echo 'sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/conf.d/default.conf' >> /start.sh && \
    echo 'echo "Starting nginx on port $PORT"' >> /start.sh && \
    echo 'exec nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Expose port (Railway will set PORT dynamically)
EXPOSE 80

# Start nginx using startup script
CMD ["/start.sh"]

