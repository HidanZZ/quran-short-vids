FROM node:14
WORKDIR /backend
COPY package*.json /backend/
RUN npm install
COPY . /backend
EXPOSE 3001
CMD ["node", "server.js"]
