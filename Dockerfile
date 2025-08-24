# Use Node.js with Alpine base image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
COPY ./package*.json ./

# Install dependencies and pm2
RUN npm install
RUN npm install --global pm2

# Copy all files
COPY ./ ./

# Build the app
RUN npm run build

# Ensure the `.next` cache directories exist and have correct permissions
RUN mkdir -p /usr/app/.next/cache/images && chown -R node:node /usr/app/.next

# Expose the listening port
EXPOSE 3000

# Run container as non-root user
USER node

# Start the application
CMD [ "pm2-runtime", "npm", "--", "start", "--max_old_space_size=512" ]
