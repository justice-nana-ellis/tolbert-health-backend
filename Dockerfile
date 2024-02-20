FROM node:16.18.1-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY prisma/ ./prisma/

COPY . .

EXPOSE 9000

CMD ["yarn", "start"]
