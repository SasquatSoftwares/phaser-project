FROM node:14-alpine AS builder
WORKDIR /srv/app
COPY . .
RUN npm install
RUN npm build
CMD ["npm", "start"]