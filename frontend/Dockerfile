FROM node:alpine
COPY . /usr/share/exbee/frontend
WORKDIR /usr/share/exbee/frontend
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
