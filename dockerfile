FROM node:16-alpine as development

WORKDIR /usr/app

COPY package.json yarn.lock /usr/app/

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package*.json .

RUN yarn install --only=production

COPY --from=development /usr/app/build ./build

CMD ["node", "build/index.js"]

