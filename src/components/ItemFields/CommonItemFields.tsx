import React from "react";
import { Form, Input } from "antd";

const CommonItemFields: React.FC<{ isEditing: boolean }> = ({ isEditing }) => {
   return (
      <>
         <Form.Item name="name" label="Заголовок" rules={[{ required: true }]}>
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
      </>
   );
};

export default CommonItemFields;
