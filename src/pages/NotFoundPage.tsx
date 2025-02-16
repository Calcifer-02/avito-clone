import React from "react";
import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/notFound.css"; // Подключаем обычный CSS

interface NotFoundPageProps {
   error?: any;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ error }) => {
   const navigate = useNavigate();

   return (
      <div className="container">
         <div className="content">
            <h1 className="title">Упс! Ошибка</h1>
            <p className="description">
               Описание ошибки: {error?.message || "Страница не найдена"}
            </p>
            {error?.data?.message && (
               <p className="additionalInfo">
                  <i>{error.data.message}</i>
               </p>
            )}
            <ConfigProvider>
               <Button className="button" onClick={() => navigate(-1)}>
                  Назад
               </Button>
            </ConfigProvider>
         </div>
      </div>
   );
};

export default NotFoundPage;
