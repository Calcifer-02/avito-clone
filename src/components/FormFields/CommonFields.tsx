import React from "react";
import { Form, Input } from "antd";

const CommonFields: React.FC = () => {
   return (
      <>
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
      </>
   );
};

export default CommonFields;
