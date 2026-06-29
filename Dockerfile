FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build React app
RUN npm run build

# install simple static server
RUN npm install -g serve

EXPOSE 8080

# serve the dist folder (IMPORTANT)
CMD ["serve", "-s", "dist", "-l", "8080"]
