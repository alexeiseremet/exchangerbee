FROM node:alpine
COPY --chown=node:node ./ /usr/src/frontend
WORKDIR /usr/src/frontend
RUN yarn install && yarn build \
    && chown -R node:node node_modules \
    && chown -R node:node .next
RUN ls -la
CMD ["yarn", "start"]
USER node
