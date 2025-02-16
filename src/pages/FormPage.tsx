import React, { useState } from "react";
import { Form, Select, Button, message } from "antd";
import axios from "axios";
import Ad from "../types"; // Импорт типов объявления
import Category from "../categorys"; // Тип для категорий
import CommonFields from "../components/FormFields/CommonFields"; // Общие поля для формы
import RealEstateFields from "../components/FormFields/RealEstateFields"; // Поля для недвижимости
import AutoFields from "../components/FormFields/AutoFields"; // Поля для автомобилей
import ServicesFields from "../components/FormFields/ServicesFields"; // Поля для услуг

const { Option } = Select;

const FormPage: React.FC<{ onSubmit: (values: Ad) => void }> = ({
   onSubmit,
}) => {
   const [category, setCategory] = useState<Category | null>(null); // Состояние для выбранной категории
   const [form] = Form.useForm();
   const [messageApi, contextHolder] = message.useMessage(); // API для сообщений

   const handleCategoryChange = (value: string) => {
      setCategory(value as Category); // Обновление категории при изменении
   };

   const handleSubmit = async (values: Omit<Ad, "id">) => {
      try {
         // Отправка данных на сервер для создания объявления
         const response = await axios.post(
            "http://localhost:3000/items", // URL сервера
            values
         );
         const newAd = response.data; // Получение данных нового объявления
         messageApi.success("Объявление успешно добавлено!"); // Уведомление об успешном добавлении
         onSubmit(newAd); // Передаем новое объявление родительскому компоненту
         form.resetFields(); // Сброс формы
         setCategory(null); // Сброс категории
      } catch (error: any) {
         console.error("Ошибка при добавлении объявления:", error);
         messageApi.error("Не удалось добавить объявление"); // Уведомление об ошибке
      }
   };

   return (
      <>
         {contextHolder} {/* Контейнер для уведомлений */}
         <h1>Форма добавления объявления</h1>
         <Form form={form} onFinish={handleSubmit} layout="vertical">
            <CommonFields /> {/* Общие поля для всех типов объявлений */}
            <Form.Item
               name="type"
               label="Категория"
               rules={[{ required: true, message: "Выберите категорию" }]}
            >
               <Select onChange={handleCategoryChange}>
                  {" "}
                  {/* Выбор категории */}
                  <Option value="Недвижимость">Недвижимость</Option>
                  <Option value="Авто">Авто</Option>
                  <Option value="Услуги">Услуги</Option>
               </Select>
            </Form.Item>
            {/* Динамическое отображение полей в зависимости от выбранной категории */}
            {category === "Недвижимость" && <RealEstateFields />}
            {category === "Авто" && <AutoFields />}
            {category === "Услуги" && <ServicesFields />}
            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Создать объявление
               </Button>
            </Form.Item>
         </Form>
      </>
   );
};

export default FormPage;
