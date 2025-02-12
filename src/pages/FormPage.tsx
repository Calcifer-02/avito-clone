import React, { useState } from "react";
import { Form, Select, Button, message } from "antd";
import axios from "axios";
import Ad from "../types";
import Category from "../categorys";
import CommonFields from "../components/FormFields/CommonFields";
import RealEstateFields from "../components/FormFields/RealEstateFields";
import AutoFields from "../components/FormFields/AutoFields";
import ServicesFields from "../components/FormFields/ServicesFields";

const { Option } = Select;

const FormPage: React.FC<{ onSubmit: (values: Ad) => void }> = ({
   onSubmit,
}) => {
   const [category, setCategory] = useState<Category | null>(null);
   const [form] = Form.useForm();
   const [messageApi, contextHolder] = message.useMessage();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const handleCategoryChange = (value: string) => {
      setCategory(value as Category);
   };

   const handleSubmit = async (values: Omit<Ad, "id">) => {
      try {
         const response = await axios.post(
            "http://localhost:3000/items",
            values
         );
         const newAd = response.data;
         messageApi.success("Объявление успешно добавлено!");
         onSubmit(newAd);
         form.resetFields();
         setCategory(null);
      } catch (error: any) {
         console.error("Ошибка при добавлении объявления:", error);
         messageApi.error("Не удалось добавить объявление");
      }
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <>
         {contextHolder}
         <h1>Форма добавления объявления</h1>
         <Form form={form} onFinish={handleSubmit} layout="vertical">
            <CommonFields />
            <Form.Item
               name="type"
               label="Категория"
               rules={[{ required: true, message: "Выберите категорию" }]}
            >
               <Select onChange={handleCategoryChange}>
                  <Option value="Недвижимость">Недвижимость</Option>
                  <Option value="Авто">Авто</Option>
                  <Option value="Услуги">Услуги</Option>
               </Select>
            </Form.Item>

            {category === "Недвижимость" && <RealEstateFields />}
            {category === "Авто" && <AutoFields />}
            {category === "Услуги" && <ServicesFields />}

            <Form.Item>
               <Button type="primary" htmlType="submit">
                  Создать объявление
               </Button>
            </Form.Item>

            <div
               className={`burger-menu ${isMenuOpen ? "open" : ""}`}
               onClick={toggleMenu}
            >
               <div></div>
               <div></div>
               <div></div>
            </div>

            {isMenuOpen && (
               <div className="mobile-menu">
                  <Button
                     type="primary"
                     onClick={() => {
                        /* Ссылка на список объявлений */
                     }}
                  >
                     Список объявлений
                  </Button>
               </div>
            )}
         </Form>
      </>
   );
};

export default FormPage;
