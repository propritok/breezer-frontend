# Use Node.js with Alpine base image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install yarn globally
RUN npm install --global yarn

# Copy package.json and yarn.lock before other files
COPY ./package.json ./yarn.lock* ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Install pm2 globally
RUN yarn global add pm2

# Copy all files
COPY ./ ./

# Build the app using yarn
RUN yarn build

# Ensure the `.next` cache directories exist and have correct permissions
RUN mkdir -p /usr/app/.next/cache/images && chown -R node:node /usr/app/.next

# Expose the listening port
EXPOSE 3000

# Run container as non-root user
USER node

# Start the application using yarn
CMD [ "pm2-runtime", "yarn", "--", "start", "--max_old_space_size=512" ]
