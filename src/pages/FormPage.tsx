import React, { useState } from "react";
import { Form, Input, Select, Button, InputNumber, message } from "antd";
import Ad from "../types";
import axios from "axios";

const { Option } = Select;

type Category = "Недвижимость" | "Авто" | "Услуги";

const FormPage: React.FC<{ onSubmit: (values: Ad) => void }> = ({
   onSubmit,
}) => {
   const [category, setCategory] = useState<Category | null>(null);
   const [form] = Form.useForm(); // Создаем объект формы
   const [messageApi, contextHolder] = message.useMessage();

   const handleCategoryChange = (value: Category) => {
      setCategory(value);
   };

   const handleSubmit = async (values: Omit<Ad, "id">) => {
      try {
         // Убедитесь, что все обязательные поля присутствуют
         if (
            !values.name ||
            !values.description ||
            !values.location ||
            !values.type
         ) {
            throw new Error("Отсутствуют обязательные поля");
         }

         // Добавляем дополнительные проверки для категорий
         if (values.type === "Недвижимость") {
            if (
               !values.propertyType ||
               !values.area ||
               !values.rooms ||
               !values.price
            ) {
               throw new Error(
                  "Недостаточно данных для категории 'Недвижимость'"
               );
            }
         } else if (values.type === "Авто") {
            if (
               !values.brand ||
               !values.model ||
               !values.year ||
               !values.mileage
            ) {
               throw new Error("Недостаточно данных для категории 'Авто'");
            }
         } else if (values.type === "Услуги") {
            if (!values.serviceType || !values.experience || !values.cost) {
               throw new Error("Недостаточно данных для категории 'Услуги'");
            }
         }

         // Отправляем данные на сервер
         const response = await axios.post(
            "http://localhost:3000/items",
            values
         );
         const newAd = response.data; // Получаем созданный объект с id

         messageApi.success("Объявление успешно добавлено!");
         onSubmit(newAd); // Передаем данные родительскому компоненту
         form.resetFields(); // Очищаем форму
         setCategory(null); // Сбрасываем выбранную категорию
      } catch (error) {
         console.error("Ошибка при добавлении объявления:", error);
         messageApi.error("Не удалось добавить объявление");
      }
   };

   return (
      <>
         {contextHolder}
         <Form
            form={form} // Привязываем форму
            style={{ marginTop: "20px" }}
            layout="vertical"
            onFinish={handleSubmit}
         >
            <h1>Форма добавления объявления</h1>
            <Form.Item
               name="name"
               label="Название"
               rules={[{ required: true, message: "Введите название" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="description"
               label="Описание"
               rules={[{ required: true, message: "Введите описание" }]}
            >
               <Input.TextArea />
            </Form.Item>
            <Form.Item
               name="location"
               label="Локация"
               rules={[{ required: true, message: "Введите локацию" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="type"
               label="Категория"
               rules={[{ required: true, message: "Выберите категорию" }]}
            >
               <Select
                  onChange={(value) => handleCategoryChange(value as Category)}
               >
                  <Option value="Недвижимость">Недвижимость</Option>
                  <Option value="Авто">Авто</Option>
                  <Option value="Услуги">Услуги</Option>
               </Select>
            </Form.Item>

            {/* Поля для недвижимости */}
            {category === "Недвижимость" && (
               <>
                  <Form.Item
                     name="propertyType"
                     label="Тип недвижимости"
                     rules={[
                        {
                           required: true,
                           message: "Выберите тип недвижимости",
                        },
                     ]}
                  >
                     <Select>
                        <Option value="Квартира">Квартира</Option>
                        <Option value="Дом">Дом</Option>
                        <Option value="Коттедж">Коттедж</Option>
                     </Select>
                  </Form.Item>
                  <Form.Item
                     name="area"
                     label="Площадь (кв.м)"
                     rules={[
                        {
                           required: true,
                           type: "number",
                           message: "Введите площадь",
                        },
                     ]}
                  >
                     <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                     name="rooms"
                     label="Количество комнат"
                     rules={[
                        {
                           required: true,
                           type: "number",
                           message: "Введите количество комнат",
                        },
                     ]}
                  >
                     <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                     name="price"
                     label="Цена"
                     rules={[
                        {
                           required: true,
                           type: "number",
                           message: "Введите цену",
                        },
                     ]}
                  >
                     <InputNumber min={0} />
                  </Form.Item>
               </>
            )}

            {/* Поля для авто */}
            {category === "Авто" && (
               <>
                  <Form.Item
                     name="brand"
                     label="Марка"
                     rules={[{ required: true, message: "Введите марку" }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="model"
                     label="Модель"
                     rules={[{ required: true, message: "Введите модель" }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="year"
                     label="Год выпуска"
                     rules={[
                        {
                           required: true,
                           type: "number",
                           message: "Введите год выпуска",
                        },
                        {
                           type: "number",
                           max: new Date().getFullYear(),
                           message: "Год не может быть больше текущего",
                        },
                     ]}
                  >
                     <InputNumber min={1900} max={new Date().getFullYear()} />
                  </Form.Item>
                  <Form.Item
                     name="mileage"
                     label="Пробег (км)"
                     rules={[
                        {
                           required: true,
                           type: "number",
                           message: "Введите пробег",
                        },
                     ]}
                  >
                     <InputNumber min={0} />
                  </Form.Item>
               </>
            )}

            {/* Поля для услуг */}
            {category === "Услуги" && (
               <>
                  <Form.Item
                     name="serviceType"
                     label="Тип услуги"
                     rules={[
                        { required: true, message: "Выберите тип услуги" },
                     ]}
                  >
                     <Select>
                        <Option value="Ремонт">Ремонт</Option>
                        <Option value="Уборка">Уборка</Option>
                        <Option value="Доставка">Доставка</Option>
                     </Select>
                  </Form.Item>
                  <Form.Item
                     name="experience"
                     label="Опыт работы (лет)"
                     rules={[
                        {
                           required: true,
                           type: "number",
                           message: "Введите опыт работы",
                        },
                     ]}
                  >
                     <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                     name="cost"
                     label="Стоимость"
                     rules={[
                        {
                           required: true,
                           type: "number",
                           message: "Введите стоимость",
                        },
                     ]}
                  >
                     <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                     name="schedule"
                     label="График работы"
                     rules={[
                        { required: true, message: "Введите график работы" },
                     ]}
                  >
                     <Input />
                  </Form.Item>
               </>
            )}

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
