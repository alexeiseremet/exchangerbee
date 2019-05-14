FROM node:alpine
COPY . /usr/share/frontend
WORKDIR /usr/share/frontend
RUN yarn install && yarn build
CMD ["yarn", "start"]
USER node
