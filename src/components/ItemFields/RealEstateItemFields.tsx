import React from "react";
import { Form, Select, InputNumber } from "antd";

const RealEstateItemFields: React.FC<{ isEditing: boolean }> = ({
   isEditing,
}) => {
   return (
      <>
         <Form.Item name="propertyType" label="Тип недвижимости">
            <Select disabled={!isEditing}>
               <Select.Option value="Квартира">Квартира</Select.Option>
               <Select.Option value="Дом">Дом</Select.Option>
               <Select.Option value="Коттедж">Коттедж</Select.Option>
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
   );
};

export default RealEstateItemFields;
