FROM node:18-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY public /app/public
COPY src /app/src

RUN sed -i 's|"http://localhost:5000"|"http://backend:5000"|' package.json

EXPOSE 3000

CMD ["npm", "start"]

