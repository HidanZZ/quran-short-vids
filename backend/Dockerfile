FROM node:18.16.0-alpine3.17
WORKDIR /backend
COPY package*.json /backend/
RUN npm install
COPY . /backend
EXPOSE 3001
CMD [ "npm", "run", "dev" ]
