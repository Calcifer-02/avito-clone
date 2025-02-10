import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
   const navigate = useNavigate();

   const handleCreateAd = () => {
      navigate("/form");
   };

   const handleViewAds = () => {
      navigate("/list");
   };

   return (
      <div style={{ textAlign: "center", padding: "50px" }}>
         <h1>Добро пожаловать на наш сайт объявлений!</h1>
         <p>
            Здесь вы можете создать новое объявление или посмотреть
            существующие.
         </p>

         <div style={{ marginTop: "20px" }}>
            <Button
               type="primary"
               size="large"
               onClick={handleCreateAd}
               style={{ marginRight: "20px" }}
            >
               Создать новое объявление
            </Button>
            <Button type="default" size="large" onClick={handleViewAds}>
               Перейти к списку объявлений
            </Button>
         </div>
      </div>
   );
};

export default HomePage;
