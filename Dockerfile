# Development Dockerfile for Medusa
FROM node:20-alpine

# Set working directory
WORKDIR /server

# Increase Node.js heap size to prevent OOM during admin dashboard build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files and yarn config
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases .yarn/releases

# Install all dependencies using yarn
RUN yarn install

# Copy source code
COPY . .

# Expose the port Medusa runs on
EXPOSE 9000 5173

# Start with migrations and then the development server
CMD ["./start.sh"]
