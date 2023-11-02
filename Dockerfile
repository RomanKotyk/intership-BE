FROM node:18-alpine
ARG PORT=3000
ENV PORT=${PORT}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]

