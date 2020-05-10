FROM node:alpine

RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
RUN node -v
COPY . .

CMD ["npm", "start"]