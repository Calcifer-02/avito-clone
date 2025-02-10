import React, { useState } from "react";
import { Form, Input, Select, Button, InputNumber, message } from "antd";
import Ad from "../types";
const { Option } = Select;

type Category = "Недвижимость" | "Авто" | "Услуги";

const FormPage: React.FC<{ onSubmit: (values: Ad) => void }> = ({
   onSubmit,
}) => {
   const [category, setCategory] = useState<Category | null>(null);
   const [form] = Form.useForm(); // Создаем объект формы

   const handleCategoryChange = (value: Category) => {
      setCategory(value);
   };

   const [messageApi, contextHolder] = message.useMessage();

   const handleSubmit = (values: Omit<Ad, "id">) => {
      messageApi.success("Объявление успешно добавлено!");

      const ads = JSON.parse(localStorage.getItem("ads") || "[]");
      const newAd = { id: Date.now(), ...values };
      const updatedAds = [...ads, newAd];
      localStorage.setItem("ads", JSON.stringify(updatedAds));
      onSubmit(newAd);

      form.resetFields(); // Очищаем форму после успешного добавления
      setCategory(null); // Сбрасываем выбранную категорию
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
               name="title"
               label="Название"
               rules={[{ required: true }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="description"
               label="Описание"
               rules={[{ required: true }]}
            >
               <Input.TextArea />
            </Form.Item>

            <Form.Item
               name="location"
               label="Локация"
               rules={[{ required: true }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="category"
               label="Категория"
               rules={[{ required: true }]}
            >
               <Select onChange={handleCategoryChange}>
                  <Option value="Недвижимость">Недвижимость</Option>
                  <Option value="Авто">Авто</Option>
                  <Option value="Услуги">Услуги</Option>
               </Select>
            </Form.Item>

            {category === "Недвижимость" && (
               <>
                  <Form.Item
                     name="propertyType"
                     label="Тип недвижимости"
                     rules={[{ required: true }]}
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
                     rules={[{ required: true, type: "number" }]}
                  >
                     <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                     name="rooms"
                     label="Количество комнат"
                     rules={[{ required: true, type: "number" }]}
                  >
                     <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                     name="price"
                     label="Цена"
                     rules={[{ required: true, type: "number" }]}
                  >
                     <InputNumber min={0} />
                  </Form.Item>
               </>
            )}

            {category === "Авто" && (
               <>
                  <Form.Item
                     name="brand"
                     label="Марка"
                     rules={[{ required: true }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="model"
                     label="Модель"
                     rules={[{ required: true }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="year"
                     label="Год выпуска"
                     rules={[{ required: true, type: "number" }]}
                  >
                     <InputNumber min={1900} max={new Date().getFullYear()} />
                  </Form.Item>
                  <Form.Item name="mileage" label="Пробег (км)">
                     <InputNumber min={0} />
                  </Form.Item>
               </>
            )}

            {category === "Услуги" && (
               <>
                  <Form.Item
                     name="serviceType"
                     label="Тип услуги"
                     rules={[{ required: true }]}
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
                     rules={[{ required: true, type: "number" }]}
                  >
                     <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item
                     name="cost"
                     label="Стоимость"
                     rules={[{ required: true, type: "number" }]}
                  >
                     <InputNumber min={0} />
                  </Form.Item>
                  <Form.Item name="schedule" label="График работы">
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
