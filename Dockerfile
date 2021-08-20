FROM node:12.18.4-alpine

WORKDIR /app

COPY . .

RUN yarn install && yarn cache clean

EXPOSE 8080

CMD ["yarn", "yarn start"]
