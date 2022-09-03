FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . . 
CMD [ "node", "dist/app.js" ]