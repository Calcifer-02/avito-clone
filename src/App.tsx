import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import "./styles/index.css";
import AppHeader from "./components/HomePageHeader";
import AppContent from "./components/HomePageContent";
import AppFooter from "./components/Footer";

const App: React.FC = () => {
   return (
      <Router>
         <Layout className="layout">
            <AppHeader />
            <AppContent />
            <AppFooter />
         </Layout>
      </Router>
   );
};

export default App;
