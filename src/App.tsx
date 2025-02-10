import React from "react";
import { Button } from "antd"; // Импорт компонента Button из Ant Design

function App() {
   return (
      <div style={{ padding: "20px" }}>
         <h1>Добро пожаловать в Avito Clone!</h1>
         <Button type="primary">Создать объявление</Button>{" "}
         {/* Кнопка Ant Design */}
      </div>
   );
}

export default App;
