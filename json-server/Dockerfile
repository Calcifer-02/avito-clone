# Используем лёгкий образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /json-server

# Копируем package.json и package-lock.json
COPY json-server/package.json json-server/package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы сервера авторизации
COPY json-server/ .

# Открываем порт 8000 для сервера авторизации
EXPOSE 8000

# Запускаем сервер авторизации
CMD ["node", "index.js"]
