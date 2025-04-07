FROM node:18-alpine

RUN apk add --no-cache \
    bash \
    curl \
    git \
    xvfb \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install --save-dev jest-environment-jsdom

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--host", "0.0.0.0"]