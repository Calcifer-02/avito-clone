import { Button, Input, Form, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
   const navigate = useNavigate();

   const onFinish = async (values: { username: string; password: string }) => {
      try {
         const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
         });

         const data = await response.json();

         if (response.ok) {
            localStorage.setItem("token", data.token);
            message.success("Успешный вход");
            navigate("/profile");
         } else {
            message.error(data.message || "Ошибка авторизации");
         }
      } catch (error) {
         message.error("Ошибка сервера");
      }
   };

   return (
      <div className="login-container">
         <Title level={2}>Авторизация</Title>
         <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
               label="Логин"
               name="username"
               rules={[{ required: true, message: "Введите логин!" }]}
            >
               <Input placeholder="Введите логин" />
            </Form.Item>
            <Form.Item
               label="Пароль"
               name="password"
               rules={[{ required: true, message: "Введите пароль!" }]}
            >
               <Input.Password placeholder="Введите пароль" />
            </Form.Item>
            <Form.Item>
               <Button type="primary" htmlType="submit" block>
                  Войти
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default LoginPage;
