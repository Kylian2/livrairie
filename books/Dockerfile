FROM node:lts-alpine3.19 AS builder

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install
COPY ./ /app
RUN npm run build

FROM node:lts-alpine3.19

RUN apk add nginx

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm ci --omit dev
COPY --from=builder /app/build /app

ENV PORT=3333
ENV HOST=0.0.0.0
ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV APP_KEY=N-Uf56oR1UTIOGIVuOA2awn_6xTYJidL
ENV DB_HOST=db
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_DATABASE=books

EXPOSE 3333
ENTRYPOINT ["node", "bin/server.js"]