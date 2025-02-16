import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, message } from "antd";
import axios from "axios";
import Ad from "../types";
import CommonItemFields from "../components/ItemFields/CommonItemFields";
import RealEstateItemFields from "../components/ItemFields/RealEstateItemFields";
import AutoItemFields from "../components/ItemFields/AutoItemFields";
import ServicesItemFields from "../components/ItemFields/ServicesItemFields";

const ItemPage: React.FC = () => {
   const { id } = useParams<{ id: string }>(); // Извлекаем ID из параметров URL
   const navigate = useNavigate(); // Для навигации по страницам
   const [ad, setAd] = useState<Ad | null>(null); // Состояние для объявления
   const [isEditing, setIsEditing] = useState(false); // Состояние для режима редактирования
   const [messageApi, contextHolder] = message.useMessage(); // Для отображения сообщений

   useEffect(() => {
      // Получаем объявление с сервера по ID
      const fetchAd = async () => {
         try {
            const response = await axios.get(
               `http://localhost:3000/items/${id}`
            );
            setAd(response.data); // Устанавливаем полученное объявление в состояние
         } catch (error) {
            console.error("Ошибка при загрузке объявления:", error);
         }
      };
      fetchAd();
   }, [id]); // Загружаем данные при изменении ID в URL

   const handleSubmit = async (values: Partial<Ad>) => {
      // Отправка обновленных данных на сервер
      try {
         const response = await axios.put(
            `http://localhost:3000/items/${id}`,
            values
         );
         setAd(response.data); // Обновляем состояние с новым значением объявления
         messageApi.success("Изменения успешно сохранены!"); // Показываем успех
         setIsEditing(false); // Выключаем режим редактирования
      } catch (error) {
         console.error("Ошибка при обновлении объявления:", error);
         messageApi.error("Не удалось сохранить изменения"); // Ошибка
      }
   };

   const handleDelete = async () => {
      // Удаление объявления
      try {
         await axios.delete(`http://localhost:3000/items/${id}`);
         messageApi.success("Объявление успешно удалено!"); // Показываем успех
         navigate("/list"); // Переход на страницу списка
      } catch (error) {
         console.error("Ошибка при удалении объявления:", error);
         messageApi.error("Не удалось удалить объявление"); // Ошибка
      }
   };

   const toggleEdit = () => {
      setIsEditing(!isEditing); // Переключение режима редактирования
      messageApi.info(
         isEditing
            ? "Режим редактирования отключен"
            : "Режим редактирования активен"
      ); // Информация о режиме
   };

   if (!ad) {
      return <p>Объявление не найдено</p>; // Если объявление не найдено, показываем сообщение
   }

   return (
      <div>
         {contextHolder}
         <h1>Просмотр объявления</h1>
         <h2>{ad.name}</h2>
         <p>{ad.description}</p>
         <p>Локация: {ad.location}</p>
         <h3>Категория: {ad.type}</h3>

         {/* Отображаем дополнительные параметры в зависимости от категории */}
         {ad.type === "Недвижимость" && (
            <>
               <p>Тип недвижимости: {ad.propertyType}</p>
               <p>Площадь: {ad.area} кв.м</p>
               <p>Количество комнат: {ad.rooms}</p>
               <p>Цена: {ad.price} руб.</p>
            </>
         )}
         {ad.type === "Авто" && (
            <>
               <p>Марка: {ad.brand}</p>
               <p>Модель: {ad.model}</p>
               <p>Год выпуска: {ad.year}</p>
               <p>Пробег: {ad.mileage} км</p>
            </>
         )}
         {ad.type === "Услуги" && (
            <>
               <p>Тип услуги: {ad.serviceType}</p>
               <p>Опыт работы: {ad.experience} лет</p>
               <p>Стоимость услуги: {ad.cost} руб.</p>
               <p>График работы: {ad.schedule}</p>
            </>
         )}

         {/* Форма для редактирования объявления */}
         <Form onFinish={handleSubmit} initialValues={ad}>
            <CommonItemFields isEditing={isEditing} />
            {ad.type === "Недвижимость" && (
               <RealEstateItemFields isEditing={isEditing} />
            )}
            {ad.type === "Авто" && <AutoItemFields isEditing={isEditing} />}
            {ad.type === "Услуги" && (
               <ServicesItemFields isEditing={isEditing} />
            )}
            <Button
               type="primary"
               htmlType="submit"
               block
               disabled={!isEditing}
            >
               Сохранить
            </Button>
         </Form>

         {/* Кнопка для переключения режима редактирования */}
         <Button
            onClick={toggleEdit}
            style={{
               marginTop: "20px",
               marginRight: "10px",
               borderRadius: "4px",
               backgroundColor: isEditing ? "#d9d9d9" : "#1677ff",
               color: isEditing ? "#a0a0a0" : "white",
               cursor: isEditing ? "not-allowed" : "pointer",
            }}
            type="default"
            block
            disabled={isEditing}
         >
            Редактировать
         </Button>

         <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            {/* Кнопки для навигации и удаления */}
            <Button
               onClick={() => navigate("/list")}
               style={{
                  marginRight: "10px",
                  width: "150px",
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                  fontWeight: "bold",
               }}
            >
               Назад
            </Button>
            <Button
               onClick={handleDelete}
               type="primary"
               danger
               style={{
                  width: "150px",
                  borderRadius: "4px",
                  fontWeight: "bold",
               }}
            >
               Удалить
            </Button>
         </div>
      </div>
   );
};

export default ItemPage;
