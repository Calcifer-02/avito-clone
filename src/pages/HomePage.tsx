import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
   const navigate = useNavigate();
   const isAuthenticated = !!localStorage.getItem("token"); // Проверяем, есть ли токен

   const handleProtectedNavigation = (path: string) => {
      if (isAuthenticated) {
         navigate(path);
      } else {
         navigate("/login");
      }
   };

   return (
      <div style={{ textAlign: "center", padding: "50px" }}>
         <h1>Добро пожаловать на мой сайт объявлений!</h1>
         <p>
            Здесь вы можете создать новое объявление или посмотреть
            существующие.
         </p>

         <div style={{ marginTop: "20px" }}>
            <Button
               type="primary"
               size="large"
               onClick={() => handleProtectedNavigation("/form")}
               style={{ marginRight: "20px" }}
            >
               Создать новое объявление
            </Button>
            <Button
               type="default"
               size="large"
               onClick={() => handleProtectedNavigation("/list")}
               style={{ marginRight: "20px" }}
            >
               Перейти к списку объявлений
            </Button>
         </div>
      </div>
   );
};

export default HomePage;
