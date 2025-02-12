import React from "react";
import { Form, Input, InputNumber } from "antd";

const AutoItemFields: React.FC<{ isEditing: boolean }> = ({ isEditing }) => {
   return (
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
   );
};

export default AutoItemFields;
