import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors"; // Добавляем CORS для разрешения запросов с другого домена
import jwt from "jsonwebtoken"; // Используется для создания JWT токенов для авторизации
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;
const secretKey = "your_secret_key"; // Рекомендуется использовать более безопасный секретный ключ для продакшн

// Простой эндпоинт для проверки работы сервера
app.get("/", (req, res) => {
   res.send("Server is running");
});

// Миддлвар для обработки JSON в теле запроса
app.use(bodyParser.json());
// Разрешаем кросс-доменные запросы с клиентского порта
app.use(
   cors({
      origin: "http://localhost:5173", // Разрешить доступ с клиента
      methods: ["GET", "POST"],
   })
); // CORS настройка

// Эндпоинт для логина
app.post("/login", (req, res) => {
   try {
      const { username, password } = req.body;
      console.log("Received data:", req.body);

      console.log(`Попытка входа: ${username}`);
      const dbPath = path.resolve(__dirname, "db.json");
      const db = JSON.parse(fs.readFileSync(dbPath, "UTF-8"));
      const { users = [] } = db;

      // Проверка наличия пользователя в базе данных
      const userFromBd = users.find(
         (user) => user.username === username && user.password === password
      );

      // Если пользователь найден, создаем JWT токен
      if (userFromBd) {
         console.log(`Успешный вход: ${username}`);
         const token = jwt.sign(
            { id: userFromBd.id, username: userFromBd.username },
            secretKey,
            { expiresIn: "1h" } // Токен истечет через 1 час
         );
         return res.json({ token }); // Возвращаем токен в ответ
      }

      return res.status(403).json({ message: "User not found" }); // Ошибка, если пользователь не найден
   } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message }); // Ошибка сервера
   }
});

// Эндпоинт для выхода
app.post("/logout", (req, res) => {
   // На сервере не нужно удалять токен — его удаление происходит на клиенте
   console.log("Пользователь вышел");
   return res.json({ message: "Logout successful" });
});

// Запуск сервера на порту 8000
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
