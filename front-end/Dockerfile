FROM node:latest as react-build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY public/index.html /usr/src/app/public/index.html
COPY src/index.js /usr/src/app/src/index.js
COPY src /usr/src/app/src
RUN npm install --silent
CMD [ "npm", "run", "start" ]
