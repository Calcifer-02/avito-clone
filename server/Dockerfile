
# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /server

# Копируем package.json и package-lock.json для установки зависимостей
COPY server/package.json server/package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы сервера
COPY server/ .

# Указываем порт, на котором будет работать сервер
EXPOSE 3000

# Запускаем сервер
CMD ["node", "app.js"]
