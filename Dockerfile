FROM node:24.5.0

WORKDIR /user/src

COPY . .

EXPOSE 4000

RUN npm i

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

RUN npm run build

CMD ["npm", "start"]