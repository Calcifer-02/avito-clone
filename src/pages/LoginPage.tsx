import { Button, Input, Form, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
   const navigate = useNavigate(); // Инициализируем хук для навигации

   // Функция обработки отправки формы
   const onFinish = async (values: { username: string; password: string }) => {
      try {
         // Отправляем запрос на сервер для авторизации
         const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json", // Устанавливаем тип содержимого
            },
            body: JSON.stringify(values), // Отправляем данные формы (логин и пароль)
         });

         const data = await response.json(); // Получаем ответ от сервера в формате JSON

         if (response.ok) {
            // Если ответ успешный, сохраняем токен в localStorage
            localStorage.setItem("token", data.token);
            message.success("Успешный вход");
            // Перенаправляем на страницу профиля
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
