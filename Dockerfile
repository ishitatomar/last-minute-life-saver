FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080
RUN ls -R /app
CMD ["node", "server/server.js"]