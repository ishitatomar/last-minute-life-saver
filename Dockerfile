FROM node:18

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

COPY server ./server

EXPOSE 8080

CMD ["node", "server/server.js"]