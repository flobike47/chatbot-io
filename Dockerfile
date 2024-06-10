FROM node:19.9-slim as build

WORKDIR /usr/src/app

COPY . ./

RUN npm install -g vite

RUN npm install

RUN npm run build

# Stage 2

FROM httpd:alpine3.20

COPY --from=build /usr/src/app/dist /usr/local/apache2/htdocs

EXPOSE 80

CMD ["httpd-foreground"]