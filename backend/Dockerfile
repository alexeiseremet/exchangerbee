FROM node:alpine
COPY . /usr/share/backend
WORKDIR /usr/share/backend
RUN yarn install
CMD ["yarn", "start"]
USER node
