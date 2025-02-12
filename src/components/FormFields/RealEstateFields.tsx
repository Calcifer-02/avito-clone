import React from "react";
import { Form, Select, InputNumber } from "antd";

const RealEstateFields: React.FC = () => {
   return (
      <>
         <Form.Item
            name="propertyType"
            label="Тип недвижимости"
            rules={[{ required: true, message: "Выберите тип недвижимости" }]}
         >
            <Select>
               <Select.Option value="Квартира">Квартира</Select.Option>
               <Select.Option value="Дом">Дом</Select.Option>
               <Select.Option value="Коттедж">Коттедж</Select.Option>
            </Select>
         </Form.Item>
         <Form.Item
            name="area"
            label="Площадь (кв.м)"
            rules={[
               { required: true, type: "number", message: "Введите площадь" },
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
               { required: true, type: "number", message: "Введите цену" },
            ]}
         >
            <InputNumber min={0} />
         </Form.Item>
      </>
   );
};

export default RealEstateFields;
