FROM node:alpine

ENV PORT 3000

WORKDIR /client/app

COPY package.json /client/app
COPY package-lock.json /client/app

RUN npm install

COPY . /client/app

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]
