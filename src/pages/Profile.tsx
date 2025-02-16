import React, { useEffect } from "react";
import { Layout, Avatar, Button, Card, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const { Content } = Layout;

const Profile: React.FC = () => {
   const navigate = useNavigate();

   useEffect(() => {
      // Проверяем, есть ли токен в localStorage
      const token = localStorage.getItem("token");
      if (!token) {
         navigate("/login"); // Редирект на страницу входа, если нет токена
      }
   }, [navigate]);

   const handleLogout = async () => {
      try {
         // Отправляем запрос на сервер при выходе
         const response = await fetch("http://localhost:8000/logout", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
         });

         const data = await response.json();

         if (response.ok) {
            console.log(data.message); // "Logout successful"
            localStorage.removeItem("token"); // Убираем токен
            navigate("/login"); // Редирект на страницу входа
         } else {
            console.error("Ошибка при выходе");
         }
      } catch (error) {
         console.error("Ошибка сервера при выходе");
      }
   };

   return (
      <Content style={{ padding: "50px 50px", minHeight: "100vh" }}>
         <Row justify="center">
            <Col xs={24} sm={18} md={12} lg={8}>
               <Card
                  style={{ width: "100%", borderRadius: "8px" }}
                  cover={
                     <div style={{ textAlign: "center" }}>
                        <Avatar
                           size={100}
                           style={{
                              backgroundColor: "#1677ff",
                              marginBottom: "16px",
                              marginTop: "20px",
                           }}
                        >
                           U
                        </Avatar>
                        <Title level={3}>User Name</Title>
                        <Text type="secondary">user@example.com</Text>
                     </div>
                  }
               >
                  <Title level={4}>Информация</Title>
                  <Text>Дата регистрации: 12.05.2022</Text>
                  <br />
                  <Text>Город: Москва</Text>
                  <br />
                  <Text>
                     Описание: Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Id ab tenetur voluptatibus. Vel, quas?
                     Amet laborum fugiat, iste atque eaque soluta, tempore omnis
                     porro, fuga pariatur impedit repellat culpa quaerat?
                  </Text>

                  <div style={{ marginTop: "20px", textAlign: "center" }}>
                     <Button type="primary" style={{ marginRight: "10px" }}>
                        Редактировать
                     </Button>
                     <Button danger onClick={handleLogout}>
                        Выйти
                     </Button>
                  </div>
               </Card>
            </Col>
         </Row>
      </Content>
   );
};

export default Profile;
