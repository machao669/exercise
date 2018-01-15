FROM node:6.12.3

COPY ./ ./
RUN npm install
RUN npm rebuild node-sass --force
RUN npm run rbuild
RUN npm run server