import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import Ad from "../types";
const { Option } = Select;

const ItemPage = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();

   const [ads, setAds] = useState<Ad[]>(() =>
      JSON.parse(localStorage.getItem("ads") || "[]")
   );
   const [isEditing, setIsEditing] = useState(false);

   // Используем message.useMessage()
   const [messageApi, contextHolder] = message.useMessage();

   useEffect(() => {
      localStorage.setItem("ads", JSON.stringify(ads));
   }, [ads]);

   const ad = ads.find((ad) => ad.id === Number(id));

   if (!ad) {
      return <p>Объявление не найдено</p>;
   }

   const handleSubmit = (values: Partial<Ad>) => {
      const updatedAds = ads.map((item) =>
         item.id === ad.id ? { ...item, ...values } : item
      );
      setAds(updatedAds);

      // Показать уведомление об успешном сохранении
      messageApi.success("Изменения успешно сохранены!");
      setIsEditing(false);
   };

   const handleDelete = () => {
      const updatedAds = ads.filter((item) => item.id !== ad.id);
      setAds(updatedAds);

      // Показать уведомление об успешном удалении
      messageApi.success("Объявление успешно удалено!");
      navigate("/list");
   };

   const toggleEdit = () => {
      setIsEditing(!isEditing);

      // Показать уведомление о режиме редактирования
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
         <h2>{ad.title}</h2>
         <p>{ad.description}</p>
         <p>Локация: {ad.location}</p>
         <h3>Категория: {ad.category}</h3>
         {/* Отображаем дополнительные параметры в зависимости от категории */}
         {ad.category === "Недвижимость" && (
            <>
               <p>Тип недвижимости: {ad.propertyType}</p>
               <p>Площадь: {ad.area} кв.м</p>
               <p>Количество комнат: {ad.rooms}</p>
               <p>Цена: {ad.price} руб.</p>
            </>
         )}
         {ad.category === "Авто" && (
            <>
               <p>Марка: {ad.brand}</p>
               <p>Модель: {ad.model}</p>
               <p>Год выпуска: {ad.year}</p>
               <p>Пробег: {ad.mileage} км</p>
            </>
         )}
         {ad.category === "Услуги" && (
            <>
               <p>Тип услуги: {ad.serviceType}</p>
               <p>Опыт работы: {ad.experience} лет</p>
               <p>Стоимость услуги: {ad.cost} руб.</p>
               <p>График работы: {ad.schedule}</p>
            </>
         )}
         <Form onFinish={handleSubmit} initialValues={ad}>
            <Form.Item
               name="title"
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
               name="category"
               label="Категория"
               style={{ display: "none" }}
            >
               <Input disabled={true} />
            </Form.Item>

            {ad.category === "Недвижимость" && (
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

            {ad.category === "Авто" && (
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

            {ad.category === "Услуги" && (
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
               backgroundColor: isEditing ? "#d9d9d9" : "#1677ff", // Серый цвет, если кнопка заблокирована
               color: isEditing ? "#a0a0a0" : "white", // Блеклый текст, если кнопка заблокирована
               cursor: isEditing ? "not-allowed" : "pointer", // Делаем курсор "запрещено", если заблокировано
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
