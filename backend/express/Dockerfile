FROM node:16 as compiler
ENV NODE_ENV development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc

FROM node:16 as runner
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV production
RUN npm install --only=production
COPY --from=compiler /app/dist/ /app/dist/
CMD [ "node", "dist/index.js" ]