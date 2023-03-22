FROM node:18-alpine

ENV PORT 3000

WORKDIR /client/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]