FROM node:16

WORKDIR /app
COPY . .
CMD ["node", "dist/main.js"]

