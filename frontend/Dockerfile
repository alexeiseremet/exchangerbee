FROM node:12-alpine
COPY --chown=node:node ./ /usr/src/frontend
WORKDIR /usr/src/frontend
RUN yarn install \
    && yarn build \
    && chown -R node:node node_modules \
    && chown -R node:node .next \
    && ls -la
CMD ["yarn", "start"]
USER node:node
