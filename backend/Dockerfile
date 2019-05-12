FROM node:alpine
COPY . /usr/share/exbee/backend
WORKDIR /usr/share/exbee/backend
RUN yarn install
CMD ["yarn", "start"]
