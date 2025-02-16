import { Button, Input, Form, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography; // Деструктурируем компонент Title из Typography для заголовка

const LoginPage = () => {
   const navigate = useNavigate(); // Инициализируем хук для навигации

   // Функция обработки отправки формы
   const onFinish = async (values: { username: string; password: string }) => {
      try {
         // Отправляем запрос на сервер для авторизации
         const response = await fetch("http://localhost:8000/login", {
            method: "POST", // Метод запроса
            headers: {
               "Content-Type": "application/json", // Устанавливаем тип содержимого
            },
            body: JSON.stringify(values), // Отправляем данные формы (логин и пароль)
         });

         const data = await response.json(); // Получаем ответ от сервера в формате JSON

         if (response.ok) {
            // Если ответ успешный, сохраняем токен в localStorage
            localStorage.setItem("token", data.token);
            message.success("Успешный вход"); // Показываем успешное сообщение
            navigate("/profile"); // Перенаправляем на страницу профиля
         } else {
            message.error(data.message || "Ошибка авторизации"); // Показываем ошибку авторизации
         }
      } catch (error) {
         message.error("Ошибка сервера"); // Если ошибка сервера, выводим соответствующее сообщение
      }
   };

   return (
      <div className="login-container">
         <Title level={2}>Авторизация</Title> {/* Заголовок страницы */}
         <Form layout="vertical" onFinish={onFinish}>
            {" "}
            {/* Форма для авторизации */}
            <Form.Item
               label="Логин"
               name="username"
               rules={[{ required: true, message: "Введите логин!" }]} // Правило для обязательного ввода логина
            >
               <Input placeholder="Введите логин" />{" "}
               {/* Поле для ввода логина */}
            </Form.Item>
            <Form.Item
               label="Пароль"
               name="password"
               rules={[{ required: true, message: "Введите пароль!" }]} // Правило для обязательного ввода пароля
            >
               <Input.Password placeholder="Введите пароль" />{" "}
               {/* Поле для ввода пароля */}
            </Form.Item>
            <Form.Item>
               <Button type="primary" htmlType="submit" block>
                  Войти {/* Кнопка для отправки формы */}
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default LoginPage; // Экспортируем компонент для использования в других частях приложения
