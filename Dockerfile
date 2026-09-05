FROM node:22-alpine AS client-build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY index.html ./
COPY src ./src
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install --omit=dev
COPY server ./server
COPY --from=client-build /app/dist ./dist
EXPOSE 4000
CMD ["node", "server/index.js"]