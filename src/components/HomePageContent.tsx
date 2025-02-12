import React from "react";
import { Routes, Route } from "react-router-dom";
import FormPage from "../pages/FormPage";
import ListPage from "../pages/ListPage";
import ItemPage from "../pages/ItemPage";

import HomePage from "../pages/HomePage";
import { Layout } from "antd";
const { Content } = Layout;
const HomePageContent: React.FC = () => {
   return (
      <Content style={{ padding: "0 50px" }}>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<FormPage onSubmit={() => {}} />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
         </Routes>
      </Content>
   );
};

export default HomePageContent;
