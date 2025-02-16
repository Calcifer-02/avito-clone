import React from "react";
import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/notFound.css";

interface NotFoundPageProps {
   error?: any; // Пропс для передачи ошибки, если она есть
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ error }) => {
   const navigate = useNavigate(); // Инициализируем хук для навигации по страницам

   return (
      <div className="container">
         {" "}
         {/* Контейнер для всей страницы */}
         <div className="content">
            {" "}
            {/* Основное содержимое страницы */}
            <h1 className="title">Упс! Ошибка</h1>{" "}
            {/* Заголовок страницы с ошибкой */}
            <p className="description">
               Описание ошибки: {error?.message || "Страница не найдена"}{" "}
               {/* Отображаем сообщение ошибки, если оно есть */}
            </p>
            {/* Если есть дополнительное сообщение об ошибке, выводим его */}
            {error?.data?.message && (
               <p className="additionalInfo">
                  <i>{error.data.message}</i>
               </p>
            )}
            <ConfigProvider>
               {" "}
               {/* Оборачиваем кнопку в ConfigProvider для настройки компонента */}
               <Button className="button" onClick={() => navigate(-1)}>
                  {" "}
                  {/* Кнопка для возврата на предыдущую страницу */}
                  Назад
               </Button>
            </ConfigProvider>
         </div>
      </div>
   );
};

export default NotFoundPage;
