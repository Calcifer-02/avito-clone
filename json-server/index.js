import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors"; // Добавляем CORS
import jwt from "jsonwebtoken"; // Подключение JWT
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;
const secretKey = "your_secret_key";

app.get("/", (req, res) => {
   res.send("Server is running");
});

app.use(bodyParser.json());
app.use(
   cors({
      origin: "http://localhost:5173", // Разрешить доступ с клиента
      methods: ["GET", "POST"],
   })
); // Разрешаем CORS

// Эндпоинт для логина
app.post("/login", (req, res) => {
   try {
      const { username, password } = req.body;
      console.log("Received data:", req.body);

      console.log(`Попытка входа: ${username}`);
      const dbPath = path.resolve(__dirname, "db.json");
      const db = JSON.parse(fs.readFileSync(dbPath, "UTF-8"));
      const { users = [] } = db;

      const userFromBd = users.find(
         (user) => user.username === username && user.password === password
      );

      if (userFromBd) {
         console.log(`Успешный вход: ${username}`);
         // Создаём JWT
         const token = jwt.sign(
            { id: userFromBd.id, username: userFromBd.username },
            secretKey,
            { expiresIn: "1h" }
         );
         return res.json({ token });
      }

      return res.status(403).json({ message: "User not found" });
   } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
   }
});
app.post("/logout", (req, res) => {
   // На сервере с JWT вы не удаляете токен, просто на клиенте убираете его
   console.log("Пользователь вышел");
   return res.json({ message: "Logout successful" });
});

// Запуск сервера
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
