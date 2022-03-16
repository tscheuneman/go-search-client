FROM node:12-alpine
ENV enviorment ${ENV}

WORKDIR /var/www

COPY ./package*.json ./

RUN npm install

COPY ./ .

RUN npm install -g serve

EXPOSE 8080

CMD npm run build && serve ./build -l 8080