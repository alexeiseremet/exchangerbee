FROM node:alpine
COPY --chown=node:node ./ /usr/src/backend
WORKDIR /usr/src/backend
RUN yarn install \
    && chown -R node:node node_modules \
    && ls -la
CMD ["yarn", "dev"]
USER node
