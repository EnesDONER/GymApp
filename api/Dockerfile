FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

COPY .env ./

RUN npm install

COPY . .

EXPOSE 8800

CMD ["npm", "start"]