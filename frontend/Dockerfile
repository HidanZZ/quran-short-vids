FROM node:18.16.0-alpine3.17
WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install
COPY . /frontend
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
