

FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY index.html ./
COPY src/ ./src/
RUN npm install
COPY . .
ENV VITE_API_URL=http://server:3000/items
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


