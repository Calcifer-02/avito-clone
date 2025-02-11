import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import Ad from "../types";
import axios from "axios"; // Импортируем axios
const { Option } = Select;

const ItemPage = () => {
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

   if (!ad) {
      return <p>Объявление не найдено</p>;
   }

   const toggleEdit = () => {
      setIsEditing(!isEditing);
      if (!isEditing) {
         messageApi.info("Режим редактирования активен");
      } else {
         messageApi.info("Режим редактирования отключен");
      }
   };

   return (
      <div>
         {contextHolder} {/* Добавляем сюда для работы уведомлений */}
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
            <Form.Item
               name="name"
               label="Заголовок"
               rules={[{ required: true }]}
            >
               <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item
               name="description"
               label="Описание"
               rules={[{ required: true }]}
            >
               <Input.TextArea disabled={!isEditing} />
            </Form.Item>
            <Form.Item
               name="location"
               label="Локация"
               rules={[{ required: true }]}
            >
               <Input disabled={!isEditing} />
            </Form.Item>
            <Form.Item
               name="type" // Изменено с category на type
               label="Категория"
               style={{ display: "none" }}
            >
               <Input disabled={true} />
            </Form.Item>

            {ad.type === "Недвижимость" && (
               <>
                  <Form.Item name="propertyType" label="Тип недвижимости">
                     <Select disabled={!isEditing}>
                        <Option value="Квартира">Квартира</Option>
                        <Option value="Дом">Дом</Option>
                        <Option value="Коттедж">Коттедж</Option>
                     </Select>
                  </Form.Item>
                  <Form.Item name="area" label="Площадь (кв.м)">
                     <InputNumber min={1} disabled={!isEditing} />
                  </Form.Item>
                  <Form.Item name="rooms" label="Количество комнат">
                     <InputNumber min={1} disabled={!isEditing} />
                  </Form.Item>
                  <Form.Item name="price" label="Цена">
                     <InputNumber min={0} disabled={!isEditing} />
                  </Form.Item>
               </>
            )}

            {ad.type === "Авто" && (
               <>
                  <Form.Item name="brand" label="Марка">
                     <Input disabled={!isEditing} />
                  </Form.Item>
                  <Form.Item name="model" label="Модель">
                     <Input disabled={!isEditing} />
                  </Form.Item>
                  <Form.Item name="year" label="Год выпуска">
                     <InputNumber
                        min={1900}
                        max={new Date().getFullYear()}
                        disabled={!isEditing}
                     />
                  </Form.Item>
                  <Form.Item name="mileage" label="Пробег (км)">
                     <InputNumber min={0} disabled={!isEditing} />
                  </Form.Item>
               </>
            )}

            {ad.type === "Услуги" && (
               <>
                  <Form.Item name="serviceType" label="Тип услуги">
                     <Select disabled={!isEditing}>
                        <Option value="Ремонт">Ремонт</Option>
                        <Option value="Уборка">Уборка</Option>
                        <Option value="Доставка">Доставка</Option>
                     </Select>
                  </Form.Item>
                  <Form.Item name="experience" label="Опыт работы (лет)">
                     <InputNumber min={0} disabled={!isEditing} />
                  </Form.Item>
                  <Form.Item name="cost" label="Стоимость">
                     <InputNumber min={0} disabled={!isEditing} />
                  </Form.Item>
                  <Form.Item name="schedule" label="График работы">
                     <Input disabled={!isEditing} />
                  </Form.Item>
               </>
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
