import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import "./styles/index.css";
import AppHeader from "./components/HomePageHeader";
import AppFooter from "./components/Footer";
import HomePageContent from "./components/HomePageContent";

const App: React.FC = () => {
   return (
      <Router>
         <Layout className="layout">
            <AppHeader />
            <HomePageContent />
            <AppFooter />
         </Layout>
      </Router>
   );
};

export default App;
