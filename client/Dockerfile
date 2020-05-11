FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
RUN node -v
COPY . .

CMD ["npm", "run", "dev"]