import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
   const navigate = useNavigate(); // Хук для перехода между страницами
   const isAuthenticated = !!localStorage.getItem("token"); // Проверяем наличие токена в localStorage

   const handleProtectedNavigation = (path: string) => {
      // Если токен есть, переходим по указанному пути, если нет — на страницу логина
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
               onClick={() => handleProtectedNavigation("/form")} // Переход к форме добавления объявления
               style={{ marginRight: "20px" }}
            >
               Создать новое объявление
            </Button>
            <Button
               type="default"
               size="large"
               onClick={() => handleProtectedNavigation("/list")} // Переход к списку объявлений
               style={{ marginRight: "20px" }}
            >
               Перейти к списку объявлений
            </Button>
         </div>
      </div>
   );
};

export default HomePage;
