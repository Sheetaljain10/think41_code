# frontend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve the React app using a static server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
