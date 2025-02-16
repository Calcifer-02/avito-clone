import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
   return (
      <Footer style={{ textAlign: "center", marginTop: "50px" }}>
         Avito Clone ©2025 Created by
         <a target="_blank" href="https://t.me/Calcifer_02">
            {" "}
            @Calcifer-02
         </a>
      </Footer>
   );
};

export default AppFooter;
