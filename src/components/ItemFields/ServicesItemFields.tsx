import React from "react";
import { Form, Select, InputNumber, Input } from "antd";

const ServicesItemFields: React.FC<{ isEditing: boolean }> = ({
   isEditing,
}) => {
   return (
      <>
         <Form.Item name="serviceType" label="Тип услуги">
            <Select disabled={!isEditing}>
               <Select.Option value="Ремонт">Ремонт</Select.Option>
               <Select.Option value="Уборка">Уборка</Select.Option>
               <Select.Option value="Доставка">Доставка</Select.Option>
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
   );
};

export default ServicesItemFields;
