FROM node:18

WORKDIR /app/express-landing

COPY . .

RUN npm i

CMD ["node", "index.js"]