# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /server

# Increase Node.js heap size for Vite/Esbuild
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases .yarn/releases

# Install all dependencies
RUN yarn install

# Copy source code
COPY . .

# Build the Medusa backend and admin dashboard
RUN yarn build

# Final production stage
FROM node:20-alpine

WORKDIR /server

# Copy built files and node_modules from builder
COPY --from=builder /server/.medusa ./.medusa
COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/package.json ./package.json
COPY --from=builder /server/medusa-config.ts ./medusa-config.ts
COPY --from=builder /server/start.sh ./start.sh

# Ensure start script is executable
RUN chmod +x ./start.sh

ENV NODE_ENV=production

EXPOSE 9000

CMD ["./start.sh"]
