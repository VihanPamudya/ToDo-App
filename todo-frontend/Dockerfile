FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install --save-dev jest-environment-jsdom

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--host", "0.0.0.0"]