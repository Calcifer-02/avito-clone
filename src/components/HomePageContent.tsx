import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

import HomePage from "../pages/HomePage";
import FormPage from "../pages/FormPage";
import ListPage from "../pages/ListPage";
import ItemPage from "../pages/ItemPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import Profile from "../pages/Profile";
const { Content } = Layout;

const HomePageContent: React.FC = () => {
   return (
      <Content style={{ padding: "0 50px" }}>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<FormPage onSubmit={() => {}} />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </Content>
   );
};

export default HomePageContent;
