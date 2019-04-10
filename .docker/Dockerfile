FROM node:8
COPY ../ /usr/src/exbee
WORKDIR /usr/src/exbee
VOLUME ../pages /usr/src/exbee/pages
RUN yarn install
RUN yarn build
RUN yarn build-storybook
CMD ["yarn", "start"]

EXPOSE 8080

# Init site.
# docker build --no-cache --tag=exbee .
# docker run -it --publish=8080:8080 exbee
