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
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const [ad, setAd] = useState<Ad | null>(null);
   const [isEditing, setIsEditing] = useState(false);
   const [messageApi, contextHolder] = message.useMessage();

   useEffect(() => {
      const fetchAd = async () => {
         try {
            const response = await axios.get(
               `http://localhost:3000/items/${id}`
            );
            setAd(response.data);
         } catch (error) {
            console.error("Ошибка при загрузке объявления:", error);
         }
      };
      fetchAd();
   }, [id]);

   const handleSubmit = async (values: Partial<Ad>) => {
      try {
         const response = await axios.put(
            `http://localhost:3000/items/${id}`,
            values
         );
         setAd(response.data);
         messageApi.success("Изменения успешно сохранены!");
         setIsEditing(false);
      } catch (error) {
         console.error("Ошибка при обновлении объявления:", error);
         messageApi.error("Не удалось сохранить изменения");
      }
   };

   const handleDelete = async () => {
      try {
         await axios.delete(`http://localhost:3000/items/${id}`);
         messageApi.success("Объявление успешно удалено!");
         navigate("/list");
      } catch (error) {
         console.error("Ошибка при удалении объявления:", error);
         messageApi.error("Не удалось удалить объявление");
      }
   };

   const toggleEdit = () => {
      setIsEditing(!isEditing);
      if (!isEditing) {
         messageApi.info("Режим редактирования активен");
      } else {
         messageApi.info("Режим редактирования отключен");
      }
   };

   if (!ad) {
      return <p>Объявление не найдено</p>;
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
