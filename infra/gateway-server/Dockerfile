# Use an official lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the server files
COPY . .

# Expose the desired port (change if not 3000)
EXPOSE 3000

# Run the gateway
CMD ["node", "gateway.js"]