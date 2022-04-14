FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN npm i -D nodemon

RUN npm i -D pm2

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]