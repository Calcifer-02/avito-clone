import React from "react";
import { Form, Input, InputNumber, Select } from "antd";

const { Option } = Select;

const AutoFields: React.FC = () => {
   return (
      <>
         <Form.Item
            name="brand"
            label="Марка"
            rules={[{ required: true, message: "Введите марку" }]}
         >
            <Select placeholder="Выберите марку">
               <Option value="Toyota">Toyota</Option>
               <Option value="BMW">BMW</Option>
               <Option value="Mercedes">Mercedes</Option>
               {/* Добавьте другие марки по необходимости */}
            </Select>
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
               { required: true, type: "number", message: "Введите пробег" },
            ]}
         >
            <InputNumber min={0} />
         </Form.Item>
      </>
   );
};

export default AutoFields;
