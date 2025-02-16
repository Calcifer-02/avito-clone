import React, { useEffect, useState } from "react";
import { Layout, List, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const DraftsPage: React.FC = () => {
   const [drafts, setDrafts] = useState<any[]>([]); // Стейт для хранения черновиков
   const navigate = useNavigate();

   useEffect(() => {
      // Получаем список черновиков из localStorage
      const savedDrafts = localStorage.getItem("drafts");
      if (savedDrafts) {
         setDrafts(JSON.parse(savedDrafts)); // Загружаем черновики
      }
   }, []);

   const handleDeleteDraft = (draftId: string) => {
      // Удаляем черновик по ID
      const updatedDrafts = drafts.filter((draft) => draft.id !== draftId);
      setDrafts(updatedDrafts);
      localStorage.setItem("drafts", JSON.stringify(updatedDrafts)); // Сохраняем обновлённый список черновиков
   };

   return (
      <Content style={{ padding: "50px", minHeight: "100vh" }}>
         <Title level={2}>Черновики</Title>
         <List
            itemLayout="horizontal"
            dataSource={drafts}
            renderItem={(draft) => (
               <List.Item
                  style={{
                     padding: "10px",
                     border: "1px solid #1677ff",
                     marginBottom: "10px",
                  }}
                  actions={[
                     <Button danger onClick={() => handleDeleteDraft(draft.id)}>
                        Удалить
                     </Button>,
                  ]}
               >
                  <List.Item.Meta
                     title={draft.name || "Без названия"}
                     description={
                        <>
                           {/* Отображаем все параметры черновика */}
                           {Object.keys(draft).map((key) => (
                              <div key={key}>
                                 <strong>{key}:</strong>{" "}
                                 {draft[key] || "Не задано"}
                              </div>
                           ))}
                        </>
                     }
                  />
               </List.Item>
            )}
         />
         <Button
            style={{ marginTop: "20px" }}
            type="primary"
            onClick={() => navigate("/profile")}
         >
            Назад
         </Button>
      </Content>
   );
};

export default DraftsPage;
