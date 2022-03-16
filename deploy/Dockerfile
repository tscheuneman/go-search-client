FROM node:12-alpine
ENV enviorment = ${ENV}

WORKDIR /var/www

COPY ./package*.json ./

RUN npm install

COPY ./ .

RUN npm install -g serve

RUN ls

RUN npm run build

EXPOSE 8080
CMD ["serve", "./build", "-l 8080"]