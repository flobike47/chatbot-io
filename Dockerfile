FROM node:18.3 as build

WORKDIR /usr/src/app

COPY . ./

RUN npm install -g vite

RUN npm install

RUN npm run build

# Stage 2

FROM httpd:2.4

COPY --from=build /usr/src/app/dist /usr/local/apache2/htdocs

EXPOSE 80

CMD ["httpd-foreground"]