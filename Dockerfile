# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

COPY index.html ./
# Устанавливаем зависимости
RUN npm install

# Копируем все файлы клиента
COPY src/ .

COPY . .

# Пример для клиента в Dockerfile
ENV VITE_API_URL=http://server:3000/items


# Запускаем клиент в dev-режиме с флагом --host для доступа снаружи контейнера
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

