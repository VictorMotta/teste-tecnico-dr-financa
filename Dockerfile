FROM node:24.5.0

WORKDIR /user/src

COPY . .

EXPOSE 4000

RUN npm i
RUN npm run build

CMD ["npm", "start"]