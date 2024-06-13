FROM node:alpine3.19 as base

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . .
RUN npm run build


FROM base as influx
COPY --from=base /app/dist /app/dist
EXPOSE 3000
CMD [ "node", "/app/dist/main.js" ]
