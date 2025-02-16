const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Подключаем middleware для CORS

// Константы для типов объявлений
const ItemTypes = {
   REAL_ESTATE: "Недвижимость",
   AUTO: "Авто",
   SERVICES: "Услуги",
};

const app = express();
app.use(bodyParser.json()); // Для парсинга JSON в теле запроса
app.use(cors()); // Включаем CORS для всех маршрутов

// Хранилище для объявлений (in-memory)
let items = [];

// Функция для генерации уникальных id для объявлений
const makeCounter = () => {
   let count = 0;
   return () => count++;
};

const itemsIdCounter = makeCounter();

// Эндпоинт для создания нового объявления
app.post("/items", (req, res) => {
   const { name, description, location, type, ...rest } = req.body;

   // Проверка обязательных полей для всех типов
   if (!name || !description || !location || !type) {
      return res.status(400).json({ error: "Missing required common fields" });
   }

   // Проверка обязательных полей в зависимости от типа объявления
   switch (type) {
      case ItemTypes.REAL_ESTATE:
         if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
            return res
               .status(400)
               .json({ error: "Missing required fields for Real estate" });
         }
         break;
      case ItemTypes.AUTO:
         if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
            return res
               .status(400)
               .json({ error: "Missing required fields for Auto" });
         }
         break;
      case ItemTypes.SERVICES:
         if (!rest.serviceType || !rest.experience || !rest.cost) {
            return res
               .status(400)
               .json({ error: "Missing required fields for Services" });
         }
         break;
      default:
         return res.status(400).json({ error: "Invalid type" });
   }

   // Создание нового объявления
   const item = {
      id: itemsIdCounter(),
      name,
      description,
      location,
      type,
      ...rest,
   };

   items.push(item); // Добавляем объявление в хранилище
   res.status(201).json(item); // Отправляем новое объявление в ответе
});

// Эндпоинт для получения всех объявлений
app.get("/items", (req, res) => {
   res.json(items); // Отправляем все объявления
});

// Эндпоинт для получения объявления по id
app.get("/items/:id", (req, res) => {
   const item = items.find((i) => i.id === parseInt(req.params.id, 10));
   if (item) {
      res.json(item); // Отправляем найденное объявление
   } else {
      res.status(404).send("Item not found"); // Ошибка, если не найдено
   }
});

// Эндпоинт для обновления объявления по id
app.put("/items/:id", (req, res) => {
   const item = items.find((i) => i.id === parseInt(req.params.id, 10));
   if (item) {
      Object.assign(item, req.body); // Обновляем поля объявления
      res.json(item); // Отправляем обновленное объявление
   } else {
      res.status(404).send("Item not found"); // Ошибка, если не найдено
   }
});

// Эндпоинт для удаления объявления по id
app.delete("/items/:id", (req, res) => {
   const itemIndex = items.findIndex(
      (i) => i.id === parseInt(req.params.id, 10)
   );
   if (itemIndex !== -1) {
      items.splice(itemIndex, 1); // Удаляем объявление
      res.status(204).send(); // Отправляем успешный ответ без контента
   } else {
      res.status(404).send("Item not found"); // Ошибка, если не найдено
   }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
