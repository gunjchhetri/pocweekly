FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
EXPOSE 8080
CMD [ "node", "dist/app.js" ]