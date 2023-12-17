FROM node:20.10.0-alpine3.19

WORKDIR /app
COPY package*.json .
RUN npm i

CMD ["npm", "run", "dev"]