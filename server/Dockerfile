FROM node:alpine

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i

CMD npm run start-${NODE_ENV}