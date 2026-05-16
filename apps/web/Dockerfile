FROM node:24-alpine

WORKDIR /workspace

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/config-schema/package.json packages/config-schema/package.json

RUN npm install

EXPOSE 5173
