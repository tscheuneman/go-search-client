FROM node:12-alpine
ENV enviorment = ${ENV}
ENV SERVICE_PORT 3000

WORKDIR /var/www

COPY ./package*.json ./

RUN npm install

COPY ./ .

RUN npm install -g serve

RUN ls

RUN npm run build

EXPOSE 8080
CMD ["serve", "./build", "-l ${SERVICE_PORT}"]