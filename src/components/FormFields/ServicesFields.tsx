import React from "react";
import { Form, Select, InputNumber, Input } from "antd";

const ServicesFields: React.FC = () => {
   return (
      <>
         <Form.Item
            name="serviceType"
            label="Тип услуги"
            rules={[{ required: true, message: "Выберите тип услуги" }]}
         >
            <Select>
               <Select.Option value="Ремонт">Ремонт</Select.Option>
               <Select.Option value="Уборка">Уборка</Select.Option>
               <Select.Option value="Доставка">Доставка</Select.Option>
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
               { required: true, type: "number", message: "Введите стоимость" },
            ]}
         >
            <InputNumber min={0} />
         </Form.Item>
         <Form.Item
            name="schedule"
            label="График работы"
            rules={[{ required: true, message: "Введите график работы" }]}
         >
            <Input />
         </Form.Item>
      </>
   );
};

export default ServicesFields;
